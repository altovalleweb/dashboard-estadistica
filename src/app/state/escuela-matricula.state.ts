import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { EscuelaMatricula, EscuelaMatriculaPorSectorAmbitoModalidadNivel } from '../class/escuela-matricula';
import { MODALIDAD_ADULTOS, MODALIDAD_COMUN, MODALIDAD_ESPECIAL, NIVELES_ADULTOS, NIVELES_COMUN_CON_APERTURA, NIVELES_ESPECIAL } from '../const/const';
import { FiltroState } from './filtro.state';
import { EscuelaService } from '../services/escuela.service';
import { MatriculaService } from '../services/matricula.service';
import { EscuelaState } from './escuela.state';
import { MatriculaState } from './matricula.state';
import { FILTRODISTRITO, FILTRODEPARTAMENTO, FILTROREGION } from '../const/filtros';

@Injectable({
  providedIn: 'root'
})
export class EscuelaMatriculaState {

  private _filtroState = inject(FiltroState);
  private _escuelaService = inject(EscuelaService);
  private _matriculaService = inject(MatriculaService);
  private _escuelaMatricula = new EscuelaMatricula();
  private _escuelasState = inject(EscuelaState);
  private _matriculaState = inject(MatriculaState);

private readonly _escuelasMatriculasPorSectorAmbitoModalidadNivelComun = signal<EscuelaMatriculaPorSectorAmbitoModalidadNivel[] | null>(null);
private readonly _escuelasMatriculasPorSectorAmbitoModalidadNivelEspecial = signal<EscuelaMatriculaPorSectorAmbitoModalidadNivel[] | null>(null);
private readonly _escuelasMatriculasPorSectorAmbitoModalidadNivelAdultos = signal<EscuelaMatriculaPorSectorAmbitoModalidadNivel[] | null>(null);
 

readonly escuelasMatriculasPorSectorAmbitoModalidadNivelComun = computed(() => this._escuelasMatriculasPorSectorAmbitoModalidadNivelComun());
readonly escuelasMatriculasPorSectorAmbitoModalidadNivelEspecial = computed(() => this._escuelasMatriculasPorSectorAmbitoModalidadNivelEspecial());
readonly escuelasMatriculasPorSectorAmbitoModalidadNivelAdultos = computed(() => this._escuelasMatriculasPorSectorAmbitoModalidadNivelAdultos());

//Implemetamos el patron facade para exponer los datos de escuelas y matricula a traves de este estado
// y asi el componente home, u otros que hagan uso de los datos, solo dependan de este estado y no de los estados de escuela y matricula
// Ademas este estado se encarga de coordinar la carga de datos cuando cambia el filtro

  // Datos de escuelas
  readonly totalEscuelas = this._escuelasState.totalEscuelas
  readonly escuelaPorAnio = this._escuelasState.escuelaPorAnio
  readonly escuelaPorModalidadNivelComun = this._escuelasState.escuelaPorModalidadNivelComun
  readonly escuelaPorModalidadNivelEspecial = this._escuelasState.escuelaPorModalidadNivelEspecial
  readonly escuelaPorModalidadNivelAdultos = this._escuelasState.escuelaPorModalidadNivelAdultos
  readonly escuelasPorSectorAmbito = this._escuelasState.escuelasPorSectorAmbito
  readonly escuelasPorSectorAmbitoComun = this._escuelasState.escuelasPorSectorAmbitoComun
  readonly escuelasPorSectorAmbitoEspecial = this._escuelasState.escuelasPorSectorAmbitoEspecial
  readonly escuelasPorSectorAmbitoAdultos = this._escuelasState.escuelasPorSectorAmbitoAdultos
  // Datos de matricula
  readonly totalMatricula = this._matriculaState.totalMatricula
  readonly matriculaPorAnio = this._matriculaState.matriculaPorAnio
  readonly matriculaPorModalidadNivelComun = this._matriculaState.matriculaPorModalidadNivelComun
  readonly matriculaPorModalidadNivelEspecial = this._matriculaState.matriculaPorModalidadNivelEspecial
  readonly matriculaPorModalidadNivelAdultos = this._matriculaState.matriculaPorModalidadNivelAdultos
  readonly matriculaPorSectorAmbito = this._matriculaState.matriculaPorSectorAmbito
  readonly matriculaPorSectorAmbitoModalidadComun = this._matriculaState.matriculaPorSectorAmbitoModalidadComun
  readonly matriculaPorSectorAmbitoModalidadEspecial = this._matriculaState.matriculaPorSectorAmbitoModalidadEspecial
  readonly matriculaPorSectorAmbitoModalidadAdultos = this._matriculaState.matriculaPorSectorAmbitoModalidadAdultos

changeFilterState = effect(() => {    
    const filter = this._filtroState.activeFilter();
    const tipoFiltro = filter.geographic.type || null;
    const valueFiltro = filter.geographic.value || null;

    let escuelasData: any[] = [];  
    let escuelasPorAnioData: any[] = [];
    let matriculaData: any[] = [];
    let matriculasPorAnioData: any[] = [];
    

    if (tipoFiltro === FILTROREGION) {
     escuelasData = this._escuelaService.getEscuelasPorRegionModalidadNivel(valueFiltro?.id || '');
      matriculaData = this._matriculaService.getMatriculaPorRegionModalidadNivel(valueFiltro?.id || '');
      escuelasPorAnioData = this._escuelaService.getTotalEscuelasPorAnioRegion(valueFiltro?.id || '');
      matriculasPorAnioData = this._matriculaService.getTotalMatriculaPorAnioRegion(valueFiltro?.id || '');

    }
    else if (tipoFiltro === FILTRODEPARTAMENTO) {
      escuelasData =this._escuelaService.getEscuelasPorDepartamentoModalidadNivel(valueFiltro?.id || '');
      matriculaData = this._matriculaService.getMatriculaPorDepartamentoModalidadNivel(valueFiltro?.id || '');
      escuelasPorAnioData = this._escuelaService.getTotalEscuelasPorAnioDepartamento(valueFiltro?.id || '');
      matriculasPorAnioData = this._matriculaService.getTotalMatriculaPorAnioDepartamento(valueFiltro?.id || '');

    }
    else if (tipoFiltro === FILTRODISTRITO) {
      escuelasData =this._escuelaService.getEscuelasPorDistritoModalidadNivel(valueFiltro?.id || '');
      matriculaData = this._matriculaService.getMatriculaPorDistritoModalidadNivel(valueFiltro?.id || '');
      escuelasPorAnioData = this._escuelaService.getTotalEscuelasPorAnioDistrito(valueFiltro?.id || '');
      matriculasPorAnioData = this._matriculaService.getTotalMatriculaPorAnioDistrito(valueFiltro?.id || '');

    }
    else {
      escuelasData =this._escuelaService.getEscuelasPorModalidadNivelProvincia();
      matriculaData = this._matriculaService.getMatriculaPorModalidadNivelProvincia();
      escuelasPorAnioData = this._escuelaService.getTotalEscuelasPorAnioProvincia();
      matriculasPorAnioData = this._matriculaService.getTotalMatriculaPorAnioProvincia();
    }

    
    this._escuelaMatricula.setEscuelasData(escuelasData)
    this._escuelaMatricula.setMatriculaData(matriculaData)
    

    this.loadData();

    this._escuelasState.loadData(escuelasData, escuelasPorAnioData);
    this._matriculaState.loadData(matriculaData, matriculasPorAnioData);

  })

  loadData() {
   this.loadEscuelasMatriculasPorSectorAmbitoModalidadNivelAdultos();
   this.loadEscuelasMatriculasPorSectorAmbitoModalidadNivelComun();
   this.loadEscuelasMatriculasPorSectorAmbitoModalidadNivelEspecial();
  }
 


  loadEscuelasMatriculasPorSectorAmbitoModalidadNivelComun( ) {
    const data = this._escuelaMatricula.getEscuelasMatriculasPorSectorAmbitoModalidadNivel(MODALIDAD_COMUN, NIVELES_COMUN_CON_APERTURA);
    this._escuelasMatriculasPorSectorAmbitoModalidadNivelComun.set(data);
  }

  loadEscuelasMatriculasPorSectorAmbitoModalidadNivelEspecial( ) {
    const data = this._escuelaMatricula.getEscuelasMatriculasPorSectorAmbitoModalidadNivel(MODALIDAD_ESPECIAL, NIVELES_ESPECIAL);
    this._escuelasMatriculasPorSectorAmbitoModalidadNivelEspecial.set(data);
  }

  loadEscuelasMatriculasPorSectorAmbitoModalidadNivelAdultos( ) {
    const data = this._escuelaMatricula.getEscuelasMatriculasPorSectorAmbitoModalidadNivel(MODALIDAD_ADULTOS, NIVELES_ADULTOS);
    this._escuelasMatriculasPorSectorAmbitoModalidadNivelAdultos.set(data);
  }

}
