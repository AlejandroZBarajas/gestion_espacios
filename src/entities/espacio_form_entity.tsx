import type { CatalogoElementoEntity } from "./catalogo_elemento_entity";

export interface InventarioFormItem {
  catalogo_id: number;
  cantidad: number;
  marca: string;
  modelo: string;
  patrimonio: string;
  observaciones: string;
  catalogo_elemento?: CatalogoElementoEntity
}

export interface EspacioFormData {
  espacio_id?: number; 
  nombre: string;
  tipoId: number;
  capacidad: number;
  descripcion: string;
  disponible: boolean;
  ubicacionId: number;
  inventarios: InventarioFormItem[];
}
