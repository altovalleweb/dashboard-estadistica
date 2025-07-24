import { Component, computed, input } from '@angular/core';
import { BarComponent } from '../../utils/bar-component/bar-component';



export interface KPIDataV3 {
  number: string;
  title: string;
  subtitle?: string;
  bgColor: string;
  iconPath: string;
  showChart?: boolean;
  chartType?: 'donut' | 'pie' | 'radialBar';
  chartDataOptions?: any;

}

@Component({
  selector: 'app-kpi-card-v3',
  imports: [BarComponent],
  templateUrl: './kpi-card-v3.html',
  styleUrl: './kpi-card-v3.css'
})
export class KpiCardV3 {

   data = input<KPIDataV3 | null>(null);

hasSubtitle = computed(() => {
  return this.data() && !!this.data()?.subtitle;
})

showChart = computed(() => {
  return this.data() && this.data()?.showChart;
})


options = {
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


 chartDataOptionsComun =  {
          series: [{
          name: 'Estatal',
          data: [ 237,  325, 121, 32 ]
        }, {
          name: 'Privada',
          data: [66,  52, 45, 25]
        }],
          chart: {
         type: "bar",
    height: 140,
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
          categories: ['Inicial', 'Primaria', 'Secundaria', 'SNU'],
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
          title: {
            text: "COMÚN",
            style: {
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#263238'
            }

          },
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
          horizontalAlign: 'right',
          offsetX: 1
        }
        }




 chartDataOptionsEspecial =  {
          series: [{
          name: 'Estatal',
          data: [ 18,  27]
        }, {
          name: 'Privada',
          data: [  1, 1]
        }],
          chart: {
         type: "bar",
    height: 80,
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
          categories: ['Inicial', 'Primaria'],
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
          title: {
            text: "ESPECIAL",
            style: {
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#263238'
            }

          },
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
          show:false
          
        }
        }




 chartDataOptionsAdultos =  {
          series: [{
          name: 'Estatal',
          data: [ 67,  72, 81]
        }, {
          name: 'Privada',
          data: [ 5,  6, 9]
        }],
          chart: {
         type: "bar",
    height: 90,
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
          categories: ['Primaria', 'Secundaria', 'FP'],
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
          title: {
            text: "ADULTOS",
            style: {
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#263238'
            }

          },
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
          show:false
          
        }
        }

  


}
