export default interface InventarioEntity {
  inventario_id?: number;              // generado por la BD
  cantidad?: number;
  marca: string;
  modelo: string;
  patrimonio: string;
  estado: string;           // ej: "operativo"
  observaciones: string;
  espacio_id: number;
  nombre_elemento: string;
  tipo: string;             // ej: "infraestructura"
  descripcion: string;
}
