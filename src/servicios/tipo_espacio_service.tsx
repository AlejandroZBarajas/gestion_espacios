import type TipoEspacioEntity from "../entities/tipo_espacio_entity";

const API_URL = import.meta.env.VITE_API_URL+"tipos"; 

export async function getTiposEspacios(): Promise<TipoEspacioEntity[]> {
  const response = await fetch(`${API_URL}`, {
    credentials: "include",
    method: "GET",
  });
  if (!response.ok) throw new Error("Error al cargar tipos de espacios");
  return response.json();
}