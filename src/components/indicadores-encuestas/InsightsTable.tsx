// components/indicadores-encuestas/InsightsTable.tsx
const insights = [
  { id: 1, texto: "Diagnóstico del clima y experiencia laboral." },
  { id: 2, texto: "Áreas prioritarias de mejora por dimensión." },
  { id: 3, texto: "Compromiso y riesgo de rotación." },
  { id: 4, texto: "Liderazgo y comunicación interna." },
  { id: 5, texto: "Scores internos y evolución temporal." },
  { id: 6, texto: "Identidad y cultura organizacional." },
];

export default function InsightsTable() {
  return (
    <div className="bg-[#F8F8EE] rounded-2xl shadow-md p-4">
      <h3 className="font-semibold text-lg text-[#786530] mb-4 flex items-center gap-2">
        📊 Insights Estratégicos
      </h3>
      <ul className="list-decimal list-inside space-y-2 text-[#58462B] text-sm">
        {insights.map((item) => (
          <li key={item.id}>{item.texto}</li>
        ))}
      </ul>
    </div>
  );
}
