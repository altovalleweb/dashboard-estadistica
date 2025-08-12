import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy, PLATFORM_ID, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Escuela } from '../../../interfaces/common.interface';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css'
})
export class Map implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  @Input() escuelas: Escuela[] = [];
  
  private platformId = inject(PLATFORM_ID);
  private map: any; // Usamos any para evitar problemas de SSR
  private isClient = false;
  private L: any; // Leaflet se cargará dinámicamente
  private schoolMarkers: any[] = []; // Array para almacenar marcadores de escuelas
  private markerIcons: any = {}; // Iconos para diferentes tipos de ofertas
  public legendExpanded = false; // Estado de la leyenda (retraída por defecto)

  // Coordenadas de Neuquén Capital
  private neuquenCoords: [number, number] = [-38.9516, -68.0591];

  ngOnInit() {
    this.isClient = isPlatformBrowser(this.platformId);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['escuelas'] && this.map && this.L && this.isClient) {
      this.updateSchoolMarkers();
    }
  }

  ngAfterViewInit() {
    if (this.isClient) {
      this.loadLeafletAndInitMap();
    }
  }

  ngOnDestroy() {
    if (this.isClient) {
      this.clearSchoolMarkers();
      if (this.map) {
        this.map.remove();
      }
    }
  }

  private async loadLeafletAndInitMap(): Promise<void> {
    try {
      // Importación dinámica de Leaflet solo en el cliente
      const leafletModule = await import('leaflet');
      this.L = leafletModule.default || leafletModule;
      
      // Configurar iconos predeterminados después de cargar Leaflet
      await this.setupLeafletIcons();
      
      // Inicializar el mapa
      this.initMap();
      
      // Agregar marcadores de escuelas si ya hay datos
      if (this.escuelas.length > 0) {
        this.addSchoolMarkers();
      }
    } catch (error) {
      console.error('Error loading Leaflet:', error);
    }
  }

  private async setupLeafletIcons(): Promise<void> {
    if (!this.L || !this.isClient) return;

    // Configurar iconos de diferentes colores para las ofertas educativas
    this.setupColoredMarkerIcons();
  }

  private setupColoredMarkerIcons(): void {
    if (!this.L) return;

    // Definir iconos por tipo de oferta educativa
    const iconConfig = {
      iconSize: [32, 52], // Aumentado de [25, 41]
      iconAnchor: [16, 52], // Ajustado proporcionalmente
      popupAnchor: [1, -46], // Ajustado para el nuevo tamaño
      tooltipAnchor: [18, -32], // Ajustado proporcionalmente
      shadowSize: [52, 52], // Aumentado proporcionalmente
      shadowUrl: '/assets/marker-shadow.png'
    };

    // Iconos para diferentes ofertas educativas
    this.markerIcons = {
      inicial: this.L.icon({
        ...iconConfig,
        iconUrl: this.createColoredMarkerIcon('#FF6B6B'), // Rojo coral para inicial
        iconRetinaUrl: this.createColoredMarkerIcon('#FF6B6B', true)
      }),
      primaria: this.L.icon({
        ...iconConfig,
        iconUrl: this.createColoredMarkerIcon('#4ECDC4'), // Verde azulado para primaria
        iconRetinaUrl: this.createColoredMarkerIcon('#4ECDC4', true)
      }),
      secundaria: this.L.icon({
        ...iconConfig,
        iconUrl: this.createColoredMarkerIcon('#45B7D1'), // Azul para secundaria
        iconRetinaUrl: this.createColoredMarkerIcon('#45B7D1', true)
      }),
      superior: this.L.icon({
        ...iconConfig,
        iconUrl: this.createColoredMarkerIcon('#9C88FF'), // Púrpura para superior
        iconRetinaUrl: this.createColoredMarkerIcon('#9C88FF', true)
      }),
      especial: this.L.icon({
        ...iconConfig,
        iconUrl: this.createColoredMarkerIcon('#FFD93D'), // Amarillo para especial
        iconRetinaUrl: this.createColoredMarkerIcon('#FFD93D', true)
      }),
      adultos: this.L.icon({
        ...iconConfig,
        iconUrl: this.createColoredMarkerIcon('#FF8C42'), // Naranja para adultos
        iconRetinaUrl: this.createColoredMarkerIcon('#FF8C42', true)
      }),
      multiple: this.L.icon({
        ...iconConfig,
        iconUrl: this.createColoredMarkerIcon('#6BCF7F'), // Verde para múltiples ofertas
        iconRetinaUrl: this.createColoredMarkerIcon('#6BCF7F', true)
      }),
      default: this.L.icon({
        ...iconConfig,
        iconUrl: this.createColoredMarkerIcon('#95A5A6'), // Gris para sin categorizar
        iconRetinaUrl: this.createColoredMarkerIcon('#95A5A6', true)
      })
    };
  }

  private createColoredMarkerIcon(color: string, isRetina: boolean = false): string {
    const baseSize = 32; // Aumentado de 25
    const size = isRetina ? baseSize * 2 : baseSize;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size * 1.625; // Proporción típica de marcador (52/32)
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return '/assets/marker-icon.png';

    // Dibujar marcador con color personalizado
    ctx.fillStyle = color;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = isRetina ? 4 : 2;
    
    // Forma de gota del marcador
    const centerX = size / 2;
    const centerY = size * 0.4;
    const radius = size * 0.35;
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Punto en el centro
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Punta del marcador
    ctx.fillStyle = color;
    ctx.strokeStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY + radius);
    ctx.lineTo(centerX - radius * 0.3, centerY + radius * 1.8);
    ctx.lineTo(centerX + radius * 0.3, centerY + radius * 1.8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    return canvas.toDataURL();
  }

  private initMap(): void {
    if (!this.L || !this.isClient || !this.mapContainer) return;

    try {
      // Inicializar el mapa centrado en Neuquén
      this.map = this.L.map(this.mapContainer.nativeElement, {
        center: this.neuquenCoords,
        zoom: 10,
        zoomControl: true,
        attributionControl: true
      });

      // Agregar capa base de OpenStreetMap
      const osmLayer = this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        minZoom: 6
      });
      
      osmLayer.addTo(this.map);

      // Agregar marcador en Neuquén Capital
      const neuquenMarker = this.L.marker(this.neuquenCoords)
        .addTo(this.map)
        .bindPopup('<b>Neuquén Capital</b><br>Capital de la provincia de Neuquén')
        .openPopup();

      // Definir límites aproximados de la provincia de Neuquén (comentado para permitir navegación libre)
      // const neuquenBounds = [
      //   [-41.0, -71.5], // Suroeste
      //   [-36.0, -68.0]  // Noreste
      // ];

      // Establecer límites máximos del mapa (comentado para permitir navegación libre)
      // this.map.setMaxBounds(neuquenBounds);

      // Agregar marcadores de escuelas en lugar de ciudades
      this.addSchoolMarkers();
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }

  private addSchoolMarkers(): void {
    if (!this.L || !this.map || !this.isClient) return;

    // Limpiar marcadores existentes
    this.clearSchoolMarkers();

    this.escuelas.forEach(escuela => {
      try {
        // Verificar que las coordenadas sean válidas
        if (escuela.latitud && escuela.longitud && 
            !isNaN(escuela.latitud) && !isNaN(escuela.longitud)) {
          
          // Determinar el tipo de oferta para seleccionar el icono
          const tipoOferta = this.determinarTipoOferta(escuela);
          const icon = this.markerIcons[tipoOferta] || this.markerIcons.default;
          
          // Crear contenido del popup con información de la escuela
          const popupContent = this.createSchoolPopupContent(escuela, tipoOferta);
          
          // Crear marcador con icono específico
          const marker = this.L.marker([escuela.latitud, escuela.longitud], { icon })
            .addTo(this.map)
            .bindPopup(popupContent);
          
          // Almacenar marcador para poder limpiarlo después
          this.schoolMarkers.push(marker);
        }
      } catch (error) {
        console.error(`Error adding marker for school ${escuela.cue_anexo}:`, error);
      }
    });
  }

  private determinarTipoOferta(escuela: Escuela): string {
    if (!escuela.ofertas || escuela.ofertas.length === 0) {
      return 'default';
    }

    // Filtrar ofertas activas
    const ofertasActivas = escuela.ofertas.filter(oferta => 
      oferta.estado_oferta === 'Activo' || oferta.estado_oferta === 'ACTIVO'
    );

    if (ofertasActivas.length === 0) {
      return 'default';
    }

    // Contar tipos de niveles
    const niveles = new Set(ofertasActivas.map(oferta => 
      oferta.nivel.toLowerCase().trim()
    ));

    const modalidades = new Set(ofertasActivas.map(oferta => 
      oferta.modalidad.toLowerCase().trim()
    ));

    // Si tiene múltiples niveles, es una escuela múltiple
    if (niveles.size > 1) {
      return 'multiple';
    }

    // Determinar por modalidad especial primero
    if (modalidades.has('especial') || modalidades.has('educación especial')) {
      return 'especial';
    }

    if (modalidades.has('adultos') || modalidades.has('educación de adultos') || 
        modalidades.has('educación permanente de adultos')) {
      return 'adultos';
    }

    // Determinar por nivel
    const nivel = Array.from(niveles)[0];
    
    if (nivel.includes('inicial') || nivel.includes('jardín') || 
        nivel.includes('maternal') || nivel.includes('sala')) {
      return 'inicial';
    }
    
    if (nivel.includes('primari') || nivel.includes('básic') || 
        nivel.includes('egb') || nivel.includes('primaria')) {
      return 'primaria';
    }
    
    if (nivel.includes('secundari') || nivel.includes('medio') || 
        nivel.includes('polimodal') || nivel.includes('bachiller')) {
      return 'secundaria';
    }
    
    if (nivel.includes('superior') || nivel.includes('terciario') || 
        nivel.includes('universitario') || nivel.includes('técnico superior')) {
      return 'superior';
    }

    return 'default';
  }

  private createSchoolPopupContent(escuela: Escuela, tipoOferta?: string): string {
    const ofertas = escuela.ofertas.map(oferta => 
      `${oferta.nivel} - ${oferta.modalidad}`
    ).join('<br>');

    // Mapeo de colores para mostrar en el popup
    const colores: {[key: string]: {color: string, nombre: string}} = {
      inicial: {color: '#FF6B6B', nombre: 'Nivel Inicial'},
      primaria: {color: '#4ECDC4', nombre: 'Nivel Primario'},
      secundaria: {color: '#45B7D1', nombre: 'Nivel Secundario'},
      superior: {color: '#9C88FF', nombre: 'Nivel Superior'},
      especial: {color: '#FFD93D', nombre: 'Educación Especial'},
      adultos: {color: '#FF8C42', nombre: 'Educación de Adultos'},
      multiple: {color: '#6BCF7F', nombre: 'Múltiples Ofertas'},
      default: {color: '#95A5A6', nombre: 'Sin Categorizar'}
    };

    const categoriaInfo = tipoOferta ? colores[tipoOferta] : colores['default'];

    return `
      <div style="font-family: 'Inter', sans-serif; max-width: 280px;">
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <div style="width: 12px; height: 12px; background-color: ${categoriaInfo.color}; border-radius: 50%; margin-right: 8px; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>
          <span style="font-size: 11px; color: #6b7280; font-weight: 500;">${categoriaInfo.nombre}</span>
        </div>
        <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #1f2937;">
          ${escuela.localizacion}
        </h3>
        <p style="margin: 0 0 4px 0; font-size: 12px; color: #6b7280;">
          <strong>CUE:</strong> ${escuela.cue_anexo}
        </p>
        <p style="margin: 0 0 4px 0; font-size: 12px; color: #6b7280;">
          <strong>Localidad:</strong> ${escuela.localidad}
        </p>
        <p style="margin: 0 0 4px 0; font-size: 12px; color: #6b7280;">
          <strong>Sector:</strong> ${escuela.sector} - ${escuela.ambito}
        </p>
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280;">
          <strong>Dirección:</strong> ${escuela.domicilio_principal}
        </p>
        <div style="border-top: 1px solid #e5e7eb; padding-top: 8px;">
          <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 600; color: #374151;">
            Ofertas Educativas:
          </p>
          <div style="font-size: 11px; color: #6b7280; line-height: 1.3;">
            ${ofertas || 'No hay ofertas registradas'}
          </div>
        </div>
      </div>
    `;
  }

  private clearSchoolMarkers(): void {
    if (this.schoolMarkers.length > 0) {
      this.schoolMarkers.forEach(marker => {
        if (this.map && marker) {
          this.map.removeLayer(marker);
        }
      });
      this.schoolMarkers = [];
    }
  }

  private updateSchoolMarkers(): void {
    if (this.map && this.L && this.isClient) {
      this.addSchoolMarkers();
    }
  }

  // Método público para alternar la leyenda
  public toggleLegend(): void {
    this.legendExpanded = !this.legendExpanded;
  }

  // Método para centrar el mapa en una ubicación específica
  public centerOnLocation(lat: number, lng: number, zoom: number = 12): void {
    if (this.map && this.isClient) {
      this.map.setView([lat, lng], zoom);
    }
  }

  // Método para agregar un marcador personalizado
  public addMarker(lat: number, lng: number, title: string, description?: string): void {
    if (this.map && this.L && this.isClient) {
      try {
        const marker = this.L.marker([lat, lng]).addTo(this.map);
        if (description) {
          marker.bindPopup(`<b>${title}</b><br>${description}`);
        } else {
          marker.bindPopup(`<b>${title}</b>`);
        }
      } catch (error) {
        console.error('Error adding custom marker:', error);
      }
    }
  }
}
