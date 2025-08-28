import { useState } from "react";
import type InventarioEntity from "../../../entities/inventario_entity";
import InventarioTable from "./inventario_table";
import InventarioForm from "./inventario_form";
import { MdAdd } from "react-icons/md";

interface Props {
  espacioId: number;
  espacioNombre: string;
  data: InventarioEntity[];
  onCreate: (espacioId: number, item: InventarioEntity) => void;
  onDelete: (id: number) => void;
  onEdit: (item: InventarioEntity) => void;
}

export default function InventarioEspacioSection({
  espacioId,
  espacioNombre,
  data,
  onCreate,
  onDelete,
  onEdit,
}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<InventarioEntity | null>(null);

  const handleEditClick = (item: InventarioEntity) => {
    setEditItem(item);
    setShowForm(true);
  };

  const handleFormSubmit = (item: InventarioEntity) => {
    if (editItem) {
      onEdit(item); // actualizar
      setEditItem(null);
    } else {
      onCreate(espacioId, item); // crear
    }
    setShowForm(false);
  };

  const handleFormCancel = () => {
    setEditItem(null);
    setShowForm(false);
  };

  return (
    <div className="mb-8 relative">
      <h2 className="text-xl font-semibold text-azul mb-2">{espacioNombre}</h2>

      <button
        onClick={() => setShowForm(true)}
        className="mb-2 bg-azul text-white px-4 py-2 rounded shadow flex items-center gap-1"
      >
        <MdAdd /> Agregar elemento
      </button>

      <InventarioTable
        data={data}
        onDelete={onDelete}
        onEdit={handleEditClick}
      />

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <InventarioForm
              espacioId={espacioId}
              initialData={editItem || undefined}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
}
