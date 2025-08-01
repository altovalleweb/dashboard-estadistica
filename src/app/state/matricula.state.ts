import { Injectable, signal, WritableSignal } from '@angular/core';
import { Matricula, MatriculaTotalPorAnioCategorizados, TotalesMatriculaPorModalidad, TotalesMatriculaPorModalidadNivelSerializado, TotalesMatriculaPorSectorAmbito, TotalesMatriculaPorSectorAmbitoSerializado } from '../class/matricula';
import { MODALIDAD_ADULTOS, MODALIDAD_COMUN, MODALIDAD_ESPECIAL } from '../const/const';

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

  private  _matriculaPorSectorAmbito = signal<TotalesMatriculaPorSectorAmbito | null>(null);
  private  _matriculaPorSector = signal<TotalesMatriculaPorSectorAmbitoSerializado[] | null>(null);
  private  _matriculaPorAmbito  = signal<TotalesMatriculaPorSectorAmbitoSerializado[] | null>(null);


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

  get matriculaPorSectorAmbito(): WritableSignal<TotalesMatriculaPorSectorAmbito | null> {
    return this._matriculaPorSectorAmbito;
  }

  get matriculaPorSector(): WritableSignal<TotalesMatriculaPorSectorAmbitoSerializado[] | null> {
    return this._matriculaPorSector;
  }

  get matriculaPorAmbito(): WritableSignal<TotalesMatriculaPorSectorAmbitoSerializado[] | null> {
    return this._matriculaPorAmbito;
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
    const matriculaPorModalidadNivelComun = this._matricula.getTotalMatriculaPorModalidadSerializado(MODALIDAD_COMUN, niveles);         
    this._matriculaPorModalidadNivelComun.set(matriculaPorModalidadNivelComun);
  }

  initMatriculaPorModalidadNivelEspecial(niveles: string[] ) {
    const matriculaPorModalidadNivelEspecial = this._matricula.getTotalMatriculaPorModalidadSerializado(MODALIDAD_ESPECIAL, niveles);
    this._matriculaPorModalidadNivelEspecial.set(matriculaPorModalidadNivelEspecial);
  }

  initMatriculaPorModalidadNivelAdultos(niveles: string[] ) {
    const matriculaPorModalidadNivelAdultos = this._matricula.getTotalMatriculaPorModalidadSerializado(MODALIDAD_ADULTOS, niveles);
    console.log('matriculaPorModalidadNivelAdultos', matriculaPorModalidadNivelAdultos);
    this._matriculaPorModalidadNivelAdultos.set(matriculaPorModalidadNivelAdultos);
  }

  initMatriculaPorSectorAmbito() {
    const matriculaPorSectorAmbito = this._matricula.getTotalMatriculaPorSectorAmbito();
    this._matriculaPorSectorAmbito.set(matriculaPorSectorAmbito);
  }
  
  initMatriculaPorSector() {
    const matriculaPorSector = this._matricula.getTotalMatriculaPorSectorSerializado();    
    this._matriculaPorSector.set(matriculaPorSector);
  }

  initMatriculaPorAmbito() {
    const matriculaPorAmbito = this._matricula.getTotalMatriculaPorAmbitoSerializado();    
    this._matriculaPorAmbito.set(matriculaPorAmbito);
  }
  
}
