export interface SolicitudEnConflictoRowDTO {
  solicitud_id: number;
  grupo: string;
  motivo: string;
  estado: string;
  fecha_creacion: string; 
  usuario_id: number;
  usuario_nombre: string;
  horarios: string;
}

export interface SolicitudEnConflictoTableDTO {
  espacio_id: number;
  espacio_nombre: string;
  solicitudes_en_conflicto: SolicitudEnConflictoRowDTO[];
}