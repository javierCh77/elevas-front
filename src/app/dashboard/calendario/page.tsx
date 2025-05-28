"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import EventoRRHHModal from "@/components/calendario/EventoRRHHModal";
import {
  CalendarDays,
  PlusCircle,
  CheckCircle,
  XCircle,
  RotateCcw,
  Trash2,
} from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { EventClickArg } from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import toast from "react-hot-toast";
import EventoDetallePopover from "@/components/calendario/EventoDetallePopover";

interface EventoVisual {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
  tipo: string;
  estado?: string;
  creadoPor: string;
  descripcion?: string;
  empleado?: string;
}

const colorEvento = (tipo: string, estado?: string) => {
  if (estado === "realizado") return "#3B82F6";
  if (estado === "cancelado") return "#9CA3AF";
  switch (tipo) {
    case "alta_empleado":
      return "#4CAF50";
    case "baja_empleado":
      return "#F44336";
    case "renovacion_contrato":
      return "#2196F3";
    case "licencia":
      return "#FF9800";
    case "evaluacion":
      return "#9C27B0";
    case "capacitacion":
      return "#3F51B5";
    case "alerta_documental":
      return "#E91E63";
    case "entrevista":
      return "#009688";
    default:
      return "#9B8444";
  }
};

const badgeColor = (tipo: string) => {
  const map: Record<string, string> = {
    alta_empleado: "bg-green-200 text-green-800",
    baja_empleado: "bg-red-200 text-red-800",
    renovacion_contrato: "bg-blue-200 text-blue-800",
    licencia: "bg-orange-200 text-orange-800",
    evaluacion: "bg-purple-200 text-purple-800",
    capacitacion: "bg-indigo-200 text-indigo-800",
    alerta_documental: "bg-pink-200 text-pink-800",
    entrevista: "bg-teal-200 text-teal-800",
    otro: "bg-gray-200 text-gray-800",
  };
  return map[tipo] || "bg-gray-100 text-gray-600";
};

export default function CalendarioPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [eventos, setEventos] = useState<EventoVisual[]>([]);
  const [loading, setLoading] = useState(true);
  const [popoverData, setPopoverData] = useState<any>(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const res = await api.get("/eventos-rrhh");
        const data = res.data.map((ev: any) => ({
          id: ev.id,
          title: ev.titulo,
          start: ev.fechaInicio,
          end: ev.fechaFin,
          tipo: ev.tipo,
          estado: ev.estado,
          descripcion: ev.descripcion,
          empleado: ev.empleado
            ? `${ev.empleado.nombre} ${ev.empleado.apellido}`
            : undefined,
          creadoPor: ev.creadoPor
            ? `${ev.creadoPor.nombre} ${ev.creadoPor.apellido}`
            : "Desconocido",
          color: colorEvento(ev.tipo, ev.estado),
        }));
        setEventos(data);
      } catch (err) {
        console.error("Error al cargar eventos", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEventos();
  }, []);

  const handleClickEvento = (arg: EventClickArg) => {
    const evento = arg.event;
    const { pageX: x, pageY: y } = arg.jsEvent;
    const { title, extendedProps } = evento;

    setPopoverData({
      x,
      y,
      title,
      tipo: extendedProps.tipo,
      empleado: extendedProps.empleado,
      descripcion: extendedProps.descripcion,
      estado: extendedProps.estado,
    });
  };

  const getUserDataFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return {
        id: payload.sub,
        nombre: payload.nombre,
        apellido: payload.apellido,
        email: payload.email,
        rol: payload.rol,
      };
    } catch (err) {
      console.error("Error al decodificar el token:", err);
      return null;
    }
  };

  const handleGuardarEvento = async (evento: any) => {
    try {
      const payload = {
        titulo: evento.titulo,
        tipo: evento.tipo,
        fechaInicio: evento.fechaInicio,
        fechaFin: evento.fechaFin,
        descripcion: evento.descripcion || undefined,
        empleadoId: evento.empleadoId || undefined,
        creadoPorId: getUserDataFromToken()?.id || "",
      };

      const res = await api.post("/eventos-rrhh", payload);

      const nuevo = res.data;
      const visual: EventoVisual = {
        id: nuevo.id,
        title: nuevo.titulo,
        start: nuevo.fechaInicio,
        end: nuevo.fechaFin,
        tipo: nuevo.tipo,
        estado: nuevo.estado,
        descripcion: nuevo.descripcion,
        empleado: nuevo.empleado
          ? `${nuevo.empleado.nombre} ${nuevo.empleado.apellido}`
          : undefined,
        creadoPor: `${nuevo.creadoPor.nombre} ${nuevo.creadoPor.apellido}`,
        color: colorEvento(nuevo.tipo, nuevo.estado),
      };

      setEventos((prev) => [...prev, visual]);
      setModalOpen(false);
      toast.success("Evento guardado con éxito");
    } catch (err: any) {
      console.error(
        "Error al guardar evento:",
        err.response?.data || err.message
      );
      toast.error("❌ No se pudo guardar el evento. Verificá los datos.");
    }
  };

  const actualizarEstado = async (id: string, nuevoEstado: string) => {
    try {
      await api.patch(`/eventos-rrhh/${id}`, { estado: nuevoEstado });
      setEventos((prev) =>
        prev.map((e) =>
          e.id === id
            ? {
                ...e,
                estado: nuevoEstado,
                color: colorEvento(e.tipo, nuevoEstado),
              }
            : e
        )
      );
    } catch (err) {
      console.error("Error al actualizar el estado:", err);
      alert("No se pudo cambiar el estado del evento.");
    }
  };

  const eliminarEvento = async (id: string) => {
    toast((t) => (
      <span className="text-sm text-gray-800">
        ¿Eliminar evento?
        <div className="mt-2 flex gap-2">
          <button
            className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await api.delete(`/eventos-rrhh/${id}`);
                setEventos((prev) => prev.filter((e) => e.id !== id));
                toast.success("Evento eliminado correctamente.");
              } catch (err) {
                console.error("Error al eliminar evento", err);
                toast.error("No se pudo eliminar el evento.");
              }
            }}
          >
            Sí, eliminar
          </button>
          <button
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-xs hover:bg-gray-300"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancelar
          </button>
        </div>
      </span>
    ));
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <CalendarDays size={28} color="#6c5435" />
          <h2 className="text-2xl font-bold text-[#322616]">Calendario RRHH</h2>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#9B8444] hover:bg-[#B1A14F] text-white rounded-lg transition"
        >
          <PlusCircle size={18} />
          Nuevo evento
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl shadow border border-[#EEEED7] h-[75vh] overflow-hidden">
          <div className="p-4 h-full">
            {!loading && (
              <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              locales={[esLocale]}
              locale="es"
              height="100%"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              events={eventos.map((e) => ({
                ...e,
                extendedProps: {
                  descripcion: e.descripcion,
                  empleado: e.empleado,
                  tipo: e.tipo,
                  estado: e.estado,
                },
                title: `${e.title}${e.empleado ? ` - ${e.empleado}` : ""}`,
              }))}
              eventClick={handleClickEvento}
            />
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 border border-[#EEEED7] text-sm h-[75vh] overflow-auto">
          <h3 className="text-lg font-semibold mb-3 text-[#322616]">
            Últimos eventos
          </h3>
          <ul className="space-y-3">
            {eventos.length === 0 && (
              <p className="text-gray-500 italic text-sm">
                Aún no hay eventos registrados.
              </p>
            )}
            {eventos
              .slice(-5)
              .reverse()
              .map((e, i) => (
                <li key={i} className="border-b pb-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-[#322616]">
                      {e.title}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${badgeColor(
                        e.tipo
                      )}`}
                    >
                      {e.tipo.replaceAll("_", " ")}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    {new Date(e.start).toLocaleString("es-AR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </div>
                  <div className="text-xs text-[#6c5435] flex flex-wrap items-center gap-2">
                    Creado por: {e.creadoPor}
                    <div className="w-full flex gap-2 ">
                      <span
                        className={`ml-1 cursor-pointer text-xs font-medium px-2 py-0.5 rounded-full ${
                          e.estado === "realizado"
                            ? "bg-blue-100 text-blue-700"
                            : e.estado === "cancelado"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 hover:bg-yellow-200 text-yellow-700"
                        }`}
                      >
                        {e.estado}
                      </span>

                      {e.estado === "pendiente" && (
                        <>
                          <button
                            onClick={() => actualizarEstado(e.id, "realizado")}
                            className="flex cursor-pointer items-center gap-1 text-green-600 hover:text-green-800 text-xs"
                            title="Marcar como realizado"
                          >
                            <CheckCircle size={14} />
                            Realizado
                          </button>
                          <button
                            onClick={() => actualizarEstado(e.id, "cancelado")}
                            className="flex items-center gap-1 text-red-600 hover:text-red-800 text-xs cursor-pointer"
                            title="Cancelar evento"
                          >
                            <XCircle size={14} />
                            Cancelar
                          </button>
                        </>
                      )}

                      {(e.estado === "realizado" ||
                        e.estado === "cancelado") && (
                        <button
                          onClick={() => actualizarEstado(e.id, "pendiente")}
                          className="flex cursor-pointer items-center gap-1 text-gray-600 hover:text-gray-800 text-xs"
                          title="Volver a pendiente"
                        >
                          <RotateCcw size={14} />
                          Revertir
                        </button>
                      )}

                      <button
                        onClick={() => eliminarEvento(e.id)}
                        className="text-gray-500 hover:text-gray-700 ml-auto cursor-pointer"
                        title="Eliminar evento"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
      
      
      {popoverData && (
        <EventoDetallePopover
          {...popoverData}
          onClose={() => setPopoverData(null)}
        />
      )}
      
      

      <EventoRRHHModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleGuardarEvento}
      />
    </div>
  );
}
