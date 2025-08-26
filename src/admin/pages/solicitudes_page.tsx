import { useEffect, useState } from "react";
import Header from "../components/common/header";
import SolicitudCard from "../components/solicitudes/solicitudes_card";
import { 
  getSolicitudesPendientes, 
  aceptarSolicitud, 
  rechazarSolicitud 
} from "../../servicios/solicitudes_service";
import type SolicitudPendienteEntity from "../../entities/solicitud_pendiente_entity";

export default function Solicitudes() {
  const [solicitudes, setSolicitudes] = useState<SolicitudPendienteEntity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const data = await getSolicitudesPendientes();
        setSolicitudes(data);
      } catch (err) {
        console.error("Error al cargar solicitudes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitudes();
  }, []);

  const handleAceptar = async (solicitud_id: number) => {
    try {
      const user_id = 1; 
      await aceptarSolicitud(solicitud_id, user_id);

      setSolicitudes((prev) =>
        prev.map((s) =>
          s.solicitud_id === solicitud_id ? { ...s, estado: "aprobada" } : s
        )
      );
    } catch (err) {
      console.error("Error al aceptar solicitud:", err);
    }
  };

  const handleRechazar = async (solicitud_id: number) => {
    try {
      await rechazarSolicitud(solicitud_id);
      setSolicitudes((prev) =>
        prev.map((s) =>
          s.solicitud_id === solicitud_id ? { ...s, estado: "rechazada" } : s
        )
      );
    } catch (err) {
      console.error("Error al rechazar solicitud:", err);
    }
  };

  return (
    <div>
      <Header />

      <div className="w-full h-[100px] flex flex-col justify-center items-center">
        <h2 className="text-morado font-black text-4xl">Solicitudes</h2>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Cargando solicitudes...</p>
      ) : solicitudes.length === 0 ? (
        <p className="text-center text-gray-600">No hay solicitudes pendientes.</p>
      ) : (
        <div className="flex flex-col items-center gap-6">
          {solicitudes.map((solicitud) => (
            <SolicitudCard
              key={solicitud.solicitud_id}
              solicitud={solicitud}
              onAceptar={handleAceptar}
              onRechazar={handleRechazar}
            />
          ))}
        </div>
      )}
    </div>
  );
}
