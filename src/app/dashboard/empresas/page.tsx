"use client";

import { useEffect, useState } from "react";
import { PlusCircle, FileDown, Factory } from "lucide-react";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { Empresa, EmpresaInput } from "@/types/empresa";
import EmpresaModal from "@/components/empresas/EmpresaModal";
import EmpresaTable from "@/components/empresas/EmpresaTable";
import * as XLSX from "xlsx";

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [empresaEnEdicion, setEmpresaEnEdicion] = useState<
    EmpresaInput | undefined
  >(undefined);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const fetchEmpresas = async () => {
    try {
      const res = await api.get("/empresas");
      setEmpresas(res.data);
    } catch (error) {
      console.error(error);
      toast.error("No se pudieron cargar las empresas");
    }
  };

  const handleSaveEmpresa = async (data: EmpresaInput) => {
    try {
      if (isEditing && editId) {
        await api.patch(`/empresas/${editId}`, data);
        toast.success("Empresa actualizada correctamente");
      } else {
        await api.post("/empresas", data);
        toast.success("Empresa creada correctamente");
      }
      fetchEmpresas();
      handleCloseModal();
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar empresa");
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setIsEditing(false);
    setEditId(null);
    setEmpresaEnEdicion(undefined);
  };

  const handleEditEmpresa = (empresa: Empresa) => {
    const { id, ...rest } = empresa;
    setEmpresaEnEdicion(rest);
    setEditId(id);
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleDeleteEmpresa = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta empresa?")) {
      try {
        await api.delete(`/empresas/${id}`);
        fetchEmpresas();
        toast.success("Empresa eliminada correctamente");
      } catch (error) {
        console.error(error);
        toast.error("Error al eliminar empresa");
      }
    }
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(empresas);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Empresas");
    XLSX.writeFile(workbook, "empresas.xlsx");
  };

  const empresasFiltradas = empresas.filter((e) =>
    `${e.nombre} ${e.cuit}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-2">
      <div className="flex items-center gap-2">
        <Factory color="#9b8444" />
        <h2 className="text-2xl font-bold text-[#322616]">Empresas</h2>
      </div>

      <div className="flex flex-wrap items-center justify-between py-4 gap-2">
        <input
          type="text"
          placeholder="Buscar empresa..."
          className="border px-3 py-1 rounded w-full max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            className="bg-[#9B8444] hover:bg-[#B1A14F] text-white px-4 py-1 rounded-lg flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setIsEditing(false);
              setEmpresaEnEdicion(undefined);
              setModalOpen(true);
            }}
          >
            <PlusCircle size={18} />
            Alta Empresa
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

      <EmpresaTable
        empresas={empresasFiltradas}
        onEdit={handleEditEmpresa}
        onDelete={handleDeleteEmpresa}
      />

      <EmpresaModal
        open={modalOpen}
        isEditing={isEditing}
        empresa={empresaEnEdicion}
        onClose={handleCloseModal}
        onSave={handleSaveEmpresa}
      />
    </div>
  );
}
