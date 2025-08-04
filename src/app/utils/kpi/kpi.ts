import { Component, input } from '@angular/core';
import { EscuelaMatriculaPorSectorAmbitoModalidadNivel } from '../../class/escuela-matricula';
import { ICONOS_NIVELES } from '../../const/const';

@Component({
  selector: 'app-kpi',
  imports: [],
  templateUrl: './kpi.html',
  styleUrl: './kpi.css'
})
export class Kpi {
      data = input<EscuelaMatriculaPorSectorAmbitoModalidadNivel[] | null>(null);

      iconos = ICONOS_NIVELES;

  }


