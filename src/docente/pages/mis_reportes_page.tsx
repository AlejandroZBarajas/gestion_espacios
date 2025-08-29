import { useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import HeaderDocente from "../components/header_docente";
import ReporteCard from "../../common/reporte_card";
import ReporteFormModal from "../components/reporte_form";

import { getCookie } from "../../common/cookie";
import { getMisReportes } from "../../servicios/reportes_service";
import type ReporteEntity from "../../entities/reporte_entity";

export default function MisReportesPage() {
  const [misReportes, setMisReportes] = useState<ReporteEntity[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editItem, setEditItem] = useState<ReporteEntity | null>(null);

  const usuarioId = Number(getCookie("id"));

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

  const handleCreateOrUpdate = (data: Omit<ReporteEntity, "reporte_id" | "usuario_id">) => {
    if (editItem) {
      // Edición local
      setMisReportes((prev) =>
        prev.map((r) =>
          r.reporte_id === editItem.reporte_id
            ? { ...r, ...data }
            : r
        )
      );
      setEditItem(null);
    } else {
      // Creación local (id temporal hasta que API lo devuelva)
      const nuevo: ReporteEntity = {
        reporte_id: Date.now(),
        usuario_id: usuarioId,
        ...data,
      };
      setMisReportes((prev) => [...prev, nuevo]);
    }
    setModalAbierto(false);
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
    <div className="relative min-h-screen ">
      <HeaderDocente />
      <h1 className="text-3xl text-morado font-bold mb-6">Mis Reportes</h1>

      <div className="grid gap-4">
        {misReportes.map((reporte) => (
          <ReporteCard
            key={reporte.reporte_id}
            reporte={reporte}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>

      <button
        onClick={() => {
          setEditItem(null);
          setModalAbierto(true);
        }}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
      >
        <MdAdd size={28} />
      </button>

      {modalAbierto && (
        <ReporteFormModal
          initialData={editItem || undefined}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => {
            setModalAbierto(false);
            setEditItem(null);
          }}
        />
      )}
    </div>
  );
}
