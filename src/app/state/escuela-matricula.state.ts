import { Injectable, signal } from '@angular/core';
import { EscuelaMatricula, EscuelaMatriculaPorSectorAmbitoModalidadNivel } from '../class/escuela-matricula';
import { MODALIDAD_ADULTOS, MODALIDAD_COMUN, MODALIDAD_ESPECIAL } from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class EscuelaMatriculaState {
  private _matricula = new EscuelaMatricula();

private _escuelasMatriculasPorSectorAmbitoModalidadNivelComun = signal<EscuelaMatriculaPorSectorAmbitoModalidadNivel[] | null>(null);
private _escuelasMatriculasPorSectorAmbitoModalidadNivelEspecial = signal<EscuelaMatriculaPorSectorAmbitoModalidadNivel[] | null>(null);
private _escuelasMatriculasPorSectorAmbitoModalidadNivelAdultos = signal<EscuelaMatriculaPorSectorAmbitoModalidadNivel[] | null>(null);

  get escuelasMatriculasPorSectorAmbitoModalidadNivelComun() {
    return this._escuelasMatriculasPorSectorAmbitoModalidadNivelComun;
  }

  get escuelasMatriculasPorSectorAmbitoModalidadNivelEspecial() {
    return this._escuelasMatriculasPorSectorAmbitoModalidadNivelEspecial;
  }

  get escuelasMatriculasPorSectorAmbitoModalidadNivelAdultos() {
    return this._escuelasMatriculasPorSectorAmbitoModalidadNivelAdultos;
  }

  initEscuelasMatriculasPorSectorAmbitoModalidadNivelComun( niveles: string[]) {
    const data = this._matricula.getEscuelasMatriculasPorSectorAmbitoModalidadNivel(MODALIDAD_COMUN, niveles);
    this._escuelasMatriculasPorSectorAmbitoModalidadNivelComun.set(data);
  }

  initEscuelasMatriculasPorSectorAmbitoModalidadNivelEspecial(niveles: string[]) {
    const data = this._matricula.getEscuelasMatriculasPorSectorAmbitoModalidadNivel(MODALIDAD_ESPECIAL, niveles);
    this._escuelasMatriculasPorSectorAmbitoModalidadNivelEspecial.set(data);
  }

  initEscuelasMatriculasPorSectorAmbitoModalidadNivelAdultos(niveles: string[]) {
    const data = this._matricula.getEscuelasMatriculasPorSectorAmbitoModalidadNivel(MODALIDAD_ADULTOS, niveles);
    this._escuelasMatriculasPorSectorAmbitoModalidadNivelAdultos.set(data);
  }

}
