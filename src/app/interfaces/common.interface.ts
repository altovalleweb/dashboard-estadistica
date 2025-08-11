// Interfaces comunes que se usan en múltiples lugares

export interface ChartDataOptions {
  data: number[];
  labels: string[];
}

export interface SerializedData {
  name: string;
  data: number[];
}

export interface TotalesPorModalidad {
  total: number;
  comun: number | null;
  porcentajeComun: number | null;
  especial: number | null;
  porcentajeEspecial: number | null;
  adultos: number | null;
  porcentajeAdultos: number | null;
}

export interface TotalesPorSectorAmbito {
  estatal: number | null;
  porcentajeEstatal: number | null;
  privado: number | null;
  porcentajePrivado: number | null;
  rural: number | null;
  porcentajeRural: number | null;
  urbano: number | null;
  porcentajeUrbano: number | null;
}
