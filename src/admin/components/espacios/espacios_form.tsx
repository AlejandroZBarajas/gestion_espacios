import { useEffect, useState } from "react";
import type EspacioEntity from "../../../entities/espacio_entity";
import type UbicacionEntity from "../../../entities/ubicacion_entity";
import type { EspacioFormData, InventarioFormItem } from "../../../entities/espacio_form_entity";
import { getUbicaciones } from "../../../servicios/ubicaciones_service";

interface Props {
  espacio?: EspacioEntity | null;
  onSave: (espacio: EspacioEntity) => void;
  onCancel: () => void;
}

export default function EspacioForm({ espacio, onSave, onCancel }: Props) {

  const [formData, setFormData] = useState<EspacioFormData>(() => {
    if (!espacio) {
      return {
        nombre: "",
        tipoId: 0,
        capacidad: 0,
        descripcion: "",
        disponible: true,
        ubicacionId: 0,
        inventarios: [],
      };
    }

    // Convertir inventarios anidados → inventario plano
    const inventariosPlano: InventarioFormItem[] = espacio.inventarios.map((item) => ({
      catalogo_id: item.inventario.catalogo_elemento.catalogo_id,
      cantidad: item.inventario.cantidad,
      marca: item.inventario.marca ?? "",
      modelo: item.inventario.modelo ?? "",
      patrimonio: item.inventario.patrimonio ?? "",
      observaciones: item.inventario.observaciones ?? "",
    }));

    return {
      espacio_id: espacio.espacio_id,
      nombre: espacio.nombre,
      descripcion: espacio.descripcion,
      capacidad: espacio.capacidad,
      disponible: espacio.disponible,
      tipoId: espacio.tipo_id,
      ubicacionId: espacio.ubicacion_id,
      inventarios: inventariosPlano,
    };
  });


  const [ubicaciones, setUbicaciones] = useState<UbicacionEntity[]>([]);

  useEffect(() => {
    const fetchUbicaciones = async () => {
      try {
        const data = await getUbicaciones();
        setUbicaciones(data);
      } catch (error) {
        console.error("Error cargando ubicaciones", error);
      }
    };
    fetchUbicaciones();
  }, []);


/*   const handleChange = (
    e: React.ChangeEvent<div
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;
    const name = target.name as keyof EspacioFormData;
    let raw: string = target.value;

    if (target.type === "checkbox") {
      raw = String((target as HTMLInputElement).checked);
    }

    setFormData((prev) => {
      switch (name) {
        case "nombre":
        case "descripcion":
          return { ...prev, [name]: raw };

        case "capacidad":
        case "tipoId":
        case "ubicacionId":
          return { ...prev, [name]: Number(raw) };

        case "disponible":
          return { ...prev, disponible: raw === "true" };

        default:
          return prev;
      }
    });
  }; */

  const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
) => {
  const target = e.target;
  const name = target.name as keyof EspacioFormData;
  let raw: string = target.value;

  if (target.type === "checkbox") {
    raw = String((target as HTMLInputElement).checked);
  }

  setFormData((prev) => {
    switch (name) {
      case "nombre":
      case "descripcion":
        return { ...prev, [name]: raw };

      case "capacidad":
      case "tipoId":
      case "ubicacionId":
        return { ...prev, [name]: Number(raw) };

      case "disponible":
        return { ...prev, disponible: raw === "true" };

      default:
        return prev;
    }
  });
};


  const handleInventarioChange = (
    index: number,
    field: keyof InventarioFormItem,
    value: string | number
  ) => {
    const updated = [...formData.inventarios];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, inventarios: updated });
  };

  const agregarItemInventario = () => {
    setFormData({
      ...formData,
      inventarios: [
        ...formData.inventarios,
        {
          catalogo_id: 0,
          cantidad: 0,
          marca: "",
          modelo: "",
          patrimonio: "",
          observaciones: "",
        },
      ],
    });
  };

  const eliminarItemInventario = (index: number) => {
    const updated = formData.inventarios.filter((_, i) => i !== index);
    setFormData({ ...formData, inventarios: updated });
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const payload: EspacioEntity = {
    espacio_id: formData.espacio_id ?? 0,
    nombre: formData.nombre,
    descripcion: formData.descripcion,
    capacidad: formData.capacidad,
    disponible: formData.disponible,
    tipo_id: formData.tipoId,
    ubicacion_id: formData.ubicacionId,
    inventarios: formData.inventarios.map(inv => ({
      espacio_inventario_id: 0,
      inventario: {
        inventario_id: 0,
        cantidad: inv.cantidad,
        marca: inv.marca,
        modelo: inv.modelo,
        patrimonio: inv.patrimonio,
        estado: "BUENO",
        observaciones: inv.observaciones,
        catalogo_elemento: {
          catalogo_id: inv.catalogo_id,
          nombre_elemento: "",
          tipo: "",
          descripcion: null,
          fecha_creacion: "",
        }
      }
    })),
  };

  onSave(payload);
};


  return (
    <div className="max-h-screen overflow-y-auto p-2">
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold text-morado">
        {espacio ? "Editar Espacio" : "Nuevo Espacio"}
      </h2>

      {/* Nombre */}
      <label>Nombre</label>
      <input
        type="text"
        name="nombre"
        className="border p-2 rounded"
        value={formData.nombre}
        onChange={handleChange}
        required
      />

      {/* Tipo */}
      <label>Tipo ID</label>
      <input
        type="number"
        name="tipoId"
        className="border p-2 rounded"
        value={formData.tipoId}
        onChange={handleChange}
        required
      />

      {/* Ubicación */}
      <label>Ubicación</label>
      <select
        name="ubicacionId"
        className="border p-2 rounded"
        value={formData.ubicacionId}
        onChange={handleChange}
        required
      >
        <option value="">Selecciona una ubicación</option>
        {ubicaciones.map((u) => (
          <option key={u.ubicacion_id} value={u.ubicacion_id}>
            {u.ubicacion}
          </option>
        ))}
      </select>

      {/* Capacidad */}
      <label>Capacidad</label>
      <input
        type="number"
        name="capacidad"
        className="border p-2 rounded"
        value={formData.capacidad}
        onChange={handleChange}
        required
      />

      {/* Descripción */}
      <textarea
        name="descripcion"
        className="border p-2 rounded"
        placeholder="Descripción"
        value={formData.descripcion}
        onChange={handleChange}
      />

      {/* Disponible */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="disponible"
          checked={formData.disponible}
          onChange={handleChange}
        />
        Disponible
      </label>

      {/* INVENTARIO */}
      <h3 className="text-xl font-bold mt-4">Inventario</h3>

      {formData.inventarios.map((item, index) => (
        <div key={index} className="border p-3 rounded flex flex-col gap-2">
          <h4 className="text-lg font-semibold">Item {index + 1}</h4>

          <input
            type="number"
            placeholder="catalogo_id"
            value={item.catalogo_id}
            onChange={(e) =>
              handleInventarioChange(index, "catalogo_id", Number(e.target.value))
            }
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            placeholder="cantidad"
            value={item.cantidad}
            onChange={(e) =>
              handleInventarioChange(index, "cantidad", Number(e.target.value))
            }
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            placeholder="marca"
            value={item.marca}
            onChange={(e) =>
              handleInventarioChange(index, "marca", e.target.value)
            }
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="modelo"
            value={item.modelo}
            onChange={(e) =>
              handleInventarioChange(index, "modelo", e.target.value)
            }
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="patrimonio"
            value={item.patrimonio}
            onChange={(e) =>
              handleInventarioChange(index, "patrimonio", e.target.value)
            }
            className="border p-2 rounded"
          />

          <textarea
            placeholder="observaciones"
            value={item.observaciones}
            onChange={(e) =>
              handleInventarioChange(index, "observaciones", e.target.value)
            }
            className="border p-2 rounded"
          />

          <button
            type="button"
            onClick={() => eliminarItemInventario(index)}
            className="bg-red-500 text-white p-2 rounded"
          >
            Eliminar Item
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={agregarItemInventario}
        className="bg-blue-600 text-white p-2 rounded"
      >
        + Agregar Item
      </button>

      {/* Botones */}
      <div className="flex gap-2 mt-3">
        <button type="submit" className="flex-1 bg-green-600 text-white p-2 rounded">
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-400 p-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
     {/* Footer fijo */}
  <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-md flex gap-2">
    <button type="submit" form="espacioForm" className="flex-1 bg-green-600 text-white p-2 rounded">
      Guardar
    </button>
    <button
      type="button"
      onClick={onCancel}
      className="flex-1 bg-gray-400 p-2 rounded"
    >
      Cancelar
    </button>
  </div>
    </div>
  );
}
