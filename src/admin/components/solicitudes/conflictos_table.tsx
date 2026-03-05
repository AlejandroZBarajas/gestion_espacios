import type { SolicitudEnConflictoTableDTO, SolicitudEnConflictoRowDTO } from "../../../entities/solicitud_conflicto_entity";
import { aceptarSolicitud } from "../../../servicios/solicitudes_service";
import { useContext, useState } from "react";
import { AuthContext } from "../../../common/auth_context";

interface Props {
  conflictos: SolicitudEnConflictoTableDTO[];
  onAceptar: (solicitudId: number) => void;
}

export default function ConflictosTable({ conflictos, onAceptar }: Props) {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState<number | null>(null);

  if (!authContext) {
    throw new Error("ConflictosTable debe usarse dentro de un AuthProvider");
  }

  const { user } = authContext;

  const handleAceptar = async (solicitudId: number) => {
    if (!user.id) {
      alert("No se pudo obtener el ID del usuario");
      return;
    }

    try {
      setLoading(solicitudId);
      await aceptarSolicitud(solicitudId, parseInt(user.id));
      onAceptar(solicitudId);
    } catch (error) {
      console.error("Error al aceptar solicitud:", error);
      alert("Ocurrió un error al aceptar la solicitud");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-6 bg-gray-600 p-2">tabla de conflictos
      <h2 className="text-2xl font-bold text-gray-800">Conflictos de espacio</h2>
      
      {conflictos.map((espacio) => (
        <div key={espacio.espacio_nombre} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
            <h3 className="text-xl font-semibold text-white">
              Espacio: {espacio.espacio_nombre}
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Solicitud
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grupo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Horario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Motivo
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {espacio.solicitudes_en_conflicto.map((s: SolicitudEnConflictoRowDTO) => (
                  <tr key={s.solicitud_id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{s.solicitud_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {s.usuario_nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {s.grupo}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {s.horarios}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {s.motivo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleAceptar(s.solicitud_id)}
                        disabled={loading === s.solicitud_id}
                        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {loading === s.solicitud_id ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Aceptando...
                          </>
                        ) : (
                          "Aceptar"
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}