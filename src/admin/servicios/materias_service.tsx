import type { Materia } from "../entities/materia_entity";

const API_URL = import.meta.env.VITE_API_URL+"materias"; 

export async function getMaterias(): Promise<Materia[]> {
  const response = await fetch(API_URL, {
    credentials: "include", 
    method: "GET",
  });
  if (!response.ok) throw new Error("Error al obtener materias");
  return response.json();
}

export async function createMateria(materia: Materia): Promise<Materia> {
  const response = await fetch(API_URL, {
    credentials: "include", 
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(materia),
  });
  if (!response.ok) throw new Error("Error al crear materia");
  return response.json();
}

export async function updateMateria(id: number, materia: Materia): Promise<Materia> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    credentials: "include", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(materia),
  });
  if (!response.ok) throw new Error("Error al actualizar materia");
  return response.json();
}

export async function deleteMateria(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include", 
  });
  if (!response.ok) throw new Error("Error al eliminar materia");
}
