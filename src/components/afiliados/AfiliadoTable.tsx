"use client";
import { Afiliado } from "@/types/afiliado";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface AfiliadoTableProps {
  afiliados: Afiliado[];
  onEdit: (afiliado: Afiliado) => void;
  onDelete: (id: string) => void;
  onView: (afiliado: Afiliado) => void;
}

function calcularEdad(fechaNacimiento: string): number {
  if (!fechaNacimiento) return 0;
  const nacimiento = new Date(fechaNacimiento);
  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}

export default function AfiliadoTable({
  afiliados,
  onEdit,
  onDelete,
  onView,
}: AfiliadoTableProps) {
  return (
    <div className="w-full overflow-x-auto max-w-full h-[72vh] rounded-lg shadow-md">

     <table className="min-w-full border-collapse shadow-md text-center">

        <thead className="bg-[#202f4b] text-white text-sm">
          <tr>
            <th className="px-6 py-2  text-xs font-medium uppercase">
              Nombre
            </th>
            <th className="px-6 py-2  text-xs font-medium uppercase">
              Apellido
            </th>
            <th className="px-6 py-2  text-xs font-medium uppercase">
              DNI
            </th>
            <th className="px-6 py-2 text-xs font-medium uppercase">
              Sexo
            </th>
            <th className="px-6 py-2 text-xs font-medium uppercase">
              Titular
            </th>
            <th className="px-6 py-2  text-xs font-medium uppercase">
              Nacimiento
            </th>
            <th className="px-6 py-2  text-xs font-medium uppercase">
              Teléfono
            </th>
          
            <th className="px-6 py-2  text-xs font-medium uppercase">
              S.Laboral
            </th>
            <th className="px-6 py-2  text-xs font-medium uppercase">
              Empresa
            </th>
            <th className="px-6 py-2  text-xs font-medium uppercase">
              Planta
            </th>
            <th className="px-6 py-2  text-xs font-medium uppercase">
              S.Afiliado
            </th>
            <th className="px-6 py-2  text-xs font-medium uppercase">
              Diabetico
            </th>
            <th className="px-6 py-2  text-xs font-medium uppercase">
              Discapacidad
            </th>
            <th className="px-6 py-2  text-xs font-medium uppercase">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {afiliados.map((a) => (
            <tr key={a.id}>
              <td className="px-6 py-2 text-xs text-gray-700">{a.nombre}</td>
              <td className="px-6 py-2 text-xs text-gray-700">{a.apellido}</td>
              <td className="px-6 py-2 text-xs text-gray-700">{a.dni}</td>
              <td className="px-6 py-2 text-xs text-gray-700">{a.sexo}</td>
              <td className="px-6 py-2 text-xs text-gray-700">
                {a.esTitular ? "Sí" : "No"}
              </td>
              <td className="px-6 py-2 text-xs text-gray-700">
                {calcularEdad(a.fechaNacimiento)} años
              </td>

              <td className="px-6 py-2 text-xs text-gray-700">{a.telefono}</td>
              
              <td className="px-6 py-2 text-xs text-gray-700">
                {a.situacionLaboral}
              </td>
              <td className="px-6 py-2 text-xs text-gray-700">
                {a.empresa?.nombre ?? "-"}
              </td>
              <td className="px-6 py-2 text-xs text-gray-700">{a.planta}</td>
              <td
                className={`px-6 py-2 text-xs font-medium text-center rounded ${
                  a.situacionAfiliado === "activo"
                    ? "bg-green-100 text-green-800"
                    : a.situacionAfiliado === "suspendido"
                    ? "bg-amber-100 text-amber-800"
                    : a.situacionAfiliado === "baja"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-700 text-white"
                }`}
              >
                {a.situacionAfiliado.charAt(0).toUpperCase() +
                  a.situacionAfiliado.slice(1)}
              </td>

              <td className="px-6 py-2 text-xs text-gray-700">
                {a.diabetico ? "Sí" : "No"}
              </td>
              <td className="px-6 py-2 text-xs text-gray-700">
                {a.certificadoDiscapacidad ? "Sí" : "No"}
              </td>

              <td className="px-6 py-2 text-xs text-gray-700 flex gap-3">
                <button
                  onClick={() => onView(a)}
                  className="text-blue-500 hover:underline cursor-pointer"
                  title="Ver Detalles"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => onEdit(a)}
                  className="text-[#1F5D89] hover:underline cursor-pointer"
                  title="Editar"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDelete(a.id)}
                  className="text-red-400 hover:underline cursor-pointer"
                  title="Eliminar"
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