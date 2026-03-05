import { useEffect, useState } from "react";
import type SolicitudEntity from "../../entities/solicitud_entity";
import type { MateriaEntity } from "../../entities/materia_entity";
import { getHorasOcupadasByEspacioId } from "../../servicios/solicitudes_service";
import type { HoraOcupada,  } from "../../entities/hora_ocupada_entity"; //HorasOcupadasDias

interface Props {
  usuarioId: number;
  espacioId: number;
  materias: MateriaEntity[];
  periodoId: number;
  onSubmit: (solicitud: SolicitudEntity) => void;
  onCancel: () => void;
}

export default function SolicitudForm({
  usuarioId,
  espacioId,
  materias,
  periodoId,
  onSubmit,
  onCancel,
}: Props) {
  const [formData, setFormData] = useState<SolicitudEntity>({
    usuario_id: usuarioId,
    espacio_id: espacioId,
    periodo_id: periodoId,
    materia_id: 0,
    grupo: "",
    motivo: "",
    cantidad_asistentes: 0,
    dias: [],
    hora_inicio: "",
    hora_fin: "",
  });

  const [horasOcupadas, setHorasOcupadas] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  console.log()
  // Mapeo de días
 const diasMap: Record<number, 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes'> = {
    1: "lunes",
    2: "martes",
    3: "miercoles",
    4: "jueves",
    5: "viernes",
  };

  useEffect(() => {
    console.log("espacio_id: ", espacioId);
    cargarHorasOcupadas();
  }, [espacioId]);

  // Cargar horas ocupadas cuando cambia el día seleccionado
  useEffect(() => {
    if (formData.dias[0]) {
      cargarHorasOcupadas();
    }
  }, [formData.dias[0]]);

  const cargarHorasOcupadas = async () => {
    try {
      setLoading(true);
      const data = await getHorasOcupadasByEspacioId(espacioId);
      
      // Obtener el día seleccionado
      const diaSeleccionado = formData.dias[0];
      if (diaSeleccionado) {
        const nombreDia = diasMap[diaSeleccionado];
        const horasDelDia = data[nombreDia] || [];
        
        // Crear un Set con las horas ocupadas
        const horasSet = new Set(horasDelDia.map((h: HoraOcupada) => h.hora));
        setHorasOcupadas(horasSet);
      }
    } catch (error) {
      console.error("Error al cargar horas ocupadas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: SolicitudEntity = {
      usuario_id: Number(formData.usuario_id),
      espacio_id: Number(formData.espacio_id),
      periodo_id: Number(formData.periodo_id),
      materia_id: Number(formData.materia_id),
      grupo: String(formData.grupo),
      motivo: String(formData.motivo),
      cantidad_asistentes: Number(formData.cantidad_asistentes),
      dias: formData.dias.map(Number),
      hora_inicio: String(formData.hora_inicio),
      hora_fin: String(formData.hora_fin),
    };

    console.log("Payload enviado al POST:", payload);
    onSubmit(payload);
  };

  // Función para verificar si una hora está ocupada
  const isHoraOcupada = (hora: string): boolean => {
    return horasOcupadas.has(hora);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h2 className="text-morado">Materia</h2>
      <select
        name="materia_id"
        value={formData.materia_id}
        onChange={(e) =>
          setFormData({ ...formData, materia_id: Number(e.target.value) })
        }
        required
        className="border p-2 rounded border-morado"
      >
        <option value={0}>Selecciona una materia</option>
        {materias.map((m) => (
          <option key={m.materia_id} value={m.materia_id}>
            {m.nombre}
          </option>
        ))}
      </select>

      <h2 className="text-morado">Grupo</h2>
      <input
        type="text"
        name="grupo"
        placeholder="Grupo"
        value={formData.grupo}
        onChange={(e) => setFormData({ ...formData, grupo: e.target.value })}
        required
        className="border p-2 rounded border-morado"
      />

      <h2 className="text-morado">Motivo</h2>
      <input
        type="text"
        name="motivo"
        placeholder="Motivo"
        value={formData.motivo}
        onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
        required
        className="border p-2 rounded border-morado"
      />

      <h2 className="text-morado">Día de la semana</h2>
      <select
        name="dia"
        value={formData.dias[0] || ""}
        onChange={(e) =>
          setFormData({ ...formData, dias: [Number(e.target.value)] })
        }
        className="border p-2 rounded border-morado"
        required
      >
        <option value="">Selecciona un día</option>
        <option value={1}>Lunes</option>
        <option value={2}>Martes</option>
        <option value={3}>Miércoles</option>
        <option value={4}>Jueves</option>
        <option value={5}>Viernes</option>
      </select>

      <h2 className="text-morado">Hora de inicio</h2>
      <select
        name="hora_inicio"
        value={formData.hora_inicio}
        onChange={(e) =>
          setFormData({ ...formData, hora_inicio: e.target.value })
        }
        required
        disabled={loading || !formData.dias[0]}
        className="border p-2 rounded border-morado disabled:opacity-50"
      >
        <option value="">Selecciona una hora</option>
        {Array.from({ length: 24 }, (_, i) => {
          const hora = `${i.toString().padStart(2, "0")}:00`;
          const ocupada = isHoraOcupada(hora);
          return (
            <option key={hora} value={hora} disabled={ocupada}>
              {hora} {ocupada ? "(Ocupada)" : ""}
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
        disabled={loading || !formData.dias[0]}
        className="border p-2 rounded border-morado disabled:opacity-50"
      >
        <option value="">Selecciona una hora</option>
        {Array.from({ length: 24 }, (_, i) => {
          const hora = `${i.toString().padStart(2, "0")}:00`;
          const ocupada = isHoraOcupada(hora);
          return (
            <option key={hora} value={hora} disabled={ocupada}>
              {hora} {ocupada ? "(Ocupada)" : ""}
            </option>
          );
        })}
      </select>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-verde text-white p-2 rounded flex-1"
          disabled={loading}
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
  );
}