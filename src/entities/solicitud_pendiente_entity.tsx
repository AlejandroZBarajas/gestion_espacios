export default interface SolicitudPendienteEntity {
  solicitud_id: number;
  usuario: string;
  espacio: string;
  periodo: string;
  materia: string;
  plan_estudio: string;
  grupo: string;
  motivo: string;
  estado: string;
}
