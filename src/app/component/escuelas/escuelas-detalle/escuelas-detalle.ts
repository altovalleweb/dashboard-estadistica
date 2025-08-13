import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Escuela } from '../../../interfaces/common.interface';

@Component({
  selector: 'app-escuelas-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './escuelas-detalle.html',
  styleUrl: './escuelas-detalle.css'
})
export class EscuelasDetalle implements OnChanges {
  @Input() escuela: Escuela | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['escuela'] && this.escuela) {
      console.log('Escuela seleccionada:', this.escuela.localizacion);
    }
  }

  /**
   * Obtiene todas las ofertas educativas formateadas
   */
  getOfertasCompletas(): string[] {
    if (!this.escuela?.ofertas || this.escuela.ofertas.length === 0) {
      return ['Sin ofertas registradas'];
    }

    return this.escuela.ofertas.map(oferta => 
      `${oferta.modalidad} - ${oferta.nivel} (${oferta.estado_oferta})`
    );
  }

  /**
   * Obtiene solo las ofertas activas
   */
  getOfertasActivas(): string[] {
    if (!this.escuela?.ofertas) return [];
    
    return this.escuela.ofertas
      .filter(oferta => oferta.estado_oferta === 'Activo' || oferta.estado_oferta === 'ACTIVO')
      .map(oferta => `${oferta.modalidad} - ${oferta.nivel}`);
  }

  /**
   * Obtiene las ofertas inactivas
   */
  getOfertasInactivas(): string[] {
    if (!this.escuela?.ofertas) return [];
    
    return this.escuela.ofertas
      .filter(oferta => oferta.estado_oferta !== 'Activo' && oferta.estado_oferta !== 'ACTIVO')
      .map(oferta => `${oferta.modalidad} - ${oferta.nivel}`);
  }

  /**
   * Obtiene el ícono según el sector de la escuela
   */
  getSectorIcon(): string {
    if (!this.escuela) return '🏫';
    
    switch (this.escuela.sector.toLowerCase()) {
      case 'estatal':
      case 'público':
        return '🏛️';
      case 'privado':
        return '🏢';
      default:
        return '🏫';
    }
  }

  /**
   * Obtiene el ícono según el ámbito de la escuela
   */
  getAmbitoIcon(): string {
    if (!this.escuela) return '🌍';
    
    switch (this.escuela.ambito.toLowerCase()) {
      case 'urbano':
        return '🌆';
      case 'rural':
        return '🌾';
      default:
        return '🌍';
    }
  }

  /**
   * Formatea el período de funcionamiento
   */
  getPeriodoFuncionamiento(): string {
    if (!this.escuela) return 'No especificado';
    
    switch (this.escuela.periodo_funcionamiento.toLowerCase()) {
      case 'completo':
        return 'Jornada Completa';
      case 'simple':
        return 'Jornada Simple';
      case 'extendida':
        return 'Jornada Extendida';
      default:
        return this.escuela.periodo_funcionamiento;
    }
  }

  /**
   * Verifica si hay coordenadas GPS disponibles
   */
  hasGPSCoordinates(): boolean {
    return !!(this.escuela?.latitud && this.escuela?.longitud);
  }

  /**
   * Obtiene las coordenadas formateadas
   */
  getFormattedCoordinates(): string {
    if (!this.hasGPSCoordinates()) return 'No disponibles';
    
    return `${this.escuela!.latitud.toFixed(6)}, ${this.escuela!.longitud.toFixed(6)}`;
  }

  /**
   * Obtiene el estado de la escuela con estilo
   */
  getEstadoClass(): string {
    if (!this.escuela) return '';
    
    switch (this.escuela.estado.toLowerCase()) {
      case 'activo':
        return 'bg-green-100 text-green-800';
      case 'inactivo':
        return 'bg-red-100 text-red-800';
      case 'suspendido':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  /**
   * Obtiene información de contacto disponible
   */
  hasContactInfo(): boolean {
    return !!(this.escuela?.telefono || this.escuela?.email);
  }

}
