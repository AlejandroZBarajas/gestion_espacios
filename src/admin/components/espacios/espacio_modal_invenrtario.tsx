import type { EspacioInventarioEntity } from "../../../entities/espacio_entity";

interface Props {
  inventarios: EspacioInventarioEntity[];
  onClose: () => void;
}

export default function EspacioModalInventario({ inventarios, onClose }: Props) {
  // Cerrar al hacer click en el backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-morado">Inventario del Espacio</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 flex-1">
          {inventarios.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Sin inventario registrado</p>
          ) : (
            <div className="flex flex-col gap-4">
              {inventarios.map((item) => (
                <div
                  key={item.espacio_inventario_id}
                  className="border border-gray-300 p-4 rounded-lg hover:shadow-md transition-shadow"
                >
                  {/* ID Relación */}
                  <p className="text-xs text-gray-400 mb-2">
                    ID Espacio-Inventario: {item.espacio_inventario_id}
                  </p>

                  {/* Título del elemento */}
                  <p className="font-semibold text-morado mb-3 text-lg">
                    {item.inventario.catalogo_elemento.nombre_elemento}
                  </p>

                  {/* Datos del Inventario */}
                  <div className="bg-gray-50 p-3 rounded mb-3">
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">
                      Datos del Inventario (ID: {item.inventario.inventario_id})
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p>
                        <strong>Cantidad:</strong> {item.inventario.cantidad}
                      </p>
                      <p>
                        <strong>Estado:</strong> {item.inventario.estado}
                      </p>
                      <p>
                        <strong>Marca:</strong> {item.inventario.marca || "N/A"}
                      </p>
                      <p>
                        <strong>Modelo:</strong> {item.inventario.modelo || "N/A"}
                      </p>
                      <p className="col-span-2">
                        <strong>Patrimonio:</strong> {item.inventario.patrimonio || "N/A"}
                      </p>
                    </div>
                    {item.inventario.observaciones && (
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>Observaciones:</strong> {item.inventario.observaciones}
                      </p>
                    )}
                  </div>

                  {/* Datos del Catálogo */}
                  <div className="bg-blue-50 p-3 rounded">
                    <h4 className="font-semibold text-sm text-gray-700 mb-2">
                      Datos del Catálogo (ID: {item.inventario.catalogo_elemento.catalogo_id})
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p>
                        <strong>Elemento:</strong>{" "}
                        {item.inventario.catalogo_elemento.nombre_elemento}
                      </p>
                      <p>
                        <strong>Tipo:</strong> {item.inventario.catalogo_elemento.tipo}
                      </p>
                      <p className="col-span-2">
                        <strong>Fecha Creación:</strong>{" "}
                        {new Date(
                          item.inventario.catalogo_elemento.fecha_creacion
                        ).toLocaleDateString("es-MX", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    {item.inventario.catalogo_elemento.descripcion && (
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>Descripción:</strong>{" "}
                        {item.inventario.catalogo_elemento.descripcion}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={onClose}
            className="w-full bg-morado text-white py-2 px-4 rounded hover:bg-opacity-90 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}