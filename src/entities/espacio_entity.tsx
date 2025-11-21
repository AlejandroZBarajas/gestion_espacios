export interface CatalogoElementoEntity {
  catalogo_id: number;
  nombre_elemento: string;
  tipo: string;
  descripcion: string | null;
  fecha_creacion: string;
}

export interface InventarioEntity {
  inventario_id: number;
  cantidad: number;
  marca: string;
  modelo: string;
  patrimonio: string;
  estado: string;
  observaciones: string;
  catalogo_elemento: CatalogoElementoEntity;
}

export interface EspacioInventarioEntity {
  espacio_inventario_id: number;
  inventario: InventarioEntity;
}

export default interface EspacioEntity {
  espacio_id: number;
  nombre: string;
  tipo_id: number;
  tipo?: string;
  capacidad: number;
  descripcion: string;
  disponible: boolean;
  ubicacion_id: number;
  ubicacion?: string;
  inventarios: EspacioInventarioEntity[];
}
