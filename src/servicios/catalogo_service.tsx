import type { CatalogoElementoEntity } from "../entities/catalogo_elemento_entity"

const API_URL = import.meta.env.VITE_API_URL+"catalogo/"

export const getCatalogo = async ():Promise<CatalogoElementoEntity[]>=>{
    console.log("entra al servicio de catalogo")
    const res = await fetch(API_URL,{
        method: "GET",
        credentials:"include"
    })
    if (!res.ok) throw new Error("no se pueden obtener elementos del catalogo")
    return res.json()
}