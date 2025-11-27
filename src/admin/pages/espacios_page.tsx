/* import { useEffect, useState } from "react";
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


      <button
        onClick={() => {
          setEspacioEditando(null);
          setModalAbierto(true);
        }}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
      >
        <MdAdd size={28} />
      </button>


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
 */

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
  deleteEspacio
} from  "../../servicios/espacios_service";

export default function EspaciosPage() {
  const [espacios, setEspacios] = useState<EspacioEntity[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEspacio, setEditingEspacio] = useState<EspacioEntity | null>(null);
  const [capacidadFiltro, setCapacidadFiltro] = useState("");


  const loadEspacios = async () => {
    const data = await getEspacios();
    setEspacios(data);
  };

  useEffect(() => {
    loadEspacios();
  }, []);


  const handleCreate = () => {
    setEditingEspacio(null);
    setIsFormOpen(true);
  };


  const handleEdit = (espacio: EspacioEntity) => {
    setEditingEspacio(espacio);
    setIsFormOpen(true);
  };


const handleSave = async (espacio: EspacioEntity) => {
  if (editingEspacio) {
    await updateEspacio(espacio.espacio_id, espacio);
  } else {
    await createEspacio(espacio);
  }

  setIsFormOpen(false);
  loadEspacios();
};



  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este espacio?")) return;
    await deleteEspacio(id);
    loadEspacios();
  };


  const filtrarPorCapacidad = (items: EspacioEntity[]) => {
    if (!capacidadFiltro) return items;

    const [min, maxRaw] = capacidadFiltro.split("-");
    const minCap = parseInt(min);
    const maxCap = maxRaw === "+" ? Infinity : parseInt(maxRaw);

    return items.filter(
      (e) => e.capacidad >= minCap && e.capacidad <= maxCap
    );
  };

  const espaciosFiltrados = filtrarPorCapacidad(espacios);


  return (
    <div className="relative">

      <Header/>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          <MdAdd size={20} />
          Nuevo Espacio
        </button>
      </div>

      <div className="my-4">
        <label className="mr-2 font-semibold">Filtrar por capacidad:</label>
        <select
          className="border p-2 rounded"
          value={capacidadFiltro}
          onChange={(e) => setCapacidadFiltro(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="1-10">1 - 10</option>
          <option value="11-20">11 - 20</option>
          <option value="21-30">21 - 30</option>
          <option value="31-40">31 - 40</option>
          <option value="40+">40+</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {espaciosFiltrados.map((espacio) => (
          <EspacioCard
            key={espacio.espacio_id}
            espacio={espacio}
            onEdit={() => handleEdit(espacio)}
            onDelete={() => handleDelete(espacio.espacio_id!)}
          />
        ))}
      </div>

      {/* FORMULARIO (MODAL) */}
      {isFormOpen && (
        <EspacioForm
          espacio={editingEspacio}
          onCancel={() => setIsFormOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
