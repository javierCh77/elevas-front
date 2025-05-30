// components/indicadores-encuestas/RecomendacionesTable.tsx
const recomendaciones = [
  "Fortalecer los planes de desarrollo profesional.",
  "Generar espacios de diálogo para mejorar la percepción cultural.",
  "Incorporar capacitaciones en liderazgo.",
];

export default function RecomendacionesTable() {
  return (
    <div className="bg-[#F8F8EE] rounded-2xl shadow-md p-4">
      <h3 className="font-semibold text-lg text-[#786530] mb-4 flex items-center gap-2">
        ✅ Recomendaciones de Acción
      </h3>
      <ul className="list-disc list-inside space-y-2 text-[#58462B] text-sm">
        {recomendaciones.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}