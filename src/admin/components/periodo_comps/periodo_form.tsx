import { useState } from "react";
import type { PeriodoEntity } from "../../../entities/periodo";
//import { createPeriodo, updatePeriodo } from "../../../servicios/periodos_service";


interface Props {
  periodo?: PeriodoEntity | null;
  onSave: (periodo: PeriodoEntity) => void;
  onCancel: () => void;
}

export default function PeriodoForm({ periodo, onSave, onCancel }: Props) {
  const [formData, setFormData] = useState<PeriodoEntity>(
    periodo || {
      fecha_inicio: "",
      fecha_fin: "",
      tipo_periodo: "Enero-Abril",
      activo: true,
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

 const handleSubmit = (e: React.FormEvent) => {
  
  e.preventDefault();
  onSave(formData);
};


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h2 className="text-3xl font-bold text-morado">
        {periodo ? "Editar Periodo" : "Nuevo Periodo"}
      </h2>



      <input
        type="date"
        name="fecha_inicio"
        value={formData.fecha_inicio}
        onChange={handleChange}
        className="border p-2 rounded border-morado"
        required
      />

      <input
        type="date"
        name="fecha_fin"
        value={formData.fecha_fin}
        onChange={handleChange}
        className="border p-2 rounded border-morado"
        required
      />


      <select
        name="tipo_periodo"
        value={formData.tipo_periodo}
        onChange={handleChange}
        className="border p-2 rounded border-morado"
      >
        <option value="Enero-Abril">Enero-Abril</option>
        <option value="Mayo-Agosto">Mayo-Agosto</option>
        <option value="Septiembre-Diciembre">Septiembre-Diciembre</option>
      </select>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="activo"
          checked={formData.activo}
          onChange={handleChange}
        />
        Activo
      </label>

      <div className="flex gap-2">
        <button type="submit" className="flex-1 bg-verde text-white p-2 rounded">
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-rojo text-white p-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
