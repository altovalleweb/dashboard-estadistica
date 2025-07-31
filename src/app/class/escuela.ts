import { inject } from "@angular/core";
import { EscuelaService } from "../service/escuela.service";
import {  getDataToChartByField, getSerializedValues,  getTotalesGeneralPorModalidad, getTotalesGeneralPorSectorAmbito } from "../utils/function";
import { CAMPO_ANIO, CAMPO_ESTATAL, CAMPO_MODALIDAD, CAMPO_NIVEL_OFERTA, CAMPO_PRIVADO, CAMPO_TOTAL, MODALIDAD_COMUN, MODALIDADES,  NIVELESPORMODALIDADESCUELAS } from "../const/const";


export interface EscuelaTotalPorAnioCategorizados {
    data: number[];
    labels: string[];
}

export interface TotalesEscuelasPorModalidad{
  total: number;
  comun: number | null;
  porcentajeComun: number | null;
  especial: number | null;
  porcentajeEspecial: number | null;
  adultos: number | null;
  porcentajeAdultos: number | null;
}


export interface TotalesEscuelasPorModalidadNivelSerializado{
  modalidad: string;
  serie:number[];  
}


export interface EscuelaTotalPorModalidadNivelCategorizados {
    serie: any[];
    labels: string[];
}


export interface TotalesEscuelasPorSectorAmbitoSerializado {
  name: string;
  data: number[];
}

export interface TotalesEscuelasPorSectorAmbito{ 
  estatal: number | null;
  porcentajeEstatal: number | null;
  privado: number | null;
  porcentajePrivado: number | null;
  rural: number | null;
  porcentajeRural: number | null;
  urbano: number | null;
  porcentajeUrbano: number | null;
}


export class Escuela {

    private _es = inject(EscuelaService);


    getTotalEscuelasPorAnio():EscuelaTotalPorAnioCategorizados {

        const data = getDataToChartByField(this._es.getTotalEscuelasPorAnio(), CAMPO_TOTAL);
        const labels = getDataToChartByField(this._es.getTotalEscuelasPorAnio(), CAMPO_ANIO)
      return   { data, labels } 
    }

    getTotalEscuelasPorModalidad(): TotalesEscuelasPorModalidad | null {

        const escuelas =   this._es.getEscuelasPorModalidadNivel();
 
        return getTotalesGeneralPorModalidad(escuelas);
      
    }

    getTotalEscuelasPorSectorAmbito(): TotalesEscuelasPorSectorAmbito | null {

        const escuelas =   this._es.getEscuelasPorModalidadNivel();
 
        
        return getTotalesGeneralPorSectorAmbito(escuelas);
        
      
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

    getTotalEscuelasPorModalidadSerializado( modalidad:string, niveles:string[]  ):TotalesEscuelasPorModalidadNivelSerializado{
      const values = getSerializedValues(this._es.getEscuelasPorModalidadNivel(), CAMPO_MODALIDAD, [modalidad], CAMPO_NIVEL_OFERTA, niveles, CAMPO_TOTAL);    
    
      return {
        modalidad,
        serie: values
      };
    }

    /**
     * Obtiene los totales de escuelas por sector (Estatal y Privada) serializado.
     * Segun el orden de las modalidades y niveles definidos en MODALIDADES y NIVELESPORMODALIDADESCUELAS.
     * @returns Un array de objetos con el nombre del sector y los datos correspondientes.
     */

    getTotalEscuelasPorSectorSerializado(   ):TotalesEscuelasPorSectorAmbitoSerializado[]{

      let valuesEstatal: number[] = [];
      let valuesPrivada: number[] = [];
      
          MODALIDADES.forEach(modalidad => {
      
            valuesEstatal = valuesEstatal.concat(
              getSerializedValues(this._es.getEscuelasPorModalidadNivel(), CAMPO_MODALIDAD,
               [modalidad], CAMPO_NIVEL_OFERTA, NIVELESPORMODALIDADESCUELAS[modalidad], CAMPO_ESTATAL)
            );

            valuesPrivada = valuesPrivada.concat(
              getSerializedValues(this._es.getEscuelasPorModalidadNivel(), CAMPO_MODALIDAD,
                [modalidad], CAMPO_NIVEL_OFERTA, NIVELESPORMODALIDADESCUELAS[modalidad], CAMPO_PRIVADO)
            );
          });


       
      return [
        {
          name: CAMPO_ESTATAL,
          data: valuesEstatal
        },
        {
          name: CAMPO_PRIVADO,
          data: valuesPrivada
        }
      ];
    }


}
