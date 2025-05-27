"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface EventoInput {
  titulo: string;
  tipo: string;
  fechaInicio: string;
  fechaFin: string;
  descripcion?: string;
  empleadoId?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: EventoInput) => void;
}

const TIPO_EVENTOS = [
  { value: "alta_empleado", label: "Alta de empleado" },
  { value: "baja_empleado", label: "Baja de empleado" },
  { value: "renovacion_contrato", label: "Renovación de contrato" },
  { value: "fin_periodo_prueba", label: "Fin de período de prueba" },
  { value: "entrega_indumentaria", label: "Entrega de indumentaria" },
  { value: "licencia", label: "Licencia o vacaciones" },
  { value: "entrevista", label: "Entrevista" },
  { value: "evaluacion", label: "Evaluación de desempeño" },
  { value: "capacitacion", label: "Capacitación" },
  { value: "alerta_documental", label: "Alerta documental" },
  { value: "otro", label: "Otro" },
];

const EMPLEADOS_FAKE = [
  { id: "1", nombre: "Ana González" },
  { id: "2", nombre: "Carlos Pérez" },
];

export default function EventoRRHHModal({ open, onClose, onSave }: Props) {
  const [form, setForm] = useState<EventoInput>({
    titulo: "",
    tipo: "",
    fechaInicio: "",
    fechaFin: "",
    descripcion: "",
    empleadoId: "",
  });

  useEffect(() => {
    if (open) {
      setForm({
        titulo: "",
        tipo: "",
        fechaInicio: "",
        fechaFin: "",
        descripcion: "",
        empleadoId: "",
      });
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (!form.titulo || !form.tipo || !form.fechaInicio || !form.fechaFin) {
      alert("Completá los campos obligatorios.");
      return;
    }

    onSave(form);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl relative">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-red-600" onClick={onClose}>
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-[#322616]">Nuevo evento RRHH</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Título *</label>
            <input
              type="text"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              className="border p-2 rounded w-full bg-[#EEEED7] border-[#BCB563]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Tipo de evento *</label>
            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className="border p-2 rounded w-full bg-[#EEEED7] border-[#BCB563]"
            >
              <option value="">Seleccionar tipo</option>
              {TIPO_EVENTOS.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Fecha inicio *</label>
            <input
              type="datetime-local"
              name="fechaInicio"
              value={form.fechaInicio}
              onChange={handleChange}
              className="border p-2 rounded w-full bg-[#EEEED7] border-[#BCB563]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Fecha fin *</label>
            <input
              type="datetime-local"
              name="fechaFin"
              value={form.fechaFin}
              onChange={handleChange}
              className="border p-2 rounded w-full bg-[#EEEED7] border-[#BCB563]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Empleado relacionado (opcional)</label>
            <select
              name="empleadoId"
              value={form.empleadoId}
              onChange={handleChange}
              className="border p-2 rounded w-full bg-[#EEEED7] border-[#BCB563]"
            >
              <option value="">Sin asignar</option>
              {EMPLEADOS_FAKE.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              className="border p-2 rounded w-full bg-[#EEEED7] border-[#BCB563]"
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-2">
          <button
            className="px-4 py-2 bg-[#DBDBAC] hover:bg-[#C9C780] text-[#322616] rounded-lg"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-[#9B8444] hover:bg-[#B1A14F] text-white rounded-lg"
            onClick={handleSubmit}
          >
            Guardar evento
          </button>
        </div>
      </div>
    </div>
  );
}
