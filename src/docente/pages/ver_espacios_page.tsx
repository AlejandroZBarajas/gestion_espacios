import { useState, useEffect } from "react";
import HeaderDocente from "../components/header_docente";
import { getEspacios } from "../../servicios/espacios_service";
import { getMaterias } from "../../servicios/materias_service";
import { getPeriodos } from "../../servicios/periodos_service";
import { createSolicitud } from "../../servicios/solicitudes_service";
import type EspacioEntity from "../../entities/espacio_entity";
import type { MateriaEntity } from "../../entities/materia_entity";
import type { PeriodoEntity } from "../../entities/periodo";
import SolicitudForm from "../components/solicitud_form";
import type SolicitudEntity from "../../entities/solicitud_entity";
import EspacioSolicitudCard from "../components/espacio_solicitud_card";
import { getCookie } from "../../common/cookie";

export default function VerEspaciosPage() {
  const [espacios, setEspacios] = useState<EspacioEntity[]>([]);
  const [materias, setMaterias] = useState<MateriaEntity[]>([]);
  const [periodos, setPeriodos] = useState<PeriodoEntity[]>([]);
  const [espacioSeleccionado, setEspacioSeleccionado] = useState<EspacioEntity | null>(null);

  const usuarioId = Number(getCookie("id"))
  
  useEffect(() => {
    getEspacios().then(setEspacios);
    getMaterias().then(setMaterias);
    getPeriodos().then(setPeriodos);
  }, []);

  const handleSolicitud = async (solicitud: SolicitudEntity) => {
    try {
      await createSolicitud(solicitud);
      setEspacioSeleccionado(null);
      alert("Solicitud enviada");
    } catch (error) {
      console.error(error);
      alert("Error al enviar la solicitud");
    }

  };

  return (
    <div className="relative">
        <HeaderDocente/>
        <h1 className="text-3xl text-morado font-bold mb-4">Espacios disponibles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {espacios.map((e) => (
            <EspacioSolicitudCard key={e.espacio_id} espacio={e} onSolicitar={setEspacioSeleccionado} />
        ))}
        </div>


      {espacioSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <SolicitudForm
              usuarioId={usuarioId}
              espacioId={espacioSeleccionado.espacio_id!}
              materias={materias}
              periodos={periodos}
              onSubmit={handleSolicitud}
              onCancel={() => setEspacioSeleccionado(null)}
            />
            
          </div>
        </div>
      )}
    </div>
  );
}
