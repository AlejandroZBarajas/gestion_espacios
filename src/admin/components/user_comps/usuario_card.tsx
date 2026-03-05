import type UsuarioEntity from "../../../entities/usuario_entity";
import { useState } from "react";

interface Props {
  usuario: UsuarioEntity;
  onEdit: (usuario: UsuarioEntity) => void;
  onDelete: (id: number) => void;
  onToggleActivo: (id: number, activo: boolean) => Promise<void>;
}

export default function UsuarioCard({ usuario, onEdit, onDelete, onToggleActivo }: Props) {
  const nombres = `${usuario.nombre} ${usuario.apellido} ${usuario.apellido2 || ""}`.trim();
  const [isLoading, setIsLoading] = useState(false);
  
  console.log("usuario recibido: ", usuario);

  const handleToggleActivo = async () => {
    setIsLoading(true);
    try {
      await onToggleActivo(usuario.usuario_id, !usuario.activo);
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gris-clarito border border-gray-300 rounded-lg shadow-md p-4 w-80 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-morado">{nombres}</h2>
          {/* Toggle Switch */}
          
          <button
            onClick={handleToggleActivo}
            disabled={isLoading}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              usuario.activo ? "bg-green-500" : "bg-gray-300"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            title={usuario.activo ? "Desactivar usuario" : "Activar usuario"}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                usuario.activo ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>

        </div>
        
        <p className="text-gray-600">{usuario.email}</p>
        <p className="text-sm mt-1">
          Rol: <span className="font-medium">{usuario.rol}</span>
        </p>
        <p className="text-s text-gray-400 mt-2">
          Creado: {new Date(usuario.fecha_creacion).toLocaleDateString()}
        </p>
        <p className={`mt-2 text-sm font-semibold ${usuario.activo ? "text-green-600" : "text-red-600"}`}>
          {usuario.activo ? "Activo" : "Inactivo"}
        </p>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onEdit(usuario)}
          className="flex-1 bg-azul hover:bg-blue-600 text-white py-1 rounded"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(usuario.usuario_id)}
          className="flex-1 bg-rojo hover:bg-red-600 text-white py-1 rounded"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}