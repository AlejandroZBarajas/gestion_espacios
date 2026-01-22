import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import Header from "../components/common/header";
import SolicitudCard from '../components/solicitudes/solicitudes_card';
import SolicitudEspecialCard from '../components/solicitudes/solicitud_especial_card';
import { 
  getSolicitudesPendientes, 
  aceptarSolicitudEspecial,
  aceptarSolicitud, 
  rechazarSolicitudEspecial,
  rechazarSolicitud,
  getEspecialesPendientes 
} from "../../servicios/solicitudes_service";
import type SolicitudPendienteEntity from "../../entities/solicitud_pendiente_entity";
import type SolicitudEspecialDTO from '../../entities/solicitud_especial_DTO';

export default function Solicitudes() {
  const [solicitudes, setSolicitudes] = useState<SolicitudPendienteEntity[]>([]);
  const [solicitudesEspeciales, setSolicitudesEspeciales] = useState<SolicitudEspecialDTO[]>([])
  const [loading, setLoading] = useState(true);

  const id = Cookies.get("id");
  const user_id = Number(id); 
  
  const rol = Cookies.get("rol");

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

    useEffect(() => {
    const fetchSolicitudesEspeciales = async () => {
      try {
        const data = await getEspecialesPendientes();
        setSolicitudesEspeciales(data);
      } catch (err) {
        console.error("Error al cargar solicitudes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitudesEspeciales();
  }, []);

  const handleAceptar = async (solicitud_id: number) => {
    console.log(solicitud_id)
    try {
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

    const handleAceptarEspecial = async (solicitud_id: number) => {
    console.log(solicitud_id)
    try {
      await aceptarSolicitudEspecial(solicitud_id);

      setSolicitudesEspeciales((prev) =>
        prev.map((s) =>
          s.solicitud_especial_id === solicitud_id ? { ...s, estado: "aprobada" } : s
        )
      );
    } catch (err) {
      console.error("Error al aceptar solicitud:", err);
    }
  };

  const handleRechazar = async (solicitud_id: number) => {
    console.log(solicitud_id)
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

    const handleRechazarEspecial = async (solicitud_id: number) => {
    try {
      await rechazarSolicitudEspecial(solicitud_id);
      setSolicitudesEspeciales((prev) =>
        prev.map((s) =>
          s.solicitud_especial_id === solicitud_id ? { ...s, estado: "rechazada" } : s
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {solicitudes.map((solicitud) => (
            <SolicitudCard
              key={solicitud.solicitud_id}
              solicitud={solicitud}
              onAceptar={handleAceptar}
              onRechazar={handleRechazar}
              editable={rol === "administrador"}
            />
          ))}
        </div>
      )}

      <div className="w-full h-[100px] flex flex-col justify-center items-center">
        <h2 className="text-morado font-black text-4xl">Solicitudes especiales</h2>
      </div>

        {loading ? (
          <p className="text-center text-gray-600">Cargando solicitudes...</p>
        ) : solicitudesEspeciales.length === 0 ? (
          <p className="text-center text-gray-600">No hay solicitudes pendientes.</p>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {solicitudesEspeciales.map((solicitud) => (
            <SolicitudEspecialCard
              key={solicitud.solicitud_especial_id}
              solicitud={solicitud}
              onAceptar={handleAceptarEspecial}
              onRechazar={handleRechazarEspecial}
              editable={rol === "administrador"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
