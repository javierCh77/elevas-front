"use client";

import EncuestaForm from "@/components/encuesta/EncuestaForm";

export default function EncuestasPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Encuesta de Experiencia del Colaborador</h1>
      <EncuestaForm />
    </div>
  );
}
