import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import Header from "../components/common/header";
import SolicitudCard from '../components/solicitudes/solicitudes_card';
//import SolicitudEspecialCard from '../components/solicitudes/solicitud_especial_card';
import { 
  getSolicitudesPendientes, 
  /* aceptarSolicitudEspecial,
  rechazarSolicitudEspecial, */
  aceptarSolicitud, 
  rechazarSolicitud,
  //getEspecialesPendientes 
} from "../../servicios/solicitudes_service";
import type SolicitudPendienteEntity from "../../entities/solicitud_pendiente_entity";
//import type SolicitudEspecialDTO from '../../entities/solicitud_especial_DTO';

type EstadoSolicitud = "todas" | "pendiente" | "aprobada" | "rechazada";

export default function Solicitudes() {
  const [solicitudes, setSolicitudes] = useState<SolicitudPendienteEntity[]>([]);
  //const [solicitudesEspeciales, setSolicitudesEspeciales] = useState<SolicitudEspecialDTO[]>([])
  const [loading, setLoading] = useState(true);
  const [filtroEstado, setFiltroEstado] = useState<EstadoSolicitud>("todas");
  //const [filtroEstadoEspeciales, setFiltroEstadoEspeciales] = useState<EstadoSolicitud>("todas");

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

 /*    useEffect(() => {
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
  }, []); */

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

 /*    const handleAceptarEspecial = async (solicitud_id: number) => {
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
  }; */

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

 /*    const handleRechazarEspecial = async (solicitud_id: number) => {
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
 */

  // Filtrar solicitudes según el estado seleccionado
  const solicitudesFiltradas = filtroEstado === "todas" 
    ? solicitudes 
    : solicitudes.filter(s => s.estado === filtroEstado);

  /* const solicitudesEspecialesFiltradas = filtroEstadoEspeciales === "todas"
    ? solicitudesEspeciales
    : solicitudesEspeciales.filter(s => s.estado === filtroEstadoEspeciales); */

  return (
    <div>
      <Header />

      <div className="w-full h-[100px] flex flex-col justify-center items-center">
        <h2 className="text-morado font-black text-4xl">Solicitudes</h2>
      </div>

      {/* Filtro para solicitudes normales */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-3">
          <label htmlFor="filtro-estado" className="text-gray-700 font-semibold">
            Filtrar por estado:
          </label>
          <select
            id="filtro-estado"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value as EstadoSolicitud)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-morado focus:border-transparent"
          >
            <option value="todas">Todas</option>
            <option value="pendiente">Pendientes</option>
            <option value="aprobada">Aprobadas</option>
            <option value="rechazada">Rechazadas</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Cargando solicitudes...</p>
      ) : solicitudesFiltradas.length === 0 ? (
        <p className="text-center text-gray-600">
          No hay solicitudes {filtroEstado !== "todas" ? `${filtroEstado}s` : "pendientes"}.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {solicitudesFiltradas.map((solicitud) => (
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

      <div className="w-full h-[100px] flex flex-col justify-center items-center mt-10">
        <h2 className="text-morado font-black text-4xl">Solicitudes especiales</h2>
      </div> 

      {/* Filtro para solicitudes especiales */}
      {/* <div className="flex justify-center mb-6">
        <div className="flex items-center gap-3">
          <label htmlFor="filtro-estado-especiales" className="text-gray-700 font-semibold">
            Filtrar por estado:
          </label>
          <select
            id="filtro-estado-especiales"
            value={filtroEstadoEspeciales}
            onChange={(e) => setFiltroEstadoEspeciales(e.target.value as EstadoSolicitud)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-morado focus:border-transparent"
          >
            <option value="todas">Todas</option>
            <option value="pendiente">Pendientes</option>
            <option value="aprobada">Aprobadas</option>
            <option value="rechazada">Rechazadas</option>
          </select>
        </div>
      </div> */}

      {/* {loading ? (
        <p className="text-center text-gray-600">Cargando solicitudes...</p>
      ) : solicitudesEspecialesFiltradas.length === 0 ? (
        <p className="text-center text-gray-600">
          No hay solicitudes especiales {filtroEstadoEspeciales !== "todas" ? `${filtroEstadoEspeciales}s` : "pendientes"}.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {solicitudesEspecialesFiltradas.map((solicitud) => (
            <SolicitudEspecialCard
              key={solicitud.solicitud_especial_id}
              solicitud={solicitud}
              onAceptar={handleAceptarEspecial}
              onRechazar={handleRechazarEspecial}
              editable={rol === "administrador"}
            />
          ))}
        </div>
      )} */}
    </div>
  );
}