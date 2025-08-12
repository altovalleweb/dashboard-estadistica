import { computed, inject, Injectable, signal } from '@angular/core';
import { Escuela } from '../interfaces/common.interface';
import { EscuelaService } from '../services/escuela.service';

@Injectable({
  providedIn: 'root'
})
export class PadronEscuelaState {

  private _escuelaService = inject(EscuelaService)

  private readonly _padronEscuelas= signal<Escuela[] | null>(null);

  readonly padronEscuelas = computed(() => this._padronEscuelas());

constructor(){
  this._padronEscuelas.set(this._escuelaService.getPadronEscuelas());
}




}
