import { useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import HeaderDocente from "../components/header_docente";
import MiReporteCard from "../components/mi_reporte_card";
import ReporteFormModal from "../components/reporte_form";

import { getCookie } from "../../common/cookie";
import {
  getMisReportes,
  createReporte,
  updateReporte,
  deleteReporte,
} from "../../servicios/reportes_service";

import type MiReporteEntity from "../../entities/mi_reporte_entity";

export default function MisReportesPage() {
  const [misReportes, setMisReportes] = useState<MiReporteEntity[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editItem, setEditItem] = useState<MiReporteEntity | null>(null);
  const [filtroEstado, setFiltroEstado] = useState<string>("todos");

  const usuarioId = Number(getCookie("id"));

  const estadosDisponibles = [
    "todos",
    ...new Set(misReportes.map((r) => r.estado).filter(Boolean)),
  ];

  const reportesFiltrados =
    filtroEstado === "todos"
      ? misReportes
      : misReportes.filter((r) => r.estado === filtroEstado);

  useEffect(() => {
    getMisReportes(usuarioId)
      .then(setMisReportes)
      .catch(console.error);
  }, [usuarioId]);

  const handleEdit = (id: number) => {
    const reporte = misReportes.find((r) => r.reporte_id === id);
    if (reporte) {
      setEditItem(reporte);
      setModalAbierto(true);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteReporte(id);
      setMisReportes((prev) => prev.filter((r) => r.reporte_id !== id));
    } catch (error) {
      console.error("Error al eliminar reporte:", error);
    }
  };

  const handleCreateOrUpdate = async (data: {
    inventario_id: number;
    descripcion: string;
    estado: string;
  }) => {
    try {
      if (editItem) {
        await updateReporte(editItem.reporte_id!, {
          usuario_id: usuarioId,
          ...data,
        });
        // El backend del PUT no siempre devuelve el objeto enriquecido,
        // así que actualizamos solo los campos editables en el estado local
        setMisReportes((prev) =>
          prev.map((r) =>
            r.reporte_id === editItem.reporte_id
              ? { ...r, descripcion: data.descripcion, estado: data.estado }
              : r
          )
        );
        setEditItem(null);
      } else {
        await createReporte({
          usuario_id: usuarioId,
          inventario_id: data.inventario_id,
          descripcion: data.descripcion,
        });
   
        const actualizados = await getMisReportes(usuarioId);
        setMisReportes(actualizados);
      }
      setModalAbierto(false);
    } catch (error) {
      console.error("Error creando o actualizando reporte:", error);
    }
  };

  return (
    <div className="relative min-h-screen">
      <HeaderDocente />

      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
        <h1 className="text-3xl text-morado font-bold">Mis Reportes</h1>
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="border border-morado text-morado rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-morado"
        >
          {estadosDisponibles.map((estado) => (
            <option key={estado} value={estado}>
              {estado === "todos" ? "Todos" : estado.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>

      <div className="gap-4 flex flex-wrap p-4">
        {reportesFiltrados.length > 0 ? (
          reportesFiltrados.map((reporte) => (
            <MiReporteCard
              key={reporte.reporte_id}
              reporte={reporte}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-gray-400 text-center mt-10">
            No hay reportes con ese estado.
          </p>
        )}
      </div>

      <button
        onClick={() => { setEditItem(null); setModalAbierto(true); }}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
      >
        <MdAdd size={28} />
      </button>

      {modalAbierto && (
        <ReporteFormModal
          initialData={editItem ?? undefined}
          usuarioId={usuarioId}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => { setModalAbierto(false); setEditItem(null); }}
        />
      )}
    </div>
  );
}