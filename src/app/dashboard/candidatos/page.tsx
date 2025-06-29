"use client";

import { useEffect, useState } from "react";
import { PlusCircle, FileDown, Users } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/api";
import CandidatoTable from "@/components/candidatos/CandidatoTable";
import CandidatoModal from "@/components/candidatos/CandidatoModal";
import FichaCandidatoModal from "@/components/candidatos/FichaCandidatoModal";
import * as XLSX from "xlsx";
import { Candidato, CandidatoInput } from "@/types/candidato";

export default function CandidatosPage() {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [candidatoEnEdicion, setCandidatoEnEdicion] = useState<CandidatoInput | undefined>(undefined);
  const [editId, setEditId] = useState<string | null>(null);

  const [candidatoSeleccionado, setCandidatoSeleccionado] = useState<Candidato | null>(null);
  const [modalFichaAbierto, setModalFichaAbierto] = useState(false);

  useEffect(() => {
    fetchCandidatos();
  }, []);

  const fetchCandidatos = async () => {
    try {
      const res = await api.get("/candidato");
      setCandidatos(res.data);
    } catch (error) {
      console.error(error);
      toast.error("No se pudieron cargar los candidatos");
    }
  };

  const handleSaveCandidato = async (data: CandidatoInput) => {
    try {
      if (isEditing && editId) {
        await api.patch(`/candidato/${editId}`, data);
        toast.success("Candidato actualizado correctamente");
      } else {
        await api.post("/candidato", data);
        toast.success("Candidato creado correctamente");
      }
      fetchCandidatos();
      handleCloseModal();
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar candidato");
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setIsEditing(false);
    setEditId(null);
    setCandidatoEnEdicion(undefined);
  };

  const handleEditCandidato = (candidato: Candidato) => {
    const { id, ...rest } = candidato;
    setCandidatoEnEdicion(rest);
    setEditId(id);
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleDeleteCandidato = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este candidato?")) {
      try {
        await api.delete(`/candidato/${id}`);
        fetchCandidatos();
        toast.success("Candidato eliminado correctamente");
      } catch (error) {
        console.error(error);
        toast.error("Error al eliminar candidato");
      }
    }
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(candidatos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidatos");
    XLSX.writeFile(workbook, "candidatos.xlsx");
  };

  const handleVerFicha = (candidato: Candidato) => {
    setCandidatoSeleccionado(candidato);
    setModalFichaAbierto(true);
  };

  const handleCerrarFicha = () => {
    setCandidatoSeleccionado(null);
    setModalFichaAbierto(false);
  };

  const candidatosFiltrados = candidatos.filter((c) =>
    `${c.nombreCompleto} ${c.dni}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-2">
      <div className="flex items-center gap-2">
        <Users color="#9b8444" />
        <h2 className="text-2xl font-bold text-[#322616]">Candidatos</h2>
      </div>

      <div className="flex flex-wrap items-center justify-between py-4 gap-2">
        <input
          type="text"
          placeholder="Buscar candidato..."
          className="border px-3 py-1 rounded w-full max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            className="bg-[#9B8444] hover:bg-[#B1A14F] text-white px-4 py-1 rounded-lg flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setIsEditing(false);
              setCandidatoEnEdicion(undefined);
              setModalOpen(true);
            }}
          >
            <PlusCircle size={18} />
            Alta Candidato
          </button>

          <button
            onClick={handleExportExcel}
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-1 rounded-lg flex items-center gap-2"
          >
            <FileDown size={18} />
            Exportar Excel
          </button>
        </div>
      </div>

      <CandidatoTable
        candidatos={candidatosFiltrados}
        onEdit={handleEditCandidato}
        onDelete={handleDeleteCandidato}
        onView={handleVerFicha}
      />

      <CandidatoModal
        open={modalOpen}
        isEditing={isEditing}
        candidato={candidatoEnEdicion}
        onClose={handleCloseModal}
        onSave={handleSaveCandidato}
      />

      {candidatoSeleccionado && (
        <FichaCandidatoModal
          open={modalFichaAbierto}
          onClose={handleCerrarFicha}
          candidato={candidatoSeleccionado}
        />
      )}
    </div>
  );
}
