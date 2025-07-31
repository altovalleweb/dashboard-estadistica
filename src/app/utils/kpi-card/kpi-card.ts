import { DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';


export interface InformationDataHeader {
  value: number;
  description: string;

}

export interface KPIData { 
  dataHeaderValue1?: InformationDataHeader | null;
  dataHeaderValue2?: InformationDataHeader | null;
  title: string;  
  modalidad: string;
  bgColor: string;
  iconPath: string;

  infoNiveles:string[];
  iconNiveles: string[];
  infoEscuelas: number[];
  infoMatricula: number[];
}



@Component({
  selector: 'app-kpi-card',
  imports: [DecimalPipe],
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.css'
})
export class KpiCard {

  data = input<KPIData | null>(null);

}
