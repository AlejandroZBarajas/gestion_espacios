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

const handleCreateOrUpdate = async (
  data: Omit<ReporteEntity, "reporte_id" | "usuario_id">
) => {
  try {
    // SI ESTÁ EDITANDO
    if (editItem) {
      const actualizado = await updateReporte(editItem.reporte_id!, {
        usuario_id: usuarioId,
        ...data,
      });

      // actualizar en estado local
      setMisReportes((prev) =>
        prev.map((r) =>
          r.reporte_id === editItem.reporte_id ? actualizado : r
        )
      );

      setEditItem(null);
      setModalAbierto(false);
      return;
    }

    // SI ES CREACIÓN
    const nuevo = await createReporte({
      usuario_id: usuarioId,
      ...data,
    } as ReporteEntity);

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
