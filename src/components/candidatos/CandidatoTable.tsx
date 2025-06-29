import { Pencil, Trash2, Upload, FileText, Info } from "lucide-react";
import { Candidato } from "@/types/candidato";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
  candidatos: Candidato[];
  onEdit: (candidato: Candidato) => void;
  onDelete: (id: string) => void;
  onView: (candidato: Candidato) => void;
}

export default function CandidatoTable({ candidatos, onEdit, onDelete, onView }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const currentCvUploadId = useRef<string | null>(null);
  const [cvUploaded, setCvUploaded] = useState<Record<string, string>>({});

  const handleUploadCv = (id: string) => {
    currentCvUploadId.current = id;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && currentCvUploadId.current) {
      if (file.type !== "application/pdf") {
        toast.error("Solo se permiten archivos PDF");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("El archivo excede el tamaño máximo de 5MB");
        return;
      }

      try {
        const fakeUrl = URL.createObjectURL(file);
        setCvUploaded((prev) => ({ ...prev, [currentCvUploadId.current!]: fakeUrl }));
        toast.success("CV cargado correctamente");
      } catch (error) {
        toast.error("Error al subir el CV");
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="application/pdf"
        onChange={handleFileChange}
      />
      <table className="w-full border text-sm text-left">
        <thead className="bg-[#9B8444] text-white">
          <tr>
            <th className="p-2">DNI</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Ubicación</th>
            <th className="p-2">Título</th>
            <th className="p-2">Habilidades</th>
            <th className="p-2">Idiomas</th>
            <th className="p-2">Experiencia</th>
            <th className="p-2">Pretensión</th>
            <th className="p-2">Disponibilidad</th>
            <th className="p-2">CV</th>
            <th className="p-2 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {candidatos.map((c, index) => {
            const url = cvUploaded[c.id] || c.urlCv;
            const hasCv = Boolean(url);
            return (
              <tr
                key={c.id}
                className={`border-t hover:bg-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="p-2">{c.dni}</td>
                <td className="p-2">{c.nombreCompleto}</td>
                <td className="p-2">{c.ubicacion}</td>
                <td className="p-2">{c.tituloObtenido}</td>
                <td className="p-2 truncate max-w-[120px]">
                  {c.habilidades?.slice(0, 3).join(", ")}
                </td>
                <td className="p-2 truncate max-w-[120px]">
                  {c.idiomas?.slice(0, 3).join(", ")}
                </td>
                <td className="p-2 truncate max-w-[180px]">
                  {Array.isArray(c.experiencia)
                    ? c.experiencia
                        .slice(0, 1)
                        .map((exp) => `${exp.cargo} en ${exp.empresa}`)
                        .join("")
                    : typeof c.experiencia === "string"
                    ? c.experiencia.slice(0, 80) + (c.experiencia.length > 80 ? "..." : "")
                    : ""}
                </td>
                <td className="p-2">{c.pretensionSalarial}</td>
                <td className="p-2">{c.disponibilidad}</td>
                  <td className="p-2 text-center">
                  {hasCv ? (
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      <FileText className="text-green-600 inline-block" size={16} />
                    </a>
                  ) : (
                    <Upload className="text-gray-500 inline-block" size={16} />
                  )}
                </td>
                <td className="p-2 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => onView(c)} className="text-gray-600 hover:text-gray-800">
                      <Info size={16} />
                    </button>
                    <button onClick={() => onEdit(c)} className="text-blue-600 hover:text-blue-800">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => onDelete(c.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={16} />
                    </button>
                    <button
                      onClick={() => handleUploadCv(c.id)}
                      className={hasCv ? "text-green-600 hover:text-green-800" : "text-yellow-600 hover:text-yellow-800"}
                    >
                      {hasCv ? <FileText size={16} /> : <Upload size={16} />}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
