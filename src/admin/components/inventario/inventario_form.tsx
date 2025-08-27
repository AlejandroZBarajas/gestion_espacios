import { useState } from "react";
import type InventarioEntity from "../../../entities/inventario_entity";

interface Props {
  espacioId: number;
  onSubmit: (item: InventarioEntity) => void;
  onCancel: () => void;
}

export default function InventarioForm({ espacioId, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<InventarioEntity>({
    espacio_id: espacioId,
    nombre_elemento: "",
    tipo: "infraestructura",
    estado: "operativo",
    descripcion: "",
    marca: "",
    modelo: "",
    patrimonio: "",
    observaciones: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border border-gray-300 rounded-lg shadow bg-white max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold mb-3">Nuevo Elemento</h2>

      <input
        name="nombre_elemento"
        placeholder="Nombre del elemento"
        value={form.nombre_elemento}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />

      <select name="tipo" value={form.tipo} onChange={handleChange} className="w-full mb-2 p-2 border rounded">
        <option value="infraestructura">Infraestructura</option>
        <option value="mueble">Mueble</option>
        <option value="equipo">Equipo</option>
      </select>

      <select name="estado" value={form.estado} onChange={handleChange} className="w-full mb-2 p-2 border rounded">
        <option value="operativo">Operativo</option>
        <option value="no operativo">No operativo</option>
        <option value="mantenimiento">Mantenimiento</option>
      </select>

      <input name="marca" placeholder="Marca" value={form.marca} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
      <input name="modelo" placeholder="Modelo" value={form.modelo} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />
      <input name="patrimonio" placeholder="Patrimonio" value={form.patrimonio} onChange={handleChange} className="w-full mb-2 p-2 border rounded" />

      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />

      <textarea
        name="observaciones"
        placeholder="Observaciones"
        value={form.observaciones}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">
          Cancelar
        </button>
        <button type="submit" className="px-4 py-2 bg-azul text-white rounded">
          Guardar
        </button>
      </div>
    </form>
  );
}
