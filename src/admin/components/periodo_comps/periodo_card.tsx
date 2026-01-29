import type { PeriodoEntity } from "../../../entities/periodo";
import { MdEdit, MdDelete } from "react-icons/md";

interface Props {
  periodo: PeriodoEntity;
  onEdit: (periodo: PeriodoEntity) => void;
  onDelete: (id: number) => void;
}

export default function PeriodoCard({ periodo, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md m-4 p-4 flex flex-col gap-2 border-2 border-moradito">
      <p className="text-sm text-gray-600">
        {periodo.fecha_inicio} → {periodo.fecha_fin}
      </p>

      <div className="flex justify-end gap-3 mt-2">
        <button
          onClick={() => onEdit(periodo)}
          className="text-blue-500 hover:text-blue-700"
        >
          <MdEdit size={20} />
        </button>
        <button
          onClick={() => periodo.periodo_id && onDelete(periodo.periodo_id)}
          className="text-red-500 hover:text-red-700"
        >
          <MdDelete size={20} />
        </button>
      </div>
    </div>
  );
}
