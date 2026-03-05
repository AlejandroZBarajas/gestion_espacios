export default interface InventarioEntity {
  inventario_id?: number;              // generado por la BD
  espacio_id: number;
  nombre_elemento: string;
  tipo: string;             // ej: "infraestructura"
  estado: string;           // ej: "operativo"
  descripcion: string;
  marca: string;
  modelo: string;
  patrimonio: string;
  observaciones: string;
}
