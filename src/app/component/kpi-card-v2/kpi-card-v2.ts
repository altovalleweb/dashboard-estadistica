import { Component, computed, input } from '@angular/core';
import { BarComponent } from '../../utils/bar-component/bar-component';

export interface KPIDataV2 {
  number: string;
  title: string;
  subtitle?: string;
  bgColor: string;
  iconPath: string;
  showChart?: boolean;
  chartType?: 'donut' | 'pie' | 'radialBar';
  chartDataOptionsHeader?: any;
  chartDataOptionsBody?: any;

}


@Component({
  selector: 'app-kpi-card-v2',
  imports: [BarComponent],
  templateUrl: './kpi-card-v2.html',
  styleUrl: './kpi-card-v2.css'
})
export class KpiCardV2 {

dataOptionsHeader= input<any | null>(null);
 data = input<KPIDataV2 | null>(null);


hasSubtitle = computed(() => {
  return this.data() && !!this.data()?.subtitle;
})

showChart = computed(() => {
  return this.data() && this.data()?.showChart;
})

}
