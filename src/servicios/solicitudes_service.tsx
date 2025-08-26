// src/servicios/solicitudes_service.ts
import type SolicitudEntity from "../entities/solicitud_entity";
import type SolicitudPendienteEntity from "../entities/solicitud_pendiente_entity";

const API_URL = import.meta.env.VITE_API_URL + "solicitudes";

export const createSolicitud = async (
  solicitud: SolicitudEntity
): Promise<SolicitudEntity> => {
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
  const response = await fetch(`${API_URL}/pend-rech`, {
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
  const response = await fetch(`${API_URL}/aprobar/${solicitud_id}/${user_id}`, {
    method: "POST",
    credentials: "include",
  });
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
