export default interface MiReporteEntity {
  reporte_id?: number
  fecha_reporte?: string | Date | number
  estado: string
  descripcion: string
  usuario_id: number
  nombre: string
  apellido: string
  apellido2: string
  espacio_id?: number
  nombre_espacio?: string
  ubicacion_id?: number
  nombre_ubicacion?: string
}