/* import { useState } from "react";
import type SolicitudEntity from "../../entities/solicitud_entity";
import type { MateriaEntity } from "../../entities/materia_entity";
import type { PeriodoEntity } from "../../entities/periodo";


interface Props {
  usuarioId: number;
  espacioId: number;
  materias: MateriaEntity[];
  periodos: PeriodoEntity[];
  onSubmit: (solicitud: SolicitudEntity) => void;
  onCancel: () => void;
}

export default function SolicitudForm({ usuarioId, espacioId, materias, periodos, onSubmit, onCancel }: Props) {
        console.log(usuarioId, espacioId, materias,periodos)

  const [formData, setFormData] = useState<SolicitudEntity>({
    usuario_id: usuarioId,
    espacio_id: espacioId,
    periodo_id: 0,
    materia_id: 0,
    grupo: "",
    motivo: "",
    cantidad_asistentes: 0,
    dias: [],
    hora_inicio: "",
    hora_fin: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Solicitud a enviar:", formData);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <select
    name="materia_id"
    value={formData.materia_id}
    onChange={(e) =>
      setFormData({ ...formData, materia_id: Number(e.target.value) })
    }
    required
  >
    <option value={0}>Selecciona una materia</option>
    {materias.map((m) => (
      <option key={m.materia_id} value={m.materia_id}>
        {m.nombre}
      </option>
    ))}
  </select>

  <select
    name="periodo_id"
    value={formData.periodo_id}
    onChange={(e) =>
      setFormData({ ...formData, periodo_id: Number(e.target.value) })
    }
    required
  >
    <option value={0}>Selecciona un periodo</option>
    {periodos.map((p) => (
      <option key={p.periodo_id} value={p.periodo_id}>
        {p.nombre}
      </option>
    ))}
  </select>


      <input type="text" name="motivo" placeholder="Motivo" value={formData.motivo}  required />

      <select
        name="dia"
        value={formData.dias[0] || ""}
        onChange={(e) =>
            setFormData({ ...formData, dias: [Number(e.target.value)] })
        }
        className="border p-2 rounded border-morado"
        required
        >
            <option value={1}>Lunes</option>
            <option value={2}>Martes</option>
            <option value={3}>Miércoles</option>
            <option value={4}>Jueves</option>
            <option value={5}>Viernes</option>
        </select>

      <input type="time" name="hora_inicio" value={formData.hora_inicio} required />
      <input type="time" name="hora_fin" value={formData.hora_fin} required />

      <div className="flex gap-2">
        <button type="submit" className="bg-verde text-white p-2 rounded">Enviar</button>
        <button type="button" onClick={onCancel} className="bg-rojo text-white p-2 rounded">Cancelar</button>
      </div>
    </form>
  );
}
 */

import { useState } from "react";
import type SolicitudEntity from "../../entities/solicitud_entity";
import type { MateriaEntity } from "../../entities/materia_entity";
import type { PeriodoEntity } from "../../entities/periodo";

interface Props {
  usuarioId: number;
  espacioId: number;
  materias: MateriaEntity[];
  periodos: PeriodoEntity[];
  onSubmit: (solicitud: SolicitudEntity) => void;
  onCancel: () => void;
}

export default function SolicitudForm({
  usuarioId,
  espacioId,
  materias,
  periodos,
  onSubmit,
  onCancel,
}: Props) {
  const [formData, setFormData] = useState<SolicitudEntity>({
    usuario_id: usuarioId,
    espacio_id: espacioId,
    periodo_id: 0,
    materia_id: 0,
    grupo: "",
    motivo: "",
    cantidad_asistentes: 0,
    dias: [],
    hora_inicio: "",
    hora_fin: "",
  });

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


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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

      <select
        name="periodo_id"
        value={formData.periodo_id}
        onChange={(e) =>
          setFormData({ ...formData, periodo_id: Number(e.target.value) })
        }
        required
        className="border p-2 rounded border-morado"
      >
        <option value={0}>Selecciona un periodo</option>
        {periodos.map((p) => (
          <option key={p.periodo_id} value={p.periodo_id}>
            {p.nombre}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="grupo"
        placeholder="Grupo"
        value={formData.grupo}
        onChange={(e) =>
          setFormData({ ...formData, grupo: e.target.value })
        }
        required
        className="border p-2 rounded border-morado"
      />

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

       <select
        name="dia"
        value={formData.dias[0] || ""}
        onChange={(e) =>
          setFormData({ ...formData, dias: [Number(e.target.value)] })
        }
        className="border p-2 rounded border-morado"
        required
      >
        <option value={1}>Lunes</option>
        <option value={2}>Martes</option>
        <option value={3}>Miércoles</option>
        <option value={4}>Jueves</option>
        <option value={5}>Viernes</option>
      </select>

      <input
        type="time"
        name="hora_inicio"
        value={formData.hora_inicio}
        onChange={(e) =>
          setFormData({ ...formData, hora_inicio: e.target.value })
        }
        required
        className="border p-2 rounded border-morado"
      />

      <input
        type="time"
        name="hora_fin"
        value={formData.hora_fin}
        onChange={(e) =>
          setFormData({ ...formData, hora_fin: e.target.value })
        }
        required
        className="border p-2 rounded border-morado"
      />

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
  );
}
