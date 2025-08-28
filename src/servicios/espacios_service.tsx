import type EspacioEntity from "../entities/espacio_entity";

const API_URL = import.meta.env.VITE_API_URL+"espacios"

export const getEspaciosbyUbicacion = async (ubicacion_id:number): Promise<EspacioEntity[]> => {
  console.log("SE UTILIZA EL SERVICIO")
  const res = await fetch(`${API_URL}ubicacion/${ubicacion_id}`,{
    credentials: "include", 
  });
  if (!res.ok) throw new Error("Error al obtener espacios en el get all");
  return res.json();
}; 

export const getEspacios = async (): Promise<EspacioEntity[]> => {
  console.log("SE UTILIZA EL SERVICIO")
  const res = await fetch(API_URL,{
    credentials: "include", 
  });
  if (!res.ok) throw new Error("Error al obtener espacios en el get all");
  return res.json();
};


export const createEspacio = async (espacio: EspacioEntity): Promise<EspacioEntity> => {
  console.log("SE UTILIZA EL SERVICIO")
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

export const updateEspacio = async (espacio_id: number, espacio: EspacioEntity): Promise<EspacioEntity> => {
  console.log("SE UTILIZA EL SERVICIO")
  const res = await fetch(`${API_URL}/${espacio_id}`, {
    method: "PUT",
    credentials: "include", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(espacio),
  });
  if (!res.ok) throw new Error("Error al actualizar espacio");
  return res.json();
};

export const deleteEspacio = async (espacio_id: number): Promise<void> => {
  console.log("SE UTILIZA EL SERVICIO")
  const res = await fetch(`${API_URL}/${espacio_id}`, {
    method: "DELETE",
    credentials: "include", 
  });
  if (!res.ok) throw new Error("Error al eliminar periodo");
};
