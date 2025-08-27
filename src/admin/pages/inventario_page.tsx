import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/common/header";
import InventarioTable from "../components/inventario/inventario_table";
import InventarioForm from "../components/inventario/inventario_form";
import type InventarioEntity from "../../entities/inventario_entity";
import { getInventarioByEspacio, createInventario, deleteInventario } from "../../servicios/inventario_service";


export default function InventarioPage() {
  const { espacioId } = useParams();
  const [inventario, setInventario] = useState<InventarioEntity[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (espacioId) {
      getInventarioByEspacio(Number(espacioId)).then(setInventario);
    }
  }, [espacioId]);

  const handleCreate = async (item: InventarioEntity) => {
    const nuevo = await createInventario(item);
    setInventario([...inventario, nuevo]);
    setShowForm(false);
  };

  const handleDelete = async (id: number) => {
    await deleteInventario(id);
    setInventario(inventario.filter((i) => i.inventario_id !== id));
  };

  return (
    <div className="relative">
      <Header />
      <div className="p-6">
        <h1 className="text-2xl font-bold text-morado mb-4">Inventario del Espacio {espacioId}</h1>

        <button
          onClick={() => setShowForm(true)}
          className="mb-4 bg-azul text-white px-4 py-2 rounded shadow"
        >
          + Agregar elemento
        </button>

        <InventarioTable data={inventario} onDelete={handleDelete} />

        {showForm && (
          <InventarioForm
            espacioId={Number(espacioId)}
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
}
