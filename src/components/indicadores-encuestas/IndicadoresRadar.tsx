// components/indicadores-encuestas/IndicadoresRadar.tsx
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const dataRadar = {
  labels: ["Clima", "Feedback", "Herramientas", "Desarrollo", "Cultura"],
  datasets: [
    {
      label: "Evaluación por Dimensión",
      data: [4.2, 3.7, 4.1, 3.5, 4.0],
      backgroundColor: "rgba(190, 178, 65, 0.2)",
      borderColor: "#AEA344",
      pointBackgroundColor: "#AEA344",
    },
  ],
};

const optionsRadar = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      angleLines: {
        display: false,
      },
      suggestedMin: 0,
      suggestedMax: 5,
    },
  },
};

export default function IndicadoresRadar() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md" style={{ height: "350px" }}>
      <h3 className="font-semibold text-lg text-gray-800 mb-4">Radar de Evaluación</h3>
      <Radar data={dataRadar} options={optionsRadar} />
    </div>
  );
}