import { useEffect, useState } from "react";
import PeriodoCard from "../components/periodo_comps/periodo_card";
import PeriodoForm from "../components/periodo_comps/periodo_form";
import type { PeriodoEntity } from "../../entities/periodo";
import { MdAdd } from "react-icons/md";
import Header from "../components/common/header";
import {
  getPeriodos,
  createPeriodo,
  updatePeriodo,
  deletePeriodo,
} from "../../servicios/periodos_service";
import ConfirmDialog from "../../common/confirm_dialog/confirm_dialog";

export default function PeriodosPage() {
  const [periodos, setPeriodos] = useState<PeriodoEntity[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [periodoEditando, setPeriodoEditando] = useState<PeriodoEntity | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    message: string;
    id?: number;
  } | null>(null);
  const fetchPeriodos = async () => {
    try {
      const data = await getPeriodos();
      setPeriodos(data);
    } catch (error) {
      console.error("Error cargando periodos", error);
    }
  };

  useEffect(() => {
    fetchPeriodos();
  }, []);

  const handleSave = async (nuevo: PeriodoEntity) => {
    try {
      if (periodoEditando) {
        const actualizado = await updatePeriodo(periodoEditando.periodo_id!, nuevo);
        setPeriodos(
          periodos.map((p) =>
            p.periodo_id === periodoEditando.periodo_id ? actualizado : p
          )
        );
      } else {
        const creado = await createPeriodo(nuevo);
        setPeriodos([...periodos, creado]);
      }
      setModalAbierto(false);
      setPeriodoEditando(null);
    } catch (err) {
      console.error("Error guardando periodo:", err);
    }
  };

  const handleEdit = (periodo: PeriodoEntity) => {
    setPeriodoEditando(periodo);
    setModalAbierto(true);
  };

  const handleDelete = (id: number) => {
    setConfirmDialog({
      message: "¿Estás seguro de eliminar este periodo?",
      id,
    });
  };
  const confirmDelete = async () => {
    if (!confirmDialog?.id) return;
    try {
      await deletePeriodo(confirmDialog.id);
      setPeriodos(periodos.filter((p) => p.periodo_id !== confirmDialog.id));
    } catch (err) {
      console.error("Error eliminando periodo:", err);
    }
    setConfirmDialog(null); // cerrar diálogo
  };

  return (
    <div className="relative">
      <Header />
      <div className="w-full h-[100px] flex flex-col justify-center items-center">
        <h2 className="text-morado font-black text-4xl">Periodos</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {periodos.map((periodo) => (
          <PeriodoCard
            key={periodo.periodo_id}
            periodo={periodo}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Botón flotante */}
      <button
        onClick={() => {
          setPeriodoEditando(null);
          setModalAbierto(true);
        }}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
      >
        <MdAdd size={28} />
      </button>

      {/* Modal */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <PeriodoForm
              periodo={periodoEditando}
              onSave={handleSave}
              onCancel={() => setModalAbierto(false)}
            />
          </div>
        </div>
      )}
    {confirmDialog && (
        <ConfirmDialog
          message={confirmDialog.message}
          onConfirm={confirmDelete}
          onCancel={() => setConfirmDialog(null)}
        />
      )}
    </div>
  );
}
