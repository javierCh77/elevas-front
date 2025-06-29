import { Dialog } from "@headlessui/react";
import { X, FileText, Mail, Phone, MapPin, GraduationCap, Briefcase, Languages, UserCheck, DollarSign, Linkedin, StickyNote } from "lucide-react";
import { Candidato } from "@/types/candidato";

interface Props {
  open: boolean;
  onClose: () => void;
  candidato: Candidato;
}

export default function FichaCandidatoModal({
  open,
  onClose,
  candidato,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <X size={20} />
          </button>
          <Dialog.Title className="text-xl font-semibold text-[#322616] mb-4">
            🧾 Ficha del Candidato
          </Dialog.Title>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p><strong>DNI:</strong> {candidato.dni}</p>
              <p><strong>Nombre:</strong> {candidato.nombreCompleto}</p>
              <p className="flex items-center gap-1"><Mail size={14} /> {candidato.email || "-"}</p>
              <p className="flex items-center gap-1"><Phone size={14} /> {candidato.telefono || "-"}</p>
              <p className="flex items-center gap-1"><MapPin size={14} /> {candidato.ubicacion || "-"}</p>
            </div>

            <div className="space-y-1">
              <p className="flex items-center gap-1"><GraduationCap size={14} /> {candidato.nivelEstudios || "-"}</p>
              <p><strong>Título obtenido:</strong> {candidato.tituloObtenido || "-"}</p>
              <p><strong>Institución:</strong> {candidato.institucion || "-"}</p>
              <p className="flex items-center gap-1"><UserCheck size={14} /> {candidato.disponibilidad || "-"}</p>
              <p className="flex items-center gap-1"><DollarSign size={14} /> {candidato.pretensionSalarial || "-"}</p>
            </div>

            <div className="md:col-span-2 space-y-2 pt-2">
              <p className="flex items-center gap-1"><strong>🧠 Habilidades:</strong> {candidato.habilidades?.join(", ") || "-"}</p>
              <p className="flex items-center gap-1"><Languages size={14} /> {candidato.idiomas?.join(", ") || "-"}</p>
              <p className="flex items-center gap-1">
                <Briefcase size={14} />
                <strong> Experiencia:</strong> {Array.isArray(candidato.experiencia)
                  ? candidato.experiencia.map((exp, idx) => (
                      <span key={idx}>
                        {exp.cargo} en {exp.empresa} ({exp.desde} - {exp.hasta})
                        {idx < candidato.experiencia.length - 1 ? "; " : ""}
                      </span>
                    ))
                  : typeof candidato.experiencia === "string"
                  ? candidato.experiencia
                  : "-"}
              </p>
              <p className="flex items-center gap-1">
                <Linkedin size={14} />
                <strong> LinkedIn:</strong> {candidato.linkedin ? (
                  <a
                    href={candidato.linkedin}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    Ver perfil
                  </a>
                ) : (
                  "-"
                )}
              </p>
              <p className="flex items-center gap-1">
                <StickyNote size={14} />
                <strong> Observaciones:</strong> {candidato.observaciones || "-"}
              </p>
              <p className="flex items-center gap-1">
                <FileText size={14} />
                <strong> CV:</strong>{" "}
                {candidato.urlCv ? (
                  <a
                    href={candidato.urlCv}
                    target="_blank"
                    className="text-green-700 inline-flex items-center gap-1 mt-1"
                  >
                    Ver CV
                  </a>
                ) : (
                  " No cargado"
                )}
              </p>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
