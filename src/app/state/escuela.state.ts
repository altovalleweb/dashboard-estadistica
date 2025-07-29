import { Injectable, signal, WritableSignal } from '@angular/core';
import { Escuela, EscuelaTotalPorAnioCategorizados, EscuelaTotalPorModalidadNivelCategorizados, TotalesEscuelasPorModalidad, TotalesEscuelasPorModalidadNivelSerializado } from '../class/escuela';



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

  


  get escuelaPorModalidadNivel(): WritableSignal<EscuelaTotalPorModalidadNivelCategorizados | null> {
    return this._escuelaPorModalidadNivel;
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
    const escuelaPorModalidadNivelComun = this._escuela.getTotalEscuelasPorModalidadSerializado('Común', niveles);         
    this._escuelaPorModalidadNivelComun.set(escuelaPorModalidadNivelComun);
  }

  initEscuelaPorModalidadNivelEspecial(niveles: string[] ) {
    const escuelaPorModalidadNivelEspecial = this._escuela.getTotalEscuelasPorModalidadSerializado('Especial', niveles);
    this._escuelaPorModalidadNivelEspecial.set(escuelaPorModalidadNivelEspecial);
  }

  initEscuelaPorModalidadNivelAdultos(niveles: string[] ) {
    const escuelaPorModalidadNivelAdultos = this._escuela.getTotalEscuelasPorModalidadSerializado('Adultos', niveles);
    this._escuelaPorModalidadNivelAdultos.set(escuelaPorModalidadNivelAdultos);
  }

  initEscuelaPorModalidadNivel() {
    const escuelaPorModalidadNivel = this._escuela.getTotalEscuelasPorModalidadNivel();
    this._escuelaPorModalidadNivel.set(escuelaPorModalidadNivel);  
  }


  
  
  
}