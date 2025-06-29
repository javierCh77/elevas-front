"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import {
  X,
  Loader2,
  FileText,
  Search,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import api from "@/lib/api";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  onCandidatoCreado: () => void;
}

type Experiencia = {
  empresa: string;
  cargo: string;
  desde: string;
  hasta: string;
  tareas: string[];
};

type Idioma = {
  idioma: string;
  nivel: string;
};

type DatosExtraidos = {
  dni?: string | null;
  nombreCompleto?: string | null;
  email?: string | null;
  telefono?: string | null;
  ubicacion?: string | null;
  nivelEstudios?: string | null;
  tituloObtenido?: string | null;
  institucion?: string | null;
  experiencia?: Experiencia[];
  habilidades?: string[];
  idiomas?: Idioma[];
  pretensionSalarial?: string;
  disponibilidad?: string;
  linkedin?: string;
  observaciones?: string;
  urlCv?: string;
};

export default function UploadCVModal({
  open,
  onClose,
  onCandidatoCreado,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [datos, setDatos] = useState<DatosExtraidos | null>(null);
  const [saving, setSaving] = useState(false);
  const [dniManual, setDniManual] = useState("");

  const handleUpload = async () => {
    if (!file) return toast.error("Seleccioná un archivo PDF");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/cv/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.candidato) {
        console.log("📦 Datos extraídos del backend:", res.data.candidato);
        setDatos(res.data.candidato);
        toast.success("CV analizado correctamente");
      } else {
        toast.error("No se pudieron extraer los datos del CV");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al procesar el CV");
    } finally {
      setLoading(false);
    }
  };

  const handleGuardar = async () => {
  if (!datos) return;

  setSaving(true);

 const payload = {
  ...datos,
  email: datos.email?.includes("@") ? datos.email : undefined,
  experiencia: Array.isArray(datos.experiencia)
    ? datos.experiencia
        .map(
          (exp) =>
            `• ${exp.cargo} en ${exp.empresa} (${exp.desde} - ${exp.hasta})\n  - ${exp.tareas.join(
              "\n  - "
            )}`
        )
        .join("\n\n")
    : "",
  habilidades: datos.habilidades || [],
  idiomas: (datos.idiomas || []).map((i: any) =>
    typeof i === "string" ? i : `${i.idioma} (${i.nivel})`
  ),
 dni: datos.dni || dniManual || "00000000",

};


  try {
    console.log("📤 Payload que se envía:", JSON.stringify(payload, null, 2));
    await api.post("/candidato", payload);
    toast.success("Candidato guardado correctamente");
    onCandidatoCreado();
    handleClose();
  } catch (err) {
    console.error("❌ Error al guardar candidato:", err);
    toast.error("Error al guardar candidato");
  } finally {
    setSaving(false);
  }
};



  const handleClose = () => {
    setFile(null);
    setDatos(null);
    setDniManual("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>

          <Dialog.Title className="text-xl font-semibold text-[#322616] mb-4 flex items-center gap-2">
            <FileText /> Cargar CV con IA
          </Dialog.Title>

          {!datos && (
            <>
              <div className="mb-4">
                {!file && (
                  <label
                    htmlFor="cvUpload"
                    className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded flex gap-2 justify-center border border-gray-300"
                  >
                    <Search />
                    Seleccionar archivo PDF
                  </label>
                )}
                <input
                  id="cvUpload"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />

                {file && (
                  <div className="mt-2 text-sm text-gray-600 text-center">
                    <p>
                      Archivo seleccionado: <strong>{file.name}</strong>
                    </p>
                    <button
                      onClick={() => setFile(null)}
                      className="mt-2 flex items-center gap-1 text-red-600 hover:underline text-sm justify-center"
                    >
                      <Trash2 size={16} />
                      Cambiar archivo
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={handleUpload}
                disabled={loading || !file}
                className="w-full bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Procesando...
                  </>
                ) : (
                  <>
                    <FileText size={18} />
                    Procesar CV
                  </>
                )}
              </button>
            </>
          )}

          {datos && (
            <div className="space-y-4 text-sm text-gray-700 mt-4">
              <p>
                <strong>Nombre completo:</strong> {datos.nombreCompleto || "-"}
              </p>
              <p>
                <strong>Email:</strong> {datos.email || "-"}
              </p>
              <p>
                <strong>Teléfono:</strong> {datos.telefono || "-"}
              </p>

              {/* DNI manual si no fue detectado */}
              {(!datos.dni || datos.dni.trim() === "") && (
                <div>
                  <label className="block font-medium mb-1">
                    DNI <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={dniManual}
                    onChange={(e) => setDniManual(e.target.value)}
                    placeholder="Ej: 30123456"
                    className="border p-2 rounded w-full"
                  />
                </div>
              )}

              {datos.habilidades && (
                <div>
                  <strong>Habilidades:</strong>
                  <ul className="list-disc list-inside">
                    {datos.habilidades.map((h, idx) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}

              {Array.isArray(datos.idiomas) && (
                <div>
                  <strong>Idiomas:</strong>
                  <ul className="list-disc list-inside">
                    {datos.idiomas.map((i, idx) => (
                      <li key={idx}>
                        {i.idioma} ({i.nivel})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={handleGuardar}
                disabled={saving}
                className="w-full bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Guardando...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    Confirmar y guardar
                  </>
                )}
              </button>
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
