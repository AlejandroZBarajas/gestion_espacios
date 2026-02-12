import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Header from "../components/common/header";
import SolicitudCard from "../components/solicitudes/solicitudes_card";
import SolicitudEspecialCard from "../components/solicitudes/solicitud_especial_card";

import {
  getSolicitudesPendientes,
  aceptarSolicitudEspecial,
  rechazarSolicitudEspecial,
  aceptarSolicitud,
  rechazarSolicitud,
  getEspeciales,
} from "../../servicios/solicitudes_service";

import type SolicitudPendienteEntity from "../../entities/solicitud_pendiente_entity";
import type SolicitudEspecialDTO from "../../entities/solicitud_especial_DTO";

type EstadoSolicitud = "todas" | "pendiente" | "aprobada" | "rechazada";
type TipoSolicitud = "normal" | "especial";

export default function Solicitudes() {
  const [solicitudes, setSolicitudes] = useState<SolicitudPendienteEntity[]>([]);
  const [solicitudesEspeciales, setSolicitudesEspeciales] = useState<SolicitudEspecialDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const [tipoSolicitud, setTipoSolicitud] = useState<TipoSolicitud>("normal");
  const [filtroEstado, setFiltroEstado] = useState<EstadoSolicitud>("todas");

  const id = Cookies.get("id");
  const user_id = Number(id);
  const rol = Cookies.get("rol");

  /* =========================
     Fetch de datos
  ========================= */
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [normales, especiales] = await Promise.all([
          getSolicitudesPendientes(),
          getEspeciales(),
        ]);

        setSolicitudes(normales);
        setSolicitudesEspeciales(especiales);
      } catch (err) {
        console.error("Error al cargar solicitudes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  /* =========================
     Handlers normales
  ========================= */
  const handleAceptar = async (solicitud_id: number) => {
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

  /* =========================
     Handlers especiales
  ========================= */
  const handleAceptarEspecial = async (solicitud_id: number) => {
    try {
      await aceptarSolicitudEspecial(solicitud_id);
      setSolicitudesEspeciales((prev) =>
        prev.map((s) =>
          s.solicitud_especial_id === solicitud_id
            ? { ...s, estado: "aprobada" }
            : s
        )
      );
    } catch (err) {
      console.error("Error al aceptar solicitud especial:", err);
    }
  };

  const handleRechazarEspecial = async (solicitud_id: number) => {
    try {
      await rechazarSolicitudEspecial(solicitud_id);
      setSolicitudesEspeciales((prev) =>
        prev.map((s) =>
          s.solicitud_especial_id === solicitud_id
            ? { ...s, estado: "rechazada" }
            : s
        )
      );
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
