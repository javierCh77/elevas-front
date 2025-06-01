// app/dashboard/encuesta/page.tsx
"use client";

import { useState } from "react";

import CulturaTable from "@/components/indicadores-encuestas/CulturaTable";
import IndicadorCard from "@/components/indicadores-encuestas/IndicadorCard";
import IndicadoresRadar from "@/components/indicadores-encuestas/IndicadoresRadar";
//import InsightsTable from "@/components/indicadores-encuestas/InsightsTable";
//import AlertasEstrategicas from "@/components/indicadores-encuestas/AlertasEstrategicas";
//import RecomendacionesTable from "@/components/indicadores-encuestas/RecomendacionesTable";
import IndicadoresLinea from "@/components/indicadores-encuestas/IndicadoresLine";
import IndicadoresDonutDimensiones from "@/components/indicadores-encuestas/IndicadoresDonutDimensiones";
import { ChartLine, ListFilter } from "lucide-react";
import api from "@/lib/api";

export default function EncuestaDashboardPage() {
  const [empresa, setEmpresa] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [respuestas, setRespuestas] = useState<any[]>([]);
  const [mostrarInfo, setMostrarInfo] = useState(false);

  const handleEnviar = async () => {
    try {
      const res = await api.get("/respuesta-encuesta");
      const data = res.data;

      const filtradas = data.filter((item: any) => {
        const fecha = new Date(item.fecha);
        return (
          item.nombreEmpresa.toLowerCase() === empresa.toLowerCase() &&
          (!fechaDesde || fecha >= new Date(fechaDesde)) &&
          (!fechaHasta || fecha <= new Date(fechaHasta))
        );
      });

      setRespuestas(filtradas);
      if (empresa && cantidad) {
        setMostrarInfo(true);
      }
    } catch (error) {
      console.error("Error al obtener respuestas:", error);
    }
  };

  const enpsPromedioNum = respuestas.length
    ? respuestas.reduce(
        (sum, r) => sum + (r.respuestas.recomendariaEmpresa || 0),
        0
      ) / respuestas.length
    : 0;

  const enpsPromedio = enpsPromedioNum.toFixed(1);

  const reconocimientoRaw = respuestas.filter(
    (r) => r.respuestas.trabajoValorado >= 4
  ).length;

  const reconocimiento = respuestas.length
    ? ((reconocimientoRaw / respuestas.length) * 100).toFixed(0) + "%"
    : "0%";

  const equilibrioRaw = respuestas.filter(
    (r) => r.respuestas.equilibrioVidaLaboral >= 4
  ).length;

  const equilibrio = respuestas.length
    ? ((equilibrioRaw / respuestas.length) * 100).toFixed(0) + "%"
    : "0%";

  const equilibrioNum = respuestas.length
    ? (equilibrioRaw / respuestas.length) * 100
    : 0;

  const riesgoRotacion =
    enpsPromedioNum < 3 && equilibrioNum < 50 ? "Alto" : "Bajo";

  const riesgoDescripcion =
    riesgoRotacion === "Alto"
      ? "Baja recomendación y satisfacción"
      : "Estabilidad positiva percibida";

  return (
    <div className="p-4 space-y-6 h-[92vh] overflow-y-auto max-w-full">
      <div className="flex items-center gap-2">
        <ChartLine color="#6c5435" />
        <h2 className="text-2xl font-bold text-[#322616]">
          Indicadores de Encuesta experiencia del colaborador
        </h2>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-2">
        <div className="flex flex-col w-full md:w-1/3">
          <label className="text-sm text-[#4B4B3D] mb-1">
            Nombre de la empresa
          </label>
          <input
            type="text"
            placeholder="Ej. Elevas Consulting"
            className="p-2 border border-[#DEDFA9] rounded-md bg-[#F8F8EE] text-sm"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-full md:w-1/3">
          <label className="text-sm text-[#4B4B3D] mb-1">Rango de fechas</label>
          <div className="flex gap-2">
            <input
              type="date"
              className="p-2 border border-[#DEDFA9] rounded-md bg-[#F8F8EE] text-sm w-1/2"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
            />
            <input
              type="date"
              className="p-2 border border-[#DEDFA9] rounded-md bg-[#F8F8EE] text-sm w-1/2"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col w-full md:w-1/3">
          <label className="text-sm text-[#4B4B3D] mb-1">
            Cantidad de personas
          </label>
          <input
            type="number"
            placeholder="Ej. 150"
            className="p-2 border border-[#DEDFA9] rounded-md bg-[#F8F8EE] text-sm"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-full md:w-auto justify-end">
          <label className="text-sm text-transparent mb-1">Aplicar</label>
          <button
            onClick={handleEnviar}
            className="flex items-center gap-2 px-8 py-2 text-sm bg-[#AEA344] text-white rounded-md shadow-md hover:bg-[#8C8631]"
          >
            <ListFilter />
            Aplicar
          </button>
        </div>
      </div>

      {mostrarInfo && (
        <div className="animate-fade-in transition-opacity duration-500 opacity-100 space-y-6">
          <div className="bg-[#F8F8EE] border border-[#DEDFA9] rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-[#4B4B3D] text-lg mb-2">
              📊 Información del Reporte
            </h3>
            <p className="text-sm text-[#4B4B3D]">
              Empresa: <strong>{empresa}</strong>
            </p>
            <p className="text-sm text-[#4B4B3D]">
              Desde: <strong>{fechaDesde || "–"}</strong> hasta{" "}
              <strong>{fechaHasta || "–"}</strong>
            </p>
            <p className="text-sm text-[#4B4B3D]">
              Cantidad de personas encuestadas:{" "}
              <strong>
                {respuestas.length}/{cantidad}
              </strong>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <IndicadorCard title="eNPS Promedio" value={enpsPromedio} />
            <IndicadorCard title="Reconocimiento" value={reconocimiento} />
            <IndicadorCard title="Equilibrio Vida-Trabajo" value={equilibrio} />
            <IndicadorCard
              title="Riesgo de Rotación"
              value={riesgoRotacion}
              description={riesgoDescripcion}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <IndicadoresDonutDimensiones respuestas={respuestas} />
            <IndicadoresRadar respuestas={respuestas} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <IndicadoresLinea respuestas={respuestas} />
            <CulturaTable respuestas={respuestas} />
          </div>

          {/* <RecomendacionesTable />
          <InsightsTable /> */}
        </div>
      )}
    </div>
  );
}
