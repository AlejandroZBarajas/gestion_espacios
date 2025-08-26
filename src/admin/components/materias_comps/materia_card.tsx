// src/components/MateriaCard.tsx
import type { MateriaEntity } from "../../../entities/materia_entity";

interface MateriaCardProps {
  materia: MateriaEntity;
  onEdit: (materia: MateriaEntity) => void;
  onDelete: (id: number) => void;
}

export default function MateriaCard({ materia, onEdit, onDelete }: MateriaCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold">{materia.nombre}</h3>
        <p className="text-sm text-gray-600">
          Código: {materia.codigo_materia} | Nivel: {materia.nivel} | Plan: {materia.plan_id}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(materia)}
          className="bg-blue-500 text-white px-3 py-1 rounded-xl hover:bg-blue-600"
        >
          Editar
        </button>
        <button
          onClick={() => materia.materia_id && onDelete(materia.materia_id)}
          className="bg-red-500 text-white px-3 py-1 rounded-xl hover:bg-red-600"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
