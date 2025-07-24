
export const MatriculaEvolucionDataOptions = {
series: [{
          data: [233.530,	231.727,	231.412,	234.794,	234.625,	236.951]
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
          categories: [2019, 2020, 2021, 2022, 2023, 2024],},
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



export const matriculaPorModalidadNivelTotalProvinciaDataOptions = {
  
          series: [{
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
  }
        
};



export const MatriculaPorModalidadNivelSectorTotalProvinciaDataOptions ={
           series: [{
          name: 'Estatal',
          data: [18653, 69896, 52383, 10165, 240, 760, 2573, 11341, 19684]
        }, {
          name: 'Privada',
          data: [4606, 13333, 8914, 10834, 11, 28, 83, 624, 1204]
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
                  fontWeight: 700
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
              fontSize: '12px',
              fontWeight: 900
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
        };
