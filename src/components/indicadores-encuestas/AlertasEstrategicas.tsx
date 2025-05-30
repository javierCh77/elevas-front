// components/indicadores-encuestas/AlertasEstrategicas.tsx
const alertas = [
  { id: 1, mensaje: "⚠️ El indicador de desarrollo está por debajo del promedio." },
  { id: 2, mensaje: "⚠️ Se detectó percepción de cultura tóxica en un sector." },
];

export default function AlertasEstrategicas() {
  return (
    <div className="bg-[#FFF8E6] border-l-4 border-[#AE8A00] p-4 rounded-2xl shadow-md">
      <h3 className="text-[#786530] font-semibold mb-2">🚨 Alertas Estratégicas</h3>
      <ul className="list-disc list-inside text-[#58462B] text-sm space-y-1">
        {alertas.map((a) => (
          <li key={a.id}>{a.mensaje}</li>
        ))}
      </ul>
    </div>
  );
}