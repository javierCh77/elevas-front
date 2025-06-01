"use client";

import { Empleado } from "@/types/empleado";
import { Users } from "lucide-react";
import Image from "next/image";

interface Props {
  open: boolean;
  empleado: Empleado | null;
  onClose: () => void;
}

export default function EmpleadosDetalleModal({ open, empleado, onClose }: Props) {
  if (!open || !empleado) return null;

  const imageUrl = empleado.imagenPerfil
    ? `http://localhost:3005${empleado.imagenPerfil}`
    : null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center gap-2 mb-4">
          <Users color="#b1a14f" />
          <h3 className="text-xl font-bold text-[#59462e]">Detalle del Empleado</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[#322616]">
          {/* Imagen */}
          <div className="col-span-1 flex justify-center items-start">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Foto de perfil"
                width={180}
                height={180}
                className="rounded-lg border border-[#BCB563] object-contain h-auto max-h-52 w-auto"
              />
            ) : (
              <div className="text-sm italic text-gray-500">Sin imagen</div>
            )}
          </div>

          {/* Datos */}
          <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><span className="font-semibold">Nombre:</span> {empleado.nombre}</p>
            <p><span className="font-semibold">Apellido:</span> {empleado.apellido}</p>
            <p><span className="font-semibold">DNI:</span> {empleado.dni}</p>
            <p><span className="font-semibold">Teléfono:</span> {empleado.telefono}</p>
            <p><span className="font-semibold">Email:</span> {empleado.email}</p>
            <p><span className="font-semibold">Dirección:</span> {empleado.direccion}</p>
            <p><span className="font-semibold">Empresa:</span> {empleado.empresa?.nombre}</p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            className="px-4 py-2 bg-[#9B8444] hover:bg-[#B1A14F] text-white rounded-lg"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
