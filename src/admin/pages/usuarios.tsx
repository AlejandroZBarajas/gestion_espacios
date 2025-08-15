import { useState, useEffect } from "react";
import Header from "../components/user_comps/common/header";
import UsuarioCard from "../components/user_comps/usuario_card";
import UsuarioForm from "../components/user_comps/usuario_form";
import type UsuarioEntity from "../entities/usuario_entity";
import { MdAdd } from "react-icons/md";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<UsuarioEntity[]>([]);
  const [usuarioEditando, setUsuarioEditando] = useState<UsuarioEntity | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);

const API_URL = import.meta.env.VITE_API_URL + "usuarios";

  useEffect(() => {
    fetch(API_URL, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener usuarios");
        return res.json();
      })
      .then((data) => setUsuarios(data))
      .catch((err) => console.error(err));
  }, []);

  const handleEdit = (usuario: UsuarioEntity) => {
    setUsuarioEditando(usuario);
    setModalAbierto(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        credentials: "include",
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar usuario");
      setUsuarios((prev) => prev.filter((u) => u.usuario_id !== id));
    } catch (err) {
      console.error(err);
    }
  };

const handleSave = async (usuario: UsuarioEntity) => {
  try {
    if (usuario.usuario_id) {
      // Editar usuario
      const res = await fetch(`${API_URL}/${usuario.usuario_id}`, {
        credentials: "include",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });
      if (!res.ok) throw new Error("Error al actualizar usuario");

      const actualizado = await res.json();
      setUsuarios((prev) =>
        prev.map((u) => (u.usuario_id === actualizado.usuario_id ? actualizado : u))
      );
    } else {

      const res = await fetch(API_URL, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });
      if (!res.ok) throw new Error("Error al crear usuario");

      const nuevoUsuario = await res.json();
      setUsuarios((prev) => [...prev, nuevoUsuario]);
    }

    setModalAbierto(false);
    setUsuarioEditando(null);
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className="relative">
      <Header />
      <div className="w-full h-[100px] flex flex-col justify-center items-center">
        <h2 className="text-morado font-black text-4xl">Usuarios</h2>
      </div>

      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {usuarios.map((usuario) => (
          <UsuarioCard
            key={usuario.usuario_id}
            usuario={usuario}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Botón flotante para crear */}
      <button
        onClick={() => {
          setUsuarioEditando(null);
          setModalAbierto(true);
        }}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
      >
        <MdAdd size={28} />
      </button>

      {/* Modal con blur */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <UsuarioForm
              usuario={usuarioEditando}
              onSave={handleSave}
              onCancel={() => setModalAbierto(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
