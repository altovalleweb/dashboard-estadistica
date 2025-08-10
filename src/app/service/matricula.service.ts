import { Injectable } from '@angular/core';
import { MatriculaPorModalidadNivelProvincia, TotalMatriculaPorAnioProvincia } from '../data/matricula';
import { MatriculaPorRegionModalidadNivel } from '../data/matricula-region';
import { MatriculaPorDistritoModalidadNivel } from '../data/matricula-distrito';
import { MatriculaPorDepartamentoModalidadNivel } from '../data/matricula-departamento';


export interface MatriculaTotalPorAnio {
  anio: number;
  total: number;
}


@Injectable({
  providedIn: 'root'
})
export class MatriculaService {
  

   getTotalMatriculaPorAnioProvincia(): MatriculaTotalPorAnio[] {
      return TotalMatriculaPorAnioProvincia;
    }

    getMatriculaPorModalidadNivelProvincia(): any[] {
      return  MatriculaPorModalidadNivelProvincia;
    }

    getMatriculaPorRegionModalidadNivel(region:string): any[] {
        return  MatriculaPorRegionModalidadNivel.filter(matricula => matricula.region?.toLocaleLowerCase() == region.toLocaleLowerCase());
      }
    getMatriculaPorDepartamentoModalidadNivel(departamento:string): any[] {
        return  MatriculaPorDepartamentoModalidadNivel.filter(matricula => matricula.departamento?.toLocaleLowerCase() === departamento.toLocaleLowerCase());
      }
    getMatriculaPorDistritoModalidadNivel(distrito:string): any[] {
        return  MatriculaPorDistritoModalidadNivel.filter(matricula => matricula.distrito?.toLocaleLowerCase() === distrito.toLocaleLowerCase());
      }

}
