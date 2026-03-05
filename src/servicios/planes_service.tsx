import type { PlanEntity } from "../entities/planes_entity";

const API_URL = import.meta.env.VITE_API_URL+"planes"

export async function getPlanes():Promise<PlanEntity[]> {
    const response = await fetch (API_URL,{
      credentials:"include",
        method: "GET"
    })
    if(!response.ok)throw new Error("Error al cargar planes");
  return response.json();
    
}

export async function getPlanName(id:number):Promise<string>{
  const res = await fetch (`${API_URL}/${id}`,{
    credentials: "include",     
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })

  if (!res.ok) throw new Error("Error al crear inventario");

  const plan: PlanEntity = await res.json();
  console.log(plan.nombre_carrera)
  return plan.nombre_carrera; 

}