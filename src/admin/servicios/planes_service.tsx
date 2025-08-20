import type { PlanEntity } from "../entities/planes_entity";

const API_URL = import.meta.env.VITE_API_URL+"planes"

export async function getPlanes():Promise<PlanEntity[]> {
    const response = await fetch (API_URL,{
        method: "GET"
    })
    if(!response.ok)throw new Error("Error al cargar planes");
  return response.json();
    
}