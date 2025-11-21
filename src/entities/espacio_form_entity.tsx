export interface InventarioFormItem {
  catalogo_id: number;
  cantidad: number;
  marca: string;
  modelo: string;
  patrimonio: string;
  observaciones: string;
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
