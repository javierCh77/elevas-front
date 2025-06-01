"use client";

import api from "@/lib/api";
import { useForm, useFieldArray } from "react-hook-form";

interface EncuestaFormData {
  colaborador: {
    nombre: string;
    email: string;
    cargo: string;
    antiguedad: string;
    empresa: string;
  };
  respuesta: {
    recomiendaEmpresa: number;
    satisfaccion: string;
    tiempoEnEmpresa: string;
    recomiendaProductos: number;
  };
  respuestasMultiples: {
    pregunta: string;
    opcion: string;
  }[];
  respuestasLikert: {
    enunciado: string;
    valor: string;
  }[];
  capacitacion: {
    asistio: boolean;
    utilidad: string;
    deseaMas: string;
    temasInteres: string[];
  };
}

export default function EncuestaForm() {
  const { register, handleSubmit, control, reset } = useForm<EncuestaFormData>({
    defaultValues: {
      colaborador: {
        nombre: "",
        email: "",
        cargo: "",
        antiguedad: "",
        empresa: "",
      },
      respuesta: {
        recomiendaEmpresa: 0,
        satisfaccion: "",
        tiempoEnEmpresa: "",
        recomiendaProductos: 0,
      },
      respuestasMultiples: [],
      respuestasLikert: [],
      capacitacion: {
        asistio: false,
        utilidad: "",
        deseaMas: "",
        temasInteres: ["", ""],
      },
    },
  });

  const { fields: multipleFields, append: appendMultiple } = useFieldArray({
    control,
    name: "respuestasMultiples",
  });

  const { fields: likertFields, append: appendLikert } = useFieldArray({
    control,
    name: "respuestasLikert",
  });

  const onSubmit = async (data: EncuestaFormData) => {
    try {
      const res = await api.post("/encuestas-colaboradores", data);
      alert("Encuesta enviada correctamente");
      reset();
      console.log("Respuesta del servidor:", res.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(
        "Error al enviar encuesta",
        err.response?.status,
        err.response?.data || err.message
      );
      alert("Error al enviar encuesta");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold">Encuesta de Colaboradores</h2>

      <label>Nombre y Apellido</label>
      <input {...register("colaborador.nombre", { required: true })} className="input" />

      <label>Correo electrónico</label>
      <input type="email" {...register("colaborador.email", { required: true })} className="input" />

      <label>Cargo o puesto actual</label>
      <input {...register("colaborador.cargo")} className="input" />

      <label>Antigüedad en la empresa</label>
      <select {...register("colaborador.antiguedad")} className="input">
        <option value="">Seleccionar</option>
        <option>Menos de 6 meses</option>
        <option>Entre 6 meses y 1 año</option>
        <option>De 1 a 3 años</option>
        <option>De 3 a 5 años</option>
        <option>Más de 5 años</option>
      </select>

      <label>Empresa</label>
      <input {...register("colaborador.empresa")} className="input" />

      <label>¿Qué tan probable es que recomiendes a la empresa como lugar de trabajo? (0-10)</label>
      <input type="number" min={0} max={10} {...register("respuesta.recomiendaEmpresa")} className="input" />

      <label>¿Qué tan satisfecho estás de trabajar en esta empresa?</label>
      <select {...register("respuesta.satisfaccion")} className="input">
        <option>Nada satisfecho</option>
        <option>Poco satisfecho</option>
        <option>Ni satisfecho ni insatisfecho</option>
        <option>Satisfecho</option>
        <option>Muy satisfecho</option>
      </select>

      <label>Me veo trabajando aquí durante…</label>
      <select {...register("respuesta.tiempoEnEmpresa")} className="input">
        <option>Solo este año</option>
        <option>Los próximos 2 años</option>
        <option>Los próximos 3 a 5 años</option>
        <option>Los próximos 6 a 10 años</option>
        <option>Más de 10 años</option>
      </select>

      <label>¿Qué tan probable es que recomiendes los productos o servicios de esta empresa? (0-10)</label>
      <input type="number" min={0} max={10} {...register("respuesta.recomiendaProductos")} className="input" />

      <label>Respuestas múltiples (pregunta/opción)</label>
      {multipleFields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <input {...register(`respuestasMultiples.${index}.pregunta`)} placeholder="Pregunta" className="input w-1/2" />
          <input {...register(`respuestasMultiples.${index}.opcion`)} placeholder="Opción" className="input w-1/2" />
        </div>
      ))}
      <button type="button" onClick={() => appendMultiple({ pregunta: "", opcion: "" })} className="btn">+ Agregar</button>

      <label>Respuestas tipo Likert (enunciado/valor)</label>
      {likertFields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <input {...register(`respuestasLikert.${index}.enunciado`)} placeholder="Enunciado" className="input w-1/2" />
          <input {...register(`respuestasLikert.${index}.valor`)} placeholder="Valor" className="input w-1/2" />
        </div>
      ))}
      <button type="button" onClick={() => appendLikert({ enunciado: "", valor: "" })} className="btn">+ Agregar</button>

      <label>Capacitación</label>
      <label><input type="checkbox" {...register("capacitacion.asistio")} /> Participó en formación el último año</label>
      <input {...register("capacitacion.utilidad")} placeholder="¿Qué tan útil fue?" className="input" />
      <input {...register("capacitacion.deseaMas")} placeholder="¿Desea más capacitación?" className="input" />
      <input {...register("capacitacion.temasInteres.0")} placeholder="Tema de interés 1" className="input" />
      <input {...register("capacitacion.temasInteres.1")} placeholder="Tema de interés 2" className="input" />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Enviar</button>
    </form>
  );
}
