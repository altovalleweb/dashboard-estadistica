import { computed, Injectable, signal } from '@angular/core';
import { Escuela, EscuelaTotalPorAnioCategorizados, TotalesEscuelasPorModalidad, TotalesEscuelasPorModalidadNivelSerializado,  TotalesEscuelasPorSectorAmbito,  TotalesEscuelasPorSectorAmbitoModalidad } from '../class/escuela';
import { MODALIDAD_ADULTOS, MODALIDAD_COMUN, MODALIDAD_ESPECIAL, NIVELES_ADULTOS, NIVELES_COMUN_CON_APERTURA, NIVELES_ESPECIAL } from '../const/const';




@Injectable({
  providedIn: 'root'
})
export class EscuelaState {

  private _escuela = new Escuela();

 
  private readonly _totalEscuelas = signal<TotalesEscuelasPorModalidad | null>(null);
  private readonly _escuelaPorAnio = signal<EscuelaTotalPorAnioCategorizados | null>(null);

  private readonly _escuelasPorSectorAmbito = signal<TotalesEscuelasPorSectorAmbito | null>(null);
 
 private readonly _escuelaPorModalidadNivelComun = signal<TotalesEscuelasPorModalidadNivelSerializado | null>(null);
 private readonly _escuelaPorModalidadNivelEspecial = signal<TotalesEscuelasPorModalidadNivelSerializado | null>(null);
 private readonly _escuelaPorModalidadNivelAdultos = signal<TotalesEscuelasPorModalidadNivelSerializado | null>(null);



 
 private readonly _escuelasPorSectorAmbitoComun = signal<TotalesEscuelasPorSectorAmbitoModalidad | null>(null);
 private readonly _escuelasPorSectorAmbitoEspecial = signal<TotalesEscuelasPorSectorAmbitoModalidad | null>(null);
  private readonly _escuelasPorSectorAmbitoAdultos = signal<TotalesEscuelasPorSectorAmbitoModalidad | null>(null);


  readonly totalEscuelas = computed(() => this._totalEscuelas());
  readonly escuelaPorAnio = computed(() => this._escuelaPorAnio());
  readonly escuelasPorSectorAmbito = computed(() => this._escuelasPorSectorAmbito());
  
  readonly escuelaPorModalidadNivelComun = computed(() => this._escuelaPorModalidadNivelComun());
  readonly escuelaPorModalidadNivelEspecial = computed(() => this._escuelaPorModalidadNivelEspecial());
  readonly escuelaPorModalidadNivelAdultos = computed(() => this._escuelaPorModalidadNivelAdultos());
  
  
  
  readonly escuelasPorSectorAmbitoComun = computed(() => this._escuelasPorSectorAmbitoComun());
  readonly escuelasPorSectorAmbitoEspecial = computed(() => this._escuelasPorSectorAmbitoEspecial());
  readonly escuelasPorSectorAmbitoAdultos = computed(() => this._escuelasPorSectorAmbitoAdultos());

      

  loadData(escuelasData: any[], escuelasPorAnioData: any[]) {
    this._escuela.setEscuelasData(escuelasData)
    this._escuela.setTotalEscuelasPorAnioData(escuelasPorAnioData);

    this.loadTotalesEscuelas();
    this.loadEscuelaPorAnio();

    this.loadEscuelaPorModalidadNivelComun();
    this.loadEscuelaPorModalidadNivelEspecial();
    this.loadEscuelaPorModalidadNivelAdultos();
    this.loadEscuelasPorSectorAmbito();
    this.loadEscuelasPorSectorAmbitoModalidad();
  }

  loadTotalesEscuelas() {
    const totalEscuelas = this._escuela.getTotalEscuelasPorModalidad();   

    this._totalEscuelas.set(totalEscuelas);
  }

  loadEscuelaPorAnio() {        
    const escuelaPorAnio = this._escuela.getTotalEscuelasPorAnio();
    this._escuelaPorAnio.set( escuelaPorAnio );    
   
  }

  loadEscuelasPorSectorAmbito() {
    const escuelasPorSectorAmbito = this._escuela.getTotalEscuelasPorSectorAmbito();       
    this._escuelasPorSectorAmbito.set(escuelasPorSectorAmbito);
  }

  loadEscuelaPorModalidadNivelComun() {
    const escuelaPorModalidadNivelComun = this._escuela.getTotalEscuelasPorModalidadSerializado(MODALIDAD_COMUN, NIVELES_COMUN_CON_APERTURA);         
    this._escuelaPorModalidadNivelComun.set(escuelaPorModalidadNivelComun);
  }

  loadEscuelaPorModalidadNivelEspecial( ) {
    const escuelaPorModalidadNivelEspecial = this._escuela.getTotalEscuelasPorModalidadSerializado(MODALIDAD_ESPECIAL, NIVELES_ESPECIAL);
    this._escuelaPorModalidadNivelEspecial.set(escuelaPorModalidadNivelEspecial);
  }

  loadEscuelaPorModalidadNivelAdultos( ) {
    const escuelaPorModalidadNivelAdultos = this._escuela.getTotalEscuelasPorModalidadSerializado(MODALIDAD_ADULTOS, NIVELES_ADULTOS);
    this._escuelaPorModalidadNivelAdultos.set(escuelaPorModalidadNivelAdultos);
  }


 
 loadEscuelasPorSectorAmbitoModalidad() {
    const escuelasPorSectorAmbitoModalidad = this._escuela.getTotalEscuelasPorSectorAmbitoModalidad();    

    this._escuelasPorSectorAmbitoComun.set(escuelasPorSectorAmbitoModalidad?.find(e => e.modalidad.toLowerCase() === MODALIDAD_COMUN.toLocaleLowerCase()) || null);
    this._escuelasPorSectorAmbitoEspecial.set(escuelasPorSectorAmbitoModalidad?.find(e => e.modalidad.toLowerCase() === MODALIDAD_ESPECIAL.toLocaleLowerCase()) || null);
    this._escuelasPorSectorAmbitoAdultos.set(escuelasPorSectorAmbitoModalidad?.find(e => e.modalidad.toLowerCase() === MODALIDAD_ADULTOS.toLocaleLowerCase()) || null);
    

  }

}