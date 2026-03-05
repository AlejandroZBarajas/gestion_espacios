import type { MateriaEntity } from "../../../entities/materia_entity";

interface MateriaCardProps {
  materia: MateriaEntity;
  onEdit: (materia: MateriaEntity) => void;
  onDelete: (id: number) => void;
}

export default function MateriaCard({ materia, onEdit, onDelete }: MateriaCardProps) {

  return (
    <div className="bg-white border-morado border-[.1px] rounded-2xl shadow-2xl p-2 m-4  flex flex-col justify-left">
      <div className="flex flex-col ">


        <h3 className=" font-bold text-2xl">{materia.nombre}</h3>
        <p className="text-sm text-gray-600">
          Código: {materia.codigo_materia}  
        </p>
        <p>Cuatrimestre: {materia.nivel}</p>
        <p>Plan: {materia.plan?.nombre_carrera}</p>
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
