import { Component, effect, inject, signal } from '@angular/core';

import { MatriculaEvolucionDataOptions, MatriculaPorModalidadNivelSectorTotalProvinciaDataOptions, matriculaPorModalidadNivelTotalProvinciaDataOptions } from '../../class/matricula-data-options';
import { KpiCardV2, KPIDataV2 } from '../kpi-card-v2/kpi-card-v2';
import { KpiCardV3, KPIDataV3 } from "../kpi-card-v3/kpi-card-v3";
import { EscuelaState } from '../../state/escuela.state';
import { EscuelasDataOption } from '../../class/escuelas-data-options';
import {EscuelasMatriculaDataOption} from '../../class/escuelas-matricula-data-options';
import { KpiCard, KPIData } from '../kpi-card/kpi-card';
import { MatriculaState } from '../../state/matricula.state';



@Component({
  selector: 'app-home',
  imports: [ KpiCard,KpiCardV2, KpiCardV3],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  private _ess = inject(EscuelaState)
  private _esm = inject(MatriculaState)

  totalEscuelas = this._ess.totalEscuelas
  escuelaPorAnio = this._ess.escuelaPorAnio

  escuelaPorModalidadNivelComun = this._ess.escuelaPorModalidadNivelComun
  escuelaPorModalidadNivelEspecial = this._ess.escuelaPorModalidadNivelEspecial
  escuelaPorModalidadNivelAdultos = this._ess.escuelaPorModalidadNivelAdultos
  escuelasDataOption = new EscuelasDataOption();  

  // Matricula
   totalMatricula = this._esm.totalMatricula
  matriculaPorAnio = this._esm.matriculaPorAnio
  matriculaPorModalidadNivelComun = this._esm.matriculaPorModalidadNivelComun
  matriculaPorModalidadNivelEspecial = this._esm.matriculaPorModalidadNivelEspecial
  matriculaPorModalidadNivelAdultos = this._esm.matriculaPorModalidadNivelAdultos
  matriculaDataOption = new EscuelasDataOption();

 
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

      title: "Escuelas y Matricula - Común ",
       modalidad: 'Común',
      bgColor: "bg-gradient-blue",
       iconPath: "M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1zm12-6.5v3h2v-3h-2z",
      infoNiveles: ['Inicial', 'Primario', 'Secundario 5 años', 'Secundario 6 años', 'SNU'],
      iconNiveles: ['🖍️', '📖', '📚', '📚', '🎓'],
      infoEscuelas: [],
      infoMatricula: [],
     
   })

    escuelasMatriculaPorModalidadNivelEspecialKPI=signal< KPIData | null>({
     dataHeaderValue1:  null,
     dataHeaderValue2:  null,

      title: "Escuelas y Matricula - Especial ",
       modalidad: 'Especial',
      bgColor: "bg-gradient-pink",
       iconPath: "M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1zm12-6.5v3h2v-3h-2z",
      infoNiveles: ['Inicial', 'Primario'],
      iconNiveles: ['🖍️', '📖'],
      infoEscuelas: [],
      infoMatricula: [],
     
   })


    escuelasMatriculaPorModalidadNivelAdultosKPI=signal< KPIData | null>({
     dataHeaderValue1:  null,
     dataHeaderValue2:  null,

      title: "Escuelas y Matricula - Adultos ",
      modalidad: 'Adultos',
      bgColor: "bg-gradient-purple",
       iconPath: "M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1zm12-6.5v3h2v-3h-2z",
      infoNiveles: ['Primario','Secundario', 'Secundario 3 años', 'Secundario 4 años', 'Formación Profesional'],
      iconNiveles: [ '📖','📚','📚', '📚', '🧰'],
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
  const  total = this._esm.totalMatricula();
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
   this._ess.initEscuelaPorAnio(); 
  this._ess.initEscuelaPorModalidadNivelComun(['Inicial', 'Primario', 'Secundario 5 años', 'Secundario 6 años', 'SNU']);
  this._ess.initEscuelaPorModalidadNivelEspecial(['Inicial', 'Primario']);
  this._ess.initEscuelaPorModalidadNivelAdultos([ 'Primario','Secundario', 'Secundario 3 años', 'Secundario 4 años', 'Formación Profesional']);
 
}

initMatricula() {  
  this._esm.initTotalesMatricula();
  this._esm.initMatriculaPorAnio();
  this._esm.initMatriculaPorModalidadNivelComun(['Inicial', 'Primario', 'Secundario 5 años', 'Secundario 6 años', 'SNU']);
  this._esm.initMatriculaPorModalidadNivelEspecial(['Inicial', 'Primario']);
  this._esm.initMatriculaPorModalidadNivelAdultos([ 'Primario','Secundario', 'Secundario 3 años', 'Secundario 4 años', 'Formación Profesional']);

}

}
