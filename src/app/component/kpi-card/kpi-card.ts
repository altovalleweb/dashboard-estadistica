import { Component, input } from '@angular/core';
import { BarComponent } from '../../utils/bar-component/bar-component';




export interface InformationDataHeader {
  value: number;
  description: string;

}

export interface KPIData {
  dataHeader: InformationDataHeader[];
  title: string;  
  bgColor: string;
  iconPath: string;
   chartDataOptions?: any;

}



@Component({
  selector: 'app-kpi-card',
  imports: [BarComponent],
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.css'
})
export class KpiCard {

  data = input<KPIData | null>(null);

}
