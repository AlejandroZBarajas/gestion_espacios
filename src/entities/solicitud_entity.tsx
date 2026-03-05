export default interface SolicitudEntity {
  solicitud_id?: number;    // ID generado por la base de datos (opcional)
  usuario_id: number;       // ID del docente que hace la solicitud
  espacio_id: number;       // ID del espacio solicitado
  periodo_id: number;       // ID del periodo
  materia_id: number;       // ID de la materia
  grupo: string;            // Grupo que solicita el espacio
  motivo: string;           // Motivo de la solicitud
  cantidad_asistentes: number; // Cantidad de personas que asistirán
  dias: number[];           // Arreglo de días (ej. [1,3,5])
  hora_inicio: string;      // Hora de inicio (formato HH:mm)
  hora_fin: string;         // Hora de fin (formato HH:mm)
  estado?: string;          // Opcional: estado de la solicitud (pendiente, aprobada, rechazada)
}
