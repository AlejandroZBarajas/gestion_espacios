import type { PeriodoEntity } from "../../../entities/periodo";
import { MdEdit, MdDelete } from "react-icons/md";
import { activarPeriodo, desactivarPeriodo } from "../../../servicios/periodos_service";
import { useState } from "react";

interface Props {
  periodo: PeriodoEntity;
  onEdit: (periodo: PeriodoEntity) => void;
  onDelete: (id: number) => void;
}

export default function PeriodoCard({ periodo, onEdit, onDelete }: Props) {
  const [activo, setActivo] = useState(periodo.activo);
  const [cargando, setCargando] = useState(false);

  const handleToggle = async () => {
    if (!periodo.periodo_id) return;
    
    setCargando(true);
    try {
      if (activo) {
        await desactivarPeriodo(periodo.periodo_id);
      } else {
        await activarPeriodo(periodo.periodo_id);
      }
      setActivo(!activo);
    } catch (error) {
      console.error("Error al cambiar estado del periodo:", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md m-4 p-4 flex flex-col gap-2 border-2 border-moradito max-w-[250px]">
      <p className="font-bold text-gray-600">
        {periodo.fecha_inicio} → {periodo.fecha_fin}
      </p>

      <div className="flex items-center justify-between py-2">
        <span className="text-sm font-medium text-gray-700">
          {activo ? "Activo" : "Inactivo"}
        </span>
        <button
          onClick={handleToggle}
          disabled={cargando}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-moradito focus:ring-offset-2 ${
            activo ? "bg-green-500" : "bg-gray-300"
          } ${cargando ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              activo ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <div className="flex justify-end gap-3 mt-2 ">
        <button
          onClick={() => onEdit(periodo)}
          className="text-blue-500 hover:text-blue-700 w-1/2 flex justify-center"
        >
          <MdEdit size={20} />
        </button>
        <button
          onClick={() => periodo.periodo_id && onDelete(periodo.periodo_id)}
          className="text-red-500 hover:text-red-700 w-1/2 flex justify-center"
        >
          <MdDelete size={20} />
        </button>
      </div>
    </div>
  );
}