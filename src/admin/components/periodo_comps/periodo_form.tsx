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
      activo:false
    }
  );
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type  } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined; 

    setFormData({
      ...formData,
      [name]:  type === "checkbox" ? checked :value,
    });
  };

 const handleSubmit = (e: React.FormEvent) => {
  
  e.preventDefault();

  if (!validateDates(formData.fecha_inicio, formData.fecha_fin)) {
      return;
    }
  onSave(formData);
};

  const validateDates = (inicio: string, fin: string) => {
    if (inicio && fin) {
      const fechaInicio = new Date(inicio);
      const fechaFin = new Date(fin);

      if (fechaFin <= fechaInicio) {
        setError("La fecha de cierre debe ser posterior a la fecha de inicio");
        return false;
      }
    }
    setError(error);
    return true;
  };


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h2 className="text-3xl font-bold text-morado">
        {periodo ? "Editar Periodo" : "Nuevo Periodo"}
      </h2>


      <h3>Fecha de inicio</h3>
      <input
        type="date"
        name="fecha_inicio"
        value={formData.fecha_inicio}
        onChange={handleChange}
        className="border p-2 rounded border-morado"
        required
      />

      <h3>Fecha de cierre</h3>
      <input
        type="date"
        name="fecha_fin"
        value={formData.fecha_fin}
        onChange={handleChange}
        className="border p-2 rounded border-morado"
        required
      />

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
       
        
        <button
          type="submit"
          disabled={!!error}
          className="flex-1 bg-verde text-white p-2 rounded font-semibold hover:bg-verde/90 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
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
