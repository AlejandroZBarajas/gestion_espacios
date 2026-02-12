import type { PeriodoEntity } from "../entities/periodo";

const API_URL = import.meta.env.VITE_API_URL+"periodos"

export const getPeriodos = async (): Promise<PeriodoEntity[]> => {

  const res = await fetch(API_URL,{
    credentials: "include", 
  });
  if (!res.ok) throw new Error("Error al obtener periodos");
  return res.json();
};

export const getPeriodoActivo = async (): Promise<PeriodoEntity> => {

  const res = await fetch(`${API_URL}/activo`,{
    credentials: "include", 
  });
  console.log("respuesta de getPeriodoActivo: ",res)
  if (!res.ok) throw new Error("Error al obtener periodo activo");
  return res.json();
};

export const createPeriodo = async (periodo: PeriodoEntity): Promise<PeriodoEntity> => {
  console.log("periodo recibido en servicio: ",periodo)
  const res = await fetch(API_URL, {
    method: "POST",
    credentials: "include", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(periodo),
  });
  if (!res.ok) throw new Error("Error al crear periodo");
  return res.json();
};

export const updatePeriodo = async (periodo: PeriodoEntity): Promise<PeriodoEntity> => {
  // Convertir las fechas a formato ISO completo
  const body = {
    fecha_inicio: new Date(periodo.fecha_inicio).toISOString(),
    fecha_fin: new Date(periodo.fecha_fin).toISOString()
  };
  
  console.log("Body a enviar:", body);
  
  const res = await fetch(`${API_URL}/${periodo.periodo_id}`, {
    method: "PUT",
    credentials: "include", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error del servidor:", errorText);
    throw new Error("Error al actualizar periodo");
  }
  
  return res.json();
};

export const deletePeriodo = async (id: number): Promise<void> => {

  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include", 
  });
  if (!res.ok) throw new Error("Error al eliminar periodo");
};



export const activarPeriodo = async (id: number):Promise<void> =>{
    const res = await fetch(`${API_URL}/${id}/activar`, {
      method:"PUT",
    credentials: "include", 
    })
  if (!res.ok) throw new Error("Error al ACTIVAR periodo");
}
export const desactivarPeriodo = async (id: number):Promise<void> =>{
    const res = await fetch(`${API_URL}/${id}/desactivar`, {
      method:"PUT",
    credentials: "include", 
    })
  if (!res.ok) throw new Error("Error al ACTIVAR periodo");
}