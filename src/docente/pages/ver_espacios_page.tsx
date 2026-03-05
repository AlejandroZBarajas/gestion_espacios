import { useState, useEffect/* , useSyncExternalStore */ } from "react";
import HeaderDocente from "../components/header_docente";
import { getEspacios } from "../../servicios/espacios_service";
import { getMaterias } from "../../servicios/materias_service";
import { getPeriodoActivo } from "../../servicios/periodos_service";
import { createSolicitud, createSolicitudEspecial } from "../../servicios/solicitudes_service";
import type EspacioEntity from "../../entities/espacio_entity";
import type { MateriaEntity } from "../../entities/materia_entity";
import type { PeriodoEntity } from "../../entities/periodo";
import SolicitudForm from "../components/solicitud_form";
import SolicitudEspecialForm from "../components/solicitud_esp_form";
import type SolicitudEntity from "../../entities/solicitud_entity";
import type SolicitudEspecialEntity from "../../entities/solicitud_esp_entity";
import EspacioSolicitudCard from "../components/espacio_solicitud_card";
import { getCookie } from "../../common/cookie";

export default function VerEspaciosPage() {
  const [espacios, setEspacios] = useState<EspacioEntity[]>([]);
  const [materias, setMaterias] = useState<MateriaEntity[]>([]);
  const [periodo, setPeriodo] = useState<PeriodoEntity  >();
  const [espacioSeleccionado, setEspacioSeleccionado] = useState<EspacioEntity | null>(null);
  const [espacioEspecialSeleccionado, setEspacioEspecialSeleccionado] = useState<EspacioEntity | null >(null)

  const [capacidadFiltro, setCapacidadFiltro] = useState<string>("");
  
  const [modalMensaje, setModalMensaje] = useState<{ mensaje: string; tipo: 'exito' | 'error' } | null>(null);

  const usuarioId = Number(getCookie("id"));
  
  useEffect(() => {
    getEspacios().then(setEspacios);
    getMaterias().then(setMaterias);
    getPeriodoActivo().then(setPeriodo);
  }, []);

  const handleSolicitud = async (solicitud: SolicitudEntity) => {
    console.log(solicitud)
    try {
      await createSolicitud(solicitud);
      setEspacioSeleccionado(null);
      setModalMensaje({ mensaje: "Solicitud enviada", tipo: 'exito' });
    } catch (error) {
      console.error(error);
      setModalMensaje({ mensaje: "Error al enviar la solicitud", tipo: 'error' });
    }
  };

  const handleSolicitudEspecial = async (solicitudEspecial: SolicitudEspecialEntity) => {
    try{
      await createSolicitudEspecial(solicitudEspecial)
      setEspacioEspecialSeleccionado(null)
      setModalMensaje({ mensaje: "Solicitud especial enviada", tipo: 'exito' });
    }catch(error){
      console.error(error)
      setModalMensaje({ mensaje: "Error al solicitar", tipo: 'error' });
    }
  }

  const espaciosFiltrados = espacios.filter((e) => {
    if (!capacidadFiltro) return true;

    const capacidad = e.capacidad;

    switch (capacidadFiltro) {
      case "1-10":
        return capacidad >= 1 && capacidad <= 10;
      case "11-20":
        return capacidad >= 11 && capacidad <= 20;
      case "21-30":
        return capacidad >= 21 && capacidad <= 30;
      case "31-40":
        return capacidad >= 31 && capacidad <= 40;
      case "40+":
        return capacidad >= 40;
      default:
        return true;
    }
  });

  return (
    <div className="relative">
      <HeaderDocente/>

      <h1 className="text-3xl text-morado font-bold mb-4">Espacios disponibles</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Filtrar por capacidad:
        </label>

        <select
          value={capacidadFiltro}
          onChange={(e) => setCapacidadFiltro(e.target.value)}
          className="mt-1 p-2 border rounded w-full max-w-xs"
        >
          <option value="">Mostrar todos</option>
          <option value="1-10">1 - 10</option>
          <option value="11-20">11 - 20</option>
          <option value="21-30">21 - 30</option>
          <option value="31-40">31 - 40</option>
          <option value="40+">40+</option>
        </select>
      </div>

      {/* GRID DE ESPACIOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {espaciosFiltrados.map((e) => (
          <EspacioSolicitudCard
            key={e.espacio_id}
            espacio={e}
            onSolicitar={setEspacioSeleccionado}
            onSolicitarEspecial={setEspacioEspecialSeleccionado}
          />
        ))}
      </div>

      {/* MODAL DE SOLICITUD */}
      {espacioSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <SolicitudForm
              usuarioId={usuarioId}
              espacioId={espacioSeleccionado.espacio_id!}
              materias={materias}
              periodoId={periodo?.periodo_id ?? 0 }
              onSubmit={handleSolicitud}
              onCancel={() => setEspacioSeleccionado(null)}
            />
          </div>
        </div>
      )}

      {/* MODAL DE SOLICITUD ESPECIAL */}
      {espacioEspecialSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <SolicitudEspecialForm
              usuarioId={usuarioId}
              espacioId={espacioEspecialSeleccionado.espacio_id!}
              onSubmit={handleSolicitudEspecial}
              onCancel={() => setEspacioEspecialSeleccionado(null)}
            />
          </div>
        </div>
      )}

      {/* MODAL DE MENSAJE */}
      {modalMensaje && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={() => setModalMensaje(null)}
        >
          <div 
            className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className={`text-5xl mb-4 ${modalMensaje.tipo === 'exito' ? 'text-green-500' : 'text-red-500'}`}>
                {modalMensaje.tipo === 'exito' ? '✓' : '✕'}
              </div>
              <p className="text-lg font-medium text-gray-800 mb-6">
                {modalMensaje.mensaje}
              </p>
              <button
                onClick={() => setModalMensaje(null)}
                className={`px-6 py-2 rounded font-medium text-white ${
                  modalMensaje.tipo === 'exito' 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-red-500 hover:bg-red-600'
                } transition-colors`}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}