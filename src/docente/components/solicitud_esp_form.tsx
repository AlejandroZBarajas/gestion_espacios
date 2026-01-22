import { useState } from "react";
import type SolicitudEspecialEntity from "../../entities/solicitud_esp_entity";

interface Props{
    usuarioId: number
    espacioId: number
    onSubmit: (solicitudEspecial: SolicitudEspecialEntity) => void
    onCancel: () => void
}

export default function SolicitudEspecialForm({
    usuarioId,
    espacioId,
    onSubmit,
    onCancel,
}:Props){
    const [formData, setFormData] = useState<SolicitudEspecialEntity>({
        usuario_id: usuarioId,
        espacio_id: espacioId,
        fecha:"",
        motivo:"",
        cantidad_asistentes:0,
        hora_inicio:"",
        hora_fin:""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.hora_inicio >= formData.hora_fin) {
            alert("La hora de inicio debe ser menor a la hora final");
            return;
        }

        const payload: SolicitudEspecialEntity = {
            usuario_id: Number(formData.usuario_id),
            espacio_id: Number(formData.espacio_id),
            fecha: String(formData.fecha),
            motivo:String(formData.motivo),
            cantidad_asistentes: Number(formData.cantidad_asistentes),
            hora_inicio:String(formData.hora_inicio),
            hora_fin:String(formData.hora_fin)
        }
        console.log("Payload enviado al POST:", payload);
        onSubmit(payload);
    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <h2 className="text-morado">Fecha del evento</h2>
            <div className="flex gap-2 items-center">
                <input
                    type="date"
                    value={formData.fecha}
                    onChange={(e) =>
                    setFormData({ ...formData, fecha: e.target.value })
                    }
                    required
                    className="border p-2 rounded border-morado flex-1"
                />
            </div>

            <h2 className="text-morado">Motivo</h2>
            
            <input
                type="text"
                name="motivo"
                placeholder="Motivo"
                value={formData.motivo}
                onChange={(e) =>
                setFormData({ ...formData, motivo: e.target.value })
                }
                required
                className="border p-2 rounded border-morado"
            />
        
            <h2 className="text-morado">Cantidad de asistentes</h2>
            <input
            type="number"
            min={1}
            step={1}
            inputMode="numeric"
            value={formData.cantidad_asistentes}
            onChange={(e) => {
                const value = Number(e.target.value);

                if (Number.isInteger(value) && value > 0) {
                setFormData({ ...formData, cantidad_asistentes: value });
                }
            }}
            required
            className="border p-2 rounded border-morado"
            />



            <h2 className="text-morado">Hora de inicio</h2>

            <select
            name="hora_inicio"
            value={formData.hora_inicio}
            onChange={(e) =>
                setFormData({ ...formData, hora_inicio: e.target.value })
            }
            required
            className="border p-2 rounded border-morado"
            >
                <option value="">Selecciona una hora</option>
                {Array.from({ length: 24 }, (_, i) => {
                    const hora = i.toString().padStart(2, '0');
                    return (
                    <option key={hora} value={`${hora}`}>
                        {hora}:00
                    </option>
                );
            })}
            </select>

            <h2 className="text-morado">Hora final</h2>

            <select
                name="hora_fin"
                value={formData.hora_fin}
                onChange={(e) =>
                    setFormData({ ...formData, hora_fin: e.target.value })
                }
                required
                className="border p-2 rounded border-morado"
            >
                <option value="">Selecciona una hora</option>
                {Array.from({ length: 24 }, (_, i) => {
                    const hora = i.toString().padStart(2, '0');
                    return (
                    <option key={hora} value={`${hora}`}>
                        {hora}:00
                    </option>
                    );
                })}
            </select>

            <div className="flex gap-2">
                <button
                type="submit"
                className="bg-verde text-white p-2 rounded flex-1"
                >
                Enviar
                </button>
                <button
                type="button"
                onClick={onCancel}
                className="bg-rojo text-white p-2 rounded flex-1"
                >
                Cancelar
                </button>
            </div>
        </form>
    )
}