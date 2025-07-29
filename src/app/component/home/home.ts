import { Component, effect, inject, signal } from '@angular/core';

import { MatriculaEvolucionDataOptions, MatriculaPorModalidadNivelSectorTotalProvinciaDataOptions, matriculaPorModalidadNivelTotalProvinciaDataOptions } from '../../class/matricula-data-options';
import { KpiCardV2, KPIDataV2 } from '../kpi-card-v2/kpi-card-v2';
import { KpiCardV3, KPIDataV3 } from "../kpi-card-v3/kpi-card-v3";
import { EscuelaState } from '../../state/escuela.state';
import { EscuelasDataOption } from '../../class/escuelas-data-options';
import {EscuelasMatriculaDataOption} from '../../class/escuelas-matricula-data-options';
import { KpiCard, KPIData } from '../kpi-card/kpi-card';



@Component({
  selector: 'app-home',
  imports: [ KpiCard,KpiCardV2, KpiCardV3],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  private _ess = inject(EscuelaState)

  totalEscuelas = this._ess.totalEscuelas
  escuelaPorAnio = this._ess.escuelaPorAnio
  escuelaPorModalidadNivel = this._ess.escuelaPorModalidadNivel
  escuelaPorMolidadNivelComun = this._ess.escuelaPorModalidadNivelComun
  escuelaPorMolidadNivelEspecial = this._ess.escuelaPorModalidadNivelEspecial
  escuelaPorMolidadNivelAdultos = this._ess.escuelaPorModalidadNivelAdultos

  escuelasDataOption = new EscuelasDataOption(); 
  escuelasMatriculaDataOption = new EscuelasMatriculaDataOption();

  escuelasPoModalidaNivelKPI = signal< KPIDataV2 | null>({
      number: "-",
      title: "Escuelas",
      subtitle: "(Unidades de Servicio)",
      bgColor: "#334155",
       iconPath: "M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1zm12-6.5v3h2v-3h-2z",
      showChart: true,
      chartType: 'donut',
      chartDataOptionsHeader:  [],
      chartDataOptionsBody: []   }) ; 
  
  
  
  matriculaPoModalidaNivelKPI: KPIDataV2 | null = {
      number: "236.951",
      title: "Alumnos/as",
      bgColor: "#475569",
      iconPath: "M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z",
       showChart: true,
      chartType: 'pie',
      chartDataOptionsHeader: MatriculaEvolucionDataOptions,
      chartDataOptionsBody: matriculaPorModalidadNivelTotalProvinciaDataOptions
    }; 


    cargosPoModalidaNivelKPI: KPIDataV2 | null = {
      number: "20.369",
      title: "Cargos Docentes",
      bgColor: "#475569",
      iconPath: "M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z",
       showChart: true,
      chartType: 'pie',
      chartDataOptionsHeader: null,
      chartDataOptionsBody: null
    }

    escuelasMatriculaPorModalidadNivelKPI=signal< KPIData | null>({
     dataHeader: [
       { value: 968, description: 'Escuelas (70.3%)' },
       { value: 199759, description: 'Alumnos (80.7%)' }
     ],
      title: "Escuelas y Matricula - Común ",
      
      bgColor: "bg-gradient-teal",
       iconPath: "M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1zm12-6.5v3h2v-3h-2z",
      chartDataOptions: null 
   })



 totalEscuelasChanged = effect(() => {
  const  total = this._ess.totalEscuelas();
  this.escuelasPoModalidaNivelKPI.update((value) => value ? { ...value, number: `${total?.total }` } : value);
});

 escuelaPorAnioChanged = effect(() => {  
  const dataOptions =  this.escuelasDataOption.getUnidadesDeServicioEvolucion(this.escuelaPorAnio()?.data || [], this.escuelaPorAnio()?.labels || [])
  this.escuelasPoModalidaNivelKPI.update((value) => value ? { ...value, chartDataOptionsHeader: dataOptions } : value);  
});


escuelaPorModalidadNivelComunChanged = effect(() => {  
  console.log(this.escuelaPorMolidadNivelComun()?.serie);
  const dataOptions = this.escuelasMatriculaDataOption.getEscuelasMatriculaModalidadComun(this.escuelaPorMolidadNivelComun()?.serie || [], 
  [23259, 83229, 39028,22269, 20999], ['Inicial','Primaria','Secundaria 5 años','Secundaria 6 años','SNU']);
  this.escuelasMatriculaPorModalidadNivelKPI.update((value) => value ? { ...value, chartDataOptions: dataOptions } : value);
});





kpiDataV3: KPIDataV3[] = [
  
   {
     dataHeader: [
       { value: 1.051, description: 'Estatales (77.3%)' },
       { value: 215, description: 'Privadas (22.7%)' }
     ],
      title: "Distribución de Escuelas por Sector",
      
      bgColor: "bg-gradient-emerald",
       iconPath: "M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1zm12-6.5v3h2v-3h-2z",
      chartDataOptions: this.escuelasDataOption.getUnidadesDeServicioPorModalidadNivelSectorTotalProvincia()

   },
    {
     dataHeader: [
       { value: 196.871, description: 'Estatales (77.3%)' },
       { value: 40080, description: 'Privadas (22.7%)' }
     ],
      title: "Distribución de Matricula por Sector",
      
      bgColor: "bg-gradient-indigo",
       iconPath: "M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z",      
      chartDataOptions:     MatriculaPorModalidadNivelSectorTotalProvinciaDataOptions
     
   },
   {
     dataHeader: [
       { value: 933, description: 'Urbano (70.3%)' },
       { value: 333, description: 'Rural (27.7%)' }
     ],
      title: "Distribución de Escuelas por Ámbito",
      
      bgColor: "bg-gradient-teal",
       iconPath: "M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1zm12-6.5v3h2v-3h-2z",
      chartDataOptions:   this.escuelasDataOption.getUnidadesDeServicioPorModalidadNivelAmbitoTotalProvincia()

   },
   
   
]



ngOnInit() {
  this.initData();
}


initData() {  
  this.initEscuelas()
  this.initMatricula()
}

initEscuelas() {   
  this._ess.initTotalesEscuelas();
  this._ess.initEscuelaPorModalidadNivel();
  this._ess.initEscuelaPorModalidadNivelComun(['Inicial', 'Primario', 'Secundario 5 años', 'Secundario 6 años', 'SNU']);
  this._ess.initEscuelaPorModalidadNivelEspecial(['Inicial', 'Primario']);
  this._ess.initEscuelaPorModalidadNivelAdultos([ 'Primario', 'Secundaria 3 años', 'Secundaria 4 años', 'Formación Profesional']);
  this._ess.initEscuelaPorAnio();
}

initMatricula() {  
  console.log('Initializing matricula data...'); 
}

}
