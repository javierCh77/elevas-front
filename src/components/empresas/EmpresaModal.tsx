"use client";

import { EmpresaInput } from "@/types/empresa";
import { Factory } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
  open: boolean;
  isEditing: boolean;
  empresa?: EmpresaInput;
  onClose: () => void;
  onSave: (data: EmpresaInput) => void;
}

const FORM_DEFAULT: EmpresaInput = {
  nombre: "",
  cuit: "",
  direccion: "",
  telefono: "",
  email: "",
};

export default function EmpresaModal({
  open,
  isEditing,
  empresa,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] = useState<EmpresaInput>(FORM_DEFAULT);
  const [errores, setErrores] = useState<
    Partial<Record<keyof EmpresaInput, string>>
  >({});
  const nombreInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      if (empresa) {
        setForm(empresa);
      } else {
        setForm(FORM_DEFAULT);
      }
      setErrores({});
      setTimeout(() => {
        nombreInputRef.current?.focus();
      }, 100);
    }
  }, [open, empresa]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    const nuevosErrores: Partial<Record<keyof EmpresaInput, string>> = {};
    (Object.keys(FORM_DEFAULT) as (keyof EmpresaInput)[]).forEach((campo) => {
      if (!form[campo]?.trim()) {
        nuevosErrores[campo] = "Este campo es obligatorio";
      }
    });

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    onSave(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl max-h-[85vh] overflow-y-auto">
        <div className="flex gap-2">
          <Factory color="#82683b"/>
          <h3 className="text-xl font-bold mb-4 text-[#322616]">
            {isEditing ? "Editar Empresa" : "Alta de Empresa"}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(
            [
              "nombre",
              "cuit",
              "direccion",
              "telefono",
              "email",
            ] as (keyof EmpresaInput)[]
          ).map((campo) => (
            <div key={campo} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 capitalize">
                {campo}
              </label>
              <input
                ref={campo === "nombre" ? nombreInputRef : undefined}
                type={campo === "email" ? "email" : "text"}
                name={campo}
                value={form[campo]}
                onChange={handleChange}
                className={`border p-2 rounded bg-[#EEEED7] text-[#322616] placeholder:text-[#9B8444] ${
                  errores[campo] ? "border-red-400" : "border-[#BCB563]"
                }`}
              />
              {errores[campo] && (
                <p className="text-red-500 text-xs mt-1">{errores[campo]}</p>
              )}
            </div>
          ))}
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
