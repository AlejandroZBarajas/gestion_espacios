import { useEffect, useState } from "react";
import PeriodoCard from "../components/periodo_comps/periodo_card";
import PeriodoForm from "../components/periodo_comps/periodo_form";
import type { Periodo } from "../entities/periodo";
import { MdAdd } from "react-icons/md";
import Header from "../components/common/header";

export default function PeriodosPage() {
  const [periodos, setPeriodos] = useState<Periodo[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [periodoEditando, setPeriodoEditando] = useState<Periodo | null>(null);

  useEffect(() => {
    // TODO: fetch desde API cuando esté lista
    setPeriodos([
      {
        id: 1,
        nombre: "Periodo de prueba",
        fecha_inicio: "2025-01-01",
        fecha_fin: "2025-04-30",
        anio: 2025,
        tipo_periodo: "Enero-Abril",
        activo: true,
      },
    ]);
  }, []);

  const handleSave = (nuevo: Periodo) => {
    if (periodoEditando) {
      setPeriodos(
        periodos.map((p) => (p.id === periodoEditando.id ? nuevo : p))
      );
    } else {
      setPeriodos([...periodos, { ...nuevo, id: Date.now() }]);
    }
    setModalAbierto(false);
  };

  const handleEdit = (periodo: Periodo) => {
    setPeriodoEditando(periodo);
    setModalAbierto(true);
  };

  const handleDelete = (id: number) => {
    setPeriodos(periodos.filter((p) => p.id !== id));
  };

  return (
    <div className="relative">
      <Header></Header>
      <div className="w-full h-[100px] flex flex-col justify-center items-center">
        <h2 className="text-morado font-black text-4xl">Periodos</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {periodos.map((periodo) => (
          <PeriodoCard
            key={periodo.id}
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
    </div>
  );
}
