export interface RespuestaEncuesta {
  id: string;
  nombreEmpresa: string;
  fecha: string;
  respuestas: {
    recomendariaEmpresa?: number;
    trabajoValorado?: number;
    equilibrioVidaLaboral?: number;
    culturaUnaPalabra?: string;
    claridadObjetivos?: number;
    capacitacionesUtiles?:number;
    recursosDisponibles?: number;
    opinionTenidaEnCuenta?:number;
    comodidadFeedback?: number;
    oportunidadesDesarrollo?: number;
    [key: string]: number | string | undefined;
  };
  nombre: string;
  apellido: string;
}
