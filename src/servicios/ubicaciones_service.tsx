import type UbicacionEntity from "../entities/ubicacion_entity";

const API_URL = import.meta.env.VITE_API_URL+"ubicaciones"

export const getUbicaciones = async (): Promise<UbicacionEntity[]> =>{
    console.log("SE UTILIZA EL SERVICIO UBICACIONES")
    const res = await fetch(API_URL,{
    credentials: "include", 
    method: "GET",
  });
  if (!res.ok) throw new Error("Error al obtener edificios");
  return res.json();
}