export const UnidadesDeServicioEvolucionDataOptions = {
series: [{
          data: [1.264,	1.248,	1.238,	1.267,	1.268,	1.266]
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

export const UnidadesDeServicioPorModalidadNivelTotalProvinciaDataOptions = {
  series: [{
          name: 'Inicial',
          data: [303,19,0]
        }, {
          name: 'Primaria',
          data: [377, 28, 72]
        }, {
          name: 'Secundaria',
          data: [ 166, 0,  78]
        }, {
          name: 'SNU',
          data: [ 57, 0, 0]
        }, {
          name: 'Formación Profesional',
          data: [0, 0,  90]
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


export const UnidadesDeServicioPorModalidadNivelSectorTotalProvinciaDataOptions ={
           series: [{
          name: 'Estatal',
          data: [237,  325, 121, 32,18,  27,67,  72, 81 ]
        }, {
          name: 'Privada',
          data: [66,  52, 45, 25, 1, 1, 5,  6, 9]
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
        };


        export const UnidadesDeServicioPorModalidadNivelAmbitoTotalProvinciaDataOptions ={
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
        };