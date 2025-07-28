import { Injectable, signal, WritableSignal } from '@angular/core';
import { Escuela, EscuelaTotalPorAnioCategorizados, EscuelaTotalPorModalidadNivelCategorizados } from '../class/escuela';

@Injectable({
  providedIn: 'root'
})
export class EscuelaState {

  private _escuela = new Escuela();

 private _totalEscuelaUltimoAnio = signal<number | null>(null);
 private _escuelaPorAnio = signal<EscuelaTotalPorAnioCategorizados | null>(null);
 private  _escuelaPorModalidadNivel = signal<EscuelaTotalPorModalidadNivelCategorizados | null>(null);


  

    get totalEscuelaUltimoAnio(): WritableSignal<number | null> {
        return this._totalEscuelaUltimoAnio;
    }

  get escuelaPorAnio(): WritableSignal<EscuelaTotalPorAnioCategorizados | null>  {
    return this._escuelaPorAnio;
  }

  

  get escuelaPorModalidadNivel(): WritableSignal<EscuelaTotalPorModalidadNivelCategorizados | null> {
    return this._escuelaPorModalidadNivel;
  }


  initEscuelaPorAnio() {        
    const escuelaPorAnio = this._escuela.getTotalEscuelasPorAnio();
    this._escuelaPorAnio.set( escuelaPorAnio );
    this._totalEscuelaUltimoAnio.set(escuelaPorAnio.data[escuelaPorAnio.data.length - 1] || null);
  }

  initEscuelaPorModalidadNivel() {
    const escuelaPorModalidadNivel = this._escuela.getTotalEscuelasPorModalidadNivel();
    this._escuelaPorModalidadNivel.set(escuelaPorModalidadNivel);

   
  }


  
  
  
}