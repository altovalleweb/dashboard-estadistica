import { Component, input, computed } from '@angular/core';
import { EscuelaMatriculaPorSectorAmbitoModalidadNivel } from '../../class/escuela-matricula';
import { ICONOS_NIVELES } from '../../const/const';
import { TotalesEscuelasPorSectorAmbitoModalidad } from '../../class/escuela';
import { TotalesMatriculaPorSectorAmbitoModalidad } from '../../class/matricula';
import { DecimalPipe } from '@angular/common';
import { HoverSyncService } from '../../services/hover-sync.service';

@Component({
  selector: 'app-kpi',
  imports: [DecimalPipe],
  templateUrl: './kpi.html',
  styleUrl: './kpi.css'
})
export class Kpi {
  // Inputs for the KPI component
  title = input<string>('');
  color = input<string>('');
  data = input<EscuelaMatriculaPorSectorAmbitoModalidadNivel[] | null>(null);
  totalesEscuelas = input<TotalesEscuelasPorSectorAmbitoModalidad | null>(null);
  totalesMatricula = input<TotalesMatriculaPorSectorAmbitoModalidad | null>(null);

  iconos = ICONOS_NIVELES;

  constructor(private hoverSyncService: HoverSyncService) {}

  // Computed para obtener el estado actualmente en hover
  hoveredState = computed(() => this.hoverSyncService.hoveredState$());

  // Método para manejar el hover sobre un nivel
  onLevelHover(nivel: string, modalidad: string) {
    this.hoverSyncService.setHoveredState(nivel, modalidad);
  }

  // Método para manejar cuando se sale del hover
  onLevelLeave() {
    this.hoverSyncService.clearHover();
  }

  // Método para verificar si un nivel y modalidad están en hover
  isStateHovered(nivel: string, modalidad: string): boolean {
    return this.hoverSyncService.isStateHovered(nivel, modalidad);
  }

  // Método para obtener las clases CSS dinámicas con borde de color
  getLevelClasses(nivel: string, modalidad: string): string {
    const baseClasses = 'bg-gray-50 rounded-2xl py-1 px-4 border-2 hover-lift hover:bg-gray-100';
    const isHovered = this.isStateHovered(nivel, modalidad);
    const borderClass = isHovered ? 'border-blue-400' : 'border-gray-200';
    const hoverClasses = isHovered ? 'synced-hover' : '';
    return `${baseClasses} ${borderClass} ${hoverClasses}`.trim();
  }
}


