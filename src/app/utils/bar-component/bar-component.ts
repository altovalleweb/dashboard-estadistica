import { Component, input, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexFill,
  ApexLegend,
  NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
};

@Component({
  selector: 'app-bar-component',
  imports: [NgApexchartsModule],
  templateUrl: './bar-component.html',
  styleUrl: './bar-component.css'
})
export class BarComponent {

  @ViewChild("chart") chart!: ChartComponent;

 dataOptions  = input<any>(null)

}
