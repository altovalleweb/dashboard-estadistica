

export class EscuelasDataOption {


  

  getUnidadesDeServicioPorModalidadNivelTotalProvincia(series:any[], categories:string[]){

    return {
  
          series: series,
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
          categories: categories,
          
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
  }
        
}
  }

  getUnidadesDeServicioPorModalidadNivelSectorTotalProvincia(series:any[], categories:string[]){
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
                  fontWeight: 900
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
              fontSize: '10px',
              fontWeight: 700
            },
            groups: [
              { title: 'COMUN', cols: 5 },
              { title: 'ESPECIAL', cols: 2 },
              { title: 'ADULTOS', cols: 3 }
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
        }
  }


  getUnidadesDeServicioPorModalidadNivelAmbitoTotalProvincia(){
return {
           series: [{
          name: 'Urbano',
          data: [204,  237, 136, 54,19,  25,47,  64, 81 ]
        }, {
          name: 'Rural',
          data: [99,  140, 30, 3, 0, 3, 25,  14,  9]
        }],
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
                  fontWeight: 900
                }
              },          
            }
          },
        },
        xaxis: {
          type: 'category',
          categories: ['Inicial', 'Primaria', 'Secundaria', 'SNU', 'Inicial', 'Primaria', 'Primaria', 'Secundaria', 'Formación Profesional'],
          group: {
            style: {
              fontSize: '10px',
              fontWeight: 700
            },
            groups: [
              { title: 'COMUN', cols: 4 },
              { title: 'ESPECIAL', cols: 2 },
              { title: 'ADULTOS', cols: 3 }
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
        }
  }


}



        