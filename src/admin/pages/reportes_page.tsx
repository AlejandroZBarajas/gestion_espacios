import { useEffect, useState } from "react";
import ReporteCard from "../../common/reporte_card";
import type ReporteEntity from "../../entities/reporte_entity";
import { getReportesPendientes, changeStatusReporte } from "../../servicios/reportes_service";
import Header from "../components/common/header";

export default function ReportesPendientesPage() {
  const [reportes, setReportes] = useState<ReporteEntity[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchReportes() {
      try {
        const data = await getReportesPendientes();
        data.forEach(d => {
          d.usuario=`${d.nombre} ${d.apellido} ${d.apellido2}`
          console.log("usuario: ",d.usuario)
          setReportes(data);
          
        });
        console.log(data)
      } catch (err) {
        console.error(err);
        setError("Error al cargar reportes pendientes");
      }
    }
    fetchReportes();
  }, []);

  const handleVer = (id: number) => {
    console.log("Ver reporte", id);
  };

  const handleChangeStatus = async (id: number) => {
    try {
      await changeStatusReporte(id);
    } catch (error) {
      console.error("Error al cambiar el estado del reporte:", error);
      setError("Error al cambiar el estado del reporte");
    }
    console.log("Cambiar estado del reporte", id);
  };

  return (
    <div className="relative">
        <Header/>
      <h1 className="text-2xl font-bold text-morado mb-4">Reportes Pendientes</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-8">
        {reportes.length > 0 ? (
          reportes.map((r) => (
            <ReporteCard
              key={r.reporte_id}
              reporte={r}
              onEdit={handleVer}
              changeStatus={handleChangeStatus}
            />
          ))
        ) : (
          <p className="text-gray-600">No hay reportes pendientes.</p>
        )}
      </div>
    </div>
  );
}
