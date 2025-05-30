// app/dashboard/encuesta/page.tsx
"use client";

import CulturaTable from "@/components/indicadores-encuestas/CulturaTable";
import IndicadorCard from "@/components/indicadores-encuestas/IndicadorCard";
import IndicadoresChart from "@/components/indicadores-encuestas/IndicadoresChart";
import IndicadoresLinea from "@/components/indicadores-encuestas/IndicadoresLine";
import IndicadoresRadar from "@/components/indicadores-encuestas/IndicadoresRadar";
import { Factory } from "lucide-react";

export default function EncuestaDashboardPage() {
  return (
    <div className="p-2   h-[90vh] overflow-y-auto">
      <div className="flex items-center gap-2">
        <Factory color="#6c5435" />
        <h2 className="text-2xl font-bold text-[#322616]">
          Indicadores Experiencia del Colaborador
        </h2>
      </div>

        <div className="p-4 space-y-6  " >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <IndicadorCard title="eNPS Promedio" value={4.1} />
          <IndicadorCard title="Reconocimiento" value="76%" />
          <IndicadorCard title="Equilibrio Vida-Trabajo" value="68%" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <IndicadoresChart />
        <IndicadoresRadar />
        </div>
        
        <IndicadoresLinea />
        <CulturaTable />
      </div>
    </div>
  );
}
