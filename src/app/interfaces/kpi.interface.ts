import { TotalesEscuelasPorSectorAmbito } from '../class/escuela';


export interface KPIDataV2 {
  number: string;
  title: string;
  subtitle?: string;
  bgColor: string;
  iconPath: string;
  showChart?: boolean;  
  chartDataOptionsHeader?: any;
  chartDataOptionsBody?: any;
  totalesSectorAmbito: TotalesEscuelasPorSectorAmbito | null;
  
}

export interface KPIData {
  dataHeaderValue1?: { value: number; description: string } | null;
  dataHeaderValue2?: { value: number; description: string } | null;
  title: string;
  modalidad: string;
  bgColor: string;
  iconPath: string;
  infoNiveles: string[];
  iconNiveles: { [key: string]: string };
  infoEscuelas: any[];
  infoMatricula: any[];
}
