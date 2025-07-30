export class EscuelasMatriculaDataOption {

  getEvolucion(data:number[], categories:string[]){

    return {
series: [{
          data: data
        }],
          chart: {
          type: 'line',
          width: 100,
          height: 50,
          sparkline: {
            enabled: true
          }
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
    

    
}