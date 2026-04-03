import type { ReporteItemEntity } from "../../entities/reporte_table_entity";

interface Props {
  reporte: ReporteItemEntity
  nombreEspacio: string
  nombreUbicacion: string
  onCambiarEstado: (id: number, estadoActual: string) => void
}

const estadoLabel: Record<string, string> = {
  pendiente: "Pendiente",
  en_proceso: "En proceso",
  reparado: "Reparado",
};

const estadoColor: Record<string, string> = {
  pendiente: "bg-yellow-100 text-yellow-800",
  en_proceso: "bg-blue-100 text-blue-800",
  reparado: "bg-green-100 text-green-800",
};

export default function ReporteCard({ reporte, nombreEspacio, nombreUbicacion, onCambiarEstado }: Props) {
  const puedeAvanzar = reporte.estado === "pendiente" || reporte.estado === "en_proceso";

  const labelBoton = reporte.estado === "pendiente" ? "Marcar en proceso" : "Marcar reparado";

  return (
    <div className="bg-white shadow-md rounded-2xl border p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      
      <div className="flex items-start justify-between mb-3">
        <div>
          <h2 className="text-base font-bold text-morado">{nombreEspacio}</h2>
          <p className="text-xs text-gray-400">{nombreUbicacion}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${estadoColor[reporte.estado] ?? "bg-gray-100 text-gray-600"}`}>
          {estadoLabel[reporte.estado] ?? reporte.estado}
        </span>
      </div>

      <div className="border-l-4 border-morado pl-4 mb-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Descripción</h3>
        <p className="text-morado text-sm mt-1">{reporte.descripcion}</p>
      </div>

      <div className="space-y-2 flex-grow">
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Elemento</h3>
          <p className="text-gray-700 text-sm mt-1">{reporte.elemento}</p>
        </div>
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Fecha</h3>
          <p className="text-gray-700 text-sm mt-1">
            {new Date(reporte.fecha).toLocaleDateString("es-MX", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-gray-200 mt-4 mb-3">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Reportado por</h3>
        <p className="text-morado text-sm mt-1 truncate">{reporte.reportado_por}</p>
      </div>

      {puedeAvanzar && (
        <div className="flex justify-end">
          <button
            onClick={() => onCambiarEstado(reporte.reporte_id, reporte.estado)}
            className="px-3 py-1 bg-morado text-white rounded text-sm hover:bg-morado-dark"
          >
            {labelBoton}
          </button>
        </div>
      )}
    </div>
  );
}