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
  const calcularPromedio = (campo: string) => {
    if (!Array.isArray(respuestas) || respuestas.length === 0) return 0;

    const total = respuestas.reduce((sum, r) => {
      const rawValor = r?.respuestas?.[campo];
      const valor = typeof rawValor === "string" ? parseFloat(rawValor) : rawValor;
      return sum + (typeof valor === "number" && !isNaN(valor) ? valor : 0);
    }, 0);

    return parseFloat((total / respuestas.length).toFixed(2));
  };

  const labels = ["Clima", "Liderazgo", "Recursos", "Desarrollo"];
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
        label: "Promedio por Dimensión",
        data: valores,
        backgroundColor: ["#F8F8EE", "#DEDFA9", "#AEA344", "#958439"],
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
