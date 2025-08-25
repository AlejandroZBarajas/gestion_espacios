
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

export default function MateriasPage() {

  const [materias, setMaterias] = useState<MateriaEntity[]>([]);
  const [editingMateria, setEditingMateria] = useState<MateriaEntity | null>(null);

  const fetchMaterias = async () => {
    const data = await getMaterias();
    setMaterias(data);
  };

  useEffect(() => {
    fetchMaterias();
  }, []);

  const handleCreate = async (materia: MateriaEntity) => {
    if (editingMateria) {
      await updateMateria(editingMateria.materia_id!, materia);
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
    <div className="relative">
      <Header></Header>

      <h1 className="text-2xl font-bold">Materias</h1>
      <MateriaForm onSubmit={handleCreate} initialData={editingMateria || undefined} />
      <div className="grid gap-4">
        {materias.map((materia) => (
          <MateriaCard
            key={materia.materia_id}
            materia={materia}
            onEdit={setEditingMateria}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
