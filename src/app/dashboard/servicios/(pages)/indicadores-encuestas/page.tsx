// app/dashboard/encuesta/page.tsx
"use client";

import { useState } from "react";

import CulturaTable from "@/components/indicadores-encuestas/CulturaTable";
import IndicadorCard from "@/components/indicadores-encuestas/IndicadorCard";

import IndicadoresRadar from "@/components/indicadores-encuestas/IndicadoresRadar";
import InsightsTable from "@/components/indicadores-encuestas/InsightsTable";
import AlertasEstrategicas from "@/components/indicadores-encuestas/AlertasEstrategicas";
import RecomendacionesTable from "@/components/indicadores-encuestas/RecomendacionesTable";
import api from "@/lib/api";
import IndicadoresLinea from "@/components/indicadores-encuestas/IndicadoresLine";
import IndicadoresDonutDimensiones from "@/components/indicadores-encuestas/IndicadoresDonutDimensiones";
import { ChartLine, Factory } from "lucide-react";


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
    ? respuestas.reduce((sum, r) => sum + (r.respuestas.recomendariaEmpresa || 0), 0) / respuestas.length
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
    <div className="p-4 space-y-6 h-[70vh] overflow-y-auto max-w-full">
    <div className="flex items-center gap-2">
    <ChartLine color="#6c5435" />
        <h2 className="text-2xl font-bold text-[#322616]">Indicadores de Encuesta</h2>
      </div>
      <button
    
    className="mt-2 md:mt-0 px-4 py-2 text-sm bg-[#786530] text-white rounded-md shadow-md hover:bg-[#5F4A22]"
  >
    Descargar PDF
  </button>
    
    
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-2">
        <input
          type="text"
          placeholder="Nombre de la empresa"
          className="p-2 border border-[#DEDFA9] rounded-md bg-[#F8F8EE] text-sm w-full md:w-1/3"
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
        />
        <div className="flex gap-2 w-full md:w-1/3">
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
        <input
          type="number"
          placeholder="Cantidad de personas"
          className="p-2 border border-[#DEDFA9] rounded-md bg-[#F8F8EE] text-sm w-full md:w-1/3"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
        <button
          onClick={handleEnviar}
          className="px-4 py-2 text-sm bg-[#AEA344] text-white rounded-md shadow-md hover:bg-[#8C8631]"
        >
          Aplicar
        </button>
      </div>

      {mostrarInfo && (
        <div className="bg-[#F8F8EE] border border-[#DEDFA9] rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold text-[#4B4B3D] text-lg mb-2">📊 Información del Reporte</h3>
          <p className="text-sm text-[#4B4B3D]">Empresa: <strong>{empresa}</strong></p>
          <p className="text-sm text-[#4B4B3D]">Desde: <strong>{fechaDesde || '–'}</strong> hasta <strong>{fechaHasta || '–'}</strong></p>
          <p className="text-sm text-[#4B4B3D]">
            Cantidad de personas: <strong>{respuestas.length}/{cantidad}</strong>
          </p>
        </div>
      )}

      <AlertasEstrategicas />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <IndicadorCard title="eNPS Promedio" value={enpsPromedio} />
        <IndicadorCard title="Reconocimiento" value={reconocimiento} />
        <IndicadorCard title="Equilibrio Vida-Trabajo" value={equilibrio} />
        <IndicadorCard title="Riesgo de Rotación" value={riesgoRotacion} description={riesgoDescripcion} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <IndicadoresDonutDimensiones respuestas={respuestas} />
        <IndicadoresRadar respuestas={respuestas}   />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <IndicadoresLinea respuestas={respuestas} />
        <CulturaTable respuestas={respuestas} />
      </div>
      <RecomendacionesTable />
      <InsightsTable />
    </div>
  );
}