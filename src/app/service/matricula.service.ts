import { Injectable } from '@angular/core';
import { matriculaPorModalidadNivel, total_matricula_por_anio } from '../data/matricula';


export interface MatriculaTotalPorAnio {
  anio: number;
  total: number;
}


@Injectable({
  providedIn: 'root'
})
export class MatriculaService {
  



   getTotalMatriculaPorAnio(): MatriculaTotalPorAnio[] {
      return total_matricula_por_anio;
    }
  
    getMatriculaPorModalidadNivel(): any[] {
      return  matriculaPorModalidadNivel
    }
}
