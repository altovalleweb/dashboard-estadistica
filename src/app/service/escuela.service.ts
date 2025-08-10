import { Injectable } from '@angular/core';
import { EscuelasPorModalidadNivelProvincia, TotalEscuelasPorAnioProvincia } from '../data/escuelas';
import { EscuelasPorRegionModalidadNivel } from '../data/escuelas-region';
import { EscuelasPorDistritoModalidadNivel } from '../data/escuelas-distrito';
import { EscuelasPorDepartamentoModalidadNivel } from '../data/escuelas-departamento';



export interface EscuelaTotalPorAnio {
  anio: number;
  total: number;
}


@Injectable({
  providedIn: 'root'
})

export class EscuelaService {


  getTotalEscuelasPorAnioProvincia(): EscuelaTotalPorAnio[] {
    return TotalEscuelasPorAnioProvincia;
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
