export interface CatalogoElementoEntity {
  catalogo_id: number;
  nombre_elemento: string;
  tipo: string;
  descripcion?: string | "";
  fecha_creacion: string;
}