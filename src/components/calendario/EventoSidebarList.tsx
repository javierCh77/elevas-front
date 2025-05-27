interface EventoResumen {
  titulo: string;
  tipo: string;
  fecha: string;
  creadoPor: string;
}

const eventosMock: EventoResumen[] = [
  {
    titulo: "Examenes",
    tipo: "capacitacion",
    fecha: "2025-05-27T14:30",
    creadoPor: "Javier Chavarría",
  },
  {
    titulo: "Reunión contratos",
    tipo: "renovacion_contrato",
    fecha: "2025-05-27T12:00",
    creadoPor: "Mariana Gómez",
  },
];

function colorTipo(tipo: string) {
  const map: any = {
    capacitacion: "bg-blue-200 text-blue-800",
    renovacion_contrato: "bg-green-200 text-green-800",
    entrevista: "bg-yellow-200 text-yellow-800",
    alerta_documental: "bg-red-200 text-red-800",
  };
  return map[tipo] || "bg-gray-200 text-gray-800";
}
<div className="bg-white rounded-xl shadow p-4 border border-[#EEEED7] text-sm">
  <h3 className="text-lg font-semibold mb-2 text-[#322616]">Últimos eventos</h3>
  <ul className="space-y-3">
    {eventosMock.map((e, i) => (
      <li key={i} className="flex flex-col border-b pb-2">
        <div className="flex justify-between items-center">
          <span className="text-[#322616] font-medium">{e.titulo}</span>
          <span className={`text-xs px-2 py-1 rounded ${colorTipo(e.tipo)}`}>
            {e.tipo.replaceAll("_", " ")}
          </span>
        </div>
        <span className="text-xs text-gray-500">
          {new Date(e.fecha).toLocaleString()}
        </span>
        <span className="text-xs text-[#6c5435]">
          Creado por: {e.creadoPor}
        </span>
      </li>
    ))}
  </ul>
</div>;
