import { MdEdit, MdDelete } from "react-icons/md";
import type EspacioEntity from "../../../entities/espacio_entity";

interface Props {
  espacio: EspacioEntity;
  onEdit: (espacio: EspacioEntity) => void;
  onDelete: (id: number) => void;
}

export default function EspacioCard({ espacio, onEdit, onDelete }: Props) {
  return (
    <div className="border border-morado rounded-lg shadow-md m-4 p-4 flex flex-col gap-2">
      <h3 className="text-xl font-bold text-morado">{espacio.nombre}</h3>

      <p className="text-sm"><strong>Categoría: </strong> {espacio.tipo}</p>
      <p className="text-sm"><strong>Edificio:</strong> {espacio.ubicacion}</p>
      <p className="text-sm"><strong>Capacidad:</strong> {espacio.capacidad}</p>
      {
        espacio.descripcion && (
          <p className="text-gray-600">{espacio.descripcion}</p>
        )
      }

      <p
        className={`text-sm font-bold ${
          espacio.disponible ? "text-verde" : "text-rojo"
        }`}
      >
        {espacio.disponible ? "Disponible" : "No disponible"}
      </p>

      <h4 className="text-md font-semibold mt-3">Inventario:</h4>

      {espacio.inventarios.length === 0 && (
        <p className="text-sm text-gray-500">Sin inventario registrado</p>
      )}

      {espacio.inventarios.map((item, i) => (
        <div key={i} className="border p-2 rounded text-sm">
          <p>
            <strong>Catálogo:</strong>{" "}
            {item.inventario.catalogo_elemento.nombre_elemento}
          </p>

          <p>
            <strong>Cantidad:</strong> {item.inventario.cantidad}
          </p>

          {item.inventario.marca && (
            <p><strong>Marca:</strong> {item.inventario.marca}</p>
          )}

          {item.inventario.modelo && (
            <p><strong>Modelo:</strong> {item.inventario.modelo}</p>
          )}

          {item.inventario.patrimonio && (
            <p><strong>Patrimonio:</strong> {item.inventario.patrimonio}</p>
          )}

          {item.inventario.observaciones && (
            <p><strong>Obs:</strong> {item.inventario.observaciones}</p>
          )}
        </div>
      ))}

      {/* Botones */}
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
