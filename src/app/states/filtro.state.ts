import { computed, Injectable, signal } from '@angular/core';
import { MODALIDAD_ADULTOS, MODALIDAD_COMUN, MODALIDAD_ESPECIAL } from '../const/const';


export interface ValueFilter{
  id: string;
  name: string;
}

export interface GeographicFilter {
  type: 'region' | 'departamento' | 'distrito' | null;
  value: ValueFilter | null;
}

export interface EducationalFilter {
  modalidad: string | null;
  nivel: string | null;
}

export interface FilterState {
  geographic: GeographicFilter;
  educational: EducationalFilter;
}



@Injectable({
  providedIn: 'root'
})
export class FiltroState {
  private readonly _activeFilter = signal<FilterState>({
    geographic: {
      type: null,
      value: null
    },
    educational: {
      modalidad: null,
      nivel: null
    }
  });

  readonly activeFilter = computed(() => this._activeFilter());


  setRegion(region: ValueFilter ) {
    this._activeFilter.update(filter => ({
        ...filter,
        geographic: { type: 'region', value: region }
      }));
  }

  setDepartamento(departamento: ValueFilter ) {
    this._activeFilter.update(filter => ({
        ...filter,
        geographic: { type: 'departamento', value: departamento }
      }));
  }

  setDistrito(distrito: ValueFilter ) {
    this._activeFilter.update(filter => ({
        ...filter,
        geographic: { type: 'distrito', value: distrito }
      }));
  }

  setNivelComun(nivel: string ) {
    this._activeFilter.update(filter => ({
        ...filter,
        educational: { modalidad: MODALIDAD_COMUN, nivel }
      }));
  }

  setNivelEspecial(nivel: string ) {
    this._activeFilter.update(filter => ({
        ...filter,
        educational: { modalidad: MODALIDAD_ESPECIAL, nivel }
      }));
  }

  setNivelAdultos(nivel: string ) {
    this._activeFilter.update(filter => ({
        ...filter,
        educational: { modalidad: MODALIDAD_ADULTOS, nivel }
      }));
  }

    // Métodos para limpiar filtros
  clearGeographicFilter() {
    this._activeFilter.update(filter => ({
        ...filter,
        geographic: { type: null, value: null }
      }));
  }

  clearEducationalFilter() {
    this._activeFilter.update(filter => ({
        ...filter,
        educational: { modalidad: null, nivel: null }
      }));
  }

  clearAllFilters() {
    this.clearGeographicFilter();
    this.clearEducationalFilter();
  }

}
