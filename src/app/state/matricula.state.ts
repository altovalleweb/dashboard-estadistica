import { Injectable, signal, WritableSignal } from '@angular/core';
import { Matricula, MatriculaTotalPorAnioCategorizados, TotalesMatriculaPorModalidad, TotalesMatriculaPorModalidadNivelSerializado } from '../class/matricula';

@Injectable({
  providedIn: 'root'
})
export class MatriculaState {

   private _matricula = new Matricula();

   private _totalMatricula = signal<TotalesMatriculaPorModalidad | null>(null);

   private _matriculaPorAnio = signal<MatriculaTotalPorAnioCategorizados | null>(null);

 private  _matriculaPorModalidadNivel = signal<number[]>([]);

  private  _matriculaPorModalidadNivelComun = signal<TotalesMatriculaPorModalidadNivelSerializado | null>(null);
  private  _matriculaPorModalidadNivelEspecial = signal<TotalesMatriculaPorModalidadNivelSerializado | null>(null);
  private  _matriculaPorModalidadNivelAdultos = signal<TotalesMatriculaPorModalidadNivelSerializado | null>(null);


  get totalMatricula(): WritableSignal<TotalesMatriculaPorModalidad | null> {
         return this._totalMatricula;
     }

  get matriculaPorAnio(): WritableSignal<MatriculaTotalPorAnioCategorizados | null>  {
      return this._matriculaPorAnio;
    }

  set matriculaPorModalidadNivel(value: number[]) {
    this._matriculaPorModalidadNivel.set(value);
  }

  get matriculaPorModalidadNivel(): WritableSignal<number[]> {
    return this._matriculaPorModalidadNivel;
  }


  get matriculaPorModalidadNivelComun(): WritableSignal<TotalesMatriculaPorModalidadNivelSerializado | null> {
      return this._matriculaPorModalidadNivelComun;
    }

    get matriculaPorModalidadNivelEspecial(): WritableSignal<TotalesMatriculaPorModalidadNivelSerializado | null> {
      return this._matriculaPorModalidadNivelEspecial;
    }

    get matriculaPorModalidadNivelAdultos(): WritableSignal<TotalesMatriculaPorModalidadNivelSerializado | null> {
      return this._matriculaPorModalidadNivelAdultos;
    }


  initTotalesMatricula() {
    const totalMatricula = this._matricula.getTotalMatriculaPorModalidad();
    this._totalMatricula.set(totalMatricula);
  }

  initMatriculaPorAnio() {
    const matriculaPorAnio = this._matricula.getTotalMatriculaPorAnio();
    this._matriculaPorAnio.set(matriculaPorAnio);
  }



  initMatriculaPorModalidadNivelComun(niveles: string[] ) {
    const matriculaPorModalidadNivelComun = this._matricula.getTotalMatriculaPorModalidadSerializado('Común', niveles);         
    this._matriculaPorModalidadNivelComun.set(matriculaPorModalidadNivelComun);
  }

  initMatriculaPorModalidadNivelEspecial(niveles: string[] ) {
    const matriculaPorModalidadNivelEspecial = this._matricula.getTotalMatriculaPorModalidadSerializado('Especial', niveles);
    this._matriculaPorModalidadNivelEspecial.set(matriculaPorModalidadNivelEspecial);
  }

  initMatriculaPorModalidadNivelAdultos(niveles: string[] ) {
    const matriculaPorModalidadNivelAdultos = this._matricula.getTotalMatriculaPorModalidadSerializado('Adultos', niveles);
    this._matriculaPorModalidadNivelAdultos.set(matriculaPorModalidadNivelAdultos);
  }
  
  
}
