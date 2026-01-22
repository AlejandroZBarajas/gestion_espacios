import type SolicitudEspecialDTO from "../../../entities/solicitud_especial_DTO";

interface Props{
    solicitud: SolicitudEspecialDTO
    onAceptar?:(id:number) => void
    onRechazar?:(id:number) => void
    editable?:boolean
}

const SolicitudEspecialCard: React.FC<Props> = ({solicitud, 
    onAceptar, 
    onRechazar, 
    editable = false}) =>{
    return (
        <div className="bg-white shadow-md rounded-2xl p-4 w-full max-w-md border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Solicitud #{solicitud.solicitud_especial_id}
      </h2>

      <div className="text-gray-600 space-y-1 text-sm">
        <p><span className="font-medium">Espacio:</span> {solicitud.espacio}</p>
        <p><span className="font-medium">Fecha:</span> {solicitud.fecha}</p>
        <p><span className="font-medium">Hora Inicio - Fin:</span> {solicitud.hora_inicio} a {solicitud.hora_fin}</p>
        <p><span className="font-medium">Asistentes:</span> {solicitud.cantidad_asistentes}</p>


        <p><span className="font-medium">Motivo:</span> {solicitud.motivo}</p>
        <p>
          <span className="font-medium">Estado:</span>{" "}
          <span
            className={`px-2 py-1 rounded text-xs ${
              solicitud.estado === "pendiente"
                ? "bg-yellow-100 text-yellow-700"
                : solicitud.estado === "aprobada"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {solicitud.estado}
          </span>
        </p>
      </div>

      {editable && solicitud.estado === "pendiente" && (
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => onAceptar && onAceptar(solicitud.solicitud_especial_id)}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
          >
            Aceptar
          </button>
          <button
            onClick={() => onRechazar && onRechazar(solicitud.solicitud_especial_id)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            Rechazar
          </button>
        </div>
      )}
    </div>
    )
}
export default SolicitudEspecialCard