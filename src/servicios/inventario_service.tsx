import type InventarioEntity from "../entities/inventario_entity";

const API_URL = import.meta.env.VITE_API_URL+"inventario"; 

export async function getInventarioByEspacio(id: number): Promise<InventarioEntity[]> {
  const res = await fetch(`${API_URL}/espacio/${id}`, { 
    credentials: "include", 
    method: "GET" });
    if (!res.ok) throw new Error("Error al obtener inventario por espacio");
    return res.json();
  }
  
  export async function createInventario(data: InventarioEntity): Promise<InventarioEntity> {
    const res = await fetch(API_URL, {
      credentials: "include",     
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al crear inventario");
    return res.json();
  }
  
  export async function updateInventario(id: number, data: Partial<InventarioEntity>): Promise<InventarioEntity> {
    const res = await fetch(`${API_URL}/${id}`, {
      credentials: "include", 
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al actualizar inventario");
    return res.json();
  }
  
  export async function deleteInventario(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, { 
      credentials: "include", 
      method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar inventario");
    }
    
    /* export async function getInventario(): Promise<InventarioEntity[]> {
      const res = await fetch(API_URL, { 
        credentials: "include", 
        method: "GET" });
      if (!res.ok) throw new Error("Error al obtener inventario");
      return res.json();
    } */