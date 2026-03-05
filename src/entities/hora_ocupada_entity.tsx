export interface HoraOcupada{
    hora : string
}

export interface HorasOcupadasDias{
    espacio_id: number
    periodo_id: number
    lunes? : HoraOcupada[]
    martes? : HoraOcupada[]
    miercoles? : HoraOcupada[]
    jueves? : HoraOcupada[]
    viernes? : HoraOcupada[]
    sabado? : HoraOcupada[]
    domingo? : HoraOcupada[]

}