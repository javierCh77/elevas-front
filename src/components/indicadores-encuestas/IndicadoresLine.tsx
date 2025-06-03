"use client";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { RespuestaEncuesta } from "@/types/encuestas";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface IndicadoresLineaProps {
  respuestas: RespuestaEncuesta[];
}

export default function IndicadoresLinea({ respuestas }: IndicadoresLineaProps) {
  const conteo: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  respuestas.forEach((r) => {
    const valor = Number(r.respuestas.desarrolloContinuarEmpresa);
    if (valor >= 1 && valor <= 5) {
      conteo[valor] += 1;
    }
  });

  const data = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        label: "¿Te gustaría continuar en la empresa?",
        backgroundColor: "#AEA344",
        borderColor: "#AEA344",
        borderWidth: 1,
        hoverBackgroundColor: "#958439",
        hoverBorderColor: "#958439",
        data: [1, 2, 3, 4, 5].map((k) => conteo[k]),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: "#4B4B3D",
        },
        grid: {
          color: "#E5E7EB",
        },
      },
      x: {
        ticks: {
          color: "#4B4B3D",
        },
        grid: {
          color: "#E5E7EB",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#4B4B3D",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md h-[350px]">
      <h3 className="font-semibold text-lg text-[#4B4B3D] mb-4">
        Distribución: ¿Continuarías en la empresa? (1 a 5)
      </h3>
      <div className="w-full h-[calc(100%-2rem)]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
