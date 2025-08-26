import type SolicitudPendienteEntity from "../../../entities/solicitud_pendiente_entity";

interface Props {
  solicitud: SolicitudPendienteEntity;
  onAceptar?: (id: number) => void;
  onRechazar?: (id: number) => void;
  editable?: boolean; // Si es true, muestra los botones
}

const SolicitudCard: React.FC<Props> = ({ solicitud, onAceptar, onRechazar, editable = false }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-full max-w-md border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Solicitud #{solicitud.solicitud_id}
      </h2>

      <div className="text-gray-600 space-y-1 text-sm">
        <p><span className="font-medium">Usuario:</span> {solicitud.usuario}</p>
        <p><span className="font-medium">Espacio:</span> {solicitud.espacio}</p>
        <p><span className="font-medium">Periodo:</span> {solicitud.periodo}</p>
        <p><span className="font-medium">Materia:</span> {solicitud.materia}</p>
        <p><span className="font-medium">Plan:</span> {solicitud.plan_estudio}</p>
        <p><span className="font-medium">Grupo:</span> {solicitud.grupo}</p>
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
            onClick={() => onAceptar && onAceptar(solicitud.solicitud_id)}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
          >
            Aceptar
          </button>
          <button
            onClick={() => onRechazar && onRechazar(solicitud.solicitud_id)}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            Rechazar
          </button>
        </div>
      )}
    </div>
  );
};

export default SolicitudCard;
