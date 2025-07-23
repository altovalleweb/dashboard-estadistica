export const matriculaPorSectorTotalProvinciaDataOptions = {
  series: [
    {
      name: "Estatal",
      data: [196871],
      color: "#334155"
    },
    {
      name: "Privado",
      data: [40080],
      color: "#2dd4bf"
    }
  ],
  chart: {
    type: "bar",
    height: 120,
    stacked: true,
    stackType: "100%",
    toolbar: {
      show: false
    },
    animations: {
      enabled: true
    },
    background: 'transparent',
    foreColor: '#000'
  },
  plotOptions: {
    bar: {
      horizontal: true
    }
  },

  xaxis: {
    categories: ['Sector'],
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
  yaxis: {
    labels: {
      show: false,
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    title: {
      text: 'Sector'
    }
  },

  tooltip: {
    y: {
      formatter: function (val: string) {
        return val;
      }
    }
  },
  fill: {
    opacity: 1
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    offsetX: 1,
    onItemClick: {
      toggleDataSeries: false
    },

  },
  dataLabels: {
    style: {
      fontSize: '16px',
    }
  }
};

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
