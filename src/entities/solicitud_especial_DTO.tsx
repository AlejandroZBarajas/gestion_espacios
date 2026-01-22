export default interface SolicitudEspecialDTO{
    solicitud_especial_id:number,
    usuario_id:number,
    usuario:string
    espacio:string
    fecha:string
    hora_inicio:string
    hora_fin:string
    cantidad_asistentes:number
    motivo:string
    estado:string
}