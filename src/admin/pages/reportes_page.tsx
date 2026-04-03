import { useEffect, useState } from "react";
import Header from "../components/common/header";
import ReporteCard from "../components/reporte_card";
import type ReporteTableEntity from "../../entities/reporte_table_entity";
import type { ReporteItemEntity } from "../../entities/reporte_table_entity";
import { getAllReportes, marcarEnProceso, marcarReparado } from "../../servicios/reportes_service";

interface ReportePlano extends ReporteItemEntity {
  nombre_espacio: string
  nombre_ubicacion: string
}

function aplanarReportes(data: ReporteTableEntity[]): ReportePlano[] {
  return data.flatMap((ubicacion) =>
    ubicacion.espacios.flatMap((espacio) =>
      espacio.reportes.map((reporte) => ({
        ...reporte,
        nombre_espacio: espacio.nombre_espacio,
        nombre_ubicacion: ubicacion.nombre_ubicacion,
      }))
    )
  );
}

export default function ReportesPendientesPage() {
  const [reportes, setReportes] = useState<ReportePlano[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<string>("todos");
  const [error, setError] = useState<string | null>(null);

  const estadosDisponibles = [
    "todos",
    ...new Set(reportes.map((r) => r.estado).filter(Boolean)),
  ];

  const reportesFiltrados =
    filtroEstado === "todos"
      ? reportes
      : reportes.filter((r) => r.estado === filtroEstado);

  useEffect(() => {
    getAllReportes()
      .then((data) => setReportes(aplanarReportes(data)))
      .catch((err) => {
        console.error(err);
        setError("Error al cargar reportes");
      });
  }, []);

  const handleCambiarEstado = async (id: number, estadoActual: string) => {
    try {
      if (estadoActual === "pendiente") {
        await marcarEnProceso(id);
      } else if (estadoActual === "en_proceso") {
        await marcarReparado(id);
      }
      // Actualizamos el estado local sin refetch
      setReportes((prev) =>
        prev.map((r) =>
          r.reporte_id === id
            ? { ...r, estado: estadoActual === "pendiente" ? "en_proceso" : "reparado" }
            : r
        )
      );
    } catch (err) {
      console.error(err);
      setError("Error al cambiar el estado del reporte");
    }
  };

  return (
    <div className="relative min-h-screen">
      <Header />

      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4 px-8 pt-4">
        <h1 className="text-3xl text-morado font-bold">Reportes</h1>
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="border border-morado text-morado rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-morado"
        >
          {estadosDisponibles.map((estado) => (
            <option key={estado} value={estado}>
              {estado === "todos" ? "Todos" : estado.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-red-500 px-8">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-8">
        {reportesFiltrados.length > 0 ? (
          reportesFiltrados.map((r) => (
            <ReporteCard
              key={r.reporte_id}
              reporte={r}
              nombreEspacio={r.nombre_espacio}
              nombreUbicacion={r.nombre_ubicacion}
              onCambiarEstado={handleCambiarEstado}
            />
          ))
        ) : (
          <p className="text-gray-600">No hay reportes con ese estado.</p>
        )}
      </div>
    </div>
  );
}