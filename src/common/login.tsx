import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "./cookie";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");


  const API_URL = import.meta.env.VITE_API_URL + "auth/login";

  const handleLogin = async () => {
    setError("");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        credentials: "include", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contrasena }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error al iniciar sesión");
      }
      await new Promise(resolve => setTimeout(resolve, 100));
      const rol = getCookie("rol")
       if (rol === "administrador") {
        navigate("/usuarios");
      } else {
        navigate("/verespacios");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido al iniciar sesión");
      }
    }
  }

  return (
    <div className="flex flex-col h-screen bg-white items-center">
      <div className="w-full flex flex-col justify-center items-center bg-morado h-1/5">
        <h1 className="text-4xl font-black text-white mb-4 text-center">
          Gestión de espacios educativos
        </h1>
      </div>

      <div className="flex flex-1 w-full justify-center items-center">
        <div className="flex flex-col justify-center bg-gris border-2 border-solid border-morado p-8 rounded-lg shadow-lg max-w-sm text-center min-w-[300px]">
          <h2 className="text-morado text-3xl font-bold m-2">E-mail</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-solid border-morado bg-gris-clarito rounded-lg mb-4 p-2"
          />

          <h2 className="text-3xl text-morado font-bold m-2">Contraseña</h2>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="border-2 border-solid border-morado bg-gris-clarito rounded-lg mb-4 p-2"
          />

          {error && <p className="text-red-600 mb-2">{error}</p>}

          <button
            onClick={handleLogin}
            className="bg-morado text-white text-3xl font-black p-2 rounded-xl hover:bg-morado-dark"
          >
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
}
