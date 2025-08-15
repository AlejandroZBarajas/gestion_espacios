// src/App.jsx
export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          ¡Tailwind está funcionando! 🎉
        </h1>
        <p className="text-gray-700 mb-6">
          Si ves este texto con estilos bonitos, TailwindCSS está listo.
        </p>
        <div className="flex gap-4 justify-center">
          <div className="bg-green-500 text-white px-4 py-2 rounded-lg">Botón 1</div>
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg">Botón 2</div>
        </div>
      </div>
    </div>
  );
}

