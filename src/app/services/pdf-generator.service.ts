import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PDFReportData {
  titulo: string;
  fecha: string;
  filtros: {
    geografico: string;
    educativo: string;
  };
  datos: {
    totalEscuelas: number;
    totalMatricula: number;
    escuelasPorModalidad: {
      comun: number;
      especial: number;
      adultos: number;
    };
    matriculaPorModalidad: {
      comun: number;
      especial: number;
      adultos: number;
    };
    escuelasPorSectorAmbito?: any;
    matriculaPorSectorAmbito?: any;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PDFGeneratorService {

  /**
   * Genera un PDF completo con los datos del dashboard
   */
  async generateDashboardPDF(data: PDFReportData): Promise<void> {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 20;

    // Configurar fuente
    pdf.setFont('helvetica');

    // HEADER
    yPosition = this.addHeader(pdf, data, yPosition, pageWidth);
    
    // INFORMACIÓN DE FILTROS
    yPosition = this.addFiltersSection(pdf, data, yPosition, pageWidth);
    
    // RESUMEN EJECUTIVO
    yPosition = this.addExecutiveSummary(pdf, data, yPosition, pageWidth);
    
    // DESGLOSE POR MODALIDAD
    yPosition = this.addModalityBreakdown(pdf, data, yPosition, pageWidth);
    
    // FOOTER
    this.addFooter(pdf, pageHeight, pageWidth);

    // Descargar el PDF
    pdf.save(`informe-estadistico-${new Date().toISOString().split('T')[0]}.pdf`);
  }

  /**
   * Genera PDF desde un elemento HTML específico
   */
  async generateFromElement(elementId: string, filename: string = 'dashboard-report.pdf'): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Elemento con ID ${elementId} no encontrado`);
      return;
    }

    try {
      // Configurar opciones para mejor calidad
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Primera página
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Páginas adicionales si es necesario
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(filename);
    } catch (error) {
      console.error('Error generando PDF:', error);
      throw error;
    }
  }

  private addHeader(pdf: jsPDF, data: PDFReportData, yPosition: number, pageWidth: number): number {
    // Título principal
    pdf.setFontSize(20);
    pdf.setTextColor(40, 40, 40);
    pdf.text(data.titulo, pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 15;
    
    // Fecha
    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Fecha de generación: ${data.fecha}`, pageWidth / 2, yPosition, { align: 'center' });
    
    // Línea separadora
    yPosition += 10;
    pdf.setLineWidth(0.5);
    pdf.setDrawColor(200, 200, 200);
    pdf.line(20, yPosition, pageWidth - 20, yPosition);
    
    return yPosition + 15;
  }

  private addFiltersSection(pdf: jsPDF, data: PDFReportData, yPosition: number, pageWidth: number): number {
    pdf.setFontSize(14);
    pdf.setTextColor(40, 40, 40);
    pdf.text('Filtros Aplicados', 20, yPosition);
    
    yPosition += 10;
    
    pdf.setFontSize(11);
    pdf.setTextColor(60, 60, 60);
    
    // Filtro geográfico
    pdf.text(`• Geográfico: ${data.filtros.geografico}`, 25, yPosition);
    yPosition += 6;
    
    // Filtro educativo
    pdf.text(`• Educativo: ${data.filtros.educativo}`, 25, yPosition);
    
    return yPosition + 15;
  }

  private addExecutiveSummary(pdf: jsPDF, data: PDFReportData, yPosition: number, pageWidth: number): number {
    pdf.setFontSize(14);
    pdf.setTextColor(40, 40, 40);
    pdf.text('Resumen Ejecutivo', 20, yPosition);
    
    yPosition += 15;
    
    // Crear tabla de resumen
    const summaryData = [
      ['Total de Escuelas', data.datos.totalEscuelas.toLocaleString()],
      ['Total de Matrícula', data.datos.totalMatricula.toLocaleString()]
    ];
    
    this.createSimpleTable(pdf, summaryData, yPosition, 20, pageWidth - 40);
    
    return yPosition + 40;
  }

  private addModalityBreakdown(pdf: jsPDF, data: PDFReportData, yPosition: number, pageWidth: number): number {
    pdf.setFontSize(14);
    pdf.setTextColor(40, 40, 40);
    pdf.text('Desglose por Modalidad', 20, yPosition);
    
    yPosition += 15;
    
    // Tabla de modalidades
    const modalityData = [
      ['Modalidad', 'Escuelas', 'Matrícula'],
      ['Común', data.datos.escuelasPorModalidad.comun.toLocaleString(), 
               data.datos.matriculaPorModalidad.comun.toLocaleString()],
      ['Especial', data.datos.escuelasPorModalidad.especial.toLocaleString(), 
                  data.datos.matriculaPorModalidad.especial.toLocaleString()],
      ['Adultos', data.datos.escuelasPorModalidad.adultos.toLocaleString(), 
                  data.datos.matriculaPorModalidad.adultos.toLocaleString()]
    ];
    
    this.createSimpleTable(pdf, modalityData, yPosition, 20, pageWidth - 40, true);
    
    return yPosition + 60;
  }

  private addFooter(pdf: jsPDF, pageHeight: number, pageWidth: number): void {
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text('Dashboard Estadístico - Sistema de Información Educativa', 
             pageWidth / 2, pageHeight - 10, { align: 'center' });
  }

  private createSimpleTable(pdf: jsPDF, data: string[][], startY: number, startX: number, 
                           tableWidth: number, hasHeader: boolean = false): void {
    const rowHeight = 8;
    const cellPadding = 2;
    const colWidth = tableWidth / data[0].length;
    
    pdf.setFontSize(10);
    
    data.forEach((row, rowIndex) => {
      const y = startY + (rowIndex * rowHeight);
      
      // Header styling
      if (hasHeader && rowIndex === 0) {
        pdf.setFillColor(240, 240, 240);
        pdf.rect(startX, y - 6, tableWidth, rowHeight, 'F');
        pdf.setTextColor(40, 40, 40);
        pdf.setFont('helvetica', 'bold');
      } else {
        pdf.setTextColor(60, 60, 60);
        pdf.setFont('helvetica', 'normal');
      }
      
      row.forEach((cell, colIndex) => {
        const x = startX + (colIndex * colWidth) + cellPadding;
        pdf.text(cell, x, y, { maxWidth: colWidth - (cellPadding * 2) });
      });
      
      // Draw row border
      pdf.setDrawColor(220, 220, 220);
      pdf.setLineWidth(0.1);
      pdf.line(startX, y + 2, startX + tableWidth, y + 2);
    });
  }
}
