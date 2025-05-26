import { Empresa } from "./empresa";

export interface Afiliado {
  // 🧍 Datos personales
  id: string;
  nombre: string;
  apellido: string;
  sexo: "M" | "F" | "X";
  esTitular: boolean;
  numeroAfiliado: string;
  dni: string;
  cuil: string;
  fechaNacimiento: string;
  direccion: string;
  piso?: string;
  departamento?: string;
  telefono: string;
  email: string;
  estado?: string;
  observaciones?: string;

  // 💼 Datos laborales
  situacionLaboral?: string;
  planta?: string;
  fechaAltaEmpresa?: string;
  empresaId?: string;
  empresa?: Empresa;

  // 📋 Estado de afiliación
  situacionAfiliado: "activo" | "suspendido" | "baja";
  diabetico: boolean;
  planMaterno?: boolean;
  certificadoDiscapacidad: boolean;

  // 👪 Relación con titular
  titularId?: string;
  titular?: Afiliado;
  relacionConTitular?: "hijo/a" | "conyuge" | "persona a cargo";
  fotoUrl?:string
}

export type AfiliadoInput = Omit<Afiliado, "id" | "empresa" | "titular">;
