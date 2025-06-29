export interface Candidato {
  id: string;
  dni: string;
  nombreCompleto: string;
  email?: string;
  telefono?: string;
  ubicacion?: string;
  nivelEstudios?: string;
  tituloObtenido?: string;
  institucion?: string;
  habilidades?: string[];
  idiomas?: string[];
  experiencia?: string;
  pretensionSalarial?: string;
  disponibilidad?: string;
  linkedin?: string;
  observaciones?: string;
  urlCv?: string;
}

export type CandidatoInput = Omit<Candidato, "id">;

export type FormData = CandidatoInput & {
  habilidadesStr: string;
  idiomasStr: string;
};
