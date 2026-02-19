import type EspacioEntity from "../entities/espacio_entity";
import type { UpdateEspacioDTO } from "../entities/update_espacio_DTO";

const API_URL = import.meta.env.VITE_API_URL+"espacios"

export const getEspaciosbyUbicacion = async (ubicacion_id:number): Promise<EspacioEntity[]> => {
  console.log("SE UTILIZA EL SERVICIO GET BY EDIFICIO")
  const res = await fetch(`${API_URL}/ubicacion/${ubicacion_id}`,{
    credentials: "include", 
  });
  if (!res.ok) throw new Error("Error al obtener espacios en el get all");
  return res.json();
}; 

export const getEspacios = async (): Promise<EspacioEntity[]> => {

  const res = await fetch(API_URL,{
    credentials: "include", 
  });
  if (!res.ok) throw new Error("Error al obtener espacios en el get all");

  return res.json();
};


export const createEspacio = async (espacio: UpdateEspacioDTO): Promise<EspacioEntity> => {
  console.log("SE UTILIZA EL SERVICIO CREATE")
  console.log(API_URL)
  const res = await fetch(API_URL, {
    method: "POST",
    credentials: "include", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(espacio),
  });
  if (!res.ok) throw new Error("Error al crear espacio");
  return res.json();
};

export const updateEspacio = async (
  espacio_id: number, 
  espacio: UpdateEspacioDTO  // ✅ Ya lo tienes así
): Promise<EspacioEntity> => {
  
  const payload: UpdateEspacioDTO = {
    nombre: espacio.nombre,
    ubicacionId: espacio.ubicacionId,
    capacidad: espacio.capacidad,
    descripcion: espacio.descripcion,
    disponible: espacio.disponible,
    tipoId: espacio.tipoId,
    inventario: espacio.inventario
  };

  const res = await fetch(`${API_URL}/${espacio_id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  
  if (!res.ok) throw new Error("Error al actualizar espacio");
  return res.json();
};

export const deleteEspacio = async (espacio_id: number): Promise<void> => {
  console.log("SE UTILIZA EL SERVICIO DELETE")
  const res = await fetch(`${API_URL}/${espacio_id}`, {
    method: "DELETE",
    credentials: "include", 
  });
  if (!res.ok) throw new Error("Error al eliminar espacio");
};

