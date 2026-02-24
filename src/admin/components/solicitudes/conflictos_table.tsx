import type { SolicitudEnConflictoTableDTO, SolicitudEnConflictoRowDTO } from "../../../entities/solicitud_conflicto_entity";

interface Props {
  conflictos: SolicitudEnConflictoTableDTO[];
  onAceptar: (solicitudId: number) => void;
}


export default function ConflictosTable({ conflictos, onAceptar }: Props) {
  return (
    <div className="space-y-10 px-6">
      <h2 className="text-2xl font-black text-red-600">
        Conflictos de espacio
      </h2>

      {conflictos.map((espacio) => (
        <div key={espacio.espacio_id} className="space-y-3">
          <h3 className="text-lg font-semibold">
            Espacio {espacio.espacio_nombre}
          </h3>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2">Solicitud</th>
                  <th className="border px-3 py-2">Usuario</th>
                  <th className="border px-3 py-2">Grupo</th>
                  <th className="border px-3 py-2">Horario</th>
                  <th className="border px-3 py-2">Motivo</th>
                  <th className="border px-3 py-2">Acción</th>
                </tr>
              </thead>

              <tbody>
                {espacio.solicitudes_en_conflicto.map(
                  (s: SolicitudEnConflictoRowDTO) => (
                    <tr
                      key={s.solicitud_id}
                      className="hover:bg-gray-50"
                    >
                      <td className="border px-3 py-2">
                        {s.solicitud_id}
                      </td>
                      <td className="border px-3 py-2">
                        {s.usuario_nombre}
                      </td>
                      <td className="border px-3 py-2">
                        {s.grupo}
                      </td>
                      <td className="border px-3 py-2">
                        {s.horarios}
                      </td>
                      <td className="border px-3 py-2">
                        {s.motivo}
                      </td>
                      <td className="border px-3 py-2 text-center">
                        <button
                          onClick={() => onAceptar(s.solicitud_id)}
                          className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700 transition"
                        >
                          Aceptar
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}