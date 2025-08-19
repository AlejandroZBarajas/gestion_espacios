export interface Periodo {
  id?: number; 
  nombre: string;
  fecha_inicio: string; 
  fecha_fin: string;
  anio: number;
  tipo_periodo: string;
  activo?: boolean; 
}
