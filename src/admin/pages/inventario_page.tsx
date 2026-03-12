import { useState, useEffect } from "react";
import Header from "../components/common/header";
import type InventarioEntity from "../../entities/inventario_entity";
import type EspacioEntity from "../../entities/espacio_entity";
import InventarioEspacioSection from "../components/inventario/inventario_espacio_section";
import ConfirmDialog from "../../common/confirm_dialog/confirm_dialog";
import { getEspacios } from "../../servicios/espacios_service";
import { getInventarioByEspacio, createInventario, deleteInventario } from "../../servicios/inventario_service";

export default function InventarioPage() {
  const [inventarioPorEspacio, setInventarioPorEspacio] = useState<Record<number, InventarioEntity[]>>({});
  const [espacios, setEspacios] = useState<EspacioEntity[]>([]);
  const [confirmDialog, setConfirmDialog] = useState<{
    message: string;
    id?: number;
    espacio_id?: number;
  } | null>(null);

  useEffect(() => {
    getEspacios()
      .then((esp) => setEspacios(esp))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    espacios.forEach((esp) => {
      if (esp.espacio_id !== undefined) {
        getInventarioByEspacio(esp.espacio_id)
          .then((data) => {
            console.log("data recibida : ", data);
            setInventarioPorEspacio((prev) => ({ ...prev, [esp.espacio_id!]: data }));
          })
          .catch((err) => console.error(err));
      }
    });
  }, [espacios]);

  const handleCreate = async (espacioId: number, item: InventarioEntity) => {
    const nuevo = await createInventario(item);
    setInventarioPorEspacio((prev) => ({
      ...prev,
      [espacioId]: [...(prev[espacioId] || []), nuevo],
    }));
  };

  // Eliminar inventario
  const handleDelete = (id: number, espacio_id: number) => {
    setConfirmDialog({
      message: "¿Estás seguro de eliminar este elemento del inventario?",
      id,
      espacio_id,
    });
  };

  // Editar inventario (vacío por ahora, manejado dentro de InventarioEspacioSection si es necesario)
  const handleEdit = () => {};

  // Confirmación de eliminación
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
          .map((esp) => (
            <InventarioEspacioSection
              key={esp.espacio_id}
              espacioId={esp.espacio_id!}
              espacioNombre={esp.nombre}
              data={inventarioPorEspacio[esp.espacio_id!] || []}
              onCreate={handleCreate}
              onDelete={(id) => handleDelete(id, esp.espacio_id!)}
              onEdit={handleEdit}
            />
          ))}

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
