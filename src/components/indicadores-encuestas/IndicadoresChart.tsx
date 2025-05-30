// components/indicadores-encuestas/IndicadoresChart.tsx
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Registro necesario para Chart.js v3+
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const data = {
  labels: ["Clima", "Liderazgo", "Recursos", "Desarrollo"],
  datasets: [
    {
      label: "Promedio por Dimensión",
      backgroundColor: "#AEA344",
      borderColor: "#AEA344",
      borderWidth: 1,
      hoverBackgroundColor: "#958439",
      hoverBorderColor: "#958439",
      data: [4.2, 3.8, 4.1, 3.5],
    },
  ],
};

const options = {
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
    x: {
      beginAtZero: true,
    },
  },
};

export default function IndicadoresChart() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md" style={{ height: "350px" }}>
      <h3 className="font-semibold text-lg text-gray-800 mb-4">Promedio por Dimensión</h3>
      <Bar data={data} options={options} />
    </div>
  );
}
