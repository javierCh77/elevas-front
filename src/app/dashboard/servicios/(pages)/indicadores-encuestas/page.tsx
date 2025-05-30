// app/dashboard/encuesta/page.tsx
"use client";

import { useState } from "react";
import CulturaTable from "@/components/indicadores-encuestas/CulturaTable";
import IndicadorCard from "@/components/indicadores-encuestas/IndicadorCard";
import IndicadoresChart from "@/components/indicadores-encuestas/IndicadoresChart";
import IndicadoresRadar from "@/components/indicadores-encuestas/IndicadoresRadar";

import InsightsTable from "@/components/indicadores-encuestas/InsightsTable";
import AlertasEstrategicas from "@/components/indicadores-encuestas/AlertasEstrategicas";
import RecomendacionesTable from "@/components/indicadores-encuestas/RecomendacionesTable";
import IndicadoresLinea from "@/components/indicadores-encuestas/IndicadoresLine";

export default function EncuestaDashboardPage() {
  const [empresa, setEmpresa] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [mostrarInfo, setMostrarInfo] = useState(false);

  const handleEnviar = () => {
    if (empresa && fechaDesde && fechaHasta && cantidad) {
      setMostrarInfo(true);
    }
  };

  return (
    <div className="p-4 space-y-6 h-[70vh] overflow-y-auto max-w-full">
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
          <p className="text-sm text-[#4B4B3D]">Desde: <strong>{fechaDesde}</strong> hasta <strong>{fechaHasta}</strong></p>
          <p className="text-sm text-[#4B4B3D]">Cantidad de personas: <strong>{cantidad}</strong></p>
        </div>
      )}

      <AlertasEstrategicas />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <IndicadorCard title="eNPS Promedio" value={4.1} />
        <IndicadorCard title="Reconocimiento" value="76%" />
        <IndicadorCard title="Equilibrio Vida-Trabajo" value="68%" />
        <IndicadorCard title="Riesgo de Rotación" value="Alto" description="Baja recomendación y satisfacción" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <IndicadoresChart />
        <IndicadoresRadar />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <IndicadoresLinea />
        <InsightsTable />
      </div>
      <RecomendacionesTable />
      <CulturaTable />
    </div>
  );
}
