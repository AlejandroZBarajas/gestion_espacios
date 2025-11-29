import type { PeriodoEntity } from "../entities/periodo";

const API_URL = import.meta.env.VITE_API_URL+"periodos"

export const getPeriodos = async (): Promise<PeriodoEntity[]> => {

  const res = await fetch(API_URL,{
    credentials: "include", 
  });
  if (!res.ok) throw new Error("Error al obtener periodos");
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

export const updatePeriodo = async (id: number, periodo: PeriodoEntity): Promise<PeriodoEntity> => {
  console.log("entra a edicion en el servicio")
  console.log("periodo_id: ", id)
  console.log("periodo: ",periodo)
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    credentials: "include", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(periodo),
  });
  if (!res.ok) throw new Error("Error al actualizar periodo");
  return res.json();
};

export const deletePeriodo = async (id: number): Promise<void> => {

  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include", 
  });
  if (!res.ok) throw new Error("Error al eliminar periodo");
};

export const cambiarStatusPeriodo = async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/status/${id}`, {
    method: "POST",
    credentials: "include", 
  });
  if (!res.ok) throw new Error("Error al eliminar periodo");
}