import type ReporteEntity from "../entities/reporte_entity";
//import { getCookie } from "./cookie";

interface Props {
  reporte: ReporteEntity;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
  changeStatus?: (id: number) => void;
}

//const rol = getCookie("rol");

export default function ReporteCard({ reporte, /* onDelete, onEdit, changeStatus */ }: Props) {
  return (
    <div className="w-full bg-white shadow-md rounded-2xl border p-4 hover:shadow-lg transition">
      <p className="text-gray-700 mb-3">{reporte.inventario_id}</p>
      <p className="text-gray-700 mb-3">{reporte.descripcion}</p>

      {/* <div className="flex justify-end gap-2">
        {rol === "docente" ? (
          <>
            <button
              onClick={() => onEdit?.(reporte.reporte_id)}
              className="px-3 py-1 border rounded text-sm text-gray-700 hover:bg-gray-100"
            >
              Ver
            </button>

            <button
              onClick={() => onDelete?.(reporte.reporte_id)}
              className="px-3 py-1 bg-rojo text-white rounded text-sm hover:bg-red-600"
            >
              Eliminar
            </button>
          </>
        ) : (
          <button
            onClick={() => changeStatus?.(reporte.reporte_id)}
            className="px-3 py-1 bg-morado text-white rounded text-sm hover:bg-morado-dark"
          >
            Reportado
          </button>
        )}
      </div> */}
    </div>
  );
}
