import { Injectable } from '@angular/core';
import { escuelasPorModalidadNivel, total_escuelas_por_anio } from '../data/escuelas';



export interface EscuelaTotalPorAnio {
  anio: number;
  total: number;
}


@Injectable({
  providedIn: 'root'
})

export class EscuelaService {


  getTotalEscuelasPorAnio(): EscuelaTotalPorAnio[] {
    return total_escuelas_por_anio;
  }

  getEscuelasPorModalidadNivel(): any[] {
    return  escuelasPorModalidadNivel
  }
  
}
