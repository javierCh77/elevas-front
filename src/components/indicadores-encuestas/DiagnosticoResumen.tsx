// src/components/indicadores-encuestas/DiagnosticoResumen.tsx

interface DiagnosticoResumenProps {
  compromiso: number;
  satisfaccion: number;
  enps: number;
  riesgo: string;
}

export default function DiagnosticoResumen({ compromiso, satisfaccion, enps, riesgo }: DiagnosticoResumenProps) {
  const mensajes: string[] = [];

  if (compromiso <2.5) {
    mensajes.push("⚠️ El compromiso organizacional se encuentra en niveles críticos.");
  } else if (compromiso < 3.5) {
    mensajes.push("🔸 Compromiso organizacional moderado. Hay margen de mejora.");
  } else {
    mensajes.push("✅ Buen nivel de compromiso detectado en los colaboradores.");
  }

  if (satisfaccion < 2.5) {
    mensajes.push("😞 La satisfacción general es muy baja. Requiere atención urgente.");
  } else if (satisfaccion < 3.5) {
    mensajes.push("🙂 Satisfacción moderada. Se recomienda reforzar acciones positivas.");
  } else {
    mensajes.push("😃 Alta satisfacción general. Buen clima percibido.");
  }

  if (enps < 2.5) {
    mensajes.push("📉 eNPS bajo. Pocos colaboradores recomendarían la empresa.");
  }

  if (riesgo === "Alto") {
    mensajes.push("🚨 Riesgo de rotación elevado: revisar motivadores internos.");
  }

  return (
    <div className="bg-[#fffbe6] border border-[#eadf9e] rounded-xl p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-[#786530] mb-2">
        🧠 Resumen del Diagnóstico
      </h3>
      <ul className="list-disc pl-5 space-y-1 text-[#4B4B3D] text-sm">
        {mensajes.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}