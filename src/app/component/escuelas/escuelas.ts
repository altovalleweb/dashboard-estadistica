import { Component,  inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PadronEscuelaState } from '../../states/padron-escuela-state';
import { Escuela, Oferta } from '../../interfaces/common.interface';
import { Map } from './map/map';


@Component({
  selector: 'app-escuelas',
  imports: [CommonModule, Map],
  templateUrl: './escuelas.html',
  styleUrl: './escuelas.css'
})
export class Escuelas  {
  
  private _padronEscuelaState = inject(PadronEscuelaState);

  padronEscuelas = this._padronEscuelaState.padronEscuelas;

  // Cache para evitar regeneración constante de números aleatorios
  private _escuelasExpandidasCache: any[] = [];
  private _lastDataLength = 0;

    

 getTotalEstatales(): number {
   const escuelas = this.padronEscuelas();
   if (!escuelas) return 0;
   return escuelas.filter(escuela => escuela.sector === 'Estatal').length;
 }

 getTotalPrivadas(): number {
   const escuelas = this.padronEscuelas();
   if (!escuelas) return 0;
   return escuelas.filter(escuela => escuela.sector === 'Privado').length;
 }

 /**
  * Formatea las ofertas educativas de una escuela
  * Concatena modalidad y nivel, filtrando ofertas activas
  */
 getOfertasFormateadas(escuela: Escuela): string[] {
   if (!escuela.ofertas || escuela.ofertas.length === 0) {
     return ['Sin ofertas registradas'];
   }

   // Filtrar solo ofertas activas y formatear
   const ofertasActivas = escuela.ofertas
     .filter(oferta => oferta.estado_oferta === 'Activo' || oferta.estado_oferta === 'ACTIVO')
     .map(oferta => `${oferta.modalidad} - ${oferta.nivel}`)
     .filter((value, index, self) => self.indexOf(value) === index); // Eliminar duplicados

   return ofertasActivas.length > 0 ? ofertasActivas : ['Sin ofertas activas'];
 }

 /**
  * Obtiene un resumen corto de las ofertas (primeras 2)
  */
 getOfertasResumen(escuela: Escuela): string {
   const ofertas = this.getOfertasFormateadas(escuela);
   if (ofertas[0] === 'Sin ofertas registradas' || ofertas[0] === 'Sin ofertas activas') {
     return ofertas[0];
   }
   
   if (ofertas.length <= 2) {
     return ofertas.join(', ');
   }
   
   return `${ofertas.slice(0, 2).join(', ')} (+${ofertas.length - 2} más)`;
 }

 /**
  * Prepara los datos expandidos por ofertas para mostrar en la tabla
  * Cada escuela se expande en tantas filas como ofertas activas tenga
  */
 getEscuelasExpandidas() {
   const escuelas = this.padronEscuelas();
   if (!escuelas) return [];

   // Usar cache si los datos no han cambiado
   if (escuelas.length === this._lastDataLength && this._escuelasExpandidasCache.length > 0) {
     return this._escuelasExpandidasCache;
   }

   const expandidas: any[] = [];

   for (const escuela of escuelas) {
     const ofertasActivas = escuela.ofertas?.filter(
       oferta => oferta.estado_oferta === 'Activo' || oferta.estado_oferta === 'ACTIVO'
     ) || [];

     if (ofertasActivas.length === 0) {
       // Si no tiene ofertas activas, crear una fila con "Sin ofertas"
       expandidas.push({
         escuela,
         oferta: null,
         rowspan: 1,
         isFirst: true,
         isLast: true, // Es tanto primera como última
         matricula: 0 // Sin matrícula si no hay ofertas
       });
     } else {
       // Crear una fila por cada oferta activa
       ofertasActivas.forEach((oferta, index) => {
         expandidas.push({
           escuela,
           oferta,
           rowspan: index === 0 ? ofertasActivas.length : 0, // Solo la primera fila tiene rowspan
           isFirst: index === 0,
           isLast: index === ofertasActivas.length - 1, // Marcar la última fila de la escuela
           matricula: this.generarMatriculaAleatoria(oferta) // Generar número aleatorio por oferta
         });
       });
     }
   }

   // Actualizar cache
   this._escuelasExpandidasCache = expandidas;
   this._lastDataLength = escuelas.length;

   return expandidas;
 }

 /**
  * Genera un número aleatorio de matrícula basado en el tipo de oferta
  */
 generarMatriculaAleatoria(oferta: any): number {
   // Generar números más realistas según el nivel educativo
   const nivel = oferta.nivel.toLowerCase();
   
   if (nivel.includes('inicial') || nivel.includes('jardín')) {
     return Math.floor(Math.random() * 80) + 20; // Entre 20 y 100 alumnos
   } else if (nivel.includes('primario') || nivel.includes('primaria')) {
     return Math.floor(Math.random() * 150) + 50; // Entre 50 y 200 alumnos
   } else if (nivel.includes('secundario') || nivel.includes('secundaria')) {
     return Math.floor(Math.random() * 120) + 40; // Entre 40 y 160 alumnos
   } else if (nivel.includes('superior') || nivel.includes('universitario')) {
     return Math.floor(Math.random() * 80) + 15; // Entre 15 y 95 alumnos
   } else {
     return Math.floor(Math.random() * 100) + 25; // Por defecto entre 25 y 125 alumnos
   }
 }

 /**
  * Calcula el total de alumnos en todas las ofertas educativas
  */
 getTotalAlumnos(): number {
   const expandidas = this.getEscuelasExpandidas();
   return expandidas
     .filter(item => item.oferta !== null) // Solo ofertas activas
     .reduce((total, item) => total + item.matricula, 0);
 }

 /**
  * Calcula totales por nivel educativo
  */
 getTotalesPorNivel(): { [key: string]: number } {
   const expandidas = this.getEscuelasExpandidas();
   const totales: { [key: string]: number } = {};

   expandidas
     .filter(item => item.oferta !== null)
     .forEach(item => {
       const nivel = item.oferta.nivel;
       totales[nivel] = (totales[nivel] || 0) + item.matricula;
     });

   return totales;
 }

 /**
  * Obtiene las claves de los totales por nivel para el template
  */
 getNivelesKeys(): string[] {
   return Object.keys(this.getTotalesPorNivel());
 }

 /**
  * Navega al informe matricular de una escuela específica
  */
 verInformeMatricular(escuela: Escuela): void {
   console.log('Ver informe matricular para:', escuela.localizacion, 'CUE:', escuela.cue_anexo);
   
   // Aquí puedes implementar la lógica de navegación
   // Por ejemplo:
   // this.router.navigate(['/informe-matricular', escuela.cue_anexo]);
   
   // O abrir un modal con el informe:
   // this.modalService.openInformeMatricular(escuela);
   
   // Por ahora, solo mostramos un alert con la información
   alert(`Informe matricular para:\n${escuela.localizacion}\nCUE: ${escuela.cue_anexo}\n\nEsta funcionalidad se implementará próximamente.`);
 }

}
