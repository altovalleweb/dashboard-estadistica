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
          height: 150,          
          stacked: true,
          stackType: '100%',
           toolbar: {
      show: false
    },
        },
        plotOptions: {
          bar: {
            horizontal: true,
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


export const UnidadesDeServicioPorModalidadNivelSectorTotalProvinciaDataOptions = {
  
          series: [{
          name: 'Estatal',
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
          height: 250,
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
          offsetX: 40
        },
         dataLabels: {
    style: {
      fontSize: '14px',
    }
  }
        
};