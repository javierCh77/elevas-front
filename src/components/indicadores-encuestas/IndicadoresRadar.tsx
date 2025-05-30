// components/indicadores-encuestas/IndicadoresRadar.tsx
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

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface Props {
  respuestas: any[];
}

export default function IndicadoresRadar({ respuestas }: Props) {
  const calcularPromedio = (campo: string) => {
    if (respuestas.length === 0) return 0;
    const total = respuestas.reduce(
      (sum, r) => sum + (r.respuestas?.[campo] || 0),
      0
    );
    return +(total / respuestas.length).toFixed(1);
  };

  const data = {
    labels: [
      "Trabajo Valorado",
      "Claridad de Objetivos",
      "Recursos Disponibles",
      "Feedback y Opinión",
      "Desarrollo Profesional",
    ],
    datasets: [
      {
        label: "Resultados Promedio",
        data: [
          calcularPromedio("trabajoValorado"),
          calcularPromedio("claridadObjetivos"),
          calcularPromedio("recursosDisponibles"),
          calcularPromedio("comodidadFeedback"),
          calcularPromedio("oportunidadesDesarrollo"),
        ],
        backgroundColor: "rgba(174, 163, 68, 0.3)",
        borderColor: "#AEA344",
        pointBackgroundColor: "#AEA344",
        pointBorderColor: "#fff",
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
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md" style={{ height: "350px" }}>
      <h3 className="font-semibold text-lg text-gray-800 mb-4">Radar de Indicadores</h3>
      <Radar data={data} options={options} />
    </div>
  );
}
