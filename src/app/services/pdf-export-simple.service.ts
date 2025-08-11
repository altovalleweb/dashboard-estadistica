import { Injectable, inject } from '@angular/core';
import jsPDF from 'jspdf';
import { EscuelaMatriculaState } from '../state/escuela-matricula.state';

export interface PDFExportOptions {
  includeFilters?: boolean;
  includeCoverPage?: boolean;
  format?: 'a4' | 'letter';
  orientation?: 'portrait' | 'landscape';
  activeFilters?: any;
}

@Injectable({
  providedIn: 'root'
})
export class PdfExportSimpleService {
  private _emss = inject(EscuelaMatriculaState);

  /**
   * Exporta un resumen estadístico del dashboard a PDF
   */
  async exportDashboardToPDF(options: PDFExportOptions): Promise<void> {
    try {
      this.showLoadingIndicator();

      const pdf = new jsPDF({
        orientation: options.orientation || 'portrait',
        unit: 'mm',
        format: options.format || 'a4'
      });

      // Agregar metadatos
      this.addPDFMetadata(pdf);

      // Agregar portada y todo el contenido en una sola página
      this.addCompactReport(pdf, options);

      // Generar nombre de archivo
      const fileName = this.generateFileName(options.activeFilters);

      // Descargar el PDF
      pdf.save(fileName);

      console.log('PDF generado exitosamente');
    } catch (error) {
      console.error('Error al generar PDF:', error);
      throw error;
    } finally {
      this.hideLoadingIndicator();
    }
  }

  /**
   * Agrega metadatos al PDF
   */
  private addPDFMetadata(pdf: jsPDF): void {
    pdf.setProperties({
      title: 'Informe Estadístico Educativo - Neuquén',
      subject: 'Estadísticas de Escuelas y Matrícula',
      author: 'Dirección Provincial de Análisis de Datos',
      keywords: 'educación, estadísticas, neuquén, escuelas, matrícula',
      creator: 'Dashboard Estadístico Educativo'
    });
  }

  /**
   * Agrega un informe compacto en máximo 2 páginas
   */
  private addCompactReport(pdf: jsPDF, options: PDFExportOptions): void {
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Fondo azul para el header
    pdf.setFillColor(37, 99, 235); // blue-600
    pdf.rect(0, 0, pageWidth, 50, 'F');

    // Título principal con letras blancas
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    const title = 'INFORME ESTADÍSTICO EDUCATIVO - NEUQUÉN';
    const titleWidth = pdf.getTextWidth(title);
    pdf.text(title, (pageWidth - titleWidth) / 2, 25);

    // Subtítulo dinámico basado en filtros
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    let subtitle = 'Dirección Provincial de Análisis de Datos';
    
    // Agregar información de filtros al subtítulo
    if (options.activeFilters) {
      const filterParts: string[] = [];
      
      if (options.activeFilters.geographic?.type && options.activeFilters.geographic?.value) {
        const geoType = options.activeFilters.geographic.type === 'departamento' ? 'Departamento' :'' 
                       options.activeFilters.geographic.type === 'distrito' ? 'Distrito ' : '';
        filterParts.push(`${geoType} ${options.activeFilters.geographic.value.name}`);
      }
      
      if (options.activeFilters.educational?.modalidad) {
        filterParts.push(`Modalidad ${options.activeFilters.educational.modalidad}`);
        if (options.activeFilters.educational?.nivel) {
          filterParts.push(`Nivel ${options.activeFilters.educational.nivel}`);
        }
      }
      
      if (filterParts.length > 0) {
        subtitle = filterParts.join(' - ');
      }
    }
    
    const subtitleWidth = pdf.getTextWidth(subtitle);
    pdf.text(subtitle, (pageWidth - subtitleWidth) / 2, 40);

    let yPosition = 65;

    // Fecha de generación
    pdf.setTextColor(100, 100, 100);
    pdf.setFontSize(10);
    const now = new Date();
    pdf.text(`Generado: ${now.toLocaleDateString('es-AR')} ${now.toLocaleTimeString('es-AR')}`, 20, yPosition);
    yPosition += 15;

    // RESUMEN GENERAL EN DOS COLUMNAS
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(37, 99, 235);
    pdf.text('Resumen General', 20, yPosition);
    yPosition += 12;

    const totalEscuelas = this._emss.totalEscuelas();
    const totalMatricula = this._emss.totalMatricula();

    const col1X = 20;
    const col2X = pageWidth / 2 + 10;

    // Columna 1 - Escuelas
    if (totalEscuelas) {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(220, 38, 38);
      pdf.text('ESCUELAS', col1X, yPosition);

      pdf.setFontSize(24);
      pdf.text(totalEscuelas.total?.toString() || '0', col1X, yPosition + 10);

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(75, 85, 99);
      pdf.text(`Común: ${totalEscuelas.comun || 0} (${totalEscuelas.porcentajeComun || 0}%)`, col1X, yPosition + 18);
      pdf.text(`Especial: ${totalEscuelas.especial || 0} (${totalEscuelas.porcentajeEspecial || 0}%)`, col1X, yPosition + 24);
      pdf.text(`Adultos: ${totalEscuelas.adultos || 0} (${totalEscuelas.porcentajeAdultos || 0}%)`, col1X, yPosition + 30);
    }

    // Columna 2 - Matrícula
    if (totalMatricula) {
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(220, 38, 38);
      pdf.text('MATRÍCULA', col2X, yPosition);

      pdf.setFontSize(24);
      pdf.text(totalMatricula.total?.toString() || '0', col2X, yPosition + 10);

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(75, 85, 99);
      pdf.text(`Común: ${totalMatricula.comun || 0} (${totalMatricula.porcentajeComun || 0}%)`, col2X, yPosition + 18);
      pdf.text(`Especial: ${totalMatricula.especial || 0} (${totalMatricula.porcentajeEspecial || 0}%)`, col2X, yPosition + 24);
      pdf.text(`Adultos: ${totalMatricula.adultos || 0} (${totalMatricula.porcentajeAdultos || 0}%)`, col2X, yPosition + 30);
    }

    yPosition += 45;

    // EVOLUCIÓN TEMPORAL COMPACTA
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(37, 99, 235);
    pdf.text('Evolución Temporal', 20, yPosition);
    yPosition += 10;

    try {
      const evolucionEscuelas = this._emss.escuelaPorAnio();
      const evolucionMatricula = this._emss.matriculaPorAnio();

      if (evolucionEscuelas?.labels && evolucionEscuelas?.data && evolucionEscuelas.labels.length > 0) {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(0, 0, 0);
        pdf.text('Escuelas:', col1X, yPosition);
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8);
        const maxItems = Math.min(3, evolucionEscuelas.labels.length);
        for (let i = 0; i < maxItems; i++) {
          const year = evolucionEscuelas.labels[i];
          const value = evolucionEscuelas.data[i];
          pdf.text(`${year}: ${value}`, col1X, yPosition + 6 + (i * 4));
        }
      }

      if (evolucionMatricula?.labels && evolucionMatricula?.data && evolucionMatricula.labels.length > 0) {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(0, 0, 0);
        pdf.text('Matrícula:', col2X, yPosition);
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8);
        const maxItems = Math.min(3, evolucionMatricula.labels.length);
        for (let i = 0; i < maxItems; i++) {
          const year = evolucionMatricula.labels[i];
          const value = evolucionMatricula.data[i];
          pdf.text(`${year}: ${value}`, col2X, yPosition + 6 + (i * 4));
        }
      }
    } catch (error) {
      pdf.setFontSize(9);
      pdf.setTextColor(150, 150, 150);
      pdf.text('Datos de evolución no disponibles', 20, yPosition + 6);
    }

    yPosition += 25;

    // DETALLES POR MODALIDAD
    if (yPosition < pageHeight - 40) {
      this.addCompactModalityDetails(pdf, yPosition, pageWidth);
    }

    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text('Dirección Provincial de Análisis de Datos | analisisdedatos@neuquen.edu.ar', 20, pageHeight - 10);
  }

  /**
   * Agrega detalles de modalidad de forma compacta
   */
  private addCompactModalityDetails(pdf: jsPDF, startY: number, pageWidth: number): void {
    let yPosition = startY;

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(37, 99, 235);
    pdf.text('Detalles por Modalidad', 20, yPosition);
    yPosition += 10;

    const col1X = 20;
    const col2X = pageWidth / 3 + 10;
    const col3X = (pageWidth / 3) * 2 + 10;

    // Headers
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(34, 197, 94);
    pdf.text('COMÚN', col1X, yPosition);
    
    pdf.setTextColor(168, 85, 247);
    pdf.text('ESPECIAL', col2X, yPosition);
    
    pdf.setTextColor(239, 68, 68);
    pdf.text('ADULTOS', col3X, yPosition);
    
    yPosition += 8;

    // Datos compactos
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 0);

    try {
      // Común
      const escuelasComun = this._emss.escuelaPorModalidadNivelComun();
      if (escuelasComun?.serie) {
        pdf.text(`Niveles: ${escuelasComun.serie.length}`, col1X, yPosition);
      }

      // Especial  
      const escuelasEspecial = this._emss.escuelaPorModalidadNivelEspecial();
      if (escuelasEspecial?.serie) {
        pdf.text(`Niveles: ${escuelasEspecial.serie.length}`, col2X, yPosition);
      }

      // Adultos
      const escuelasAdultos = this._emss.escuelaPorModalidadNivelAdultos();
      if (escuelasAdultos?.serie) {
        pdf.text(`Niveles: ${escuelasAdultos.serie.length}`, col3X, yPosition);
      }

    } catch (error) {
      pdf.setTextColor(150, 150, 150);
      pdf.text('Datos detallados no disponibles', 20, yPosition);
    }
  }

  /**
   * Genera el nombre del archivo PDF
   */
  private generateFileName(filters?: any): string {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
    
    let filterSuffix = '';
    
    if (filters?.geographic?.value) {
      filterSuffix += `_${filters.geographic.value.name.replace(/\s+/g, '-')}`;
    }
    
    if (filters?.educational?.modalidad) {
      filterSuffix += `_${filters.educational.modalidad.replace(/\s+/g, '-')}`;
    }
    
    return `informe-estadistico_${dateStr}_${timeStr}${filterSuffix}.pdf`;
  }

  /**
   * Muestra indicador de carga
   */
  private showLoadingIndicator(): void {
    const overlay = document.createElement('div');
    overlay.id = 'pdf-loading-overlay';
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    overlay.innerHTML = `
      <div class="bg-white rounded-lg p-6 flex flex-col items-center space-y-4">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p class="text-gray-700 font-medium">Generando informe PDF...</p>
        <p class="text-gray-500 text-sm">Por favor, espere un momento</p>
      </div>
    `;
    
    document.body.appendChild(overlay);
  }

  /**
   * Oculta indicador de carga
   */
  private hideLoadingIndicator(): void {
    const overlay = document.getElementById('pdf-loading-overlay');
    if (overlay) {
      overlay.remove();
    }
  }
}
