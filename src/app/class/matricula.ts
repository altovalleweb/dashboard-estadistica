import { inject } from '@angular/core';
import { MatriculaService } from '../service/matricula.service';
import {
  getDataToChartByField,
  getSerializedValues,
  getTotalesGeneralPorModalidad,
  getTotalesGeneralPorSectorAmbito,
} from '../utils/function';
import { CAMPO_ANIO, CAMPO_ESTATAL, CAMPO_MODALIDAD, CAMPO_NIVEL_OFERTA, CAMPO_PRIVADO, CAMPO_RURAL, CAMPO_TOTAL, CAMPO_URBANO, MODALIDADES, NIVELESPORMODALIDADMATRICULA } from '../const/const';

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

export interface TotalesMatriculaPorSectorAmbitoSerializado {
  name: string;
  data: number[];
}

export interface TotalesMatriculaPorSectorAmbito {
  estatal: number | null;
  porcentajeEstatal: number | null;
  privado: number | null;
  porcentajePrivado: number | null;
  rural: number | null;
  porcentajeRural: number | null;
  urbano: number | null;
  porcentajeUrbano: number | null;
}

export interface TotalesMatriculaPorSectorAmbitoModalidad extends TotalesMatriculaPorSectorAmbito {
  modalidad: string;
}

export class Matricula {
  private _es = inject(MatriculaService);

  getTotalMatriculaPorAnio(): MatriculaTotalPorAnioCategorizados {
    const data = getDataToChartByField(
      this._es.getTotalMatriculaPorAnio(),
      CAMPO_TOTAL
    );
    const labels = getDataToChartByField(
      this._es.getTotalMatriculaPorAnio(),
      CAMPO_ANIO
    );

   
    return { data, labels };
  }

  getTotalMatriculaPorModalidad(): TotalesMatriculaPorModalidad | null {
    const matricula = this._es.getMatriculaPorModalidadNivel();

    return getTotalesGeneralPorModalidad(matricula);
  }

  
      /**
       * Obtiene los totales generales de matricula por sector y ambito con los porcentajes respectivos.
       * @returns Un objeto TotalesMatriculaPorSectorAmbito.
       */
   getTotalMatriculaPorSectorAmbito(): TotalesMatriculaPorSectorAmbito | null {

          const matricula =   this._es.getMatriculaPorModalidadNivel();
            
          return getTotalesGeneralPorSectorAmbito(matricula);          
        
      }

      /**
       * Obtiene los totales de matricula por sector (Estatal y Privada) y ambito (Rural y Urbano) para cada una de las modalidades.
       * @returns Un objeto TotalesMatriculaPorSectorAmbitoModalidad[].
       */

      getTotalMatriculaPorSectorAmbitoModalidad(): TotalesMatriculaPorSectorAmbitoModalidad[]   {

          let result: TotalesMatriculaPorSectorAmbitoModalidad[] = [];
          MODALIDADES.forEach(modalidad => { 
             let matricula =   this._es.getMatriculaPorModalidadNivel().filter(e => e.modalidad.toLowerCase() === modalidad.toLocaleLowerCase());
              
             const totalesMatricula = getTotalesGeneralPorSectorAmbito(matricula);

             result.push({
                ...totalesMatricula,
                modalidad
             });
          })
          

             
          return result;
             

          }
  


    getTotalMatriculaPorModalidadSerializado( modalidad:string, niveles:string[]  ):TotalesMatriculaPorModalidadNivelSerializado{
 
        const values = getSerializedValues(this._es.getMatriculaPorModalidadNivel(), CAMPO_MODALIDAD, [modalidad], CAMPO_NIVEL_OFERTA, niveles, CAMPO_TOTAL);    
      
        return {
          modalidad,
          serie: values
        };
      }


       /**
           * Obtiene los totales de matricula por sector (Estatal y Privada) serializado.
           * Segun el orden de las modalidades y niveles definidos en MODALIDADES y NIVELESPORMODALIDADMATRICULA.
           * @returns Un array de objetos con el nombre del sector y los datos correspondientes.
           */

          getTotalMatriculaPorSectorSerializado(   ):TotalesMatriculaPorSectorAmbitoSerializado[]{

            let valuesEstatal: number[] = [];
            let valuesPrivada: number[] = [];
            
                MODALIDADES.forEach(modalidad => {
            
                  valuesEstatal = valuesEstatal.concat(
                    getSerializedValues(this._es.getMatriculaPorModalidadNivel(), CAMPO_MODALIDAD,
                     [modalidad], CAMPO_NIVEL_OFERTA, NIVELESPORMODALIDADMATRICULA[modalidad], CAMPO_ESTATAL)
                  );
      
                  valuesPrivada = valuesPrivada.concat(
                    getSerializedValues(this._es.getMatriculaPorModalidadNivel(), CAMPO_MODALIDAD,
                      [modalidad], CAMPO_NIVEL_OFERTA, NIVELESPORMODALIDADMATRICULA[modalidad], CAMPO_PRIVADO)
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


          /**
           * Obtiene los totales de matricula por ambito (Rural y Urbano) serializado.
           * Segun el orden de las modalidades y niveles definidos en MODALIDADES y NIVELESPORMODALIDADMATRICULA.
           * @returns Un array de objetos con el nombre del ambito y los datos correspondientes.
           */


          getTotalMatriculaPorAmbitoSerializado(   ):TotalesMatriculaPorSectorAmbitoSerializado[]{

            let valuesRural: number[] = [];
            let valuesUrbano: number[] = [];
            
                MODALIDADES.forEach(modalidad => {
            
                  valuesRural = valuesRural.concat(
                    getSerializedValues(this._es.getMatriculaPorModalidadNivel(), CAMPO_MODALIDAD,
                     [modalidad], CAMPO_NIVEL_OFERTA, NIVELESPORMODALIDADMATRICULA[modalidad], CAMPO_RURAL)
                  );

                  valuesUrbano = valuesUrbano.concat(
                    getSerializedValues(this._es.getMatriculaPorModalidadNivel(), CAMPO_MODALIDAD,
                      [modalidad], CAMPO_NIVEL_OFERTA, NIVELESPORMODALIDADMATRICULA[modalidad], CAMPO_URBANO)
                  );
                });
      
      
             
            return [
              {
                name: CAMPO_RURAL,
                data: valuesRural
              },
              {
                name: CAMPO_URBANO,
                data: valuesUrbano
              }
            ];
          }

}
