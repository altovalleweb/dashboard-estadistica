import { Injectable } from '@angular/core';
import { MatriculaPorModalidadNivelProvincia, TotalMatriculaPorAnioProvincia } from '../data/matricula';
import { MatriculaPorRegionModalidadNivel, TotalMatriculaPorAnioRegion } from '../data/matricula-region';
import { MatriculaPorDistritoModalidadNivel, TotalMatriculaPorAnioDistrito } from '../data/matricula-distrito';
import { MatriculaPorDepartamentoModalidadNivel, TotalMatriculaPorAnioDepartamento } from '../data/matricula-departamento';


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

    getTotalMatriculaPorAnioRegion(region:string): MatriculaTotalPorAnio[] {
      return TotalMatriculaPorAnioRegion.filter(matricula => matricula.region?.toLocaleLowerCase() == region.toLocaleLowerCase());
    }

    getTotalMatriculaPorAnioDistrito(distrito:string): MatriculaTotalPorAnio[] {
      return TotalMatriculaPorAnioDistrito.filter(matricula => matricula.distrito?.toLocaleLowerCase() == distrito.toLocaleLowerCase());
    }

    getTotalMatriculaPorAnioDepartamento(departamento:string): MatriculaTotalPorAnio[] {
      return TotalMatriculaPorAnioDepartamento.filter(matricula => matricula.departamento?.toLocaleLowerCase() == departamento.toLocaleLowerCase());
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
