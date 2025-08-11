import { computed, Injectable, signal } from '@angular/core';
import { Matricula, MatriculaTotalPorAnioCategorizados, TotalesMatriculaPorModalidad, TotalesMatriculaPorModalidadNivelSerializado, TotalesMatriculaPorSectorAmbito, TotalesMatriculaPorSectorAmbitoModalidad } from '../class/matricula';
import { MODALIDAD_ADULTOS, MODALIDAD_COMUN, MODALIDAD_ESPECIAL, NIVELES_ADULTOS, NIVELES_COMUN_CON_APERTURA, NIVELES_ESPECIAL } from '../const/const';


@Injectable({
  providedIn: 'root'
})
export class MatriculaState {

   private _matricula = new Matricula();

   private readonly _totalMatricula = signal<TotalesMatriculaPorModalidad | null>(null);

   private readonly _matriculaPorAnio = signal<MatriculaTotalPorAnioCategorizados | null>(null);



  private readonly _matriculaPorModalidadNivelComun = signal<TotalesMatriculaPorModalidadNivelSerializado | null>(null);
  private readonly _matriculaPorModalidadNivelEspecial = signal<TotalesMatriculaPorModalidadNivelSerializado | null>(null);
  private readonly _matriculaPorModalidadNivelAdultos = signal<TotalesMatriculaPorModalidadNivelSerializado | null>(null);

  private readonly _matriculaPorSectorAmbito = signal<TotalesMatriculaPorSectorAmbito | null>(null);
  
  private readonly _matriculaPorSectorAmbitoModalidadComun = signal<TotalesMatriculaPorSectorAmbitoModalidad | null>(null);
  private readonly _matriculaPorSectorAmbitoModalidadEspecial = signal<TotalesMatriculaPorSectorAmbitoModalidad | null>(null);
  private readonly _matriculaPorSectorAmbitoModalidadAdultos = signal<TotalesMatriculaPorSectorAmbitoModalidad | null>(null);

  readonly totalMatricula = computed(() => this._totalMatricula());
  readonly matriculaPorAnio = computed(() => this._matriculaPorAnio());

  readonly matriculaPorModalidadNivelComun = computed(() => this._matriculaPorModalidadNivelComun());
  readonly matriculaPorModalidadNivelEspecial = computed(() => this._matriculaPorModalidadNivelEspecial());
  readonly matriculaPorModalidadNivelAdultos = computed(() => this._matriculaPorModalidadNivelAdultos());
  
  
  readonly matriculaPorSectorAmbito = computed(() => this._matriculaPorSectorAmbito());
  readonly matriculaPorSectorAmbitoModalidadComun = computed(() => this._matriculaPorSectorAmbitoModalidadComun());
  readonly matriculaPorSectorAmbitoModalidadEspecial = computed(() => this._matriculaPorSectorAmbitoModalidadEspecial());
  readonly matriculaPorSectorAmbitoModalidadAdultos = computed(() => this._matriculaPorSectorAmbitoModalidadAdultos());


  loadData(matriculaData: any[], matriculasPorAnioData: any[]) {
    this._matricula.setMatriculaData(matriculaData)
    this._matricula.setTotalMatriculaPorAnioData(matriculasPorAnioData);

    this.loadTotalesMatricula();
    this.loadMatriculaPorAnio();
    this.loadMatriculaPorModalidadNivelComun();
    this.loadMatriculaPorModalidadNivelEspecial();
    this.loadMatriculaPorModalidadNivelAdultos();
    this.loadMatriculaPorSectorAmbito();
    this.loadMatriculaPorSectorAmbitoModalidad();
  }


  loadTotalesMatricula() {
    const totalMatricula = this._matricula.getTotalMatriculaPorModalidad();
    this._totalMatricula.set(totalMatricula);
  }

  loadMatriculaPorAnio() {
    const matriculaPorAnio = this._matricula.getTotalMatriculaPorAnio();
    this._matriculaPorAnio.set(matriculaPorAnio);
  }



  loadMatriculaPorModalidadNivelComun() {
    const matriculaPorModalidadNivelComun = this._matricula.getTotalMatriculaPorModalidadSerializado(MODALIDAD_COMUN, NIVELES_COMUN_CON_APERTURA);         
    this._matriculaPorModalidadNivelComun.set(matriculaPorModalidadNivelComun);
  }

  loadMatriculaPorModalidadNivelEspecial() {
    const matriculaPorModalidadNivelEspecial = this._matricula.getTotalMatriculaPorModalidadSerializado(MODALIDAD_ESPECIAL, NIVELES_ESPECIAL);
    this._matriculaPorModalidadNivelEspecial.set(matriculaPorModalidadNivelEspecial);
  }

  loadMatriculaPorModalidadNivelAdultos() {
    const matriculaPorModalidadNivelAdultos = this._matricula.getTotalMatriculaPorModalidadSerializado(MODALIDAD_ADULTOS, NIVELES_ADULTOS);   
    this._matriculaPorModalidadNivelAdultos.set(matriculaPorModalidadNivelAdultos);
  }

  loadMatriculaPorSectorAmbito() {
    const matriculaPorSectorAmbito = this._matricula.getTotalMatriculaPorSectorAmbito();
    this._matriculaPorSectorAmbito.set(matriculaPorSectorAmbito);
  }

  loadMatriculaPorSectorAmbitoModalidad() {
    const matriculaPorSectorAmbitoModalidad = this._matricula.getTotalMatriculaPorSectorAmbitoModalidad();    

    this._matriculaPorSectorAmbitoModalidadComun.set(matriculaPorSectorAmbitoModalidad?.find(e => e.modalidad.toLowerCase() === MODALIDAD_COMUN.toLocaleLowerCase()) || null);
    this._matriculaPorSectorAmbitoModalidadEspecial.set(matriculaPorSectorAmbitoModalidad?.find(e => e.modalidad.toLowerCase() === MODALIDAD_ESPECIAL.toLocaleLowerCase()) || null);
    this._matriculaPorSectorAmbitoModalidadAdultos.set(matriculaPorSectorAmbitoModalidad?.find(e => e.modalidad.toLowerCase() === MODALIDAD_ADULTOS.toLocaleLowerCase()) || null);

  }
 

 }
