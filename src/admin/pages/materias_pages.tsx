
import { useEffect, useState } from "react";
import {
  getMaterias,
  createMateria,
  updateMateria,
  deleteMateria,
} from "../servicios/materias_service";


import type { Materia } from "../entities/materia_entity";
import MateriaCard from "../components/materias_comps/materia_card";
import MateriaForm from "../components/materias_comps/materia_form";

export default function MateriasPage() {

  const [materias, setMaterias] = useState<Materia[]>([]);
  const [editingMateria, setEditingMateria] = useState<Materia | null>(null);

  const fetchMaterias = async () => {
    const data = await getMaterias();
    setMaterias(data);
  };

  useEffect(() => {
    fetchMaterias();
  }, []);

  const handleCreate = async (materia: Materia) => {
    if (editingMateria) {
      await updateMateria(editingMateria.id!, materia);
      setEditingMateria(null);
    } else {
      await createMateria(materia);
    }
    fetchMaterias();
  };

  const handleDelete = async (id: number) => {
    await deleteMateria(id);
    fetchMaterias();
  };

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Materias</h1>
      <MateriaForm onSubmit={handleCreate} initialData={editingMateria || undefined} />
      <div className="grid gap-4">
        {materias.map((materia) => (
          <MateriaCard
            key={materia.id}
            materia={materia}
            onEdit={setEditingMateria}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
