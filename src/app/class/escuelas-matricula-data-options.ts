
interface GroupItem{
  title: string;
  cols: number;
}

export class EscuelasMatriculaDataOption {



  getEvolucion(data:number[], nameData:string, categories:string[]){

    return  {
          series: [          
       {
          data: data,
          name: nameData
        }
        ],
          chart: {
          height: 150,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.5
          },
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth'
        },      
            
        xaxis: {
          categories: categories,     
        },
         yaxis: {
           labels: {
      show: false
    },
        }
   
        
        }

    
    
    
    /*{
series: [{
          data: data
        }],
          chart: {
          type: 'area',
          
          height: 80,
          sparkline: {
            enabled: true
          },
          
        },
         xaxis: {
          categories: categories
        },
        tooltip: {
          fixed: {
            enabled: false
          },
          x: {
            show: true
          },
          y: {
          
            title: {
              formatter: function (seriesName:string) {
                return ''
              }
            }
          }   
        }
} */

  }

  getModalidadNivelSectorAmbitoOption(series:any[], categories:string[], groups:GroupItem[], colors:string[] = ['#242c4f','#FF5733']) {
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
     
        xaxis: {
          type: 'category',
          categories: categories,
          group: {
            style: {
              fontSize: '10px',
              fontWeight: 700
            },
            groups: groups 
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
         fill: {
    colors: colors,
    opacity: 0.8,
    type: 'solid'
  }
        }
  }
    

    
}