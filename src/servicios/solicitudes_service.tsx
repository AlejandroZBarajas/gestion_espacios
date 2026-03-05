import type SolicitudEntity from "../entities/solicitud_entity";
import type SolicitudEspecialEntity from "../entities/solicitud_esp_entity";
import type SolicitudPendienteEntity from "../entities/solicitud_pendiente_entity";
import type SolicitudEspecialDTO from "../entities/solicitud_especial_DTO";
import type { HorasOcupadasDias } from "../entities/hora_ocupada_entity";
import type { SolicitudEnConflictoTableDTO } from "../entities/solicitud_conflicto_entity";

const API_URL = import.meta.env.VITE_API_URL + "solicitudes";
const API_ESPECIALES = import.meta.env.VITE_API_URL +"solicitud_especial/"

export const createSolicitud = async (
  solicitud: SolicitudEntity
): Promise<SolicitudEntity> => {
  console.log("solicitud normal enviada: ", solicitud)
  const res = await fetch(`${API_URL}/normal`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(solicitud),
  });
  if (!res.ok) throw new Error("Error al crear la solicitud");
  return res.json();
};

export async function getSolicitudesPendientes(): Promise<SolicitudPendienteEntity[]> {
  const response = await fetch(`${API_URL}/`, {
    credentials: "include",
    method: "GET",
  });
  if (!response.ok) throw new Error("Error al cargar solicitudes");
  return response.json();
}

export async function rechazarSolicitud(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/rechazar/${id}`, {
    method: "PUT",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Error al rechazar solicitud");
}

export async function aceptarSolicitud(
  solicitud_id: number,
  user_id: number
): Promise<void> {
  console.log("aceptar solicitud con id: ", solicitud_id, " por el usuario: ", user_id);
  console.log(`${API_URL}/aprobar/${solicitud_id}/${user_id}`)
  const response = await fetch(`${API_URL}/aprobar/${solicitud_id}/${user_id}`, {
    method: "POST",
    credentials: "include",
  });
  console.log("response del servidor: ", response)
  if (!response.ok) throw new Error("Error al aceptar solicitud");
}

export async function verMisSolicitudes(user_id: number): Promise<SolicitudPendienteEntity[]> {
  const response = await fetch(`${API_URL}/usuario/${user_id}`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Error al obtener solicitudes");
  return response.json();
}

export async function createSolicitudEspecial(solicitud: SolicitudEspecialEntity): Promise <{code: number; description: string}>{
  const response = await fetch(`${API_ESPECIALES}`,{
    method: "POST",
    credentials:"include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(solicitud),
  })
  if (!response.ok) throw new Error("Error al obtener solicitudes");
    return response.json();
}

export async function getMysolicitudesEspeciales(usuario_id:number):Promise <SolicitudEspecialDTO[]>{
  const response = await fetch(`${API_ESPECIALES}usuario/${usuario_id}/`,{
    method: "GET",
    credentials:"include",
    headers: { "Content-Type": "application/json" },

  })
  if (!response.ok) throw new Error("Error al obtener solicitudes");
  return response.json();
}

export async function getEspeciales(): Promise <SolicitudEspecialDTO[]>{
  const response  = await fetch(`${API_ESPECIALES}`,{
    method: "GET",
    credentials:"include",
    headers: { "Content-Type": "application/json" },
  })
    if (!response.ok) throw new Error("Error al obtener solicitudes");
  return response.json();
}

export async function aceptarSolicitudEspecial(id:number):Promise<void>{
  const response = await fetch(`${API_ESPECIALES}aprobar/${id}`,{
    method:"POST",
    credentials:"include",
  })
  if (!response.ok) throw new Error("Error al aceptar solicitude especial");
  //console.log(response)
  return response.json();
}

export async function rechazarSolicitudEspecial(id:number):Promise<void>{
  const response = await fetch(`${API_ESPECIALES}rechazar/${id}`,{
    method:"POST",
    credentials:"include",
  })
  if (!response.ok) throw new Error("Error al obtener solicitudes");
  console.log(response)
  
  return response.json();
}

export const getHorasOcupadasByEspacioId = async (espacio_id:number): Promise<HorasOcupadasDias> => {
  const res = await fetch(`${API_URL}/horario/${espacio_id}`,{
    credentials: "include", 
  });
  if (!res.ok) throw new Error("Error al obtener espacios en el get all");
  return res.json();
}; 

export async function getConflictos(): Promise <SolicitudEnConflictoTableDTO[]>{
  const response  = await fetch(`${API_URL}/conflictos`,{
    method: "GET",
    credentials:"include",
    headers: { "Content-Type": "application/json" },
  })
  console.log("response del servidor al obtener conflictos: ", response)
    if (!response.ok) throw new Error("Error al obtener solicitudes");
  return response.json();
}