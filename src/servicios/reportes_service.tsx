import type ReporteEntity from "../entities/reporte_entity";

const API_URL = import.meta.env.VITE_API_URL+"reporte"; 

export async function getMisReportes(id: number): Promise<ReporteEntity[]> {
  const res = await fetch(`${API_URL}/usuario/${id}`, { 
    credentials: "include", 
    method: "GET" });
  if (!res.ok) throw new Error("Error al obtener inventario por espacio");
  return res.json();
}

export async function createReporte(data: ReporteEntity): Promise<ReporteEntity> {
  const res = await fetch(API_URL, {
    credentials: "include",     
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear inventario");
  return res.json();
}

export async function getReportesPendientes(): Promise<ReporteEntity[]> {
  const res = await fetch(`${API_URL}/pendientes`, { 
    credentials: "include", 
    method: "GET" 
  });
  if (!res.ok) throw new Error("Error al obtener inventario por espacio");
  return res.json();
}

export async function changeStatusReporte(id: number) {
  const res = await fetch(`${API_URL}/proceso/${id}`, {
    credentials: "include",     
    method: "POST",
    headers: { "Content-Type": "application/json" },

  });
  if (!res.ok) throw new Error("Error al crear inventario");
  return res.json();
  
}