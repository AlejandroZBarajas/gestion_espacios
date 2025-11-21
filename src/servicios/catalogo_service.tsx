import type CatalogoItemEntity from "../entities/catalogo_item_entity";

const API_URL = import.meta.env.VITE_API_URL+"catalogo/"

export const getEspaciosByTipo = async (tipo:string):Promise<CatalogoItemEntity[]>=>{
    console.log("entra al servicio de catalogo")
    const res = await fetch(`${API_URL}${tipo}`,{
        credentials:"include"
    })
    if (!res.ok) throw new Error("no se pueden obtener elementos del catalogo")
    return res.json()
}