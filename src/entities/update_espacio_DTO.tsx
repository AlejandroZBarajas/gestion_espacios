export interface UpdateEspacioDTO {
  nombre: string;
  ubicacionId: number;
  capacidad: number;
  descripcion: string;
  disponible: boolean;
  tipoId: number;
  inventario: {
    catalogo_id: number;
    cantidad: number;
    marca: string;
    modelo: string;
    patrimonio: string;
    observaciones: string;
  }[];
}