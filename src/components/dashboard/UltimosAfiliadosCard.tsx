"use client";

import { UserRound } from "lucide-react";
import { Afiliado } from "@/types/afiliado";

interface Props {
  afiliados: Pick<Afiliado, "nombre" | "apellido" | "fechaNacimiento">[];
}

function calcularEdad(fechaNacimiento: string | Date) {
  const nacimiento = new Date(fechaNacimiento);
  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad;
}

export default function UltimosAfiliadosCard({ afiliados }: Props) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
      <h3 className="text-md font-semibold  mb-4 flex items-center gap-2">
        <UserRound className="text-indigo-500" size={24} />
        Últimos Afiliados Registrados
      </h3>
      <ul className="text-sm text-gray-700 divide-y divide-gray-200">
        {afiliados.map((a, idx) => (
          <li key={idx} className="py-2 flex justify-between">
            <span>
              {a.nombre} {a.apellido}
            </span>
            <span className="text-xs text-gray-500">
             
              ({calcularEdad(a.fechaNacimiento)} años)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
