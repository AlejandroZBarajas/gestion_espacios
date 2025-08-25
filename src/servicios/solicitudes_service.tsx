import type SolicitudEntity from "../entities/solicitud_entity";

const API_URL = import.meta.env.VITE_API_URL + "solicitudes";

export const createSolicitud = async (solicitud: SolicitudEntity): Promise<SolicitudEntity> => {
  const res = await fetch(`${API_URL}/normal`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(solicitud),
  });
  if (!res.ok) throw new Error("Error al crear la solicitud");
  return res.json();
};