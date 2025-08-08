import { Component, effect, inject, signal } from '@angular/core';

import { KpiCardV2, KPIDataV2 } from '../../utils/kpi-card-v2/kpi-card-v2';

import { EscuelaState } from '../../state/escuela.state';
import {EscuelasMatriculaDataOption} from '../../class/escuelas-matricula-data-options';
import { KpiCard, KPIData } from '../../utils/kpi-card/kpi-card';
import { MatriculaState } from '../../state/matricula.state';
import { ICONOS_ADULTOS, ICONOS_COMUN, ICONOS_ESPECIAL,  NIVELES_ADULTOS,  NIVELES_COMUN_CON_APERTURA, NIVELES_ESPECIAL } from '../../const/const';
import { Kpi } from '../../utils/kpi/kpi';
import { EscuelaMatriculaState } from '../../state/escuela-matricula.state';
import { SidebarFiltersComponent, FilterState } from '../sidebar-filters/sidebar-filters';

@Component({
  selector: 'app-home',
  imports: [ KpiCard, KpiCardV2, Kpi, SidebarFiltersComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  private _ess = inject(EscuelaState)
  private _mss = inject(MatriculaState)
  private _emss = inject(EscuelaMatriculaState)

  // Estado del sidebar (abierto/cerrado)
  sidebarOpen = signal(true);

  // Estado de los filtros activos
  activeFilters = signal<FilterState>({
    geographic: {
      type: null,
      value: null
    },
    educational: {
      modalidad: null,
      nivel: null
    }
  });

  // Método para toggle del sidebar
  toggleSidebar() {
    this.sidebarOpen.update(value => !value);
  }

  // Método para manejar cambios en los filtros
  onFiltersChanged(filters: FilterState) {
    this.activeFilters.set(filters);
    // Aquí puedes agregar lógica para filtrar los datos
    console.log('Filtro actualizado:', filters);
  }

  // Escuelas
  totalEscuelas = this._ess.totalEscuelas
  escuelaPorAnio = this._ess.escuelaPorAnio

  escuelaPorModalidadNivelComun = this._ess.escuelaPorModalidadNivelComun
  escuelaPorModalidadNivelEspecial = this._ess.escuelaPorModalidadNivelEspecial
  escuelaPorModalidadNivelAdultos = this._ess.escuelaPorModalidadNivelAdultos


  escuelasPorSectorAmbitoComun = this._ess.escuelasPorSectorAmbitoComun
  escuelasPorSectorAmbitoEspecial = this._ess.escuelasPorSectorAmbitoEspecial
  escuelasPorSectorAmbitoAdultos = this._ess.escuelasPorSectorAmbitoAdultos


  // Matricula
  totalMatricula = this._mss.totalMatricula
  matriculaPorAnio = this._mss.matriculaPorAnio
  matriculaPorModalidadNivelComun = this._mss.matriculaPorModalidadNivelComun
  matriculaPorModalidadNivelEspecial = this._mss.matriculaPorModalidadNivelEspecial
  matriculaPorModalidadNivelAdultos = this._mss.matriculaPorModalidadNivelAdultos

  matriculaPorSectorAmbitoModalidadComun = this._mss.matriculaPorSectorAmbitoModalidadComun
  matriculaPorSectorAmbitoModalidadEspecial = this._mss.matriculaPorSectorAmbitoModalidadEspecial
  matriculaPorSectorAmbitoModalidadAdultos = this._mss.matriculaPorSectorAmbitoModalidadAdultos

  //Escuelas Matricula
  escuelasMatriculasPorSectorAmbitoModalidadNivelComun = this._emss.escuelasMatriculasPorSectorAmbitoModalidadNivelComun;

  escuelasMatriculasPorSectorAmbitoModalidadNivelEspecial = this._emss.escuelasMatriculasPorSectorAmbitoModalidadNivelEspecial;

  escuelasMatriculasPorSectorAmbitoModalidadNivelAdultos = this._emss.escuelasMatriculasPorSectorAmbitoModalidadNivelAdultos;

  
 
  escuelasMatriculaDataOption = new EscuelasMatriculaDataOption();

  escuelasPorModalidaNivelKPI = signal< KPIDataV2 | null>({
      number: "-",
      title: "Escuelas",
      subtitle: "(Unidades de Servicio)",
      bgColor: "#334155",
       iconPath: "M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1zm12-6.5v3h2v-3h-2z",
      showChart: true,
    
      chartDataOptionsHeader:  [],
      chartDataOptionsBody: []   }) ; 
  
  
  
  matriculaPorModalidaNivelKPI= signal< KPIDataV2 | null>({
      number: "-",
      title: "Alumnos/as",
      bgColor: "#475569",
      iconPath: "M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z",
       showChart: true,
    
      chartDataOptionsHeader: [],
      chartDataOptionsBody: []
    }) ;


    cargosPoModalidaNivelKPI: KPIDataV2 | null = {
      number: "20.369",
      title: "Cargos Docentes",
      bgColor: "#475569",
      iconPath: "M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z",
       showChart: true,
    
      chartDataOptionsHeader: null,
      chartDataOptionsBody: null
    }

    escuelasMatriculaPorModalidadNivelComunKPI=signal< KPIData | null>({
     dataHeaderValue1:  null,
     dataHeaderValue2:  null,

      title: "Educación Común - Escuelas y Matricula ",
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
  this.escuelasPorModalidaNivelKPI.update((value) => value ? { ...value, number: `${total?.total }` } : value);

  this.escuelasMatriculaPorModalidadNivelComunKPI.update((value) => value ? { ...value, dataHeaderValue1: { value: total?.comun || 0, description: `Escuelas (${total?.porcentajeComun || 0}%)` } } : value);

  this.escuelasMatriculaPorModalidadNivelEspecialKPI.update((value) => value ? { ...value, dataHeaderValue1: { value: total?.especial || 0, description: `Escuelas (${total?.porcentajeEspecial || 0}%)` } } : value);

  this.escuelasMatriculaPorModalidadNivelAdultosKPI.update((value) => value ? { ...value, dataHeaderValue1: { value: total?.adultos || 0, description: `Escuelas (${total?.porcentajeAdultos || 0}%)` } } : value);

});

 escuelaPorAnioChanged = effect(() => {  
  const dataOptions =  this.escuelasMatriculaDataOption.getEvolucion(this.escuelaPorAnio()?.data || [], this.escuelaPorAnio()?.labels || [])
  this.escuelasPorModalidaNivelKPI.update((value) => value ? { ...value, chartDataOptionsHeader: dataOptions } : value);  
});


 totalMatriculaChanged = effect(() => {
  const  total = this._mss.totalMatricula();
  this.matriculaPorModalidaNivelKPI.update((value) => value ? { ...value, number: `${total?.total }` } : value);

  this.escuelasMatriculaPorModalidadNivelComunKPI.update((value) => value ? { ...value, dataHeaderValue2: { value: total?.comun || 0, description: `Matricula (${total?.porcentajeComun || 0}%)` } } : value);


  this.escuelasMatriculaPorModalidadNivelEspecialKPI.update((value) => value ? { ...value, dataHeaderValue2: { value: total?.especial || 0, description: `Matricula (${total?.porcentajeEspecial || 0}%)` } } : value);

  this.escuelasMatriculaPorModalidadNivelAdultosKPI.update((value) => value ? { ...value, dataHeaderValue2: { value: total?.adultos || 0, description: `Matricula (${total?.porcentajeAdultos || 0}%)` } } : value);

});

 matriculaPorAnioChanged = effect(() => {  
  const dataOptions =  this.escuelasMatriculaDataOption.getEvolucion(this.matriculaPorAnio()?.data || [], this.matriculaPorAnio()?.labels || [])
  this.matriculaPorModalidaNivelKPI.update((value) => value ? { ...value, chartDataOptionsHeader: dataOptions } : value);  
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





ngOnInit() {
  this.initData();
}


initData() {  
  this.initEscuelas()
  this.initMatricula()
  this.initEscuelasMatricula();
}

initEscuelas() {   
  this._ess.initTotalesEscuelas();
   this._ess.initEscuelaPorAnio(); 
  this._ess.initEscuelaPorModalidadNivelComun(NIVELES_COMUN_CON_APERTURA);
  this._ess.initEscuelaPorModalidadNivelEspecial(NIVELES_ESPECIAL);
  this._ess.initEscuelaPorModalidadNivelAdultos( NIVELES_ADULTOS);

  
  this._ess.initEscuelasPorSectorAmbitoModalidad();
}

initMatricula() {  
  this._mss.initTotalesMatricula();
  this._mss.initMatriculaPorAnio();
  this._mss.initMatriculaPorModalidadNivelComun(NIVELES_COMUN_CON_APERTURA);
  this._mss.initMatriculaPorModalidadNivelEspecial(NIVELES_ESPECIAL);
  this._mss.initMatriculaPorModalidadNivelAdultos( NIVELES_ADULTOS);

  
  this._mss.initMatriculaPorSectorAmbitoModalidad();

}

initEscuelasMatricula() {  
  this._emss.initEscuelasMatriculasPorSectorAmbitoModalidadNivelComun(NIVELES_COMUN_CON_APERTURA);
  this._emss.initEscuelasMatriculasPorSectorAmbitoModalidadNivelEspecial(NIVELES_ESPECIAL);
  this._emss.initEscuelasMatriculasPorSectorAmbitoModalidadNivelAdultos(NIVELES_ADULTOS);

}

}
