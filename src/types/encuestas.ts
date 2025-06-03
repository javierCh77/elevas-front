export interface RespuestaEncuesta {
  id: string;
  nombreEmpresa: string;
  fecha: string;
  nombre: string;
  apellido: string;
  respuestas: {
    climaComodidadEquipo?: number;
    climaAmbienteSaludable?: number;
    climaEquilibrioVida?: number;

    liderazgoInformacionClara?: number;
    liderazgoConfianzaDireccion?: number;
    liderazgoOpinionesEscuchadas?: number;

    recursosSatisfaccionSalario?: number;
    recursosCompensacionJusta?: number;

    desarrolloOportunidades?: number;
    desarrolloMotivacion?: number;
    desarrolloAporteSignificativo?: number;
    desarrolloContinuarEmpresa?: number;

    reconocimientoValorado?: number;
    reconocimientoDisfruteTrabajo?: number;

    recomendariaEmpresa?: number;
    culturaUnaPalabra?: string;
    capacitacionesUtiles?: number;

    [key: string]: number | string | undefined;
  };
}
