// src/App.jsx
export default function App() {
  return (
    <div className="flex flex-col h-screen bg-white  items-center  ">
      <div className="w-full flex flex-col justify-center items-center bg-morado items-center h-1/5">
        <h1 className="text-4xl font-black text-white mb-4 border-solid text-center">
          Gestión de espacios educativos
        </h1>
      </div>

    <div className="flex flex-1 w-full  justify-center items-center">
      
      <div className="flex flex-col justify-center bg-gris border-2 border-solid border-morado border-2 p-8 rounded-lg shadow-lg max-w-sm text-center h-3/5 max-w-1/4 min-w-[300px] justify-evenl">
        <h2 className="text-morado text-3xl font-bold m-2">E-mail</h2>
        <input type="email" className="border-2 border-solid border-morado bg-gris-clarito rounded-lg mb-4" />
        <h2 className="text-3xl text-morado font-bold m-2">Contraseña</h2>
        <input type="email" className="border-2 border-solid border-morado bg-gris-clarito rounded-lg mb-4" />
        <div className="bg-morado rounded-4xl">
          <h2 className="text-3xl text-white font-black p-2">Ingresar</h2>
        </div>
      </div>


      </div>
    </div>
  );
}

