import { Empresa } from "./empresa";

export interface Empleado {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  direccion: string;
  imagenPerfil?: string;
  empresaId: string;
  empresa?: Empresa; // 👈 asociación completa

}

export interface EmpleadoInput {
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  direccion: string;
  imagenPerfil: File | null;
  empresaId: string;
  empresa?: Empresa; 
  
}
