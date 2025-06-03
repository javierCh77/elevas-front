"use client";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { RespuestaEncuesta } from "@/types/encuestas";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface IndicadoresRadarProps {
  respuestas: RespuestaEncuesta[];
}

export default function IndicadoresRadar({ respuestas }: IndicadoresRadarProps) {
  const calcularPromedioDimension = (claves: string[]) => {
    if (!Array.isArray(respuestas) || respuestas.length === 0) return 0;

    const totalPorEncuesta = respuestas.map((r) => {
      const valores = claves.map((clave) => Number(r.respuestas[clave]) || 0);
      const suma = valores.reduce((a, b) => a + b, 0);
      return suma / claves.length;
    });

    const promedioTotal = totalPorEncuesta.reduce((a, b) => a + b, 0) / totalPorEncuesta.length;
    return parseFloat(promedioTotal.toFixed(2));
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
  console.log("VALORES RADAR DIMENSIONES", valores);

  const data = {
    labels,
    datasets: [
      {
        label: "Promedio por Dimensión",
        data: valores,
        backgroundColor: "rgba(158, 134, 68, 0.2)",
        borderColor: "#9E8644",
        pointBackgroundColor: "#9E8644",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: {
          stepSize: 1,
          backdropColor: "transparent",
          font: {
            size: 12,
          },
          color: "#4B4B3D",
        },
        pointLabels: {
          font: {
            size: 14,
          },
          color: "#4B4B3D",
        },
        grid: {
          color: "#E5E7EB",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="p-4 rounded-2xl shadow-md bg-white flex justify-center items-center w-full h-[400px]">
      <Radar data={data} options={options} width={400} height={400} />
    </div>
  );
}
