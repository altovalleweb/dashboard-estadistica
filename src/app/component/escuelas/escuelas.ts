import { Component, inject } from '@angular/core';
import { PadronEscuelaState } from '../../states/padron-escuela-state';
import { Escuela, Oferta } from '../../interfaces/common.interface';

@Component({
  selector: 'app-escuelas',
  imports: [],
  templateUrl: './escuelas.html',
  styleUrl: './escuelas.css'
})
export class Escuelas {
 private _padronEscuelaState = inject(PadronEscuelaState);

 padronEscuelas = this._padronEscuelaState.padronEscuelas;

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
