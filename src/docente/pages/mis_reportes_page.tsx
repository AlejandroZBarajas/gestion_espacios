import { useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import HeaderDocente from "../components/header_docente";
import ReporteCard from "../../common/reporte_card";
import ReporteFormModal from "../components/reporte_form";

import { getCookie } from "../../common/cookie";
import { getMisReportes, createReporte, updateReporte } from "../../servicios/reportes_service";

import type ReporteEntity from "../../entities/reporte_entity";

export default function MisReportesPage() {
  const [misReportes, setMisReportes] = useState<ReporteEntity[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editItem, setEditItem] = useState<ReporteEntity | null>(null);
  const [filtroEstado, setFiltroEstado] = useState<string>("todos");

  const usuarioId = Number(getCookie("id"));

  const estadosDisponibles = ["todos", ...new Set(misReportes.map((r) => r.estado).filter(Boolean))];

  const reportesFiltrados = filtroEstado === "todos"
    ? misReportes
    : misReportes.filter((r) => r.estado === filtroEstado);

  useEffect(() => {
    async function fetchReportes() {
      try {
        const data = await getMisReportes(usuarioId);
        setMisReportes(data);
      } catch (err) {
        console.error("Error al cargar reportes:", err);
      }
    }
    fetchReportes();
  }, [usuarioId]);

  const handleCreateOrUpdate = async (
    data: Omit<ReporteEntity, "reporte_id" | "usuario_id">
  ) => {
    try {
      if (editItem) {
        const actualizado = await updateReporte(editItem.reporte_id!, {
          usuario_id: usuarioId,
          ...data,
        });
        setMisReportes((prev) =>
          prev.map((r) => r.reporte_id === editItem.reporte_id ? actualizado : r)
        );
        setEditItem(null);
        setModalAbierto(false);
        return;
      }
      const nuevo = await createReporte({ usuario_id: usuarioId, ...data } as ReporteEntity);
      setMisReportes((prev) => [...prev, nuevo]);
      setModalAbierto(false);
    } catch (error) {
      console.error("Error creando o actualizando reporte:", error);
    }
  };

  const handleDelete = (id: number) => {
    setMisReportes((prev) => prev.filter((r) => r.reporte_id !== id));
  };

  const handleEdit = (id: number) => {
    const reporte = misReportes.find((r) => r.reporte_id === id);
    if (reporte) {
      setEditItem(reporte);
      setModalAbierto(true);
    }
  };

  return (
    <div className="relative min-h-screen">
      <HeaderDocente />

      <div className="flex items-center justify-between mb-6">
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

      <div className="grid gap-4">
        {reportesFiltrados.length > 0 ? (
          reportesFiltrados.map((reporte) => (
            <ReporteCard
              key={reporte.reporte_id}
              reporte={reporte}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <p className="text-gray-400 text-center mt-10">No hay reportes con ese estado.</p>
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
          initialData={editItem || undefined}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => { setModalAbierto(false); setEditItem(null); }}
        />
      )}
    </div>
  );
}