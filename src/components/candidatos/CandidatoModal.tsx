import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog } from '@/components/dialog';
import { FormData } from "@/types/candidato";

interface Props {
  open: boolean;
  isEditing: boolean;
  candidato?: FormData;
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function CandidatoModal({ open, isEditing, candidato, onClose, onSave }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (open) {
      reset({
        ...candidato,
        habilidadesStr: candidato?.habilidades?.join(", ") || "",
        idiomasStr: candidato?.idiomas?.join(", ") || "",
      });
    }
  }, [open, candidato, reset]);

  const onSubmit = (data: FormData) => {
    const finalData = {
      ...data,
      habilidades: data.habilidadesStr.split(",").map(s => s.trim()).filter(Boolean),
      idiomas: data.idiomasStr.split(",").map(s => s.trim()).filter(Boolean),
    };
    delete (finalData as any).habilidadesStr;
    delete (finalData as any).idiomasStr;
    onSave(finalData);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-7xl p-6 rounded shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-6">
          {isEditing ? "Editar Candidato" : "Alta Candidato"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Datos personales */}
          <div className="col-span-3">
            <h3 className="text-lg font-bold mb-2 border-b pb-1">Datos personales</h3>
          </div>
          <div>
            <label className="block mb-1 font-medium">DNI <span className="text-red-500">*</span></label>
            <input {...register("dni", { required: "El DNI es obligatorio" })} placeholder="Ej: 30123456" className={`border p-2 rounded w-full ${errors.dni ? "border-red-500" : ""}`} />
            {errors.dni && <p className="text-red-500 text-sm">{errors.dni.message}</p>}
          </div>
          <div className="col-span-2">
            <label className="block mb-1 font-medium">Nombre Completo <span className="text-red-500">*</span></label>
            <input {...register("nombreCompleto", { required: "El nombre es obligatorio" })} placeholder="Ej: Juan Pérez" className={`border p-2 rounded w-full ${errors.nombreCompleto ? "border-red-500" : ""}`} />
            {errors.nombreCompleto && <p className="text-red-500 text-sm">{errors.nombreCompleto.message}</p>}
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input {...register("email")} placeholder="Ej: juan@mail.com" className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Teléfono</label>
            <input {...register("telefono")} placeholder="Ej: 1123456789" className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Ubicación</label>
            <input {...register("ubicacion")} placeholder="Ej: CABA" className="border p-2 rounded w-full" />
          </div>

          {/* Formación académica */}
          <div className="col-span-3">
            <h3 className="text-lg font-bold mt-4 mb-2 border-b pb-1">Formación Académica</h3>
          </div>
          <div>
            <label className="block mb-1 font-medium">Nivel de estudios</label>
            <input {...register("nivelEstudios")} placeholder="Ej: Universitario" className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Título Obtenido</label>
            <input {...register("tituloObtenido")} placeholder="Ej: Lic. en Psicología" className="border p-2 rounded w-full" />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <label className="block mb-1 font-medium">Institución</label>
            <input {...register("institucion")} placeholder="Ej: UBA" className="border p-2 rounded w-full" />
          </div>

          {/* Habilidades e idiomas */}
          <div className="col-span-3">
            <h3 className="text-lg font-bold mt-4 mb-2 border-b pb-1">Habilidades e Idiomas</h3>
          </div>
          <div>
            <label className="block mb-1 font-medium">Habilidades (separadas por coma)</label>
            <input {...register("habilidadesStr")} placeholder="Ej: Excel, Liderazgo" className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Idiomas (separados por coma)</label>
            <input {...register("idiomasStr")} placeholder="Ej: Español, Inglés" className="border p-2 rounded w-full" />
          </div>

          {/* Experiencia */}
          <div className="col-span-3">
            <h3 className="text-lg font-bold mt-4 mb-2 border-b pb-1">Experiencia</h3>
          </div>
          <div className="col-span-3">
            <label className="block mb-1 font-medium">Experiencia (texto libre)</label>
            <textarea {...register("experiencia")} placeholder="Ej: Empresa, rol, tareas..." className="border p-2 rounded w-full" rows={4} />
          </div>

          {/* Otros */}
          <div className="col-span-3">
            <h3 className="text-lg font-bold mt-4 mb-2 border-b pb-1">Otros</h3>
          </div>
          <div>
            <label className="block mb-1 font-medium">Pretensión salarial</label>
            <input {...register("pretensionSalarial")} placeholder="Ej: $500.000" className="border p-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Disponibilidad</label>
            <input {...register("disponibilidad")} placeholder="Ej: Inmediata" className="border p-2 rounded w-full" />
          </div>
          <div className="col-span-2">
            <label className="block mb-1 font-medium">LinkedIn</label>
            <input {...register("linkedin")} placeholder="Ej: https://linkedin.com/in/usuario" className="border p-2 rounded w-full" />
          </div>
          <div className="col-span-3">
            <label className="block mb-1 font-medium">Observaciones</label>
            <textarea {...register("observaciones")} placeholder="Notas internas, comentarios adicionales..." className="border p-2 rounded w-full" rows={2} />
          </div>
          <div className="col-span-3">
            <label className="block mb-1 font-medium">URL CV (PDF)</label>
            <input {...register("urlCv")} placeholder="Ej: https://cvstorage.com/archivo.pdf" className="border p-2 rounded w-full" />
          </div>

          <div className="col-span-3 flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancelar</button>
            <button type="submit" className="bg-[#9B8444] text-white px-4 py-2 rounded">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

