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

  return (
    <div className="bg-white shadow-md rounded-2xl border p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <h2 className="text-lg font-bold text-morado">{`Item reportado ID: ${reporte.inventario_id}`}</h2>

      <div className="border-l-4 border-morado pl-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Descripción</h3>
        <p className="text-morado text-lg mt-1">{reporte.descripcion}</p>
      </div>

<div className="space-y-3 mb-4 flex-grow">
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Fecha de Reporte</h3>
          <p className="text-morado text-sm mt-1">
            {new Date(reporte.fecha_reporte!).toLocaleDateString('es-MX', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Estado</h3>
          <span className="inline-block mt-1 px-3 py-1 bg-morado/10 text-morado rounded-full text-xs font-medium">
            {reporte.estado}
          </span>
        </div>
      </div>

    <div className="pt-3 border-t border-gray-200 mt-auto">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Reportado por</h3>
        <p className="text-morado text-sm mt-1 truncate">{reporte.usuario}</p>
      </div>


      <div className="flex justify-end gap-2">
        {rol === "administrador" ? (
          <>
            {reporte.reporte_id && (
              <button
                onClick={async () => {
                  await changeStatus?.(reporte.reporte_id!);
                  window.location.reload();
                }}
                className="px-3 py-1 bg-morado text-white rounded text-sm hover:bg-morado-dark"
              >
                Reportar
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

        {reporte.reporte_id && reporte.estado !== "en_proceso" && (
          <button
            onClick={() => changeStatus?.(reporte.reporte_id!)}
            className="px-3 py-1 bg-morado text-white rounded text-sm hover:bg-morado-dark"
          >
            Reportar
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
