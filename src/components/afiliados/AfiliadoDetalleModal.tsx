"use client";

import { useEffect, useRef } from "react";
import { BadgeInfo, X } from "lucide-react";
import { Afiliado } from "@/types/afiliado";
import Image from "next/image";

interface AfiliadoDetalleModalProps {
  open: boolean;
  afiliado: Afiliado | null;
  onClose: () => void;
}

export default function AfiliadoDetalleModal({ open, afiliado, onClose }: AfiliadoDetalleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!open || !afiliado) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-5xl border border-gray-200" ref={modalRef}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '12px', right: '12px', color: '#9ca3af', cursor: 'pointer' }}
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6 pb-4 border-b">
          <BadgeInfo className="text-blue-900" />
          <h2 className="text-xl font-bold text-blue-900">Ficha del Afiliado</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
          {/* Foto */}
          <div className="flex flex-col items-center md:col-span-1">
            <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-300 shadow-md">
              <Image
                src={afiliado.fotoUrl ?? "/images/avatar.png"}
                alt="Foto del afiliado"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 text-gray-600 text-xs">Foto del afiliado</p>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Datos Personales */}
            <div>
              <h3 className="text-md font-semibold mb-2 text-[#1F5D89]">Datos personales</h3>
              <p><strong>N° Afiliado:</strong> {afiliado.numeroAfiliado}</p>
              <p><strong>Nombre:</strong> {afiliado.nombre}</p>
              <p><strong>Apellido:</strong> {afiliado.apellido}</p>
              <p><strong>DNI:</strong> {afiliado.dni}</p>
              <p><strong>CUIL:</strong> {afiliado.cuil}</p>
              <p><strong>Fecha Nac.:</strong> {afiliado.fechaNacimiento}</p>
              <p><strong>Sexo:</strong> {afiliado.sexo}</p>
              <p><strong>Teléfono:</strong> {afiliado.telefono}</p>
              <p><strong>Email:</strong> {afiliado.email}</p>
            </div>

            {/* Datos Laborales */}
            <div>
              <h3 className="text-md font-semibold mb-2 text-[#1F5D89]">Datos laborales</h3>
              <p><strong>Situación laboral:</strong> {afiliado.situacionLaboral ?? '-'}</p>
              <p><strong>Empresa:</strong> {afiliado.empresa?.nombre ?? "Sin empresa"}</p>
              <p><strong>Planta:</strong> {afiliado.planta ?? '-'}</p>
              <p><strong>Fecha Alta Empresa:</strong> {afiliado.fechaAltaEmpresa ?? '-'}</p>
            </div>

            {/* Estado Afiliado */}
            <div>
              <h3 className="text-md font-semibold mb-2 text-[#1F5D89]">Estado del afiliado</h3>
              <p><strong>Es titular:</strong> {afiliado.esTitular ? "Sí" : "No"}</p>
              <p><strong>Situación afiliado:</strong> {afiliado.situacionAfiliado}</p>
              <p><strong>Diabético:</strong> {afiliado.diabetico ? "Sí" : "No"}</p>
              <p><strong>Plan materno:</strong> {afiliado.planMaterno ? "Sí" : "No"}</p>
              <p><strong>Discapacidad:</strong> {afiliado.certificadoDiscapacidad ? "Sí" : "No"}</p>
              <p><strong>Observaciones:</strong> {afiliado.observaciones || "-"}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-200 rounded-lg text-sm"
            aria-label="Cerrar modal de ficha del afiliado"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
