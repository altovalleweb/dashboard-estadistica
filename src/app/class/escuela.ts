import { inject } from "@angular/core";
import { EscuelaService } from "../service/escuela.service";
import { getDataToChartByField } from "../utils/function";


export interface EscuelaTotalPorAnioCategorizados {
    data: number[];
    labels: string[];
}


export interface EscuelaTotalPorModalidadNivelCategorizados {
    serie: any[];
    labels: string[];
}

export class Escuela {

    private _es = inject(EscuelaService);


    getTotalEscuelasPorAnio():EscuelaTotalPorAnioCategorizados {

        const data = getDataToChartByField(this._es.getTotalEscuelasPorAnio(), 'total')
        const labels = getDataToChartByField(this._es.getTotalEscuelasPorAnio(), 'anio')
      return   { data, labels } 
    }

    getTotalEscuelasPorModalidadNivel(): EscuelaTotalPorModalidadNivelCategorizados {
     const escuelas =   this._es.getEscuelasPorModalidadNivel();

      // 1. Obtener modalidades únicas
  const modalidades = [...new Set(escuelas.map(item => item.modalidad))];
  
  // 2. Obtener niveles de oferta únicos
  const nivelesOferta = [...new Set(escuelas.map(item => item.nivel_oferta))];
  
  // 3. Crear el array de objetos con name y data
  const datosFormateados = nivelesOferta.map(nivel => {
    // Para cada nivel, obtener los totales por modalidad
    const data = modalidades.map(modalidad => {
      // Buscar el registro que coincida con el nivel y modalidad
      const registro = escuelas.find(item => 
        item.nivel_oferta === nivel && item.modalidad === modalidad
      );
      // Si existe el registro, devolver el total, sino 0
      return registro ? registro.total : 0;
    });
    
    return {
      name: nivel,
      data: data
    };
  });

  return    { serie:datosFormateados, labels:modalidades } ;

    }


}
