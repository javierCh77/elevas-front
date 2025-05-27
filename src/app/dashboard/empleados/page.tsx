"use client";

import { useEffect, useState } from "react";
import { Users, UserRoundPlus, FileDown } from "lucide-react";
import api from "@/lib/api";
import toast from "react-hot-toast";

import * as XLSX from "xlsx";
import { Empleado, EmpleadoInput } from "@/types/empleado";
import EmpleadoTable from "@/components/empleados/EmpleadosTable";
import EmpleadoModal from "@/components/empleados/EmpleadosModal";
import EmpleadosDetalleModal from "@/components/empleados/EmpleadosDetalleModal";

export default function EmpleadosPage() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [empleadoEnEdicion, setEmpleadoEnEdicion] = useState<EmpleadoInput | undefined>(undefined);
  const [editId, setEditId] = useState<string | null>(null);

  const [detalleModalOpen, setDetalleModalOpen] = useState(false);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState<Empleado | null>(null);

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const res = await api.get("/empleados");
      setEmpleados(res.data);
    } catch (error) {
      console.error(error);
      toast.error("No se pudieron cargar los empleados");
    }
  };

  const handleSaveEmpleado = async (formData: FormData) => {
    try {
      if (isEditing && editId) {
        await api.patch(`/empleados/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Empleado actualizado correctamente");
      } else {
        await api.post("/empleados", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Empleado creado correctamente");
      }
      fetchEmpleados();
      handleCloseModal();
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar empleado");
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setIsEditing(false);
    setEditId(null);
    setEmpleadoEnEdicion(undefined);
  };

  const handleEditEmpleado = (empleado: Empleado) => {
    const { id, ...rest } = empleado;
    setEmpleadoEnEdicion(rest);
    setEditId(id);
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleDeleteEmpleado = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este empleado?")) {
      try {
        await api.delete(`/empleados/${id}`);
        fetchEmpleados();
        toast.success("Empleado eliminado correctamente");
      } catch (error) {
        console.error(error);
        toast.error("Error al eliminar empleado");
      }
    }
  };

  const handleViewEmpleado = (empleado: Empleado) => {
    setEmpleadoSeleccionado(empleado);
    setDetalleModalOpen(true);
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(empleados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Empleados");
    XLSX.writeFile(workbook, "empleados.xlsx");
  };

  const empleadosFiltrados = empleados.filter((e) =>
    `${e.nombre} ${e.apellido} ${e.dni}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-2">
      <div className="flex items-center gap-2">
        <Users color="#33589a" />
        <h2 className="text-2xl font-bold">Empleados</h2>
      </div>

      <div className="flex flex-wrap items-center justify-between py-4 gap-2">
        <input
          type="text"
          placeholder="Buscar empleado..."
          className="border px-3 py-1 rounded w-full max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            className="bg-[#9B8444] hover:bg-[#B1A14F] text-white px-4 py-1 rounded-lg flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setIsEditing(false);
              setEmpleadoEnEdicion(undefined);
              setModalOpen(true);
            }}
          >
            <UserRoundPlus size={18} />
            Alta Empleado
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

      <EmpleadoTable
        empleados={empleadosFiltrados}
        onEdit={handleEditEmpleado}
        onDelete={handleDeleteEmpleado}
        onView={handleViewEmpleado}
      />

      <EmpleadoModal
        open={modalOpen}
        isEditing={isEditing}
        empleado={empleadoEnEdicion}
        onClose={handleCloseModal}
        onSave={handleSaveEmpleado}
      />

      <EmpleadosDetalleModal
        open={detalleModalOpen}
        empleado={empleadoSeleccionado}
        onClose={() => setDetalleModalOpen(false)}
      />
    </div>
  );
}
