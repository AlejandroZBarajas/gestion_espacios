import { useEffect, useState } from "react";
import EspacioCard from "../components/espacios/espacios_card";
import EspacioForm from "../components/espacios/espacios_form";
import type EspacioEntity from "../../entities/espacio_entity";
import { MdAdd } from "react-icons/md";
import Header from "../components/common/header";
import {
  getEspacios,
  createEspacio,
  updateEspacio,
  deleteEspacio,
} from "../../servicios/espacios_service";

export default function EspaciosPage() {
  const [espacios, setEspacios] = useState<EspacioEntity[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [espacioEditando, setEspacioEditando] = useState<EspacioEntity | null>(null);

  const fetchEspacios = async () => {
    try {
      const data = await getEspacios();
      setEspacios(data);
      console.log(data)
    } catch (error) {
      console.error("Error cargando espacios", error);
    }
  };

  useEffect(() => {
    fetchEspacios();
  }, []);

  const handleSave = async (nuevo: EspacioEntity) => {
    try {
      if (espacioEditando) {
        const actualizado = await updateEspacio(espacioEditando.espacio_id!, nuevo);
        setEspacios(
          espacios.map((e) =>
            e.espacio_id === espacioEditando.espacio_id ? actualizado : e
          )
        );
      } else {
        const creado = await createEspacio(nuevo);
        setEspacios([...espacios, creado]);
      }
      setModalAbierto(false);
      setEspacioEditando(null);
    } catch (err) {
      console.error("Error guardando espacio:", err);
    }
  };

  const handleEdit = (espacio: EspacioEntity) => {
    setEspacioEditando(espacio);
    setModalAbierto(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEspacio(id);
      setEspacios(espacios.filter((e) => e.espacio_id !== id));
    } catch (err) {
      console.error("Error eliminando espacio:", err);
    }
  };

  return (
    <div className="relative">
      <Header />
      <div className="w-full h-[100px] flex flex-col justify-center items-center">
        <h2 className="text-morado font-black text-4xl">Espacios</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {espacios.map((espacio) => (
          <EspacioCard
            key={espacio.espacio_id}
            espacio={espacio}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Botón flotante */}
      <button
        onClick={() => {
          setEspacioEditando(null);
          setModalAbierto(true);
        }}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
      >
        <MdAdd size={28} />
      </button>

      {/* Modal */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <EspacioForm
              espacio={espacioEditando}
              onSave={handleSave}
              onCancel={() => setModalAbierto(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
