/* import { useState, useEffect } from "react";

import type SolicitudPendienteEntity from "../../entities/solicitud_pendiente_entity";
import type SolicitudEspecialDTO from "../../entities/solicitud_especial_DTO";

import HeaderDocente from "../components/header_docente";
import SolicitudCard from "../../admin/components/solicitudes/solicitudes_card";
import SolicitudEspecialCard from "../../admin/components/solicitudes/solicitud_especial_card";

import { getCookie } from "../../common/cookie";

import { verMisSolicitudes, getMysolicitudesEspeciales } from "../../servicios/solicitudes_service";

export default function MisSolicitudesPage() {
  const [misSolicitudes, setMisSolicitudes] = useState<SolicitudPendienteEntity[]>([]);
  const [misSolicitudesEspeciales, setMisSolicitudesEspeciales] = useState<SolicitudEspecialDTO[]>([])

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const usuarioId = Number(getCookie("id"));

  useEffect(() => {
    async function fetchSolicitudes() {
      try {
        const data = await verMisSolicitudes(usuarioId);
        setMisSolicitudes(data);
      } catch (err) {
        setError("Error al cargar solicitudes: ");
        console.log(err)
      } finally {
        setLoading(false);
      }
    }
    fetchSolicitudes();
  }, [usuarioId]);

    useEffect(() => {
    async function fetchSolicitudesEspeciales() {
      try {
        const data = await getMysolicitudesEspeciales(usuarioId);
        setMisSolicitudesEspeciales(data);
      } catch (err) {
        setError("Error al cargar solicitudes: ");
        console.log(err)
      } finally {
        setLoading(false);
      }
    }
    fetchSolicitudesEspeciales();
  }, [usuarioId]);

  return (
    <div className="relative ">
      <HeaderDocente />
      <h1 className="text-3xl text-morado font-bold mb-6">Mis solicitudes</h1>

      {loading && <p className="text-gray-500">Cargando solicitudes...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && misSolicitudes.length === 0 && (
        <p className="text-gray-500">No tienes solicitudes registradas.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {misSolicitudes.map((s) => (
          <SolicitudCard
            key={s.solicitud_id}
            solicitud={s}
            editable={false} // Docente solo consulta
          />
        ))}
      </div>



      <h1 className="text-3xl text-morado font-bold mb-6">Mis solicitudes Especiales</h1>

      {loading && <p className="text-gray-500">Cargando solicitudes...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && misSolicitudesEspeciales.length === 0 && (
        <p className="text-gray-500">No tienes solicitudes registradas.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {misSolicitudesEspeciales.map((s) => (
          <SolicitudEspecialCard
            key={s.solicitud_especial_id}
            solicitud={s}
            editable={false} // Docente solo consulta
          />
        ))}
      </div>
    </div>
  );
}
 */

import { useState, useEffect } from "react";

import type SolicitudPendienteEntity from "../../entities/solicitud_pendiente_entity";
import type SolicitudEspecialDTO from "../../entities/solicitud_especial_DTO";

import HeaderDocente from "../components/header_docente";
import SolicitudCard from "../../admin/components/solicitudes/solicitudes_card";
import SolicitudEspecialCard from "../../admin/components/solicitudes/solicitud_especial_card";

import { getCookie } from "../../common/cookie";

import { verMisSolicitudes, getMysolicitudesEspeciales } from "../../servicios/solicitudes_service";

export default function MisSolicitudesPage() {
  const [misSolicitudes, setMisSolicitudes] = useState<SolicitudPendienteEntity[]>([]);
  const [misSolicitudesEspeciales, setMisSolicitudesEspeciales] = useState<SolicitudEspecialDTO[]>([]);

  const [filtroEstado, setFiltroEstado] = useState<string>("todos");
  const [filtroEstadoEspecial, setFiltroEstadoEspecial] = useState<string>("todos");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const usuarioId = Number(getCookie("id"));

  useEffect(() => {
    async function fetchSolicitudes() {
      try {
        const data = await verMisSolicitudes(usuarioId);
        setMisSolicitudes(data);
      } catch (err) {
        setError("Error al cargar solicitudes: ");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchSolicitudes();
  }, [usuarioId]);

  useEffect(() => {
    async function fetchSolicitudesEspeciales() {
      try {
        const data = await getMysolicitudesEspeciales(usuarioId);
        setMisSolicitudesEspeciales(data);
      } catch (err) {
        setError("Error al cargar solicitudes: ");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchSolicitudesEspeciales();
  }, [usuarioId]);

  // Obtener estados únicos de cada lista
  const estadosSolicitudes = ["todos", ...Array.from(new Set(misSolicitudes.map((s) => s.estado)))];
  const estadosEspeciales = ["todos", ...Array.from(new Set(misSolicitudesEspeciales.map((s) => s.estado)))];

  // Filtrar listas según el estado seleccionado
  const solicitudesFiltradas =
    filtroEstado === "todos"
      ? misSolicitudes
      : misSolicitudes.filter((s) => s.estado === filtroEstado);

  const especialesFiltradas =
    filtroEstadoEspecial === "todos"
      ? misSolicitudesEspeciales
      : misSolicitudesEspeciales.filter((s) => s.estado === filtroEstadoEspecial);

  return (
    <div className="relative">
      <HeaderDocente />
      <h1 className="text-3xl text-morado font-bold mb-6">Mis solicitudes</h1>

      {loading && <p className="text-gray-500">Cargando solicitudes...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          {/* ── Solicitudes normales ── */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Solicitudes de espacio</h2>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-morado"
              >
                {estadosSolicitudes.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado === "todos" ? "Todos los estados" : estado}
                  </option>
                ))}
              </select>
            </div>

            {solicitudesFiltradas.length === 0 ? (
              <p className="text-gray-500">No hay solicitudes con ese estado.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {solicitudesFiltradas.map((s) => (
                  <SolicitudCard key={s.solicitud_id} solicitud={s} editable={false} />
                ))}
              </div>
            )}
          </section>

          {/* ── Solicitudes especiales ── */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Solicitudes especiales</h2>
              <select
                value={filtroEstadoEspecial}
                onChange={(e) => setFiltroEstadoEspecial(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-morado"
              >
                {estadosEspeciales.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado === "todos" ? "Todos los estados" : estado}
                  </option>
                ))}
              </select>
            </div>

            {especialesFiltradas.length === 0 ? (
              <p className="text-gray-500">No hay solicitudes especiales con ese estado.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {especialesFiltradas.map((s) => (
                  <SolicitudEspecialCard key={s.solicitud_especial_id} solicitud={s} />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}