import { useState, useEffect } from "react";
import Header from "../components/common/header";
import InventarioTable from "../components/inventario/inventario_table";
import InventarioForm from "../components/inventario/inventario_form";
import type InventarioEntity from "../../entities/inventario_entity";
import { getInventarioByEspacio, createInventario, deleteInventario } from "../../servicios/inventario_service";
import ConfirmDialog from "../../common/confirm_dialog/confirm_dialog";
import type EspacioEntity from "../../entities/espacio_entity";
import { getEspacios } from "../../servicios/espacios_service";

export default function InventarioPage() {
  const [inventarioPorEspacio, setInventarioPorEspacio] = useState<Record<number, InventarioEntity[]>>({});
  const [espacios, setEspacios] = useState<EspacioEntity[]>([]);
  const [showFormEspacio, setShowFormEspacio] = useState<number | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{ 
    message: string; 
    id?: number; 
    espacio_id?: number;
  } | null>(null);

  // Cargar espacios
  useEffect(() => {
    getEspacios()
      .then((esp) => setEspacios(esp))
      .catch((err) => console.error(err));
  }, []);

  // Cargar inventario por cada espacio
  useEffect(() => {
    espacios.forEach((esp) => {
      if (esp.espacio_id !== undefined) {
        getInventarioByEspacio(esp.espacio_id)
          .then((data) => {
            setInventarioPorEspacio((prev) => ({ ...prev, [esp.espacio_id!]: data }));
          })
          .catch((err) => console.error(err));
      }
    });
  }, [espacios]);

  // Crear nuevo inventario
  const handleCreate = async (espacioId: number, item: InventarioEntity) => {
    const nuevo = await createInventario(item);
    setInventarioPorEspacio((prev) => ({
      ...prev,
      [espacioId]: [...(prev[espacioId] || []), nuevo],
    }));
    setShowFormEspacio(null);
  };

  // Solicitar confirmación de borrado
  const handleDelete = (id: number, espacio_id?: number) => {
    if (espacio_id === undefined) return;
    setConfirmDialog({
      message: "¿Estás seguro de eliminar este elemento del inventario?",
      id,
      espacio_id,
    });
  };

  // Confirmar borrado
  const confirmDelete = async () => {
    if (!confirmDialog?.id || confirmDialog.espacio_id === undefined) return;

    const espacioId = confirmDialog.espacio_id;
    await deleteInventario(confirmDialog.id);

    setInventarioPorEspacio((prev) => ({
      ...prev,
      [espacioId]: prev[espacioId].filter((i) => i.inventario_id !== confirmDialog.id),
    }));

    setConfirmDialog(null);
  };

  return (
    <div className="relative">
      <Header />
      <div className="p-6">
        <h1 className="text-2xl font-bold text-morado mb-6">Inventario por Espacio</h1>

        {espacios
          .filter((esp) => esp.espacio_id !== undefined)
          .map((esp) => {
            const id = esp.espacio_id!;
            return (
              <div key={id} className="mb-8">
                <h2 className="text-xl font-semibold text-azul mb-2">{esp.nombre}</h2>

                <button
                  onClick={() => setShowFormEspacio(id)}
                  className="mb-2 bg-azul text-white px-4 py-2 rounded shadow"
                >
                  + Agregar elemento
                </button>

                <InventarioTable
                  data={inventarioPorEspacio[id] || []}
                  onDelete={(itemId) => handleDelete(itemId, id)}
                />

                {showFormEspacio === id && (
                  <InventarioForm
                    espacioId={id}
                    onSubmit={(item) => handleCreate(id, item)}
                    onCancel={() => setShowFormEspacio(null)}
                  />
                )}
              </div>
            );
          })}

        {confirmDialog && (
          <ConfirmDialog
            message={confirmDialog.message}
            onConfirm={confirmDelete}
            onCancel={() => setConfirmDialog(null)}
          />
        )}
      </div>
    </div>
  );
}


/* import { useState, useEffect } from "react";
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
 */