export interface PeriodoEntity {
  periodo_id?: number; 
  fecha_inicio: string; 
  fecha_fin: string;
  tipo_periodo: string;
  activo?: boolean; 
}
