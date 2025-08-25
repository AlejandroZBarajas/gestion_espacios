import { useState, useEffect } from "react";
import type { MateriaEntity } from "../../../entities/materia_entity";
import type { PlanEntity } from "../../../entities/planes_entity";
import { getPlanes } from "../../../servicios/planes_service";

interface MateriaFormProps {
  onSubmit: (materia: MateriaEntity) => void;
  initialData?: MateriaEntity;
}

export default function MateriaForm({ onSubmit, initialData }: MateriaFormProps) {
  const [planes, setPlanes] = useState<PlanEntity[]>([]);
  const [formData, setFormData] = useState<MateriaEntity>({
    plan_id: 0,
    nombre: "",
    codigo_materia: "",
    nivel: 0,
  });

  useEffect(() => {
    // cargar planes desde el servicio
    getPlanes()
      .then((data) => setPlanes(data))
      .catch((err) => console.error("Error cargando planes", err));
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "nivel" || name === "plan_id" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ plan_id: 0, nombre: "", codigo_materia: "", nivel: 0 });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-4 rounded-2xl shadow-md flex flex-col gap-3"
    >
      {/* Select para elegir plan */}
      <select
        name="plan_id"
        value={formData.plan_id}
        onChange={handleChange}
        className="p-2 rounded-lg border"
        required
      >
        <option value={0} disabled>
          Selecciona un plan
        </option>
        {planes.map((plan) => (
          <option key={plan.plan_id} value={plan.plan_id}>
            {plan.nombre_carrera}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        className="p-2 rounded-lg border"
        required
      />
      <input
        type="text"
        name="codigo_materia"
        placeholder="Código Materia"
        value={formData.codigo_materia}
        onChange={handleChange}
        className="p-2 rounded-lg border"
        required
      />
      <input
        type="number"
        name="nivel"
        placeholder="Nivel"
        value={formData.nivel}
        onChange={handleChange}
        className="p-2 rounded-lg border"
        required
      />

      <button
        type="submit"
        className="bg-green-500 text-white py-2 rounded-xl hover:bg-green-600"
      >
        {initialData ? "Actualizar" : "Agregar"}
      </button>
    </form>
  );
}
