import type { Periodo } from "../entities/periodo";

const API_URL = import.meta.env.VITE_API_URL+"periodos"

export const getPeriodos = async (): Promise<Periodo[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener periodos");
  return res.json();
};

export const createPeriodo = async (periodo: Periodo): Promise<Periodo> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(periodo),
  });
  if (!res.ok) throw new Error("Error al crear periodo");
  return res.json();
};

export const updatePeriodo = async (id: number, periodo: Periodo): Promise<Periodo> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(periodo),
  });
  if (!res.ok) throw new Error("Error al actualizar periodo");
  return res.json();
};

export const deletePeriodo = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar periodo");
};
