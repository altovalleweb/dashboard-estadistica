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


 chartDataOptions = {
          series: [
          {
            name: 'Inicial - Estatal',
            group: 'Inicial',
            data: [237, 18, 0]
          },
          {
            name: 'Primaria - Estatal',
            group: 'Primaria',
            data: [325, 27, 67]
          },
          {
            name: 'Secundaría - Estatal',
            group: 'Secundaría',
            data: [121, 0, 72]
          },
          {
            name: 'SNU - Estatal',
            group: 'SNU',
            data: [32, 0, 0]
          },
          {
            name: 'Formación Profesional - Estatal',
            group: 'Formación Profesional',
            data: [0, 0, 81]
          },
          {
            name: 'Inicial - Privado',
            group: 'Inicial',
            data: [66, 1, 0]
          },
          {
            name: 'Primaria - Privado',
            group: 'Primaria',
            data: [52, 1, 5]
          },
          {
            name: 'Secundaría - Privado',
            group: 'Secundaría',
            data: [45, 0, 6]
          },
          {
            name: 'SNU - Privado',
            group: 'SNU',
            data: [25, 0, 0]
          },
          {
            name: 'Formación Profesional - Privado',
            group: 'Formación Profesional',
            data: [0, 0, 9]
          }
        ],
          chart: {
          type: 'bar',
          height: 350,
          stacked: true,
        
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        dataLabels: {
          formatter: (val:string) => {
            return val 
          }
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        xaxis: {
          categories: [
            'Común',
            'Especial',
            'Adultos'
          ],
          labels: {
            formatter: (val:string) => {
              return val 
            }
          }
        },
        fill: {
          opacity: 1,
        },
        colors: ['#80c7fd', '#008FFB', '#80f1cb', '#00E396'],
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        }
        };

}
