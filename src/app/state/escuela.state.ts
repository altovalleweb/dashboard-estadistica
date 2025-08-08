import { Injectable, signal, WritableSignal } from '@angular/core';
import { Escuela, EscuelaTotalPorAnioCategorizados, EscuelaTotalPorModalidadNivelCategorizados, TotalesEscuelasPorModalidad, TotalesEscuelasPorModalidadNivelSerializado, TotalesEscuelasPorSectorAmbito, TotalesEscuelasPorSectorAmbitoModalidad, TotalesEscuelasPorSectorAmbitoSerializado } from '../class/escuela';
import { MODALIDAD_ADULTOS, MODALIDAD_COMUN, MODALIDAD_ESPECIAL } from '../const/const';



@Injectable({
  providedIn: 'root'
})
export class EscuelaState {

  private _escuela = new Escuela();

 private _totalEscuelas = signal<TotalesEscuelasPorModalidad | null>(null);
 
 

 private _escuelaPorAnio = signal<EscuelaTotalPorAnioCategorizados | null>(null);
 private  _escuelaPorModalidadNivel = signal<EscuelaTotalPorModalidadNivelCategorizados | null>(null);
 private  _escuelaPorModalidadNivelComun = signal<TotalesEscuelasPorModalidadNivelSerializado | null>(null);
 private  _escuelaPorModalidadNivelEspecial = signal<TotalesEscuelasPorModalidadNivelSerializado | null>(null);
 private  _escuelaPorModalidadNivelAdultos = signal<TotalesEscuelasPorModalidadNivelSerializado | null>(null);


 private  _escuelasPorSectorAmbito = signal<TotalesEscuelasPorSectorAmbito | null>(null);
 private  _escuelaPorSector = signal<TotalesEscuelasPorSectorAmbitoSerializado[] | null>(null);
 private  _escuelaPorAmbito = signal<TotalesEscuelasPorSectorAmbitoSerializado[] | null>(null);


 private  _escuelasPorSectorAmbitoComun = signal<TotalesEscuelasPorSectorAmbitoModalidad | null>(null);
  private  _escuelasPorSectorAmbitoEspecial = signal<TotalesEscuelasPorSectorAmbitoModalidad | null>(null);
  private  _escuelasPorSectorAmbitoAdultos = signal<TotalesEscuelasPorSectorAmbitoModalidad | null>(null);


 

    get totalEscuelas(): WritableSignal<TotalesEscuelasPorModalidad | null> {
        return this._totalEscuelas;
    }

  get escuelaPorAnio(): WritableSignal<EscuelaTotalPorAnioCategorizados | null>  {
    return this._escuelaPorAnio;
  }

  get escuelaPorModalidadNivelComun(): WritableSignal<TotalesEscuelasPorModalidadNivelSerializado | null> {
    return this._escuelaPorModalidadNivelComun;
  }

  get escuelaPorModalidadNivelEspecial(): WritableSignal<TotalesEscuelasPorModalidadNivelSerializado | null> {
    return this._escuelaPorModalidadNivelEspecial;
  }

  get escuelaPorModalidadNivelAdultos(): WritableSignal<TotalesEscuelasPorModalidadNivelSerializado | null> {
    return this._escuelaPorModalidadNivelAdultos;
  }


  get escuelasPorSectorAmbito(): WritableSignal<TotalesEscuelasPorSectorAmbito | null> {
    return this._escuelasPorSectorAmbito;
  }

  get escuelaPorSector(): WritableSignal<TotalesEscuelasPorSectorAmbitoSerializado[] | null> {
    return this._escuelaPorSector;
  }

  
 get escuelaPorAmbito(): WritableSignal<TotalesEscuelasPorSectorAmbitoSerializado[] | null> {
    return this._escuelaPorAmbito;
  }

  get escuelaPorModalidadNivel(): WritableSignal<EscuelaTotalPorModalidadNivelCategorizados | null> {
    
    return this._escuelaPorModalidadNivel;
  }

  get escuelasPorSectorAmbitoComun(): WritableSignal<TotalesEscuelasPorSectorAmbitoModalidad | null> {
    return this._escuelasPorSectorAmbitoComun;
  }

  get escuelasPorSectorAmbitoEspecial(): WritableSignal<TotalesEscuelasPorSectorAmbitoModalidad | null> {
    return this._escuelasPorSectorAmbitoEspecial;
  }

  get escuelasPorSectorAmbitoAdultos(): WritableSignal<TotalesEscuelasPorSectorAmbitoModalidad | null> {
    return this._escuelasPorSectorAmbitoAdultos;
  }

  initTotalesEscuelas() {
    const totalEscuelas = this._escuela.getTotalEscuelasPorModalidad();   
    this._totalEscuelas.set(totalEscuelas);
  }

  initEscuelaPorAnio() {        
    const escuelaPorAnio = this._escuela.getTotalEscuelasPorAnio();
    this._escuelaPorAnio.set( escuelaPorAnio );    
   
  }

  initEscuelaPorModalidadNivelComun(niveles: string[] ) {
    const escuelaPorModalidadNivelComun = this._escuela.getTotalEscuelasPorModalidadSerializado(MODALIDAD_COMUN, niveles);         
    this._escuelaPorModalidadNivelComun.set(escuelaPorModalidadNivelComun);
  }

  initEscuelaPorModalidadNivelEspecial(niveles: string[] ) {
    const escuelaPorModalidadNivelEspecial = this._escuela.getTotalEscuelasPorModalidadSerializado(MODALIDAD_ESPECIAL, niveles);
    this._escuelaPorModalidadNivelEspecial.set(escuelaPorModalidadNivelEspecial);
  }

  initEscuelaPorModalidadNivelAdultos(niveles: string[] ) {
    const escuelaPorModalidadNivelAdultos = this._escuela.getTotalEscuelasPorModalidadSerializado(MODALIDAD_ADULTOS, niveles);
    this._escuelaPorModalidadNivelAdultos.set(escuelaPorModalidadNivelAdultos);
  }

  initEscuelaPorModalidadNivel() {
    const escuelaPorModalidadNivel = this._escuela.getTotalEscuelasPorModalidadNivel();
    this._escuelaPorModalidadNivel.set(escuelaPorModalidadNivel);  
  }

  initEscuelaPorSector() {
    const escuelaPorSector = this._escuela.getTotalEscuelasPorSectorSerializado();           
    this._escuelaPorSector.set(escuelaPorSector);
  }

  initEscuelaPorAmbito() {
    const escuelaPorAmbito = this._escuela.getTotalEscuelasPorAmbitoSerializado();           
    this._escuelaPorAmbito.set(escuelaPorAmbito);
  }

  initEscuelasPorSectorAmbito() {
    const escuelasPorSectorAmbito = this._escuela.getTotalEscuelasPorSectorAmbito();       
    this._escuelasPorSectorAmbito.set(escuelasPorSectorAmbito);
  }

 initEscuelasPorSectorAmbitoModalidad() {
    const escuelasPorSectorAmbitoModalidad = this._escuela.getTotalEscuelasPorSectorAmbitoModalidad();    

    this._escuelasPorSectorAmbitoComun.set(escuelasPorSectorAmbitoModalidad?.find(e => e.modalidad.toLowerCase() === MODALIDAD_COMUN.toLocaleLowerCase()) || null);
    this._escuelasPorSectorAmbitoEspecial.set(escuelasPorSectorAmbitoModalidad?.find(e => e.modalidad.toLowerCase() === MODALIDAD_ESPECIAL.toLocaleLowerCase()) || null);
    this._escuelasPorSectorAmbitoAdultos.set(escuelasPorSectorAmbitoModalidad?.find(e => e.modalidad.toLowerCase() === MODALIDAD_ADULTOS.toLocaleLowerCase()) || null);
    

  }

}