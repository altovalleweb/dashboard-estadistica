export interface TotalesPorSectorAmbito{ 
  estatal: number | null;
  porcentajeEstatal: number | null;
  privado: number | null;
  porcentajePrivado: number | null;
  rural: number | null;
  porcentajeRural: number | null;
  urbano: number | null;
  porcentajeUrbano: number | null;
}

export interface Oferta {
  nivel: string;
  modalidad: string;
  estado_oferta: string;
  codigo_estado_oferta: number;
}

export interface Escuela {
  localizacion: string;
  cue_anexo: string;
  telefono: string;
  email: string;
  domicilio_principal: string;
  localidad: string;
  codigo_localidad: number;
  departamento: string;
  ejido_municipal: string;
  distrito: string;
  ambito: string;
  sector: string;
  periodo_funcionamiento: string;
  codigo_periodo_funcionamiento: number;
  estado: string;
  codigo_estado: number;
  direccion_de_nivel: string | null;
  latitud: number;
  longitud: number;
  ofertas: Oferta[];
}