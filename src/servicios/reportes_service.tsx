import type ReporteTableEntity from "../entities/reporte_table_entity";
import type ReporteEntity from "../entities/mi_reporte_entity";
import type ReportePostEntity from "../entities/reporte_post_entity";

const API_URL = import.meta.env.VITE_API_URL+"reporte"; 

export async function getMisReportes(id: number): Promise<ReporteEntity[]> {
  const res = await fetch(`${API_URL}/usuario/${id}`, { 
    credentials: "include", 
    method: "GET" });
  if (!res.ok) throw new Error("Error al obtener inventario por espacio");
  return res.json();
}

export async function createReporte(
  data: Omit<ReportePostEntity, "estado">
): Promise<ReporteEntity> {
  const res = await fetch(API_URL, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // { usuario_id, inventario_id, descripcion }
  });
  if (!res.ok) throw new Error("Error al crear el reporte");
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

export async function updateReporte(
  reporte_id: number,
  data: ReportePostEntity
): Promise<ReporteEntity> {
  const res = await fetch(`${API_URL}/${reporte_id}`, { // ← URL corregida
    credentials: "include",
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // { descripcion, estado, usuario_id, inventario_id }
  });
  if (!res.ok) throw new Error("Error al actualizar el reporte");
  return res.json();
}

export async function deleteReporte(reporte_id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${reporte_id}`, {
    credentials: "include",
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar el reporte");
}

export async function getAllReportes(): Promise<ReporteTableEntity[]> {
  const res = await fetch(`${API_URL}`, {
    credentials: "include",
    method: "GET",
  });
  if (!res.ok) throw new Error("Error al obtener todos los reportes");
  return res.json();
}

export async function marcarEnProceso(reporteId: number): Promise<void> {
  const res = await fetch(`${API_URL}/proceso/${reporteId}`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Error al marcar como en proceso");
}

export async function marcarReparado(reporteId: number): Promise<void> {
  const res = await fetch(`${API_URL}/reparado/${reporteId}`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Error al marcar como reparado");
}