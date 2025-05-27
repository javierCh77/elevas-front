"use client";

import { useEffect, useRef, useState } from "react";
import { EmpleadoInput } from "@/types/empleado";
import { Users } from "lucide-react";
import api from "@/lib/api";

interface Props {
  open: boolean;
  isEditing: boolean;
  empleado?: EmpleadoInput;
  onClose: () => void;
  onSave: (data: FormData) => void;
}

const FORM_DEFAULT: EmpleadoInput = {
  nombre: "",
  apellido: "",
  dni: "",
  telefono: "",
  email: "",
  direccion: "",
  imagenPerfil: null,
  empresaId: "",
};

export default function EmpleadoModal({
  open,
  isEditing,
  empleado,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] = useState<EmpleadoInput>(FORM_DEFAULT);
  const [errores, setErrores] = useState<Partial<Record<keyof EmpleadoInput, string>>>({});
  const [empresas, setEmpresas] = useState<{ id: string; nombre: string }[]>([]);
  const nombreInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setForm(empleado ?? FORM_DEFAULT);
      setErrores({});
      setTimeout(() => {
        nombreInputRef.current?.focus();
      }, 100);

      // Obtener empresas
      api.get("/empresas").then((res) => setEmpresas(res.data));
    }
  }, [open, empleado]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, imagenPerfil: file });
  };

  const handleSubmit = () => {
    const nuevosErrores: Partial<Record<keyof EmpleadoInput, string>> = {};
    ["nombre", "apellido", "dni", "empresaId"].forEach((campo) => {
      if (!form[campo as keyof EmpleadoInput]?.toString().trim()) {
        nuevosErrores[campo as keyof EmpleadoInput] = "Este campo es obligatorio";
      }
    });

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    onSave(formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl max-h-[85vh] overflow-y-auto">
        <div className="flex gap-2 items-center mb-4">
          <Users />
          <h3 className="text-xl font-bold text-[#1F5D89]">
            {isEditing ? "Editar Empleado" : "Alta de Empleado"}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(["nombre", "apellido", "dni", "telefono", "email", "direccion"] as (keyof EmpleadoInput)[]).map((campo) => (
            <div key={campo} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 capitalize">{campo}</label>
              <input
                ref={campo === "nombre" ? nombreInputRef : undefined}
                type="text"
                name={campo}
                value={form[campo] ?? ""}
                onChange={handleChange}
                className={`border p-2 rounded bg-[#EEEED7] text-[#322616] placeholder:text-[#9B8444] ${
                  errores[campo] ? "border-red-400" : "border-[#BCB563]"
                }`}
              />
              {errores[campo] && <p className="text-red-500 text-xs mt-1">{errores[campo]}</p>}
            </div>
          ))}

          {/* Empresa select */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Empresa</label>
            <select
              name="empresaId"
              value={form.empresaId}
              onChange={handleChange}
              className="border p-2 rounded bg-[#EEEED7] border-[#BCB563] text-[#322616]"
              required
            >
              <option value="">Seleccionar empresa</option>
              {empresas.map((empresa) => (
                <option key={empresa.id} value={empresa.id}>
                  {empresa.nombre}
                </option>
              ))}
            </select>
            {errores.empresaId && <p className="text-red-500 text-xs mt-1">{errores.empresaId}</p>}
          </div>

          {/* Imagen */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Imagen de perfil</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border p-2 rounded bg-[#EEEED7] border-[#BCB563]"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-2">
          <button
            className="px-4 py-2 bg-[#DBDBAC] hover:bg-[#C9C780] text-[#322616] rounded-lg cursor-pointer"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-[#9B8444] hover:bg-[#B1A14F] text-white rounded-lg cursor-pointer"
            onClick={handleSubmit}
          >
            {isEditing ? "Guardar Cambios" : "Crear"}
          </button>
        </div>
      </div>
    </div>
  );
}
