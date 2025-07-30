import { inject } from '@angular/core';
import { MatriculaService } from '../service/matricula.service';
import {
  getDataToChartByField,
  getSerializedValues,
  getTotalesGeneralyPorModalidad,
} from '../utils/function';

export interface MatriculaTotalPorAnioCategorizados {
  data: number[];
  labels: string[];
}

export interface TotalesMatriculaPorModalidad {
  total: number;
  comun: number | null;
  porcentajeComun: number | null;
  especial: number | null;
  porcentajeEspecial: number | null;
  adultos: number | null;
  porcentajeAdultos: number | null;
}


export interface TotalesMatriculaPorModalidadNivelSerializado{
  modalidad: string;
  serie:number[];  
}

export class Matricula {
  private _es = inject(MatriculaService);

  getTotalMatriculaPorAnio(): MatriculaTotalPorAnioCategorizados {
    const data = getDataToChartByField(
      this._es.getTotalMatriculaPorAnio(),
      'total'
    );
    const labels = getDataToChartByField(
      this._es.getTotalMatriculaPorAnio(),
      'anio'
    );

   
    return { data, labels };
  }

  getTotalMatriculaPorModalidad(): TotalesMatriculaPorModalidad | null {
    const matricula = this._es.getMatriculaPorModalidadNivel();

    return getTotalesGeneralyPorModalidad(matricula);
  }


    getTotalMatriculaPorModalidadSerializado( modalidad:string, niveles:string[]  ):TotalesMatriculaPorModalidadNivelSerializado{
        const values = getSerializedValues(this._es.getMatriculaPorModalidadNivel(), 'modalidad', [modalidad], 'nivel_oferta', niveles);    
      
        return {
          modalidad,
          serie: values
        };
      }

}
