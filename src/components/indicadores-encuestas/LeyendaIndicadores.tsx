// components/indicadores-encuestas/LeyendaIndicadores.tsx
import { AlertTriangle, ThumbsUp, CheckCircle } from "lucide-react";

export default function LeyendaIndicadores() {
  return (
    <div className="bg-white border border-[#DEDFA9] rounded-xl p-4 shadow-sm ">
      <h3 className="text-lg font-semibold text-[#786530] mb-2">🎯 Interpretación de Niveles</h3>
    
      <ul className="space-y-2  text-sm text-[#4B4B3D]">
        <li className="flex items-center gap-2">
          <AlertTriangle className="text-red-500 w-4 h-4" />
          <span><strong className="text-red-500">Crítico</strong>: valor menor a 2.5</span>
        </li>
        <li className="flex items-center gap-2">
          <ThumbsUp className="text-yellow-500 w-4 h-4" />
          <span><strong className="text-yellow-500">Moderado</strong>: entre 2.5 y 3.4</span>
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle className="text-green-500 w-4 h-4" />
          <span><strong className="text-green-500">Saludable</strong>: valor mayor o igual a 3.5</span>
        </li>
      </ul>
      </div>
  
  );
}