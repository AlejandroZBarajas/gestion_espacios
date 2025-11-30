import type EspacioEntity from "../../entities/espacio_entity";

interface Props {
  espacio: EspacioEntity;
  onSolicitar: (espacio: EspacioEntity) => void;
}

export default function EspacioSolicitudCard({ espacio, onSolicitar }: Props) {

  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-morado mb-1">{espacio.nombre}</h2>
        <p className="text-gray-600">{espacio.tipo} </p>
        <p className="text-gray-600">Capacidad: {espacio.capacidad}</p>
        {espacio.descripcion && <p className="mt-2 text-gray-500">{espacio.descripcion}</p>}
      </div>
      <button
        onClick={() => onSolicitar(espacio)}
        className="bg-morado text-white py-2 px-4 rounded mt-4 hover:bg-morado-dark"
      >
        Solicitar
      </button>
    </div>
  );
}