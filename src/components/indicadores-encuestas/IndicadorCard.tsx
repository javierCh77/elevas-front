// components/indicadores-encuestas/IndicadorCard.tsx
import { ThumbsUp, AlertTriangle, CheckCircle } from "lucide-react";

interface IndicadorCardProps {
  title: string;
  value: number | string;
  description?: string;
}

export default function IndicadorCard({ title, value, description }: IndicadorCardProps) {
  const valorNumerico = typeof value === "string" ? parseFloat(value) : value;

  const getColorClass = () => {
    if (typeof valorNumerico !== "number" || isNaN(valorNumerico)) return "text-gray-500";
    if (valorNumerico < 2.5) return "text-red-400";
    if (valorNumerico < 3.5) return "text-yellow-500";
    return "text-green-400";
  };

  const getIcon = () => {
    if (typeof valorNumerico !== "number" || isNaN(valorNumerico)) return null;
    if (valorNumerico < 2.5) return <AlertTriangle size={20} className="text-red-400" />;
    if (valorNumerico < 3.5) return <ThumbsUp size={20} className="text-yellow-500" />;
    return <CheckCircle size={20} className="text-green-500" />;
  };

  return (
    <div className="rounded-2xl shadow-md p-4 bg-[#F8F8EE] border border-[#DEDFA9] w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-md font-semibold text-[#786530]">{title}</h3>
        {getIcon()}
      </div>
      <p className={`text-3xl font-bold ${getColorClass()}`}>{value}</p>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
    </div>
  );
}