import { Component, computed, input } from '@angular/core';
import { BarComponent } from '../bar-component/bar-component';
import { DecimalPipe } from '@angular/common';


export interface InformationDataHeader {
  value: number;
  description: string;

}

export interface KPIDataV3 {
  dataHeader: InformationDataHeader[];
  title: string;  
  bgColor: string;
  iconPath: string;
   chartDataOptions?: any;

}

@Component({
  selector: 'app-kpi-card-v3',
  imports: [BarComponent, DecimalPipe],
  templateUrl: './kpi-card-v3.html',
  styleUrl: './kpi-card-v3.css'
})
export class KpiCardV3 {

   data = input<KPIDataV3 | null>(null);

}
