export interface FilterState {
  geographic: {
    type: 'region' | 'departamento' | 'distrito' | null;
    value: any | null;
  };
  educational: {
    modalidad: string | null;
    nivel: string | null;
  };
}

export interface GeographicEntity {
  id: string | number;
  name: string;
}

export interface Region extends GeographicEntity {}
export interface Departamento extends GeographicEntity {}
export interface Distrito extends GeographicEntity {}
