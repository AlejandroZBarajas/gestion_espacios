import { useState, useEffect } from "react";
import type ReporteEntity from "../../entities/reporte_entity";
import type UbicacionEntity from "../../entities/ubicacion_entity";
import type EspacioEntity from "../../entities/espacio_entity";
import type InventarioEntity from "../../entities/inventario_entity";

import { getUbicaciones } from "../../servicios/ubicaciones_service";
import { getEspaciosbyUbicacion } from "../../servicios/espacios_service";
import { getInventarioByEspacio } from "../../servicios/inventario_service";

interface Props {
  initialData?: ReporteEntity;
  onSubmit: (data: Omit<ReporteEntity, "reporte_id" | "usuario_id">) => void;
  onCancel: () => void;
}

export default function ReporteFormModal({
  initialData,
  onSubmit,
  onCancel,
}: Props) {
  const [ubicaciones, setUbicaciones] = useState<UbicacionEntity[]>([]);
  const [espacios, setEspacios] = useState<EspacioEntity[]>([]);
  const [inventario, setInventario] = useState<InventarioEntity[]>([]);

  const [ubicacionId, setUbicacionId] = useState<number | null>(null);
  const [espacioId, setEspacioId] = useState<number | null>(null);
  const [inventarioId, setInventarioId] = useState<number>(0);
  const [descripcion, setDescripcion] = useState("");

  // cargar ubicaciones al inicio
  useEffect(() => {
    getUbicaciones().then(setUbicaciones).catch(console.error);
  }, []);

  // cargar espacios cuando cambia la ubicación
  useEffect(() => {
    if (ubicacionId) {
      getEspaciosbyUbicacion(ubicacionId)
        .then(setEspacios)
        .catch(console.error);
    } else {
      setEspacios([]);
      setEspacioId(null);
    }
  }, [ubicacionId]);

  // cargar inventario cuando cambia el espacio
  useEffect(() => {
    if (espacioId) {
      getInventarioByEspacio(espacioId)
        .then(setInventario)
        .catch(console.error);
    } else {
      setInventario([]);
      setInventarioId(0);
    }
  }, [espacioId]);

  // cuando editemos, rellenamos el form
  useEffect(() => {
    if (initialData) {
      setInventarioId(initialData.inventario_id);
      setDescripcion(initialData.descripcion);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inventarioId) return;
    onSubmit({
      inventario_id: inventarioId,
      descripcion,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-bold mb-4 text-morado">
          {initialData ? "Editar Reporte" : "Nuevo Reporte"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Selección de ubicación */}
          <h3>Edificio</h3>
          <select
            value={ubicacionId ?? ""}
            onChange={(e) => setUbicacionId(Number(e.target.value))}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Seleccione una ubicación</option>
            {ubicaciones.map((u) => (
              <option key={u.ubicacion_id} value={u.ubicacion_id}>
                {u.ubicacion}
              </option>
            ))}
          </select>

          {/* Selección de espacio */}
          <h3>Espacios disponibles en este edificio</h3>
          <select
            value={espacioId ?? ""}
            onChange={(e) => setEspacioId(Number(e.target.value))}
            className="w-full p-2 border rounded"
            required
            disabled={!ubicacionId}
          >
            <option value="">Seleccione un espacio</option>
            {espacios.map((e) => (
              <option key={e.espacio_id} value={e.espacio_id}>
                {e.nombre}
              </option>
            ))}
          </select>

          {/* Selección de inventario */}
          <h3>Seleccione artículo a reportar</h3>
          <select
            value={inventarioId || ""}
            onChange={(e) => setInventarioId(Number(e.target.value))}
            className="w-full p-2 border rounded"
            required
            disabled={!espacioId}
          >
            <option value="">Seleccione un item</option>
            {inventario.map((i) => (
              <option key={i.inventario_id} value={i.inventario_id}>
                {i.nombre_elemento}
              </option>
            ))}
          </select>

          {/* Descripción */}
          <h3>Reporte</h3>
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
            required
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-morado text-white rounded hover:bg-morado-dark"
            >
              {initialData ? "Guardar cambios" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


/* import { useState, useEffect } from "react";
import type ReporteEntity from "../../entities/reporte_entity";

interface Props {
  initialData?: ReporteEntity; 
  onSubmit: (data: Omit<ReporteEntity, "reporte_id" | "usuario_id">) => void;
  onCancel: () => void;
}

export default function ReporteFormModal({ initialData, onSubmit, onCancel }: Props) {
  const [inventarioId, setInventarioId] = useState<number>(0);
  const [descripcion, setDescripcion] = useState("");

  // cuando editemos, rellenamos el form
  useEffect(() => {
    if (initialData) {
      setInventarioId(initialData.inventario_id);
      setDescripcion(initialData.descripcion);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      inventario_id: inventarioId,
      descripcion,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-xl font-bold mb-4 text-morado">
          {initialData ? "Editar Reporte" : "Nuevo Reporte"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            placeholder="ID de Inventario"
            value={inventarioId}
            onChange={(e) => setInventarioId(Number(e.target.value))}
            className="w-full p-2 border rounded"
            required
          />

          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
            required
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-morado text-white rounded hover:bg-morado-dark"
            >
              {initialData ? "Guardar cambios" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
 */