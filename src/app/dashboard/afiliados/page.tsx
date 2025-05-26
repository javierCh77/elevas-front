"use client";

import { useEffect, useState } from "react";
import { Users, UserRoundPlus, FileDown } from "lucide-react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { Afiliado, AfiliadoInput } from "@/types/afiliado";
import AfiliadoModal from "@/components/afiliados/AfiliadoModal";
import AfiliadoTable from "@/components/afiliados/AfiliadoTable";
import AfiliadoDetalleModal from "@/components/afiliados/AfiliadoDetalleModal";
import * as XLSX from "xlsx";

export default function AfiliadosPage() {
  const [afiliados, setAfiliados] = useState<Afiliado[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [afiliadoEnEdicion, setAfiliadoEnEdicion] = useState<AfiliadoInput | undefined>(undefined);
  const [editId, setEditId] = useState<string | null>(null);

  const [detalleModalOpen, setDetalleModalOpen] = useState(false);
  const [afiliadoSeleccionado, setAfiliadoSeleccionado] = useState<Afiliado | null>(null);

  useEffect(() => {
    fetchAfiliados();
  }, []);

  const fetchAfiliados = async () => {
    try {
      const res = await api.get("/afiliados");
      setAfiliados(res.data);
    } catch (error) {
     console.error(error);
      toast.error("No se pudieron cargar los afiliados");
    }
  };

 const handleSaveAfiliado = async (formData: FormData) => {
  try {
    if (isEditing && editId) {
      await api.patch(`/afiliados/${editId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Afiliado actualizado correctamente");
    } else {
      await api.post("/afiliados", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Afiliado creado correctamente");
    }

    fetchAfiliados();
    handleCloseModal();
  } catch (error) {
    console.error(error);
    toast.error("Error al guardar afiliado");
  }
};


  const handleCloseModal = () => {
    setModalOpen(false);
    setIsEditing(false);
    setEditId(null);
    setAfiliadoEnEdicion(undefined);
  };

  const handleEditAfiliado = (afiliado: Afiliado) => {
    const { id, ...rest } = afiliado;
    setAfiliadoEnEdicion(rest);
    setEditId(id);
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleDeleteAfiliado = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este afiliado?")) {
      try {
        await api.delete(`/afiliados/${id}`);
        fetchAfiliados();
        toast.success("Afiliado eliminado correctamente");
      } catch (error) {
       console.error(error);
        toast.error("Error al eliminar afiliado");
      }
    }
  };

  const handleViewAfiliado = (afiliado: Afiliado) => {
    setAfiliadoSeleccionado(afiliado);
    setDetalleModalOpen(true);
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(afiliados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Afiliados");
    XLSX.writeFile(workbook, "afiliados.xlsx");
  };

  const afiliadosFiltrados = afiliados.filter((a) =>
    `${a.nombre} ${a.apellido} ${a.dni}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-2">
      <div className="flex items-center gap-2">
        <Users color="#33589a" />
        <h2 className="text-2xl font-bold">Afiliados</h2>
      </div>

      <div className="flex flex-wrap items-center justify-between py-4 gap-2">
        <input
          type="text"
          placeholder="Buscar afiliado..."
          className="border px-3 py-1 rounded w-full max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            className="bg-[#202f4b] hover:bg-[#2e4b7a] text-white px-4 py-1 rounded-lg flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setIsEditing(false);
              setAfiliadoEnEdicion(undefined);
              setModalOpen(true);
            }}
          >
            <UserRoundPlus size={18} />
            Alta Afiliado
          </button>

          <button
            onClick={handleExportExcel}
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-1 rounded-lg flex items-center gap-2 cursor-pointer"
          >
            <FileDown size={18} />
            Exportar Excel
          </button>
        </div>
      </div>

      <AfiliadoTable
        afiliados={afiliadosFiltrados}
        onEdit={handleEditAfiliado}
        onDelete={handleDeleteAfiliado}
        onView={handleViewAfiliado}
      />

      <AfiliadoModal
        open={modalOpen}
        isEditing={isEditing}
        afiliado={afiliadoEnEdicion}
        onClose={handleCloseModal}
        onSave={handleSaveAfiliado}
      />

      <AfiliadoDetalleModal
        open={detalleModalOpen}
        afiliado={afiliadoSeleccionado}
        onClose={() => setDetalleModalOpen(false)}
      />
    </div>
  );
}
