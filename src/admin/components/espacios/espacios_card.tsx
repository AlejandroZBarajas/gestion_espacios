import type EspacioEntity from "../../entities/espacio_entity";
import { MdEdit, MdDelete } from "react-icons/md";

interface Props {
  espacio: EspacioEntity;
  onEdit: (espacio: EspacioEntity) => void;
  onDelete: (id: number) => void;
}

export default function EspacioCard({ espacio, onEdit, onDelete }: Props) {
  return (
    <div className="border border-morado rounded-lg shadow-md p-4 flex flex-col justify-between">
      <h3 className="text-xl font-bold text-morado">{espacio.nombre}</h3>
      <p className="text-gray-600">{espacio.descripcion}</p>
      <p className="text-sm">Tipo: {espacio.tipo}</p>
      <p className="text-sm">Categoría: {espacio.categoria}</p>
      <p className="text-sm">Ubicación: {espacio.ubicacion}</p>
      <p className="text-sm">Capacidad: {espacio.capacidad}</p>
      <p className={`text-sm font-bold ${espacio.disponible ? "text-green-600" : "text-red-600"}`}>
        {espacio.disponible ? "Disponible" : "No disponible"}
      </p>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onEdit(espacio)}
          className="flex-1 bg-azul text-white p-2 rounded flex items-center justify-center gap-1"
        >
          <MdEdit /> Editar
        </button>
        <button
          onClick={() => onDelete(espacio.espacio_id!)}
          className="flex-1 bg-rojo text-white p-2 rounded flex items-center justify-center gap-1"
        >
          <MdDelete /> Eliminar
        </button>
      </div>
    </div>
  );
}
