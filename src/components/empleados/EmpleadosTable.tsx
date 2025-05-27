"use client";

import { Empleado } from "@/types/empleado";
import { Eye, Pencil, Trash2 } from "lucide-react";


interface Props {
  empleados: Empleado[];
  onEdit: (empleado: Empleado) => void;
  onDelete: (id: string) => void;
  onView: (empleado: Empleado) => void;
}

export default function EmpleadoTable({ empleados, onEdit, onDelete, onView }: Props) {
  return (
    <div className="overflow-auto rounded-lg border border-[#BCB563]">
      <table className="w-full text-sm text-left">
        <thead className="bg-[#9B8444] text-white text-sm">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Apellido</th>
            <th className="p-2">DNI</th>
            <th className="p-2">Teléfono</th>
            <th className="p-2">Email</th>
            <th className="p-2">Empresa</th>
            <th className="p-2 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-[#EEEED7] text-[#322616]">
          {empleados.map((empleado) => (
            <tr key={empleado.id} className="hover:bg-[#F8F8EE] transition-colors">
              <td className="p-2">{empleado.nombre}</td>
              <td className="p-2">{empleado.apellido}</td>
              <td className="p-2">{empleado.dni}</td>
              <td className="p-2">{empleado.telefono}</td>
              <td className="p-2">{empleado.email}</td>
              <td className="p-2">{empleado.empresa?.nombre ?? "Sin empresa"}</td>
              <td className="p-2 text-right flex justify-end gap-2">
                <button onClick={() => onView(empleado)} className="text-[#1f5d89] hover:text-[#33589a]">
                  <Eye size={18} />
                </button>
                <button onClick={() => onEdit(empleado)} className="text-[#9B8444] hover:text-[#B1A14F]">
                  <Pencil size={18} />
                </button>
                <button onClick={() => onDelete(empleado.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
