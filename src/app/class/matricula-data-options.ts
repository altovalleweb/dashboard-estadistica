import { getDataToChartByField } from "../utils/function";
import { total_matricula_por_anio } from "../data/matricula";


export class MatriculaDataOption { 

  getMatriculaPorModalidadNivelTotalProvinciaDataOptions() {
  
      return{    series: [{
          name: 'Inicial',
          data: [23259,251,0]
        }, {
          name: 'Primaria',
          data: [83229, 788, 2656]
        }, {
          name: 'Secundaria',
          data: [ 61.297, 0,  11965]
        }, {
          name: 'SNU',
          data: [ 20999, 0, 0]
        }, {
          name: 'Formación Profesional',
          data: [0, 0,  20888]
        }],
          chart: {
          type: 'bar',
          height: 160,
          stacked: true,
          stackType: '100%',
           toolbar: {
      show: false
    },
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },       
        xaxis: {
          categories: ["Común", "Especial", "Adultos"],
          
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    labels: {
      show: false
    },
    lines: {
      show: false
    }
 
        },
        tooltip: {
          y: {
            formatter: function (val:string) {
              return val 
            }
          }
        },
        fill: {
          opacity: 1
        
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 1
        },
         dataLabels: {
    style: {
      fontSize: '13px',
    }
  } } 
}

 getMatriculaPorModalidadNivelSectorTotalProvinciaDataOptions(series:any[], categories:string[]) {
           return {
           series: series,
          chart: {
          type: 'bar',
          height: 300,
           stacked: true,
           stackType: '100%',
            toolbar: {
      show: false
    },
        },
         plotOptions: {
          bar: {            
            dataLabels: {            
              total: {
                enabled: true,
                formatter: (val:any) => {
                  return val
                },
                offsetX: 0,
                style: {
                  fontSize: '12px',
                  fontWeight: 700
                }
              },          
            }
          },
        },
        xaxis: {
          type: 'category',
          categories: categories,
          group: {
            style: {
              fontSize: '12px',
              fontWeight: 900
            },
            groups: [
              { title: 'COMUN', cols: 5 },
              { title: 'ESPECIAL', cols: 2 },
              { title: 'ADULTOS', cols: 4 }
            ]
          }
        },   
        yaxis: {
           labels: {
      show: false
    },
        },    
        tooltip: {
          shared: true,
          intersect: false,
          x: {
            formatter: function(val:string) {
              return val
            }  
          }
        },
        };
} }


