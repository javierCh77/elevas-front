import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface EventoDetallePopoverProps {
  x: number;
  y: number;
  title: string;
  tipo: string;
  empleado?: string;
  descripcion?: string;
  estado?: string;
  onClose: () => void;
}

export default function EventoDetallePopover({
  x,
  y,
  title,
  tipo,
  empleado,
  descripcion,
  estado,
  onClose,
}: EventoDetallePopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return createPortal(
    <div
      ref={popoverRef}
      style={{ top: y + -200, left: x + 60 }}
      className="absolute z-50 bg-white border border-[#BCB563] rounded-xl shadow-xl p-4 w-72 text-sm text-[#322616]"
    >
      <div className="font-semibold text-base mb-2">{title}</div>
      <div className="mb-1">
        <span className="font-medium">Tipo:</span> {tipo.replaceAll("_", " ")}
      </div>
      {empleado && (
        <div className="mb-1">
          <span className="font-medium">Empleado:</span> {empleado}
        </div>
      )}
      {descripcion && (
        <div className="mb-1">
          <span className="font-medium">Descripción:</span> {descripcion}
        </div>
      )}
      <div className="mb-2">
        <span className="font-medium">Estado:</span> {estado || "pendiente"}
      </div>
      <button
        onClick={onClose}
        className="mt-2 px-3 py-1 bg-[#DBDBAC] text-[#322616] rounded hover:bg-[#C9C780] text-xs"
      >
        Cerrar
      </button>
    </div>,
    document.body
  );
}