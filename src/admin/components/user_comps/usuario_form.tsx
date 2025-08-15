import { useState } from "react";
import type UsuarioEntity from "../../entities/usuario_entity";

interface Props {
  usuario?: UsuarioEntity | null;
  onSave: (usuario: UsuarioEntity) => void;
  onCancel: () => void;
}

export default function UsuarioForm({ usuario, onSave, onCancel }: Props) {
  const [formData, setFormData] = useState<Partial<UsuarioEntity>>(
    usuario || {
      nombre: "",
      apellido: "",
      apellido2: "",
      email: "",
      rol: "docente",
      contrasena: "", 
      activo: true,
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
    onSave(formData as UsuarioEntity);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md mb-6 max-w-md"
    >
      <h2 className="text-xl font-bold mb-4">
        {usuario ? "Editar Usuario" : "Nuevo Usuario"}
      </h2>

      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        className="w-full border p-2 rounded mb-2"
        required
      />

      <input
        type="text"
        name="apellido"
        value={formData.apellido}
        onChange={handleChange}
        placeholder="Apellido"
        className="w-full border p-2 rounded mb-2"
        required
      />

      <input
        type="text"
        name="apellido2"
        value={formData.apellido2}
        onChange={handleChange}
        placeholder="Segundo Apellido"
        className="w-full border p-2 rounded mb-2"
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Correo electrónico"
        className="w-full border p-2 rounded mb-2"
        required
      />

      {/* Solo mostrar contraseña en modo creación */}
      {!usuario && (
        <input
          type="password"
          name="contrasena"
          value={formData.contrasena || ""}
          onChange={handleChange}
          placeholder="Contraseña (mínimo 6 caracteres)"
          className="w-full border p-2 rounded mb-2"
          required
          minLength={6}
        />
      )}

      <select
        name="rol"
        value={formData.rol}
        onChange={handleChange}
        className="w-full border p-2 rounded mb-2"
      >
        <option value="administrador">Administrador</option>
        <option value="docente">Docente</option>
      </select>

      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          name="activo"
          checked={formData.activo}
          onChange={handleChange}
          className="mr-2"
        />
        Activo
      </label>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
