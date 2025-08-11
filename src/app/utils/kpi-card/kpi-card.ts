import { DecimalPipe } from '@angular/common';
import { Component, input, computed } from '@angular/core';
import { HoverSyncService } from '../../services/hover-sync.service';

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

  constructor(private hoverSyncService: HoverSyncService) {}

  // Computed para obtener el estado actualmente en hover
  hoveredState = computed(() => this.hoverSyncService.hoveredState$());

  // Método para manejar el hover sobre un nivel
  onLevelHover(nivel: string) {
    const modalidad = this.data()?.modalidad || '';
    this.hoverSyncService.setHoveredState(nivel, modalidad);
  }

  // Método para manejar cuando se sale del hover
  onLevelLeave() {
    this.hoverSyncService.clearHover();
  }

  // Método para verificar si un nivel y modalidad están en hover
  isStateHovered(nivel: string): boolean {
    const modalidad = this.data()?.modalidad || '';
    return this.hoverSyncService.isStateHovered(nivel, modalidad);
  }

  // Método para obtener las clases CSS dinámicas con borde de color
  getLevelClasses(nivel: string, additionalClasses: string = ''): string {
    const baseClasses = 'bg-gray-50 rounded-2xl py-1 px-4 border-2 hover-lift hover:bg-gray-100';
    const isHovered = this.isStateHovered(nivel);
    const borderClass = isHovered ? 'border-blue-400' : 'border-gray-200';
    const hoverClasses = isHovered ? 'synced-hover' : '';
    return `${baseClasses} ${borderClass} ${additionalClasses} ${hoverClasses}`.trim();
  }
}
