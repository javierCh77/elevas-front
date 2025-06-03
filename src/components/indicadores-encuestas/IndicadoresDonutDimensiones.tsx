"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { RespuestaEncuesta } from "@/types/encuestas";

ChartJS.register(ArcElement, Tooltip, Legend);

interface IndicadoresDonutProps {
  respuestas: RespuestaEncuesta[];
}

export default function IndicadoresDonutDimensiones({ respuestas }: IndicadoresDonutProps) {
  const calcularPromedioDimension = (claves: string[]) => {
    if (!Array.isArray(respuestas) || respuestas.length === 0) return 0;

    const totalPorEncuesta = respuestas.map((r) => {
      const valores = claves.map((clave) => Number(r.respuestas[clave]) || 0);
      const suma = valores.reduce((a, b) => a + b, 0);
      return suma / claves.length;
    });

    const promedioTotal = totalPorEncuesta.reduce((a, b) => a + b, 0) / totalPorEncuesta.length;
    return parseFloat(promedioTotal.toFixed(1));
  };

  const labels = [
    "Clima Laboral",
    "Liderazgo y Comunicación",
    "Recursos y Beneficios",
    "Desarrollo y Motivación",
    "Reconocimiento"
  ];

  const camposPorDimension: string[][] = [
    ["climaComodidadEquipo", "climaAmbienteSaludable", "climaEquilibrioVida"],
    ["liderazgoInformacionClara", "liderazgoConfianzaDireccion", "liderazgoOpinionesEscuchadas"],
    ["recursosSatisfaccionSalario", "recursosCompensacionJusta"],
    ["desarrolloOportunidades", "desarrolloMotivacion", "desarrolloAporteSignificativo", "desarrolloContinuarEmpresa"],
    ["reconocimientoValorado", "reconocimientoDisfruteTrabajo"]
  ];

  const valores = camposPorDimension.map((campos) => calcularPromedioDimension(campos));

  const data = {
    labels,
    datasets: [
      {
        label: "Promedio por Dimensión",
        data: valores,
        backgroundColor: ["#F8F8EE", "#DEDFA9", "#AEA344", "#958439", "#C4B780"],
        borderColor: "#DEDFA9",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md h-auto flex flex-col md:flex-row items-center justify-center gap-4">
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="relative w-[250px] h-[250px] md:w-[300px] md:h-[300px]">
          <Doughnut data={data} options={options} />
        </div>
      </div>
      <div className="w-full md:w-1/2 px-2 flex flex-col justify-center">
        <h4 className="text-md font-semibold text-[#4B4B3D] mb-2">Detalle por Dimensión</h4>
        <ul className="space-y-1 text-sm text-[#4B4B3D]">
          {labels.map((label, index) => (
            <li key={index} className="flex justify-between border-b border-[#EEE] pb-1">
              <span>{label}</span>
              <span className="font-semibold">{valores[index]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
