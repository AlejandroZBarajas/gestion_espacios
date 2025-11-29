import { useEffect, useState } from "react";
import type EspacioEntity from "../../../entities/espacio_entity";
import type { CatalogoElementoEntity } from "../../../entities/catalogo_elemento_entity";
import type UbicacionEntity from "../../../entities/ubicacion_entity";
import type { EspacioFormData, InventarioFormItem } from "../../../entities/espacio_form_entity";
import { getUbicaciones } from "../../../servicios/ubicaciones_service";
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { UpdateEspacioDTO } from "../../../entities/update_espacio_DTO";
import { getCatalogo } from "../../../servicios/catalogo_service";

interface Props {
  espacio?: EspacioEntity | null;
  onSave: (espacio: UpdateEspacioDTO) => void;
  onCancel: () => void;
}

export default function EspacioForm({ espacio, onSave, onCancel }: Props) {

const [showCatalogoSelector, setShowCatalogoSelector] = useState(false);
const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

const toggleCard = (index: number) => {
  setExpandedCards(prev => {
    const newSet = new Set(prev);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    return newSet;
  });
}

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

    const inventariosPlano: InventarioFormItem[] = espacio.inventarios.map((item) => ({
      catalogo_id: item.inventario.catalogo_elemento.catalogo_id,
      cantidad: item.inventario.cantidad,
      marca: item.inventario.marca ?? "",
      modelo: item.inventario.modelo ?? "",
      patrimonio: item.inventario.patrimonio ?? "",
      observaciones: item.inventario.observaciones ?? "",
      catalogo_elemento: item.inventario.catalogo_elemento
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


  const [catalogo, setCatalogo] = useState<CatalogoElementoEntity[]>([])

  useEffect(()=> {
    const fetchCatalogo = async () => {
      try{
        const data = await getCatalogo()
        setCatalogo(data)
      }catch (error){
        console.log(error)
      }
    }
    fetchCatalogo()
  },[])


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

 const agregarItemInventario = (catalogoElemento: CatalogoElementoEntity) => {
  setFormData({
    ...formData,
    inventarios: [
      ...formData.inventarios,
      {
        catalogo_id: catalogoElemento.catalogo_id,
        cantidad: 1,
        marca: "",
        modelo: "",
        patrimonio: "",
        observaciones: "",
        catalogo_elemento: catalogoElemento, // ✅ Incluye el objeto completo
      },
    ],
  });
  setShowCatalogoSelector(false); // Cierra el selector
};

  const eliminarItemInventario = (index: number) => {
    const updated = formData.inventarios.filter((_, i) => i !== index);
    setFormData({ ...formData, inventarios: updated });
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const payload: UpdateEspacioDTO = {
    nombre: formData.nombre,
    ubicacionId: formData.ubicacionId,
    capacidad: formData.capacidad,
    descripcion: formData.descripcion,
    disponible: formData.disponible,
    tipoId: formData.tipoId,
    inventario: formData.inventarios.map(inv => ({
      catalogo_id: inv.catalogo_id,
      cantidad: inv.cantidad,
      marca: inv.marca,
      modelo: inv.modelo,
      patrimonio: inv.patrimonio,
      observaciones: inv.observaciones,
    }))
  };

  onSave(payload); 
};

  return (
    <div className="max-h-screen overflow-y-auto p-2">
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold text-morado">
        {espacio ? "Editar Espacio" : "Nuevo Espacio"}
      </h2>

      <label>Nombre</label>
      <input
        type="text"
        name="nombre"
        className="border p-2 rounded"
        value={formData.nombre}
        onChange={handleChange}
        required
      />

      <label>Categoría</label>
      <input
        type="number"
        name="tipoId"
        className="border p-2 rounded"
        value={formData.tipoId}
        onChange={handleChange}
        required
      />

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

      <label>Capacidad</label>
      <input
        type="number"
        name="capacidad"
        className="border p-2 rounded"
        value={formData.capacidad}
        onChange={handleChange}
        required
      />

      <textarea
        name="descripcion"
        className="border p-2 rounded"
        placeholder="Descripción"
        value={formData.descripcion}
        onChange={handleChange}
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="disponible"
          checked={formData.disponible}
          onChange={handleChange}
        />
        Disponible
      </label>

      <h3 className="text-xl font-bold mt-4">Inventario</h3>

{formData.inventarios.map((item, index) => {
  const isExpanded = expandedCards.has(index);
  
  return (
    <div key={index} className="border-2 border-morado rounded-xl overflow-hidden bg-white shadow-md">
      {/* Header - Siempre visible */}
      <div 
        className="p-4 bg-blanco cursor-pointer hover:bg-blue-50 transition-colors"
        onClick={() => toggleCard(index)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <h4 className="font-bold text-xl text-morado">
              {item.catalogo_elemento?.nombre_elemento || 'Sin nombre'}
            </h4>
            <span className="bg-moradito text-morado px-3 py-1 rounded-full text-sm font-semibold">
              Cantidad: {item.cantidad}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                eliminarItemInventario(index);
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Eliminar
            </button>
            
            {isExpanded ? (
              <ChevronUp className="w-6 h-6 text-morado" />
            ) : (
              <ChevronDown className="w-6 h-6 text-morado" />
            )}
          </div>
        </div>
      </div>

      {/* Contenido colapsable - Solo visible cuando está expandido */}
      {isExpanded && (
        <div className="p-4 space-y-3 bg-gray-50">
          <input
            type="number"
            placeholder="cantidad"
            value={item.cantidad}
            onChange={(e) =>
              handleInventarioChange(index, "cantidad", Number(e.target.value))
            }
            className="border p-2 rounded w-full"
            required
          />

          <input
            type="text"
            placeholder="marca"
            value={item.marca}
            onChange={(e) =>
              handleInventarioChange(index, "marca", e.target.value)
            }
            className="border p-2 rounded w-full"
          />

          <input
            type="text"
            placeholder="modelo"
            value={item.modelo}
            onChange={(e) =>
              handleInventarioChange(index, "modelo", e.target.value)
            }
            className="border p-2 rounded w-full"
          />

          <input
            type="text"
            placeholder="patrimonio"
            value={item.patrimonio}
            onChange={(e) =>
              handleInventarioChange(index, "patrimonio", e.target.value)
            }
            className="border p-2 rounded w-full"
          />

          <textarea
            placeholder="observaciones"
            value={item.observaciones}
            onChange={(e) =>
              handleInventarioChange(index, "observaciones", e.target.value)
            }
            className="border p-2 rounded w-full"
          />
        </div>
      )}
    </div>
  );
})}


      <button
        type="button"
        onClick={() => setShowCatalogoSelector(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-colors"
      >
        + Agregar Item
      </button>


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

    {showCatalogoSelector && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-xl font-bold text-morado mb-4">
            Selecciona un elemento del catálogo
          </h3>
      
      <div className="max-h-96 overflow-y-auto space-y-2">
        {catalogo.map((item) => (
          <button
            key={item.catalogo_id}
            type="button"
            onClick={() => agregarItemInventario(item)}
            className="w-full text-left p-3 border-2 border-gray-200 rounded-lg hover:border-morado hover:bg-purple-50 transition-colors"
          >
            <div className="font-semibold text-morado">
              {item.nombre_elemento}
            </div>
            <div className="text-sm text-gray-600">
              Tipo: {item.tipo}
            </div>
          </button>
      ))}
      </div>

         <button
        type="button"
        onClick={() => setShowCatalogoSelector(false)}
        className="mt-4 w-full bg-gray-400 hover:bg-gray-500 text-white p-2 rounded transition-colors"
      >
        Cancelar
      </button>
    </div>
  </div>
)}
</div>
)}