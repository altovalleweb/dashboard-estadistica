import { Injectable } from '@angular/core';
import { EscuelasPorModalidadNivelProvincia, TotalEscuelasPorAnioProvincia } from '../data/escuelas';
import { EscuelasPorRegionModalidadNivel, TotalEscuelasPorAnioRegion } from '../data/escuelas-region';
import { EscuelasPorDistritoModalidadNivel, TotalEscuelasPorAnioDistrito } from '../data/escuelas-distrito';
import { EscuelasPorDepartamentoModalidadNivel, TotalEscuelasPorAnioDepartamento } from '../data/escuelas-departamento';



export interface EscuelaTotalPorAnio {
  anio: string;
  total: number;
}


@Injectable({
  providedIn: 'root'
})

export class EscuelaService {


  getTotalEscuelasPorAnioProvincia(): EscuelaTotalPorAnio[] {
    return TotalEscuelasPorAnioProvincia;
  }
  getTotalEscuelasPorAnioRegion(region:string): EscuelaTotalPorAnio[] {
    return TotalEscuelasPorAnioRegion.filter(escuela => escuela.region?.toLocaleLowerCase() == region.toLocaleLowerCase());
  }

  getTotalEscuelasPorAnioDepartamento(departamento:string): EscuelaTotalPorAnio[] {
    return TotalEscuelasPorAnioDepartamento.filter(escuela => escuela.departamento?.toLocaleLowerCase() === departamento.toLocaleLowerCase());
  }

  getTotalEscuelasPorAnioDistrito(distrito:string): EscuelaTotalPorAnio[] {
    return TotalEscuelasPorAnioDistrito.filter(escuela => escuela.distrito?.toLocaleLowerCase() === distrito.toLocaleLowerCase());
  }


  getEscuelasPorModalidadNivelProvincia(): any[] {
    return  EscuelasPorModalidadNivelProvincia;
  }

  getEscuelasPorRegionModalidadNivel(region:string): any[] {
    return  EscuelasPorRegionModalidadNivel.filter(escuela => escuela.region?.toLocaleLowerCase() == region.toLocaleLowerCase());
  }

  getEscuelasPorDepartamentoModalidadNivel(departamento:string): any[] {
    return  EscuelasPorDepartamentoModalidadNivel.filter(escuela => escuela.departamento?.toLocaleLowerCase() === departamento.toLocaleLowerCase());
  }

  getEscuelasPorDistritoModalidadNivel(distrito:string): any[] {
    return  EscuelasPorDistritoModalidadNivel.filter(escuela => escuela.distrito?.toLocaleLowerCase() === distrito.toLocaleLowerCase());
  }
  

  
}
