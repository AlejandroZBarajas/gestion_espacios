export default interface ReporteEntity{
    reporte_id?: number
    fecha_reporte?:string | Date | number
    estado:string
    inventario_id: number
    descripcion: string
    usuario: string
    usuario_id:number  
    
    apellido:string
    apellido2:string
    nombre:string
}