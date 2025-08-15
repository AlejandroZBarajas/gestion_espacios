import type UsuarioEntity from "../../entities/usuario_entity";


interface Props {
  usuario: UsuarioEntity;
  onEdit: (usuario: UsuarioEntity) => void;
  onDelete: (id: number) => void;
}

export default function UsuarioCard({ usuario, onEdit, onDelete }: Props) {
  const nombres = `${usuario.nombre} ${usuario.apellido} ${usuario.apellido2 || ""}`.trim();

  return (
    <div className="bg-gris-clarito border border-gray-300 rounded-lg shadow-md p-4 w-80 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-purple-700">{nombres}</h2>
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
