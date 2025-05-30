// components/indicadores-encuestas/IndicadoresLinea.tsx
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

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const dataLinea = {
  labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
  datasets: [
    {
      label: "Satisfacción General",
      data: [3.5, 3.8, 4.0, 4.2, 4.1],
      borderColor: "#AEA344", // Mikado 500
      backgroundColor: "rgba(190, 178, 65, 0.2)", // tono transparente del rango medio
      tension: 0.4,
      fill: true,
    },
  ],
};

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
};

export default function IndicadoresLinea() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md h-full min-h-[300px]">
      <h3 className="font-semibold text-lg text-gray-800 mb-4">Evolución de Satisfacción</h3>
      <div className="w-full h-[calc(100%-2rem)]">
        <Line data={dataLinea} options={optionsLinea} />
      </div>
    </div>
  );
}
