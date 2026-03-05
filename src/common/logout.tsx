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
        await new Promise(resolve => setTimeout(resolve, 100));
        throw new Error(data.message || "Error al cerrar sesión");
      }     
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err)
      } else {
        console.log("Error desconocido al cerrar sesión");
      }
    }
              window.location.reload();
  }
