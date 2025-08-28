  const API_URL = import.meta.env.VITE_API_URL + "auth/logout";

  export const Logout = async () => {

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        credentials: "include", 
        headers: { "Content-Type": "application/json" },

      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error al iniciar sesión");
      }     
    } catch (err: unknown) {
      if (err instanceof Error) {
console.log(err)
      } else {
        console.log("Error desconocido al iniciar sesión");
      }
    }
  }
