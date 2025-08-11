import { Component, signal, output, inject, ViewChild, ElementRef } from '@angular/core';
import { } from '@angular/common';
import { REGIONES, DEPARTAMENTOS, DISTRITOS } from '../../../const/filtros';
import { 
  MODALIDADES, 
  MODALIDAD_COMUN, 
  MODALIDAD_ESPECIAL, 
  MODALIDAD_ADULTOS,
  NIVELES_COMUN,
  NIVELES_ESPECIAL,
  NIVELES_ADULTOS,
  ICONOS_NIVELES  
} from '../../../const/const';
import { EducationalFilter, FilterState, FiltroState, GeographicFilter, ValueFilter } from '../../../state/filtro.state';



@Component({
  selector: 'app-sidebar-filters',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-filters.html',
  styleUrl: './sidebar-filters.css'
})
export class SidebarFiltersComponent {

   @ViewChild('container', { static: false }) container!: ElementRef;
   
  private fs = inject(FiltroState);

  // Estado de los filtros activos
  activeFilter = this.fs.activeFilter;

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
  selectRegion(region: any) {
    debugger
    const current = this.activeFilter();    
    if (current.geographic.type === 'region' && current.geographic.value?.id === region.id) {
      this.clearGeographicFilter();
    } else {
      
      this.fs.setRegion(region);    
    
    }
  }

  selectDepartamento(departamento: any) {
    const current = this.activeFilter();
    if (current.geographic.type === 'departamento' && current.geographic.value?.id === departamento.id  ) {
      this.clearGeographicFilter();
    } else {
      this.fs.setDepartamento(departamento);
    
    }
  }

  selectDistrito(distrito: any) {
    const current = this.activeFilter();
    if (current.geographic.type === 'distrito' && current.geographic.value?.id === distrito.id) {
      this.clearGeographicFilter();
    } else {
      this.fs.setDistrito(distrito);
    
    }
  }

    // Métodos para manejar selección de oferta educativa
  selectNivelComun(nivel: string) {
    const current = this.activeFilter();
    if (current.educational.modalidad === MODALIDAD_COMUN && current.educational.nivel === nivel) {
      this.clearEducationalOffer();
    } else {
      this.fs.setNivelComun(nivel);
    
    }
  }

  selectNivelEspecial(nivel: string) {
    const current = this.activeFilter();
    if (current.educational.modalidad === MODALIDAD_ESPECIAL && current.educational.nivel === nivel) {
      this.clearEducationalOffer();
    } else {
      this.fs.setNivelEspecial(nivel);
    
    }
  }

  selectNivelAdultos(nivel: string) {
    const current = this.activeFilter();
    if (current.educational.modalidad === MODALIDAD_ADULTOS && current.educational.nivel === nivel) {
      this.clearEducationalOffer();
    } else {
      this.fs.setNivelAdultos(nivel);
    
    }
  }

  
  // Métodos para limpiar filtros
  clearGeographicFilter() {
    this.fs.clearGeographicFilter();
    

    this.regionesOpen.set(false);
    this.departamentosOpen.set(false);
    this.distritosOpen.set(false);

    const inputs = this.container.nativeElement.querySelectorAll('input[name="geographic-filter"]');    
    // Desmarcar todos
    inputs.forEach((input: HTMLInputElement) => {
      input.checked = false;
    });

  }

  clearEducationalFilter() {
    this.fs.clearEducationalFilter();  
  }

  // Método específico para limpiar oferta educativa
  clearEducationalOffer() {
    this.clearEducationalFilter();
  }

  clearAllFilters() {
    this.fs.clearAllFilters();  
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
        return `Región: ${current.geographic.value.name}`;
      case 'departamento':
        return `Departamento: ${current.geographic.value.name}`;
      case 'distrito':
        return `Distrito: ${current.geographic.value.name}`;
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
