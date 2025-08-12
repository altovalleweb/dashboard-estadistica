import { Component, effect, inject, signal } from '@angular/core';

import { KpiCardV2 } from '../../../utils/kpi-card-v2/kpi-card-v2';
import {EscuelasMatriculaDataOption} from '../../../class/escuelas-matricula-data-options';
import { KpiCard, KPIData } from '../../../utils/kpi-card/kpi-card';
import { ICONOS_ADULTOS, ICONOS_COMUN, ICONOS_ESPECIAL,  NIVELES_ADULTOS,  NIVELES_COMUN_CON_APERTURA, NIVELES_ESPECIAL } from '../../../const/const';
import { Kpi } from '../../../utils/kpi/kpi';
import { EscuelaMatriculaState } from '../../../states/escuela-matricula.state';
import { SidebarFiltersComponent  } from '../sidebar-filters/sidebar-filters';
import {  FiltroState } from '../../../states/filtro.state';
import { KPIDataV2 } from '../../../interfaces/kpi.interface';
import { PDFGeneratorService, PDFReportData } from '../../../services/pdf-generator.service';


@Component({
  selector: 'app-home',
  imports: [ KpiCard, KpiCardV2, Kpi, SidebarFiltersComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {  
  private _emss = inject(EscuelaMatriculaState)
  private _filtroState = inject(FiltroState);
  private _pdfService = inject(PDFGeneratorService);

  // Estado del sidebar (abierto/cerrado)
  sidebarOpen = signal(true);


  activeFilters = this._filtroState.activeFilter;

  

  // Método para toggle del sidebar
  toggleSidebar() {
    this.sidebarOpen.update(value => !value);
  }

      

  // Escuelas
  totalEscuelas = this._emss.totalEscuelas
  escuelaPorAnio = this._emss.escuelaPorAnio
  escuelasPorSectorAmbito = this._emss.escuelasPorSectorAmbito

  escuelaPorModalidadNivelComun = this._emss.escuelaPorModalidadNivelComun
  escuelaPorModalidadNivelEspecial = this._emss.escuelaPorModalidadNivelEspecial
  escuelaPorModalidadNivelAdultos = this._emss.escuelaPorModalidadNivelAdultos

  escuelasPorSectorAmbitoComun = this._emss.escuelasPorSectorAmbitoComun
  escuelasPorSectorAmbitoEspecial = this._emss.escuelasPorSectorAmbitoEspecial
  escuelasPorSectorAmbitoAdultos = this._emss.escuelasPorSectorAmbitoAdultos


  // Matricula
  totalMatricula = this._emss.totalMatricula
  matriculaPorAnio = this._emss.matriculaPorAnio
  matriculaPorSectorAmbito = this._emss.matriculaPorSectorAmbito

  matriculaPorModalidadNivelComun = this._emss.matriculaPorModalidadNivelComun
  matriculaPorModalidadNivelEspecial = this._emss.matriculaPorModalidadNivelEspecial
  matriculaPorModalidadNivelAdultos = this._emss.matriculaPorModalidadNivelAdultos


  matriculaPorSectorAmbitoModalidadComun = this._emss.matriculaPorSectorAmbitoModalidadComun
  matriculaPorSectorAmbitoModalidadEspecial = this._emss.matriculaPorSectorAmbitoModalidadEspecial
  matriculaPorSectorAmbitoModalidadAdultos = this._emss.matriculaPorSectorAmbitoModalidadAdultos

  //Escuelas Matricula
  escuelasMatriculasPorSectorAmbitoModalidadNivelComun = this._emss.escuelasMatriculasPorSectorAmbitoModalidadNivelComun;

  escuelasMatriculasPorSectorAmbitoModalidadNivelEspecial = this._emss.escuelasMatriculasPorSectorAmbitoModalidadNivelEspecial;

  escuelasMatriculasPorSectorAmbitoModalidadNivelAdultos = this._emss.escuelasMatriculasPorSectorAmbitoModalidadNivelAdultos;

  
 
  escuelasMatriculaDataOption = new EscuelasMatriculaDataOption();

  escuelasPorModalidadNivelKPI = signal< KPIDataV2 | null>({
      number: "-",
      title: "Escuelas",
      subtitle: "(Unidades de Servicio)",
      bgColor: "#334155",
       iconPath: "M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1zm12-6.5v3h2v-3h-2z",
      showChart: true,
      totalesSectorAmbito: null,
      chartDataOptionsHeader:  [],
      chartDataOptionsBody: []   }) ; 
  
  
  
  matriculaPorModalidaNivelKPI= signal< KPIDataV2 | null>({
      number: "-",
      title: "Alumnos/as",
       subtitle: "(Matrícula)",
      bgColor: "#475569",
      iconPath: "M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z",
       showChart: true,
      totalesSectorAmbito: null,      
      chartDataOptionsHeader: [],
      chartDataOptionsBody: []
    }) ;


    cargosPoModalidaNivelKPI: KPIDataV2 | null = {
      number: "20.369",
      title: "Cargos Docentes",
      bgColor: "#475569",
      iconPath: "M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z",
       showChart: true,
      totalesSectorAmbito: null,
      chartDataOptionsHeader: null,
      chartDataOptionsBody: null
    }

    escuelasMatriculaPorModalidadNivelComunKPI=signal< KPIData | null>({
     dataHeaderValue1:  null,
     dataHeaderValue2:  null,

      title: "Educación Común - Total Escuelas y Matricula ",
       modalidad: 'Común',
      bgColor: "bg-gradient-blue",
       iconPath: "M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1zm12-6.5v3h2v-3h-2z",
      infoNiveles: NIVELES_COMUN_CON_APERTURA,
      iconNiveles: ICONOS_COMUN,
      infoEscuelas: [],
      infoMatricula: [],
     
   })

    escuelasMatriculaPorModalidadNivelEspecialKPI=signal< KPIData | null>({
     dataHeaderValue1:  null,
     dataHeaderValue2:  null,

      title: "Educación Especial - Escuelas y Matricula ",
       modalidad: 'Especial',
      bgColor: "bg-gradient-pink",
       iconPath: "M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1zm12-6.5v3h2v-3h-2z",
      infoNiveles: NIVELES_ESPECIAL,
      iconNiveles: ICONOS_ESPECIAL,
      infoEscuelas: [],
      infoMatricula: [],
     
   })


    escuelasMatriculaPorModalidadNivelAdultosKPI=signal< KPIData | null>({
     dataHeaderValue1:  null,
     dataHeaderValue2:  null,

       title: "Educación Adultos - Escuelas y Matricula ",
      modalidad: 'Adultos',
      bgColor: "bg-gradient-purple",
       iconPath: "M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1zm12-6.5v3h2v-3h-2z",
      infoNiveles: NIVELES_ADULTOS,
      iconNiveles: ICONOS_ADULTOS,
      infoEscuelas: [],
      infoMatricula: [],

     
   })






 totalEscuelasChanged = effect(() => {
 
  const  total = this.totalEscuelas();
  this.escuelasPorModalidadNivelKPI.update((value) => value ? { ...value, number: `${total?.total }` } : value);

  this.escuelasMatriculaPorModalidadNivelComunKPI.update((value) => value ? { ...value, dataHeaderValue1: { value: total?.comun || 0, description: `Escuelas (${total?.porcentajeComun || 0}%)` } } : value);

  this.escuelasMatriculaPorModalidadNivelEspecialKPI.update((value) => value ? { ...value, dataHeaderValue1: { value: total?.especial || 0, description: `Escuelas (${total?.porcentajeEspecial || 0}%)` } } : value);

  this.escuelasMatriculaPorModalidadNivelAdultosKPI.update((value) => value ? { ...value, dataHeaderValue1: { value: total?.adultos || 0, description: `Escuelas (${total?.porcentajeAdultos || 0}%)` } } : value);

});

 escuelaPorAnioChanged = effect(() => {  
  const dataOptions =  this.escuelasMatriculaDataOption.getEvolucion(this.escuelaPorAnio()?.data || [],"Escuelas", this.escuelaPorAnio()?.labels || [])
  this.escuelasPorModalidadNivelKPI.update((value) => value ? { ...value, chartDataOptionsHeader: dataOptions } : value);  
});



 totalMatriculaChanged = effect(() => {
  const  total = this._emss.totalMatricula();
  this.matriculaPorModalidaNivelKPI.update((value) => value ? { ...value, number: `${total?.total }` } : value);

  this.escuelasMatriculaPorModalidadNivelComunKPI.update((value) => value ? { ...value, dataHeaderValue2: { value: total?.comun || 0, description: `Matricula (${total?.porcentajeComun || 0}%)` } } : value);


  this.escuelasMatriculaPorModalidadNivelEspecialKPI.update((value) => value ? { ...value, dataHeaderValue2: { value: total?.especial || 0, description: `Matricula (${total?.porcentajeEspecial || 0}%)` } } : value);

  this.escuelasMatriculaPorModalidadNivelAdultosKPI.update((value) => value ? { ...value, dataHeaderValue2: { value: total?.adultos || 0, description: `Matricula (${total?.porcentajeAdultos || 0}%)` } } : value);

});

 matriculaPorAnioChanged = effect(() => {  
  const dataOptions =  this.escuelasMatriculaDataOption.getEvolucion(this.matriculaPorAnio()?.data || [], "Alumnos", this.matriculaPorAnio()?.labels || [])
  this.matriculaPorModalidaNivelKPI.update((value) => value ? { ...value, chartDataOptionsHeader: dataOptions } : value);  
});

matriculaPorSectorAmbitoChanged = effect(() => {  
  const totalesSectorAmbito =  this.matriculaPorSectorAmbito()
  this.matriculaPorModalidaNivelKPI.update((value) => value ? { ...value, totalesSectorAmbito: totalesSectorAmbito } : value);  
});



escuelaPorModalidadNivelComunChanged = effect(() => {   
  
  this.escuelasMatriculaPorModalidadNivelComunKPI.update((value) => value ? { ...value, infoEscuelas: this.escuelaPorModalidadNivelComun()?.serie || [] } : value);
});

matriculaPorModalidadNivelComunChanged = effect(() => {    
  this.escuelasMatriculaPorModalidadNivelComunKPI.update((value) => value ? { ...value, infoMatricula: this.matriculaPorModalidadNivelComun()?.serie || [] } : value);
});

escuelaPorModalidadNivelEspecialChanged = effect(() => {   
  
  this.escuelasMatriculaPorModalidadNivelEspecialKPI.update((value) => value ? { ...value, infoEscuelas: this.escuelaPorModalidadNivelEspecial()?.serie || [] } : value);
});

matriculaPorModalidadNivelEspecialChanged = effect(() => {    
  this.escuelasMatriculaPorModalidadNivelEspecialKPI.update((value) => value ? { ...value, infoMatricula: this.matriculaPorModalidadNivelEspecial()?.serie || [] } : value);
});

escuelaPorModalidadNivelAdultosChanged = effect(() => {   
  this.escuelasMatriculaPorModalidadNivelAdultosKPI.update((value) => value ? { ...value, infoEscuelas: this.escuelaPorModalidadNivelAdultos()?.serie || [] } : value);
});

matriculaPorModalidadNivelAdultosChanged = effect(() => {      
  this.escuelasMatriculaPorModalidadNivelAdultosKPI.update((value) => value ? { ...value, infoMatricula: this.matriculaPorModalidadNivelAdultos()?.serie || [] } : value);
});

escuelasPorSectorAmbitoChanged = effect(() => {
  this.escuelasPorModalidadNivelKPI.update((value) => value ? { ...value, totalesSectorAmbito: this.escuelasPorSectorAmbito() } : value); 
});





ngOnInit() {
  
}

/**
 * Calcula los datos por nivel para cada modalidad para incluir en el PDF
 */
private calculateNivelData() {
  // Datos por modalidad Común
  const escuelasComun = this.escuelaPorModalidadNivelComun()?.serie || [];
  const matriculaComun = this.matriculaPorModalidadNivelComun()?.serie || [];
  
  const nivelComun = {
    inicial: { 
      escuelas: escuelasComun[0] || 0, 
      matricula: matriculaComun[0] || 0 
    },
    primario: { 
      escuelas: escuelasComun[1] || 0, 
      matricula: matriculaComun[1] || 0 
    },
    secundario5: { 
      escuelas: escuelasComun[2] || 0, 
      matricula: matriculaComun[2] || 0 
    },
    secundario6: { 
      escuelas: escuelasComun[3] || 0, 
      matricula: matriculaComun[3] || 0 
    },
    snu: { 
      escuelas: escuelasComun[4] || 0, 
      matricula: matriculaComun[4] || 0 
    }
  };

  // Datos por modalidad Especial
  const escuelasEspecial = this.escuelaPorModalidadNivelEspecial()?.serie || [];
  const matriculaEspecial = this.matriculaPorModalidadNivelEspecial()?.serie || [];
  
  const nivelEspecial = {
    inicial: { 
      escuelas: escuelasEspecial[0] || 0, 
      matricula: matriculaEspecial[0] || 0 
    },
    primario: { 
      escuelas: escuelasEspecial[1] || 0, 
      matricula: matriculaEspecial[1] || 0 
    }
  };

  // Datos por modalidad Adultos
  const escuelasAdultos = this.escuelaPorModalidadNivelAdultos()?.serie || [];
  const matriculaAdultos = this.matriculaPorModalidadNivelAdultos()?.serie || [];
  
  const nivelAdultos = {
    primario: { 
      escuelas: escuelasAdultos[0] || 0, 
      matricula: matriculaAdultos[0] || 0 
    },
    secundario: { 
      escuelas: escuelasAdultos[1] || 0, 
      matricula: matriculaAdultos[1] || 0 
    },
    formacionProfesional: { 
      escuelas: escuelasAdultos[2] || 0, 
      matricula: matriculaAdultos[2] || 0 
    }
  };

  return { nivelComun, nivelEspecial, nivelAdultos };
}

/**
 * Genera y descarga un informe en PDF con la información del dashboard
 */
async generatePDFReport() {
  try {
    console.log('Generando informe PDF...');
    
    // Obtener datos actuales
    const filtros = this.activeFilters();
    const totalEscuelas = this.totalEscuelas();
    const totalMatricula = this.totalMatricula();
    const escuelasSectorAmbito = this.escuelasPorSectorAmbito();
    const matriculaSectorAmbito = this.matriculaPorSectorAmbito();
    
    // Calcular datos por nivel para cada modalidad
    const { nivelComun, nivelEspecial, nivelAdultos } = this.calculateNivelData();
    
    // Preparar datos para el PDF
    const reportData: PDFReportData = {
      titulo: this.getReportTitle(),
      fecha: new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      filtros: {
        geografico: filtros.geographic.type && filtros.geographic.value 
          ? `${this.getGeographicFilterLabel(filtros.geographic.type)}: ${filtros.geographic.value.name}`
          : 'Sin filtro geográfico',
        educativo: filtros.educational.modalidad 
          ? `${filtros.educational.modalidad}${filtros.educational.nivel ? ' - ' + filtros.educational.nivel : ''}`
          : 'Sin filtro educativo'
      },
      datos: {
        totalEscuelas: totalEscuelas?.total || 0,
        totalMatricula: totalMatricula?.total || 0,
        escuelasPorModalidad: {
          comun: totalEscuelas?.comun || 0,
          especial: totalEscuelas?.especial || 0,
          adultos: totalEscuelas?.adultos || 0
        },
        matriculaPorModalidad: {
          comun: totalMatricula?.comun || 0,
          especial: totalMatricula?.especial || 0,
          adultos: totalMatricula?.adultos || 0
        },
        escuelasPorSectorAmbito: escuelasSectorAmbito,
        matriculaPorSectorAmbito: matriculaSectorAmbito,
        // Agregar los nuevos datos por nivel
        nivelComun,
        nivelEspecial,
        nivelAdultos
      }
    };
    
    // Generar el PDF
    await this._pdfService.generateDashboardPDF(reportData);
    
    console.log('PDF generado exitosamente');
    
  } catch (error) {
    console.error('Error generando PDF:', error);
    alert('Error al generar el informe PDF. Inténtalo nuevamente.');
  }
}

/**
 * Obtiene el título del informe basado en los filtros activos
 */
private getReportTitle(): string {
  const filtros = this.activeFilters();
  
  if (filtros.geographic.type && filtros.geographic.value) {
    return `Informe Estadístico - ${filtros.geographic.value.name}`;
  }
  
  return 'Informe Estadístico General - Escuelas y Matrícula';
}

/**
 * Genera PDF capturando el contenido HTML del dashboard
 */
async generateHTMLToPDF() {
  try {
    console.log('Generando PDF desde HTML...');
    
    const filename = `dashboard-${this.getFilenameSafe()}-${new Date().toISOString().split('T')[0]}.pdf`;
    await this._pdfService.generateFromElement('dashboard-content', filename);
    
    console.log('PDF desde HTML generado exitosamente');
    
  } catch (error) {
    console.error('Error generando PDF desde HTML:', error);
    alert('Error al generar el PDF desde HTML. Inténtalo nuevamente.');
  }
}

/**
 * Obtiene un nombre de archivo seguro basado en los filtros
 */
private getFilenameSafe(): string {
  const filtros = this.activeFilters();
  
  if (filtros.geographic.type && filtros.geographic.value) {
    return filtros.geographic.value.name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '');
  }
  
  return 'general';
}

/**
 * Obtiene la etiqueta del filtro geográfico
 */
private getGeographicFilterLabel(type: string): string {
  switch (type) {
    case 'region': return 'Región';
    case 'departamento': return 'Departamento';
    case 'distrito': return 'Distrito';
    default: return '';
  }
}

}
