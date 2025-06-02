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
  const calcularPromedio = (campo: string) => {
    if (!Array.isArray(respuestas) || respuestas.length === 0) return 0;

    const total = respuestas.reduce((sum, r) => {
      const rawValor = r?.respuestas?.[campo];
      const valor = typeof rawValor === "string" ? parseFloat(rawValor) : rawValor;
      return sum + (typeof valor === "number" && !isNaN(valor) ? valor : 0);
    }, 0);

    return parseFloat((total / respuestas.length).toFixed(2));
  };

  const labels = [
    "Trabajo Valorado",
    "Claridad Objetivos",
    "Recursos Disponibles",
    "Oportunidades Desarrollo",
  ];

  const campos = [
    "trabajoValorado",
    "claridadObjetivos",
    "recursosDisponibles",
    "oportunidadesDesarrollo",
  ];

  const valores = campos.map((campo) => calcularPromedio(campo));
  console.log("VALORES CALCULADOS PARA EL RADAR", valores);

  const data = {
    labels,
    datasets: [
      {
        label: "Promedio por Indicador",
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
