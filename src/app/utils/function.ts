import { CAMPO_ESTATAL, CAMPO_MODALIDAD, CAMPO_PRIVADO, CAMPO_RURAL, CAMPO_TOTAL, CAMPO_URBANO, MODALIDAD_ADULTOS, MODALIDAD_COMUN, MODALIDAD_ESPECIAL } from "../const/const";

export const getDataToChartByField= (data: any[], field:string): Array<any> => {
    return data.map(item => {
                return item[field]
    });
       
}



const getAccumulatedValueByField= (data: any[], field:string, valueField:string, accField:string): number => {

    return data.reduce((acc, item) => {
        if (item[field.toLowerCase()].toLowerCase()== valueField.toLowerCase()) {
            return acc + item[accField.toLowerCase()];
        }
        return acc;
    }, 0);

}

const getAccumulatedValue= (data: any[], accField:string): number => {

    return data.reduce((acc, item) => {
                 return acc + item[accField.toLowerCase()];                
    }, 0);

}

export const getSerializedValues= (data: any[], 
    fieldLevel1:string, 
    valuesFieldLevel1:string[],
    fieldLevel2:string, 
    valuesFieldLevel2:string[],
    totalField:string
    ): number[] => {

    const dataSeries = valuesFieldLevel1.flatMap(value1 => {
    const serie = valuesFieldLevel2.map(value2 => {
      const match = data.find(
        item => item[fieldLevel1.toLowerCase()].toLowerCase() === value1.toLowerCase() && item[fieldLevel2.toLowerCase()].toLowerCase() === value2.toLowerCase()
      );
      return match ? match[totalField.toLowerCase()] : 0;
    });

    return serie;
    
  });
       
 
  return dataSeries;
}


export const getTotalesGeneralPorModalidad= (data: any[]    
    ): any => {
 if (!data || data.length === 0) {
            return null;
        }

        const comun = getAccumulatedValueByField(data, CAMPO_MODALIDAD, MODALIDAD_COMUN, CAMPO_TOTAL);
        const especial = getAccumulatedValueByField(data, CAMPO_MODALIDAD, MODALIDAD_ESPECIAL, CAMPO_TOTAL);
        const adultos = getAccumulatedValueByField(data, CAMPO_MODALIDAD, MODALIDAD_ADULTOS, CAMPO_TOTAL);

        const total = comun + especial + adultos;

        return {
            total,
            comun,
            porcentajeComun: total ? +((comun / total) * 100).toFixed(1) : null,
            especial,
            porcentajeEspecial: total ? +((especial / total) * 100).toFixed(1) : null,
            adultos,
            porcentajeAdultos: total ? +((adultos / total) * 100).toFixed(1) : null
        };
}



export const getTotalesGeneralPorSectorAmbito= (data: any[]    
    ): any => {
 if (!data || data.length === 0) {
            return null;
        }

        const estatal = getAccumulatedValue(data, CAMPO_ESTATAL );
        const privado = getAccumulatedValue(data, CAMPO_PRIVADO);
        const rural = getAccumulatedValue(data, CAMPO_RURAL);
        const urbano = getAccumulatedValue(data, CAMPO_URBANO);

        const totalSector = estatal + privado ;
        const totalAmbito = rural + urbano;

        return {
            estatal,
            porcentajeEstatal: totalSector ? +((estatal / totalSector) * 100).toFixed(1) : null,
            privado,
            porcentajePrivado: totalSector ? +((privado / totalSector) * 100).toFixed(1) : null,
            rural,
            porcentajeRural: totalAmbito ? +((rural / totalAmbito) * 100).toFixed(1) : null,
            urbano,
            porcentajeUrbano: totalAmbito ? +((urbano / totalAmbito) * 100).toFixed(1) : null
        };
}


