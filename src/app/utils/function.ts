
export const getDataToChartByField= (data: any[], field:string): Array<any> => {
    return data.map(item => {
                return item[field]
    });
       
}



export const getAccumulatedValueByField= (data: any[], field:string, valueField:string, accField:string): number => {
    return data.reduce((acc, item) => {
        if (item[field]== valueField) {
            return acc + item[accField];
        }
        return acc;
    }, 0);
}



export const getSerializedValues= (data: any[], 
    fieldLevel1:string, 
    valuesFieldLevel1:string[],
    fieldLevel2:string, 
    valuesFieldLevel2:string[],
    ): number[] => {

    const dataSeries = valuesFieldLevel1.flatMap(value1 => {
    const serie = valuesFieldLevel2.map(value2 => {
      const match = data.find(
        item => item[fieldLevel1] === value1 && item[fieldLevel2] === value2
      );
      return match ? match.total : 0;
    });

    return serie;
    
  });
       
 
  return dataSeries;
}


