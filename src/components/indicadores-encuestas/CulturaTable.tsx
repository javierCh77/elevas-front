"use client";

import { Info } from "lucide-react";

interface RespuestaCultural {
  id?: string;
  nombre: string;
  apellido: string;
  respuestas: {
    culturaUnaPalabra?: string;
  };
}

interface CulturaTableProps {
  respuestas: RespuestaCultural[];
}

export default function CulturaTable({ respuestas }: CulturaTableProps) {
  const filas = respuestas.map((r, i) => {
    const palabra = r.respuestas.culturaUnaPalabra?.trim() || "";
    return {
      id: r.id || i.toString(),
      colaborador: `${r.nombre} ${r.apellido.charAt(0)}.`,
      cultura: palabra !== "" ? palabra : "Sin respuesta",
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
          </tr>
        </thead>
        <tbody>
          {filas.map((row) => (
            <tr key={row.id} className="border-b border-[#ECEED3] hover:bg-[#ECEED3]">
              <td className="py-2 px-4 text-[#58462B]">{row.colaborador}</td>
              <td className="py-2 px-4">
                <span
                  title={
                    row.cultura.toLowerCase() === "colaborativa"
                      ? "Ambiente de apoyo, comunicación abierta y cooperación."
                      : row.cultura.toLowerCase() === "tóxica"
                      ? "Ambiente negativo con tensiones, falta de confianza o comunicación."
                      : "Percepción espontánea del colaborador."
                  }
                  className={`px-3 py-1 rounded-full text-sm font-medium cursor-default ${
                    row.cultura.toLowerCase() === "colaborativa"
                      ? "bg-[#DEDFA9] text-[#322616]"
                      : row.cultura.toLowerCase() === "tóxica"
                      ? "bg-[#F8DADA] text-[#322616]"
                      : "bg-[#ECEED3] text-[#322616]"
                  }`}
                >
                  {row.cultura}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
