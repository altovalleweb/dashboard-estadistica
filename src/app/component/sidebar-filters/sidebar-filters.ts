import { Component, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { REGIONES, DEPARTAMENTOS, DISTRITOS } from '../../const/filtros';
import { 
  MODALIDADES, 
  MODALIDAD_COMUN, 
  MODALIDAD_ESPECIAL, 
  MODALIDAD_ADULTOS,
  NIVELES_COMUN,
  NIVELES_ESPECIAL,
  NIVELES_ADULTOS,
  ICONOS_NIVELES,
  ICONOS_COMUN,
  ICONOS_ESPECIAL,
  ICONOS_ADULTOS
} from '../../const/const';

export interface GeographicFilter {
  type: 'region' | 'departamento' | 'distrito' | null;
  value: string | null;
}

export interface EducationalFilter {
  modalidad: string | null;
  nivel: string | null;
}

export interface FilterState {
  geographic: GeographicFilter;
  educational: EducationalFilter;
}

@Component({
  selector: 'app-sidebar-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-filters.html',
  styleUrl: './sidebar-filters.css'
})
export class SidebarFiltersComponent {
  // Datos disponibles para los filtros geográficos
  readonly regiones = REGIONES;
  readonly departamentos = DEPARTAMENTOS;
  readonly distritos = DISTRITOS;

  // Datos disponibles para los filtros educativos
  readonly modalidades = MODALIDADES;
  readonly nivelesComun = NIVELES_COMUN;
  readonly nivelesEspecial = NIVELES_ESPECIAL;
  readonly nivelesAdultos = NIVELES_ADULTOS;
  readonly iconosNiveles = ICONOS_NIVELES;

  // Estado de los acordeones (abierto/cerrado)
  // División Geográfica
  regionesOpen = signal(false);
  departamentosOpen = signal(false);
  distritosOpen = signal(false);
  
  // Oferta Educativa - un acordeón por modalidad
  modalidadComunOpen = signal(false);
  modalidadEspecialOpen = signal(false);
  modalidadAdultosOpen = signal(false);

  // Estado de los filtros activos
  activeFilter = signal<FilterState>({
    geographic: {
      type: null,
      value: null
    },
    educational: {
      modalidad: null,
      nivel: null
    }
  });

  // Output para comunicar cambios de oferta educativa al componente padre
  educationalOfferChanged = output<EducationalFilter>();
  
  // Output para comunicar cambios de filtros geográficos al componente padre
  geographicFiltersChanged = output<GeographicFilter>();

  // Output para comunicar cambios completos de estado (mantener compatibilidad)
  filtersChanged = output<FilterState>();

  // Métodos para toggle de acordeones (solo uno abierto a la vez dentro de cada sección)
  toggleRegiones() {
    const willOpen = !this.regionesOpen();
    
    // Cerrar todos los acordeones geográficos
    this.regionesOpen.set(false);
    this.departamentosOpen.set(false);
    this.distritosOpen.set(false);
    
    if (willOpen) {
      this.regionesOpen.set(true);
    }
  }

  toggleDepartamentos() {
    const willOpen = !this.departamentosOpen();
    
    this.regionesOpen.set(false);
    this.departamentosOpen.set(false);
    this.distritosOpen.set(false);
    
    if (willOpen) {
      this.departamentosOpen.set(true);
    }
  }

  toggleDistritos() {
    const willOpen = !this.distritosOpen();
    
    this.regionesOpen.set(false);
    this.departamentosOpen.set(false);
    this.distritosOpen.set(false);
    
    if (willOpen) {
      this.distritosOpen.set(true);
    }
  }

  toggleModalidadComun() {
    const willOpen = !this.modalidadComunOpen();
    
    // Cerrar todos los acordeones educativos
    this.modalidadComunOpen.set(false);
    this.modalidadEspecialOpen.set(false);
    this.modalidadAdultosOpen.set(false);
    
    if (willOpen) {
      this.modalidadComunOpen.set(true);
    }
  }

  toggleModalidadEspecial() {
    const willOpen = !this.modalidadEspecialOpen();
    
    this.modalidadComunOpen.set(false);
    this.modalidadEspecialOpen.set(false);
    this.modalidadAdultosOpen.set(false);
    
    if (willOpen) {
      this.modalidadEspecialOpen.set(true);
    }
  }

  toggleModalidadAdultos() {
    const willOpen = !this.modalidadAdultosOpen();
    
    this.modalidadComunOpen.set(false);
    this.modalidadEspecialOpen.set(false);
    this.modalidadAdultosOpen.set(false);
    
    if (willOpen) {
      this.modalidadAdultosOpen.set(true);
    }
  }

  // Métodos para manejar selección de filtros geográficos
  selectRegion(region: string) {
    const current = this.activeFilter();
    if (current.geographic.type === 'region' && current.geographic.value === region) {
      this.clearGeographicFilter();
    } else {
      this.activeFilter.update(filter => ({
        ...filter,
        geographic: { type: 'region', value: region }
      }));
      this.emitGeographicFiltersChanged();
    }
  }

  selectDepartamento(departamento: string) {
    const current = this.activeFilter();
    if (current.geographic.type === 'departamento' && current.geographic.value === departamento) {
      this.clearGeographicFilter();
    } else {
      this.activeFilter.update(filter => ({
        ...filter,
        geographic: { type: 'departamento', value: departamento }
      }));
      this.emitGeographicFiltersChanged();
    }
  }

  selectDistrito(distrito: string) {
    const current = this.activeFilter();
    if (current.geographic.type === 'distrito' && current.geographic.value === distrito) {
      this.clearGeographicFilter();
    } else {
      this.activeFilter.update(filter => ({
        ...filter,
        geographic: { type: 'distrito', value: distrito }
      }));
      this.emitGeographicFiltersChanged();
    }
  }

    // Métodos para manejar selección de oferta educativa
  selectNivelComun(nivel: string) {
    const current = this.activeFilter();
    if (current.educational.modalidad === MODALIDAD_COMUN && current.educational.nivel === nivel) {
      this.clearEducationalOffer();
    } else {
      this.activeFilter.update(filter => ({
        ...filter,
        educational: { modalidad: MODALIDAD_COMUN, nivel: nivel }
      }));
      this.emitEducationalOfferChanged();
    }
  }

  selectNivelEspecial(nivel: string) {
    const current = this.activeFilter();
    if (current.educational.modalidad === MODALIDAD_ESPECIAL && current.educational.nivel === nivel) {
      this.clearEducationalOffer();
    } else {
      this.activeFilter.update(filter => ({
        ...filter,
        educational: { modalidad: MODALIDAD_ESPECIAL, nivel: nivel }
      }));
      this.emitEducationalOfferChanged();
    }
  }

  selectNivelAdultos(nivel: string) {
    const current = this.activeFilter();
    if (current.educational.modalidad === MODALIDAD_ADULTOS && current.educational.nivel === nivel) {
      this.clearEducationalOffer();
    } else {
      this.activeFilter.update(filter => ({
        ...filter,
        educational: { modalidad: MODALIDAD_ADULTOS, nivel: nivel }
      }));
      this.emitEducationalOfferChanged();
    }
  }

  // Métodos para verificar si un item está seleccionado
  isRegionSelected(region: string): boolean {
    const current = this.activeFilter();
    return current.geographic.type === 'region' && current.geographic.value === region;
  }

  isDepartamentoSelected(departamento: string): boolean {
    const current = this.activeFilter();
    return current.geographic.type === 'departamento' && current.geographic.value === departamento;
  }

  isDistritoSelected(distrito: string): boolean {
    const current = this.activeFilter();
    return current.geographic.type === 'distrito' && current.geographic.value === distrito;
  }

  isNivelComunSelected(nivel: string): boolean {
    const current = this.activeFilter();
    return current.educational.modalidad === MODALIDAD_COMUN && current.educational.nivel === nivel;
  }

  isNivelEspecialSelected(nivel: string): boolean {
    const current = this.activeFilter();
    return current.educational.modalidad === MODALIDAD_ESPECIAL && current.educational.nivel === nivel;
  }

  isNivelAdultosSelected(nivel: string): boolean {
    const current = this.activeFilter();
    return current.educational.modalidad === MODALIDAD_ADULTOS && current.educational.nivel === nivel;
  }

  // Métodos para limpiar filtros
  clearGeographicFilter() {
    this.activeFilter.update(filter => ({
      ...filter,
      geographic: { type: null, value: null }
    }));
    this.emitGeographicFiltersChanged();
  }

  clearEducationalFilter() {
    this.activeFilter.update(filter => ({
      ...filter,
      educational: { modalidad: null, nivel: null }
    }));
    this.emitEducationalOfferChanged();
  }

  // Método específico para limpiar oferta educativa
  clearEducationalOffer() {
    this.clearEducationalFilter();
  }

  clearAllFilters() {
    this.activeFilter.set({
      geographic: { type: null, value: null },
      educational: { modalidad: null, nivel: null }
    });
    this.emitFiltersChanged();
  }

  // Métodos para emitir cambios específicos
  private emitEducationalOfferChanged() {
    const current = this.activeFilter();
    this.educationalOfferChanged.emit(current.educational);
    this.emitFiltersChanged(); // También emite el estado completo para compatibilidad
  }

  private emitGeographicFiltersChanged() {
    const current = this.activeFilter();
    this.geographicFiltersChanged.emit(current.geographic);
    this.emitFiltersChanged(); // También emite el estado completo para compatibilidad
  }

  // Método para emitir cambios completos
  private emitFiltersChanged() {
    this.filtersChanged.emit(this.activeFilter());
  }

  // Métodos para verificar si hay filtros activos
  hasGeographicFilter(): boolean {
    const current = this.activeFilter();
    return current.geographic.type !== null && current.geographic.value !== null;
  }

  hasEducationalFilter(): boolean {
    const current = this.activeFilter();
    return current.educational.modalidad !== null && current.educational.nivel !== null;
  }

  hasAnyFilter(): boolean {
    return this.hasGeographicFilter() || this.hasEducationalFilter();
  }

  // Métodos para obtener texto de filtros activos
  getGeographicFilterText(): string {
    const current = this.activeFilter();
    if (!current.geographic.type || !current.geographic.value) return '';
    
    switch (current.geographic.type) {
      case 'region':
        return `Región: ${current.geographic.value}`;
      case 'departamento':
        return `Departamento: ${current.geographic.value}`;
      case 'distrito':
        return `Distrito: ${current.geographic.value}`;
      default:
        return '';
    }
  }

  getEducationalFilterText(): string {
    const current = this.activeFilter();
    if (!current.educational.modalidad || !current.educational.nivel) return '';
    
    return `${current.educational.modalidad}: ${current.educational.nivel}`;
  }
}
