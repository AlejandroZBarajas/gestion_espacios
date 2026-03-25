// reporte_table_entity.ts
export interface ReporteItemEntity {
  reporte_id: number
  descripcion: string
  estado: string
  fecha: string
  elemento: string
  reportado_por: string
}

export interface EspacioReporteEntity {
  id_espacio: number
  nombre_espacio: string
  reportes: ReporteItemEntity[]
}

export default interface ReporteTableEntity {
  id_ubicacion: number
  nombre_ubicacion: string
  espacios: EspacioReporteEntity[]
}