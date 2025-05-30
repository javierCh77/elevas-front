// components/indicadores-encuestas/IndicadoresLinea.tsx
"use client";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

// Registro de componentes necesarios
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// Datos del gráfico
const dataLinea = {
  labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
  datasets: [
    {
      label: "Satisfacción General",
      data: [3.5, 3.8, 4.0, 4.2, 4.1],
      borderColor: "#AEA344", // Mikado 500
      backgroundColor: "rgba(190, 178, 65, 0.2)", // tono transparente
      tension: 0.4,
      fill: true,
      pointBackgroundColor: "#AEA344",
    },
  ],
};

// Opciones de configuración
const optionsLinea = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      min: 0,
      max: 5,
      ticks: {
        stepSize: 1,
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        color: "#4B4B3D", // Texto en color Mikado oscuro
        font: {
          size: 12,
        },
      },
    },
  },
};

export default function IndicadoresLinea() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md h-[350px]">
      <h3 className="font-semibold text-lg text-[#4B4B3D] mb-4">
        Evolución de Satisfacción
      </h3>
      <div className="w-full h-[calc(100%-2rem)]">
        <Line data={dataLinea} options={optionsLinea} />
      </div>
    </div>
  );
}
