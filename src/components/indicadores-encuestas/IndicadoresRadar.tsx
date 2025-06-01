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
      const valor = r?.respuestas?.[campo];
      return sum + (typeof valor === "number" ? valor : 0);
    }, 0);
    return +(total / respuestas.length).toFixed(2);
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
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        angleLines: { display: false },
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: {
          stepSize: 1,
        },
        pointLabels: {
          font: {
            size: 12,
          },
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
    <div className="bg-white p-4 rounded-2xl shadow-md h-[350px]">
      <Radar data={data} options={options} />
    </div>
  );
}
