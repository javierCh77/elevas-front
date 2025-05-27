"use client";

import { useState } from "react";
import EventoRRHHModal from "@/components/calendario/EventoRRHHModal";
import { CalendarDays, PlusCircle } from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

// Tipos
interface EventoVisual {
  title: string;
  start: string;
  end: string;
  color: string;
  tipo: string;
  creadoPor: string;
}

// Colores por tipo de evento
const colorEvento = (tipo: string) => {
  switch (tipo) {
    case "alta_empleado": return "#4CAF50";
    case "baja_empleado": return "#F44336";
    case "renovacion_contrato": return "#2196F3";
    case "licencia": return "#FF9800";
    case "evaluacion": return "#9C27B0";
    case "capacitacion": return "#3F51B5";
    case "alerta_documental": return "#E91E63";
    case "entrevista": return "#009688";
    default: return "#9B8444";
  }
};

// Badge visual por tipo
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

  const handleGuardarEvento = (evento: any) => {
    const nuevo: EventoVisual = {
      title: evento.titulo,
      start: evento.fechaInicio,
      end: evento.fechaFin,
      tipo: evento.tipo,
      creadoPor: "Javier Chavarría", // 🔁 luego lo reemplazás con el usuario logueado
      color: colorEvento(evento.tipo),
    };
    setEventos([...eventos, nuevo]);
    setModalOpen(false);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Encabezado */}
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

      {/* Contenido principal dividido en 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Calendario */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-4 border border-[#EEEED7]">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locales={[esLocale]}
            locale="es"
            height="auto"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={eventos}
          />
        </div>

        {/* Lista lateral de eventos recientes */}
        <div className="bg-white rounded-xl shadow p-4 border border-[#EEEED7] text-sm h-fit">
          <h3 className="text-lg font-semibold mb-3 text-[#322616]">Últimos eventos</h3>
          <ul className="space-y-3">
            {eventos.length === 0 && (
              <p className="text-gray-500 italic text-sm">Aún no hay eventos registrados.</p>
            )}
            {eventos.slice(-5).reverse().map((e, i) => (
              <li key={i} className="border-b pb-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[#322616]">{e.title}</span>
                  <span className={`text-xs px-2 py-1 rounded ${badgeColor(e.tipo)}`}>
                    {e.tipo.replaceAll("_", " ")}
                  </span>
                </div>
                <div className="text-xs text-gray-600">
                  {new Date(e.start).toLocaleString("es-AR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </div>
                <div className="text-xs text-[#6c5435]">Creado por: {e.creadoPor}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal */}
      <EventoRRHHModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleGuardarEvento}
      />
    </div>
  );
}
