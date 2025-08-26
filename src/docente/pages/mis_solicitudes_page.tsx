
import { useState, useEffect } from "react";
import HeaderDocente from "../components/header_docente";
import SolicitudCard from "../../admin/components/solicitudes/solicitudes_card";

import type SolicitudPendienteEntity from "../../entities/solicitud_pendiente_entity";

import { getCookie } from "../../common/cookie";
import { verMisSolicitudes } from "../../servicios/solicitudes_service";

export default function MisSolicitudesPage() {
  const [misSolicitudes, setMisSolicitudes] = useState<SolicitudPendienteEntity[]>([]);
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
    </div>
  );
}
