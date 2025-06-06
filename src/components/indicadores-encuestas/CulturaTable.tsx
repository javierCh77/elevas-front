// components/indicadores-encuestas/CulturaTable.tsx
"use client";

import { Info, Star } from "lucide-react";

interface RespuestaCultural {
  id?: string;
  nombre: string;
  apellido: string;
  respuestas: {
    culturaUnaPalabra?: string;
    [key: string]: number | string | undefined;
  };
}

interface CulturaTableProps {
  respuestas: RespuestaCultural[];
}

export default function CulturaTable({ respuestas }: CulturaTableProps) {
  const calcularPromedio = (r: RespuestaCultural) => {
    const valores = Object.entries(r.respuestas)
      .filter(([key, val]) => key !== "culturaUnaPalabra" && typeof val === "number")
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(([_, val]) => val as number);
    if (!valores.length) return 0;
    const promedio = valores.reduce((a, b) => a + b, 0) / valores.length;
    return Math.round(promedio);
  };

  const filas = respuestas.map((r, i) => {
    const cultura = r.respuestas.culturaUnaPalabra?.trim() || "Sin respuesta";
    const puntuacion = calcularPromedio(r);
    return {
      id: r.id || i.toString(),
      colaborador: `${r.nombre} ${r.apellido.charAt(0)}.`,
      cultura,
      puntuacion,
    };
  });

  return (
    <div className="bg-[#F8F8EE] rounded-2xl shadow-md p-4 overflow-x-auto">
      <h3 className="font-semibold text-lg mb-4 text-[#786530] flex items-center gap-2">
        Percepción de Cultura
        <Info size={16} className="text-[#786530]" />
      </h3>
      <table className="w-full text-left">
        <thead className="bg-[#DEDFA9] text-[#322616]">
          <tr>
            <th className="py-2 px-4">Colaborador</th>
            <th className="py-2 px-4">Cultura</th>
            <th className="py-2 px-4">Puntuación</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((row) => (
            <tr key={row.id} className="border-b border-[#ECEED3] hover:bg-[#ECEED3]">
              <td className="py-2 px-4 text-[#58462B]">{row.colaborador}</td>
              <td className="py-2 px-4 text-[#322616]">{row.cultura}</td>
              <td className="py-2 px-4">
                <div className="flex gap-1 text-[#786530]">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      size={16}
                      fill={idx < row.puntuacion ? "#AEA344" : "none"}
                      stroke="#AEA344"
                    />
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
