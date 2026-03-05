import { useEffect, useState } from "react";
import {
  getMaterias,
  createMateria,
  updateMateria,
  deleteMateria,
} from "../../servicios/materias_service";
import Header from "../components/common/header";
import type { MateriaEntity } from "../../entities/materia_entity";
import MateriaCard from "../components/materias_comps/materia_card";
import MateriaForm from "../components/materias_comps/materia_form";
import { MdAdd } from "react-icons/md";
import ConfirmDialog from "../../common/confirm_dialog/confirm_dialog";

export default function MateriasPage() {
  const [materias, setMaterias] = useState<MateriaEntity[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [materiaEditando, setMateriaEditando] = useState<MateriaEntity | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{ message: string; id?: number } | null>(null);

  const fetchMaterias = async () => {
    try {
      const data = await getMaterias();
      setMaterias(data);
    } catch (err) {
      console.error("Error cargando materias", err);
    }
  };

  useEffect(() => {
    fetchMaterias();
  }, []);

  const handleSave = async (nueva: MateriaEntity) => {
    try {
      if (materiaEditando) {
        const actualizada = await updateMateria(materiaEditando.materia_id!, nueva);
        setMaterias(
          materias.map((m) =>
            m.materia_id === materiaEditando.materia_id ? actualizada : m
          )
        );
      } else {
        const creada = await createMateria(nueva);
        setMaterias([...materias, creada]);
      }
      setModalAbierto(false);
      setMateriaEditando(null);
    } catch (err) {
      console.error("Error guardando materia:", err);
    }
  };

  const handleEdit = (materia: MateriaEntity) => {
    setMateriaEditando(materia);
    setModalAbierto(true);
  };

  const handleDelete = (id: number) => {
    setConfirmDialog({
      message: "¿Estás seguro de eliminar esta materia?",
      id,
    });
  };

  const confirmDelete = async () => {
    if (!confirmDialog?.id) return;
    try {
      await deleteMateria(confirmDialog.id);
      setMaterias(materias.filter((m) => m.materia_id !== confirmDialog.id));
    } catch (err) {
      console.error("Error eliminando materia:", err);
    }
    setConfirmDialog(null);
  };

  return (
    <div className="relative">
      <Header />

      <div className="w-full h-[100px] flex flex-col justify-center items-center">
        <h2 className="text-morado font-black text-4xl">Materias</h2>
      </div>

      {/* Lista de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {materias.map((materia) => (
          <MateriaCard
            key={materia.materia_id}
            materia={materia}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Botón flotante */}
      <button
        onClick={() => {
          setMateriaEditando(null);
          setModalAbierto(true);
        }}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
      >
        <MdAdd size={28} />
      </button>

      {/* Modal con el formulario */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <MateriaForm
              initialData={materiaEditando || undefined}
              onSubmit={handleSave}
            />
            <button
              onClick={() => setModalAbierto(false)}
              className="mt-3 w-full bg-gray-300 hover:bg-gray-400 text-black py-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Confirmación de borrado */}
      {confirmDialog && (
        <ConfirmDialog
          message={confirmDialog.message}
          onConfirm={confirmDelete}
          onCancel={() => setConfirmDialog(null)}
        />
      )}
    </div>
  );
}
