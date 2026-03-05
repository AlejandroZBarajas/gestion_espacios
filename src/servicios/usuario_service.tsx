const API_URL = import.meta.env.VITE_API_URL + "usuarios";

export const activarUsuario = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}/activar`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al activar usuario");
  }
};

export const desactivarUsuario = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}/desactivar`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al desactivar usuario");
  }
};

export const toggleUsuarioActivo = async (
  id: number,
  activar: boolean
): Promise<void> => {
  if (activar) {
    await activarUsuario(id);
  } else {
    await desactivarUsuario(id);
  }
};