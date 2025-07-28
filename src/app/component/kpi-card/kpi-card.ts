import { Component } from '@angular/core';
import { BarComponent } from '../../utils/bar-component/bar-component';


// ApexCharts imports





@Component({
  selector: 'app-kpi-card',
  imports: [BarComponent],
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.css'
})
export class KpiCard {

  chartDataOptions = {
      series: [
        {
          name: "Escuelas",
          data: [44, 55, 41, 64, 22]
        },
        {
          name: "Matricula",

          data: [53, 32, 33, 52, 13]
        }
      ],
      chart: {
        type: "bar",
        height: 430
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top"
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#fff"]
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"]
      },
      xaxis: {
        categories: ['Inicial','Primaria','Secundaria 5 años','Secundaria 6 años','SNU'],
      }
    };
 

}
