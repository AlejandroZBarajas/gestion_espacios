import { useState, useEffect } from "react";
import type SolicitudEntity from "../../../entities/solicitud_entity";

import { CalendarDays, Users, Clock, BookOpen, MapPin } from "lucide-react";

interface SolicitudCardProps {
  solicitud: SolicitudEntity;
  onAceptar: (id: number) => void;
  onRechazar: (id: number) => void;
}


export default function SolicitudCard({ solicitud, onAceptar, onRechazar }: SolicitudCardProps) {
  return (
    <Card className="w-full max-w-md rounded-2xl shadow-md p-4">
      <CardHeader>
        <h2 className="text-lg font-semibold text-gray-800">
          Solicitud #{solicitud.solicitud_id}
        </h2>
        <p className="text-sm text-gray-500">
          Estado: <span className="font-medium">{solicitud.estado ?? "Pendiente"}</span>
        </p>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-blue-600" />
          <span>Materia ID: {solicitud.materia_id} - Grupo {solicitud.grupo}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-green-600" />
          <span>Espacio ID: {solicitud.espacio_id}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-purple-600" />
          <span>Asistentes: {solicitud.cantidad_asistentes}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-red-600" />
          <span>Días: {solicitud.dias.join(", ")}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-orange-600" />
          <span>
            {solicitud.hora_inicio} - {solicitud.hora_fin}
          </span>
        </div>
        <div>
          <p className="font-medium">Motivo:</p>
          <p className="text-gray-700">{solicitud.motivo}</p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          className="border-red-500 text-red-600 hover:bg-red-50"
          onClick={() => onRechazar(solicitud.solicitud_id!)}
        >
          Rechazar
        </Button>
        <Button
          className="bg-green-600 text-white hover:bg-green-700"
          onClick={() => onAceptar(solicitud.solicitud_id!)}
        >
          Aceptar
        </Button>
      </CardFooter>
    </Card>
  );
}
