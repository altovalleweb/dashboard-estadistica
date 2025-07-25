
interface AtributoFilter {
    key: string;
    label: string;
}
export const getDataToChartMultipleFilter = (data: any[], atributosFilter: AtributoFilter[], atributoTotal:string): Array<any> => {
    return data.map(item => {
        const result: any = {};
        atributosFilter.forEach(attr => {
            result[attr.key] = item[attr.key];
        });
        result[atributoTotal] = item[atributoTotal];
        return result;
    });
   

    
}

export const getDataToChartByField= (data: any[], field:string): Array<any> => {
    return data.map(item => {
                return item[field]
    });
   

    
}
