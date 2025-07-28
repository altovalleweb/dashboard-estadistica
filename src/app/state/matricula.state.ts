import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatriculaState {

  private _matriculaPorAnio = signal<number[]>([]);
 private  _matriculaPorModalidadNivel = signal<number[]>([]);


 set matriculaPorAnio(value: number[]) {
    this._matriculaPorAnio.set(value);
  }

  get matriculaPorAnio(): WritableSignal<number[]>  {
    return this._matriculaPorAnio;
  }

  set matriculaPorModalidadNivel(value: number[]) {
    this._matriculaPorModalidadNivel.set(value);
  }

  get matriculaPorModalidadNivel(): WritableSignal<number[]> {
    return this._matriculaPorModalidadNivel;
  }


  
  
  
}
