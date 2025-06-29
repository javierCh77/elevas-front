/* eslint-disable @typescript-eslint/no-unused-vars */
// utils/indicadores.ts

import { RespuestaEncuesta } from "@/types/encuestas";

export const calcularCompromiso = (respuestas: RespuestaEncuesta[]): number => {
  if (!respuestas.length) return 0;

  const total = respuestas.reduce((sum, r) => {
    const motivacion = Number(r.respuestas.desarrolloMotivacion) || 0;
    const continuar = Number(r.respuestas.desarrolloContinuarEmpresa) || 0;
    return sum + (motivacion + continuar) / 2;
  }, 0);

  return parseFloat((total / respuestas.length).toFixed(1));
};

export const calcularSatisfaccionGeneral = (respuestas: RespuestaEncuesta[]): number => {
  if (!respuestas.length) return 0;

  const promediosIndividuales = respuestas.map((r) => {
    const valores = Object.entries(r.respuestas)
      .filter(([k, v]) => typeof v === "number")
      .map(([_, v]) => Number(v));
    const suma = valores.reduce((a, b) => a + b, 0);
    return suma / valores.length;
  });

  const promedioTotal = promediosIndividuales.reduce((a, b) => a + b, 0) / promediosIndividuales.length;
  return parseFloat(promedioTotal.toFixed(1));
};

// Ejemplo de uso:
// const compromiso = calcularCompromiso(respuestas);
// const satisfaccion = calcularSatisfaccionGeneral(respuestas);
