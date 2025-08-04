import { Injectable, signal } from '@angular/core';
import { EscuelaMatricula, EscuelaMatriculaPorSectorAmbitoModalidadNivel } from '../class/escuela-matricula';
import { MODALIDAD_COMUN } from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class EscuelaMatriculaState {
  private _matricula = new EscuelaMatricula();

private _escuelasMatriculasPorSectorAmbitoModalidadNivelComun = signal<EscuelaMatriculaPorSectorAmbitoModalidadNivel[] | null>(null);


  get escuelasMatriculasPorSectorAmbitoModalidadNivelComun() {
    return this._escuelasMatriculasPorSectorAmbitoModalidadNivelComun;
  }

  

  initEscuelasMatriculasPorSectorAmbitoModalidadNivelComun( niveles: string[]) {
    const data = this._matricula.getEscuelasMatriculasPorSectorAmbitoModalidadNivel(MODALIDAD_COMUN, niveles);
    this._escuelasMatriculasPorSectorAmbitoModalidadNivelComun.set(data);
  }


}
