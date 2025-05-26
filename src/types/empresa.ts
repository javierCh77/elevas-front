export interface Empresa {
  id: string;
  nombre: string;
  cuit: string;
  direccion: string;
  telefono: string;
  email: string;
}

export interface EmpresaInput {
  nombre: string;
  cuit: string;
  direccion: string;
  telefono: string;
  email: string;
}
