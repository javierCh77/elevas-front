"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { PieChart as PieIcon } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  title: string;
  labels: string[];
  data: number[];
}

const chartColors = ["#4F46E5", "#60A5FA", "#A5B4FC"];

export function PieChart({ title, labels, data }: PieChartProps) {
  const allZeros = data.every((val) => val === 0);
  const total = data.reduce((acc, val) => acc + val, 0);

  if (allZeros) {
    return (
      <div className="bg-white p-4 rounded-2xl shadow-lg flex flex-col items-center justify-center min-h-[300px] animate-fade-in">
        <div className="flex items-center gap-2 mb-2">
          <PieIcon className="text-indigo-500" size={20} />
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        </div>
        <p className="text-gray-500 text-sm">No hay datos disponibles para mostrar</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <PieIcon className="text-indigo-500" size={20} />
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Gráfico de torta */}
        <div className="w-full max-w-[350px] h-[300px]">
          <Pie
            data={{
              labels,
              datasets: [
                {
                  label: title,
                  data,
                  backgroundColor: chartColors,
                  borderColor: "#ffffff",
                  borderWidth: 2,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>

        {/* Tabla de resumen */}
        <div className="w-full overflow-x-auto">
          <table
            className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg overflow-hidden"
            aria-label="Tabla de situación de afiliados"
          >
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3 text-right">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {labels.map((label, index) => (
                <tr key={label} className="border-t hover:bg-gray-50 transition" title={`Estado: ${label}`}>
                  <td className="px-4 py-3 flex items-center gap-2 capitalize">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: chartColors[index] }}
                    ></span>
                    {label}
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    {data[index]}{" "}
                    <span className="text-gray-500 text-xs">
                      ({((data[index] / total) * 100).toFixed(1)}%)
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
