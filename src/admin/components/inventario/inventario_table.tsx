//import { MdDelete, MdEdit } from "react-icons/md";
import type InventarioEntity from "../../../entities/inventario_entity";

interface Props {
  data: InventarioEntity[];
  onDelete: (id: number) => void;
  onEdit: (item: InventarioEntity) => void;
}

export default function InventarioTable({ data,/*  onDelete, onEdit */ }: Props) {
  return (
    <table className="w-full border border-gray-300 rounded-lg shadow-sm text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">Nombre</th>
          <th className="p-2">Tipo</th>
          <th className="p-2">Estado</th>
          <th className="p-2">Marca</th>
          <th className="p-2">Modelo</th>
          <th className="p-2">Patrimonio</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.inventario_id} className="border-t">
            <td className="p-2">{item.nombre_elemento}</td>
            <td className="p-2">{item.tipo}</td>
            <td className="p-2">{item.estado}</td>
            <td className="p-2">{item.marca}</td>
            <td className="p-2">{item.modelo}</td>
            <td className="p-2">{item.patrimonio}</td>
            <td className="p-2 text-center flex justify-center gap-1">
           {/*    <button
                onClick={() => onEdit(item)}
                className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center gap-1"
              >
                <MdEdit /> Editar
              </button>
              <button
                onClick={() => onDelete(item.inventario_id!)}
                className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
              >
                <MdDelete /> Eliminar
              </button> */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


/* import { MdDelete } from "react-icons/md";
import type InventarioEntity from "../../../entities/inventario_entity";

interface Props {
  data: InventarioEntity[];
  onDelete: (id: number) => void;
}

export default function InventarioTable({ data, onDelete }: Props) {
  return (
    <table className="w-full border border-gray-300 rounded-lg shadow-sm text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">Nombre</th>
          <th className="p-2">Tipo</th>
          <th className="p-2">Estado</th>
          <th className="p-2">Marca</th>
          <th className="p-2">Modelo</th>
          <th className="p-2">Patrimonio</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.inventario_id} className="border-t">
            <td className="p-2">{item.nombre_elemento}</td>
            <td className="p-2">{item.tipo}</td>
            <td className="p-2">{item.estado}</td>
            <td className="p-2">{item.marca}</td>
            <td className="p-2">{item.modelo}</td>
            <td className="p-2">{item.patrimonio}</td>
            <td className="p-2 text-center">
              <button
                onClick={() => onDelete(item.inventario_id!)}
                className="bg-red-600 text-white px-3 py-1 rounded flex items-center justify-center gap-1"
              >
                <MdDelete /> Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
 */