import { Component, effect, inject, signal } from '@angular/core';


import { KpiCardV2, KPIDataV2 } from '../../utils/kpi-card-v2/kpi-card-v2';
import { KpiCardV3, KPIDataV3 } from "../../utils/kpi-card-v3/kpi-card-v3";
import { EscuelaState } from '../../state/escuela.state';
import {EscuelasMatriculaDataOption} from '../../class/escuelas-matricula-data-options';
import { KpiCard, KPIData } from '../../utils/kpi-card/kpi-card';
import { MatriculaState } from '../../state/matricula.state';
import { MODALIDAD_ADULTOS, MODALIDAD_COMUN, MODALIDAD_ESPECIAL, NIVELES_ADULTOS_ESCUELAS, NIVELES_ADULTOS_MATRICULA, NIVELES_COMUN, NIVELES_COMUN_CON_APERTURA, NIVELES_ESPECIAL } from '../../const/const';




@Component({
  selector: 'app-home',
  imports: [ KpiCard,KpiCardV2, KpiCardV3],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  private _ess = inject(EscuelaState)
  private _esm = inject(MatriculaState)


  // Escuelas
  totalEscuelas = this._ess.totalEscuelas
  escuelaPorAnio = this._ess.escuelaPorAnio

  escuelaPorModalidadNivelComun = this._ess.escuelaPorModalidadNivelComun
  escuelaPorModalidadNivelEspecial = this._ess.escuelaPorModalidadNivelEspecial
  escuelaPorModalidadNivelAdultos = this._ess.escuelaPorModalidadNivelAdultos
  totalEscuelasPorSectorAmbito = this._ess.escuelasPorSectorAmbito
  escuelaPorSector = this._ess.escuelaPorSector
  escuelaPorAmbito = this._ess.escuelaPorAmbito



  // Matricula
  totalMatricula = this._esm.totalMatricula
  matriculaPorAnio = this._esm.matriculaPorAnio
  matriculaPorModalidadNivelComun = this._esm.matriculaPorModalidadNivelComun
  matriculaPorModalidadNivelEspecial = this._esm.matriculaPorModalidadNivelEspecial
  matriculaPorModalidadNivelAdultos = this._esm.matriculaPorModalidadNivelAdultos

  totalMatriculaPorSectorAmbito = this._esm.matriculaPorSectorAmbito
  matriculaPorSector = this._esm.matriculaPorSector
  matriculaPorAmbito = this._esm.matriculaPorAmbito

  
 
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
      infoNiveles: ['Inicial', 'Primario', 'Secundario', 'Secundario 5 años', 'Secundario 6 años', 'SNU'],
      iconNiveles: ['🖍️', '📖', '📚', '📚', '📚', '🎓'],
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

  escuelasPorSectorKPI = signal<KPIDataV3 | null>({
 dataHeader: [
     
     ],
      title: "Escuelas por Sector",
      
      bgColor: "bg-gradient-sector",
       iconPath: "M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1zm12-6.5v3h2v-3h-2z",
     
   })

  escuelasPorAmbitoKPI = signal<KPIDataV3 | null>({
 dataHeader: [
     
     ],
      title: "Escuelas por Ámbito",
      bgColor: "bg-gradient-ambito",
       iconPath: "M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1zm12-6.5v3h2v-3h-2z",
     
   })

     matriculaPorSectorKPI = signal<KPIDataV3 | null>({
      dataHeader: [   ],
      title: "Matricula por Sector",      
      bgColor: "bg-gradient-sector",
       iconPath: "M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1zm12-6.5v3h2v-3h-2z",
      
   })

     matriculaPorAmbitoKPI = signal<KPIDataV3 | null>({
      dataHeader: [   ],
      title: "Matricula por Ámbito",
      bgColor: "bg-gradient-ambito",
       iconPath: "M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1zm12-6.5v3h2v-3h-2z",
      
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

totalEscuelasPorSectorAmbitoChanged = effect(() => {  
  const  total = this.totalEscuelasPorSectorAmbito();

 const dataHeaderSector = [
       { value: total?.estatal || 0, description: `Estatales (${total?.porcentajeEstatal || 0}%)` },
       { value: total?.privado || 0, description: `Privadas (${total?.porcentajePrivado || 0}%)` }
     ]

  this.escuelasPorSectorKPI.update((value) => value ? { ...value, dataHeader: dataHeaderSector } : value);

  const dataHeaderAmbito = [
       { value: total?.rural || 0, description: `Rurales (${total?.porcentajeRural || 0}%)` },
       { value: total?.urbano || 0, description: `Urbanas (${total?.porcentajeUrbano || 0}%)` }
     ]

  this.escuelasPorAmbitoKPI.update((value) => value ? { ...value, dataHeader: dataHeaderAmbito } : value);
});


escuelaPorSectorChanged = effect(() => {  

  this.escuelasPorSectorKPI.update((value) => value ? { ...value, chartDataOptions: this.escuelasMatriculaDataOption.getModalidadNivelSectorAmbitoOption(this.escuelaPorSector() || [], [...NIVELES_COMUN,...NIVELES_ESPECIAL,...NIVELES_ADULTOS_ESCUELAS],[
              { title: MODALIDAD_COMUN, cols: 5 },
              { title: MODALIDAD_ESPECIAL, cols: 2 },
              { title: MODALIDAD_ADULTOS, cols: 3 }
            ]  ) } : value);
});

escuelaPorAmbitoChanged = effect(() => {  

  this.escuelasPorAmbitoKPI.update((value) => value ? { ...value, chartDataOptions: this.escuelasMatriculaDataOption.getModalidadNivelSectorAmbitoOption(this.escuelaPorAmbito() || [], [...NIVELES_COMUN,...NIVELES_ESPECIAL,...NIVELES_ADULTOS_ESCUELAS],[
              { title: MODALIDAD_COMUN, cols: 5 },
              { title: MODALIDAD_ESPECIAL, cols: 2 },
              { title: MODALIDAD_ADULTOS, cols: 3 }
            ],['#A52A2A' ,'#008080']   ) } : value);
});



totalMatriculaPorSectorAmbitoChanged = effect(() => {  
  const  total = this.totalMatriculaPorSectorAmbito();

 const dataHeaderSector = [
       { value: total?.estatal || 0, description: `Estatales (${total?.porcentajeEstatal || 0}%)` },
       { value: total?.privado || 0, description: `Privadas (${total?.porcentajePrivado || 0}%)` }
     ]

  this.matriculaPorSectorKPI.update((value) => value ? { ...value, dataHeader: dataHeaderSector } : value);


  const dataHeaderAmbito = [
       { value: total?.rural || 0, description: `Rurales (${total?.porcentajeRural || 0}%)` },
       { value: total?.urbano || 0, description: `Urbanas (${total?.porcentajeUrbano || 0}%)` }
     ]

  this.matriculaPorAmbitoKPI.update((value) => value ? { ...value, dataHeader: dataHeaderAmbito } : value);
});


matriculaPorSectorChanged = effect(() => {  
  this.matriculaPorSectorKPI.update((value) => value ? { ...value, chartDataOptions: this.escuelasMatriculaDataOption.getModalidadNivelSectorAmbitoOption(this.matriculaPorSector() || [], [...NIVELES_COMUN,...NIVELES_ESPECIAL,...NIVELES_ADULTOS_MATRICULA],[
              { title: MODALIDAD_COMUN, cols: 5 },
              { title: MODALIDAD_ESPECIAL, cols: 2 },
              { title: MODALIDAD_ADULTOS, cols: 4 }
            ]  ) } : value);
});

matriculaPorAmbitoChanged = effect(() => {  
  this.matriculaPorAmbitoKPI.update((value) => value ? { ...value, chartDataOptions: this.escuelasMatriculaDataOption.getModalidadNivelSectorAmbitoOption(this.matriculaPorAmbito() || [], [...NIVELES_COMUN,...NIVELES_ESPECIAL,...NIVELES_ADULTOS_MATRICULA],[
              { title: MODALIDAD_COMUN, cols: 5 },
              { title: MODALIDAD_ESPECIAL, cols: 2 },
              { title: MODALIDAD_ADULTOS, cols: 4 }
            ] ,['#008080','#A52A2A'] ) } : value);
});





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
  this._ess.initEscuelaPorModalidadNivelComun(NIVELES_COMUN_CON_APERTURA);
  this._ess.initEscuelaPorModalidadNivelEspecial(NIVELES_ESPECIAL);
  this._ess.initEscuelaPorModalidadNivelAdultos(NIVELES_ADULTOS_ESCUELAS);

  this._ess.initEscuelasPorSectorAmbito();
  this._ess.initEscuelaPorSector();
  this._ess.initEscuelaPorAmbito();
}

initMatricula() {  
  this._esm.initTotalesMatricula();
  this._esm.initMatriculaPorAnio();
  this._esm.initMatriculaPorModalidadNivelComun(NIVELES_COMUN_CON_APERTURA);
  this._esm.initMatriculaPorModalidadNivelEspecial(NIVELES_ESPECIAL);
  this._esm.initMatriculaPorModalidadNivelAdultos(NIVELES_ADULTOS_MATRICULA);

  this._esm.initMatriculaPorSectorAmbito();
  this._esm.initMatriculaPorSector();
  this._esm.initMatriculaPorAmbito();

}

}
