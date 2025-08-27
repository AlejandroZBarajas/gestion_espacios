import { useEffect, useState } from "react";
import type EspacioEntity from "../../../entities/espacio_entity";
import type UbicacionEntity from "../../../entities/ubicacion_entity";
import { getUbicaciones } from "../../../servicios/ubicaciones_service";

interface Props {
  espacio?: EspacioEntity | null;
  onSave: (espacio: EspacioEntity) => void;
  onCancel: () => void;
}

export default function EspacioForm({ espacio, onSave, onCancel }: Props) {
  const [formData, setFormData] = useState<EspacioEntity>(
    espacio || {
      nombre: "",
      tipo: "",
      categoria: "",
      ubicacion: "",
      capacidad: 0,
      descripcion: "",
      disponible: true,
    }
  );

  const [ubicaciones, setUbicaciones] = useState<UbicacionEntity[]>([]);

  useEffect(() => {
    console.log(ubicaciones)
    const fetchUbicaciones = async () => {
      try {
        const data = await getUbicaciones();
        setUbicaciones(data);
      } catch (error) {
        console.error("Error cargando ubicaciones", error);
      }
    };
    fetchUbicaciones();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold text-morado">
        {espacio ? "Editar Espacio" : "Nuevo Espacio"}
      </h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        className="border p-2 rounded border-morado"
        required
      />

      <input
        type="text"
        name="tipo"
        placeholder="Tipo (ej. Aula, Laboratorio)"
        value={formData.tipo}
        onChange={handleChange}
        className="border p-2 rounded border-morado"
        required
      />

      <input
        type="text"
        name="categoria"
        placeholder="Categoría"
        value={formData.categoria}
        onChange={handleChange}
        className="border p-2 rounded border-morado"
        required
      />

      <select
        name="ubicacion"
        value={formData.ubicacion}
        onChange={handleChange}
        className="border p-2 rounded border-morado"
        required
      >
        <option value="">Selecciona ubicación</option>
        {ubicaciones.map((u) => (
          <option key={u.ubicacion_id} value={u.ubicacion}>
            {u.ubicacion}
          </option>
        ))}
      </select>

    {/*   <input
        type="number"
        name="capacidad"
        placeholder="Capacidad"
        value={formData.capacidad}
        onChange={handleChange}
        className="border p-2 rounded border-morado"
        required
      /> */}

      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={formData.descripcion}
        onChange={handleChange}
        className="border p-2 rounded border-morado"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="disponible"
          checked={formData.disponible}
          onChange={handleChange}
        />
        Disponible
      </label>

      <div className="flex gap-2">
        <button type="submit" className="flex-1 bg-verde text-white p-2 rounded">
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-rojo text-white p-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
