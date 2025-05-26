"use client";

import { Empresa } from "@/types/empresa";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  empresas: Empresa[];
  onEdit: (empresa: Empresa) => void;
  onDelete: (id: string) => void;
}

export default function EmpresaTable({ empresas, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-auto rounded-lg border border-[#BCB563]">
      <table className="w-full text-sm text-left">
        <thead className="bg-[#9B8444] text-white text-sm">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">CUIT</th>
            <th className="p-2">Teléfono</th>
            <th className="p-2">Email</th>
            <th className="p-2 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-[#EEEED7] text-[#322616]">
          {empresas.map((empresa) => (
            <tr key={empresa.id} className="hover:bg-[#F8F8EE] transition-colors">
              <td className="p-2">{empresa.nombre}</td>
              <td className="p-2">{empresa.cuit}</td>
              <td className="p-2">{empresa.telefono}</td>
              <td className="p-2">{empresa.email}</td>
              <td className="p-2 text-right flex justify-end gap-2">
                <button
                  onClick={() => onEdit(empresa)}
                  className="text-[#1f5d89] hover:text-[#33589a]"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDelete(empresa.id)}
                  className="text-red-600 hover:text-red-800"
                >
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
