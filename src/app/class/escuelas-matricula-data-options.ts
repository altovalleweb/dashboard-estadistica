
interface GroupItem{
  title: string;
  cols: number;
}

export class EscuelasMatriculaDataOption {



  getEvolucion(data:number[], categories:string[]){

    return {
series: [{
          data: data
        }],
          chart: {
          type: 'area',
          
          height: 100,
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
}

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