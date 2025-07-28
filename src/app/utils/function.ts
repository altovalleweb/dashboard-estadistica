
export const getDataToChartByField= (data: any[], field:string): Array<any> => {
    return data.map(item => {
                return item[field]
    });
   

    
}
