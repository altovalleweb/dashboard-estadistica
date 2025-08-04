import { inject } from "@angular/core";
import { EscuelaService } from "../service/escuela.service";
import { MatriculaService } from "../service/matricula.service";
import { getSerializedValues } from "../utils/function";

export interface EscuelaMatriculaPorSectorAmbitoModalidadNivel {
  modalidad: string;
  nivel: string;
  escuelas_estatal: number | null;
  escuelas_porcentajeEstatal: number | null;
  escuelas_privado: number | null;
  escuelas_porcentajePrivado: number | null;
  escuelas_rural: number | null;
  escuelas_porcentajeRural: number | null;
  escuelas_urbano: number | null;
  escuelas_porcentajeUrbano: number | null;
  matricula_estatal: number | null;
  matricula_porcentajeEstatal: number | null;
  matricula_privado: number | null;
  matricula_porcentajePrivado: number | null;
  matricula_rural: number | null;
  matricula_porcentajeRural: number | null;
  matricula_urbano: number | null;
  matricula_porcentajeUrbano: number | null;

}

export class EscuelaMatricula {

      private _es = inject(EscuelaService);
      private _ms = inject(MatriculaService);


    getEscuelasMatriculasPorSectorAmbitoModalidadNivel(modalidad: string, niveles: string[]): EscuelaMatriculaPorSectorAmbitoModalidadNivel[] {

       
      const  dataEscuelas = this._es.getEscuelasPorModalidadNivel();
      const  dataMatricula = this._ms.getMatriculaPorModalidadNivel();


      let dataModalidadNivel: EscuelaMatriculaPorSectorAmbitoModalidadNivel[] = []

      niveles.forEach(nivel => {
        const escuela = dataEscuelas.find(e => e.modalidad.toLowerCase() === modalidad.toLocaleLowerCase() && e.nivel_oferta.toLocaleLowerCase() === nivel.toLocaleLowerCase());
        const matricula = dataMatricula.find(m => m.modalidad.toLowerCase() === modalidad.toLocaleLowerCase() && m.nivel_oferta.toLocaleLowerCase() === nivel.toLocaleLowerCase());

        if (escuela && matricula) {
          dataModalidadNivel.push({
            modalidad: escuela.modalidad,
            nivel: nivel,
            escuelas_estatal: escuela.estatal,
            escuelas_porcentajeEstatal:  escuela.total ? +((escuela.estatal / escuela.total) * 100).toFixed(1) : null,
            escuelas_privado: escuela.privado,
            escuelas_porcentajePrivado: escuela.total ? +((escuela.privado / escuela.total) * 100).toFixed(1) : null,
            escuelas_rural: escuela.rural,
            escuelas_porcentajeRural: escuela.total ? +((escuela.rural / escuela.total) * 100).toFixed(1) : null,
            escuelas_urbano: escuela.urbano,
            escuelas_porcentajeUrbano: escuela.total ? +((escuela.urbano / escuela.total) * 100).toFixed(1) : null,
            matricula_estatal: matricula.estatal,
            matricula_porcentajeEstatal: matricula.total ? +((matricula.estatal / matricula.total) * 100).toFixed(1) : null,
            matricula_privado: matricula.privado,
            matricula_porcentajePrivado: matricula.total ? +((matricula.privado / matricula.total) * 100).toFixed(1) : null,
            matricula_rural: matricula.rural,
            matricula_porcentajeRural: matricula.total ? +((matricula.rural / matricula.total) * 100).toFixed(1) : null,
            matricula_urbano: matricula.urbano,
            matricula_porcentajeUrbano: matricula.total ? +((matricula.urbano / matricula.total) * 100).toFixed(1) : null
          });
        }
      });



      return dataModalidadNivel;
    }


    

}