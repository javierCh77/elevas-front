// src/types/dashboard.ts

export interface Turno {
  id: string;
  fecha: string;
  hora: string;
  estado: string;
  motivoConsulta?: string;
  paciente: {
    nombre: string;
    apellido: string;
  };
  profesional: {
    nombre: string;
    apellido: string;
    servicio: {
      nombre: string;
    };
  };
}

export interface Profesional {
  id: string;
  nombre: string;
  apellido: string;
  cantidadTurnos: number;
}

export interface Stats {
  turnosHoy: number;
  pacientesNuevos: number;
  obrasSocialesActivas: number;
  profesionalesActivos: number;
  turnosPorServicio: { servicio: string; cantidad: number }[];
  turnosPorDia: { fecha: string; cantidad: number }[];
  obraSocialMasUsada: { nombre: string; cantidad: number };
  ultimosTurnos: Turno[];
  topProfesionales: Profesional[];
}
