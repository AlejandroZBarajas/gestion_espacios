import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../common/auth_context";
import Header from "../components/common/header";
import SolicitudCard from "../components/solicitudes/solicitudes_card";
import SolicitudEspecialCard from "../components/solicitudes/solicitud_especial_card";
import type { SolicitudEnConflictoTableDTO } from "../../entities/solicitud_conflicto_entity";
import {
  getSolicitudesPendientes,
  aceptarSolicitudEspecial,
  rechazarSolicitudEspecial,
  aceptarSolicitud,
  rechazarSolicitud,
  getEspeciales,
  getConflictos,
} from "../../servicios/solicitudes_service";

import type SolicitudPendienteEntity from "../../entities/solicitud_pendiente_entity";
import type SolicitudEspecialDTO from "../../entities/solicitud_especial_DTO";
import ConflictosTable from "../components/solicitudes/conflictos_table";

type EstadoSolicitud = "todas" | "pendiente" | "aprobada" | "rechazada";
type TipoSolicitud = "normal" | "especial";

export default function Solicitudes() {
  const authContext = useContext(AuthContext);

  const [solicitudes, setSolicitudes] = useState<SolicitudPendienteEntity[]>([]);
  const [solicitudesEspeciales, setSolicitudesEspeciales] = useState<SolicitudEspecialDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [tipoSolicitud, setTipoSolicitud] = useState<TipoSolicitud>("normal");
  const [filtroEstado, setFiltroEstado] = useState<EstadoSolicitud>("todas");
  const [conflictos, setConflictos] = useState<SolicitudEnConflictoTableDTO[]>([]);

  const user = authContext?.user;
  const user_id = user?.id ? Number(user.id) : 0; // 👈 Si no existe, que sea 0 en vez de NaN
  const rol = user?.rol || localStorage.getItem("auth_rol"); // 👈 Salvavidas por si el contexto parpadea

  // 🔍 LOG 1: Saber qué ve el componente en CADA renderizado
  console.log("📺 [RENDER SOLICITUDES] Estado actual:", {
    user_id,
    rol,
    loading,
    solicitudesLength: solicitudes.length,
    conflictosLength: conflictos.length
  });

  useEffect(() => {
  console.log("🔄 [DEBUG EFFECT] Evaluando carga para user_id:", user_id);
  
  if (user_id && user_id > 0) {
    fetchAll();
  } else {
    console.warn("⚠️ [DEBUG EFFECT] Esperando un ID de usuario válido. Actual:", user_id);
  }
}, [user_id]); // Sigue escuchando al ID

  const fetchAll = async () => {
    console.log("🚀 [fetchAll] Iniciando peticiones al servidor...");
    setLoading(true);
    try {
      const [normales, especiales, conflictosData] = await Promise.all([
        getSolicitudesPendientes(),
        getEspeciales(),
        getConflictos(),
      ]);

      // 🔍 LOG 3: Ver qué pasa exactamente cuando se reciben los arreglos vacíos
      console.log("📥 [fetchAll ÉXITO] Datos recibidos del service:", {
        normales,
        especiales,
        conflictosData
      });

      setSolicitudes(normales || []);
      setSolicitudesEspeciales(especiales || []);
      setConflictos(conflictosData || []);
      
      console.log("💾 [fetchAll] Estados de React actualizados.");
    } catch (err) {
      console.error("💥 [fetchAll ERROR] Error crítico en la carga:", err);
    } finally {
      console.log("🔚 [fetchAll] Finalizando. Seteando loading a false.");
      setLoading(false);
    }
  };

  // ... (aquí sigue el resto de tus filtros y funciones handleAceptar)

  const handleAceptar = async (solicitud_id: number) => {
    try {
      await aceptarSolicitud(solicitud_id, user_id);
    } catch (err) {
      console.warn("Error al aceptar solicitud:", err);
    } finally {
      await fetchAll(); // Asegura que se actualicen las solicitudes después de aceptar
    }
  };

const handleRechazar = async (solicitud_id: number) => {
  try {
    await rechazarSolicitud(solicitud_id);
    await fetchAll(); // ← ya lo tienes en handleAceptar, hazlo aquí también
  } catch (err) {
    console.error("Error al rechazar solicitud:", err);
  }
};

  /* =========================
     Handlers especiales
  ========================= */
 const handleAceptarEspecial = async (solicitud_id: number) => {
  try {
    await aceptarSolicitudEspecial(solicitud_id);
    await fetchAll(); // ← reemplaza el setSolicitudesEspeciales local
  } catch (err) {
    console.error("Error al aceptar solicitud especial:", err);
  }
};

const handleRechazarEspecial = async (solicitud_id: number) => {
  try {
    await rechazarSolicitudEspecial(solicitud_id);
    await fetchAll(); // ← igual aquí
  } catch (err) {
    console.error("Error al rechazar solicitud especial:", err);
  }
};

 const solicitudesNormalesFiltradas =
  filtroEstado === "todas"
    ? solicitudes
    : solicitudes.filter((s) => s.estado === filtroEstado);

const solicitudesEspecialesFiltradas =
  filtroEstado === "todas"
    ? solicitudesEspeciales
    : solicitudesEspeciales.filter((s) => s.estado === filtroEstado);

  return (
    <div>
      <Header />

      <div className="w-full h-[100px] flex flex-col justify-center items-center">
        <h2 className="text-morado font-black text-4xl">Solicitudes</h2>
      </div>

      {!loading && conflictos.length > 0 && (
  <ConflictosTable
    conflictos={conflictos}
    onAceptar={handleAceptar}
  />
)}

      {/* Filtros */}
      <div className="flex justify-center mb-6 gap-6 flex-wrap">
        <div className="flex items-center gap-3">
          <label className="text-gray-700 font-semibold">Tipo:</label>
          <select
            value={tipoSolicitud}
            onChange={(e) => setTipoSolicitud(e.target.value as TipoSolicitud)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="normal">Solicitudes</option>
            <option value="especial">Solicitudes especiales</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-gray-700 font-semibold">Estado:</label>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value as EstadoSolicitud)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="todas">Todas</option>
            <option value="pendiente">Pendientes</option>
            <option value="aprobada">Aprobadas</option>
            <option value="rechazada">Rechazadas</option>
          </select>
        </div>
      </div>

      {/* Listado */}
     {loading ? (
  <p className="text-center text-gray-600">Cargando solicitudes...</p>
) : tipoSolicitud === "normal" ? (
  solicitudesNormalesFiltradas.length === 0 ? (
    <p className="text-center text-gray-600">No hay solicitudes.</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
      {solicitudesNormalesFiltradas.map((solicitud) => (
        <SolicitudCard
          key={solicitud.solicitud_id}
          solicitud={solicitud}
          onAceptar={handleAceptar}
          onRechazar={handleRechazar}
          editable={rol === "administrador"}
        />
      ))}
    </div>
  )
) : solicitudesEspecialesFiltradas.length === 0 ? (
  <p className="text-center text-gray-600">No hay solicitudes especiales.</p>
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
)}

    </div>
  );
}
