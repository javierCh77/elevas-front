import { Info } from "lucide-react";

// components/indicadores-encuestas/CulturaTable.tsx
interface CulturaRow {
  id: string;
  colaborador: string;
  cultura: string;
}

const datos: CulturaRow[] = [
  { id: "1", colaborador: "Ana M.", cultura: "Colaborativa" },
  { id: "2", colaborador: "Luis F.", cultura: "Tóxica" },
  
];

export default function CulturaTable() {
  return (
    <div className="bg-[#F8F8EE] rounded-2xl shadow-md p-4 overflow-x-auto">
      <h3 className="font-semibold text-lg mb-4 text-[#786530] flex items-center gap-2">
        Percepción de Cultura
        <Info size={16} className="text-[#786530]" title="Percepción subjetiva del clima organizacional" />
      </h3>
      <table className="w-full text-left">
        <thead className="bg-[#DEDFA9] text-[#322616]">
          <tr>
            <th className="py-2 px-4">Colaborador</th>
            <th className="py-2 px-4">Cultura</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((row) => (
            <tr key={row.id} className="border-b border-[#ECEED3] hover:bg-[#ECEED3]">
              <td className="py-2 px-4 text-[#58462B]">{row.colaborador}</td>
              <td className="py-2 px-4">
                <span
                  title={
                    row.cultura === "Colaborativa"
                      ? "Ambiente de apoyo, comunicación abierta y cooperación."
                      : row.cultura === "Tóxica"
                      ? "Ambiente negativo con tensiones, falta de confianza o comunicación."
                      : "Percepción neutral o no categorizada."
                  }
                  className={`px-3 py-1 rounded-full text-sm font-medium cursor-default ${
                    row.cultura === "Colaborativa"
                      ? "bg-[#DEDFA9] text-[#322616]"
                      : row.cultura === "Tóxica"
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
