import type ReporteEntity from "../entities/reporte_entity";
import { getCookie } from "./cookie";

interface Props {
  reporte: ReporteEntity;
  onEdit?: (id: number) => void;
  changeStatus?: (id: number) => void;
  onDelete?: (id: number) => void; 
}

const rol = getCookie("rol");

export default function ReporteCard({ reporte, onEdit, changeStatus, onDelete }: Props) {

  console.log("reporte recibido", reporte)
  console.log("rol: ",rol)
  return (
    <div className="w-full bg-gray-100 shadow-md rounded-2xl border p-4 hover:shadow-lg transition">
      <p className="text-morado mb-3">{reporte.descripcion}</p>

      <div className="flex justify-end gap-2">
        {rol === "administrador" ? (
          <>
            {reporte.reporte_id && (
              <button
                onClick={() => changeStatus?.(reporte.reporte_id!)}
                className="px-3 py-1 bg-morado text-white rounded text-sm hover:bg-morado-dark"
              >
                Reportado
              </button>
            )}
          </>
        ) : (
          <>
            {reporte.reporte_id && (
              <button
                onClick={() => onEdit?.(reporte.reporte_id!)}
                className="px-3 py-1 border rounded text-sm text-gray-700 hover:bg-gray-100"
              >
                Editar
              </button>
            )}

            {reporte.reporte_id && (
              <button
                onClick={() => changeStatus?.(reporte.reporte_id!)}
                className="px-3 py-1 bg-morado text-white rounded text-sm hover:bg-morado-dark"
              >
                Reportado
              </button>
            )}

            {reporte.reporte_id && onDelete && (
              <button
                onClick={() => onDelete(reporte.reporte_id!)}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
              >
                Eliminar
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
