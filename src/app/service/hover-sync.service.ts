import { Injectable, signal } from '@angular/core';

export interface HoverState {
  nivel: string;
  modalidad: string;
}

@Injectable({
  providedIn: 'root'
})
export class HoverSyncService {
  // Signal para mantener el nivel y modalidad que están actualmente en hover
  private hoveredState = signal<HoverState | null>(null);
  
  // Señal de solo lectura para que los componentes puedan subscribirse
  readonly hoveredState$ = this.hoveredState.asReadonly();
  
  // Método para establecer qué nivel y modalidad están en hover
  setHoveredState(nivel: string, modalidad: string) {
    this.hoveredState.set({ nivel, modalidad });
  }
  
  // Método para verificar si un nivel y modalidad específicos están en hover
  isStateHovered(nivel: string, modalidad: string): boolean {
    const current = this.hoveredState();
    return current?.nivel === nivel && current?.modalidad === modalidad;
  }
  
  // Método para limpiar el hover
  clearHover() {
    this.hoveredState.set(null);
  }
}
