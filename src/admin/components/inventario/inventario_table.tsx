//import { MdDelete, MdEdit } from "react-icons/md";
import type InventarioEntity from "../../../entities/inventario_entity";

interface Props {
  data: InventarioEntity[];
  onDelete: (id: number) => void;
  onEdit: (item: InventarioEntity) => void;
}
const colClass = "p-2 w-[14.28%] text-center";
const colClassTd = "p-2 w-[14.28%] text-center truncate overflow-hidden";

export default function InventarioTable({ data }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed border border-gray-300 rounded-lg shadow-sm text-sm">
        <colgroup>
          <col className="w-[14.28%]" />
          <col className="w-[14.28%]" />
          <col className="w-[14.28%]" />
          <col className="w-[14.28%]" />
          <col className="w-[14.28%]" />
          <col className="w-[14.28%]" />
          <col className="w-[14.28%]" />
        </colgroup>
        <thead className="bg-gray-100">
          <tr>
            <th className={colClass}>Nombre</th>
            <th className={colClass}>Tipo</th>
            <th className={colClass}>Estado</th>
            <th className={colClass}>Marca</th>
            <th className={colClass}>Modelo</th>
            <th className={colClass}>Patrimonio</th>
            <th className={colClass}>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.inventario_id} className="border-t">
              <td className={colClassTd}>{item.nombre_elemento}</td>
              <td className={colClassTd}>{item.tipo}</td>
              <td className={colClassTd}>{item.estado}</td>
              <td className={colClassTd}>{item.marca}</td>
              <td className={colClassTd}>{item.modelo}</td>
              <td className={colClassTd}>{item.patrimonio}</td>
              <td className={colClassTd}>{item.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}