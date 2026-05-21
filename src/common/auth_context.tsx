import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface UserData {
  id?: string;
  nombre?: string;
  email?: string;
  rol: string | null;
}

export interface AuthContextType {
  user: UserData;
  setUser: (user: UserData) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export function AuthProvider({ children }: { children: ReactNode }) {
  // 1. Inicializar el estado leyendo de localStorage en lugar de cookies
  const [user, setUserState] = useState<UserData>(() => {
    return {
      id: localStorage.getItem("auth_id") || undefined,
      nombre: localStorage.getItem("auth_nombre") || undefined,
      email: localStorage.getItem("auth_email") || undefined,
      rol: localStorage.getItem("auth_rol") || null,
    };
  });

  // 2. Interceptor personalizado para guardar en estado Y en localStorage a la vez
  const setUser = (newUser: UserData) => {
    setUserState(newUser);
    
    if (newUser.rol) {
      if (newUser.id) localStorage.setItem("auth_id", newUser.id);
      if (newUser.nombre) localStorage.setItem("auth_nombre", newUser.nombre);
      if (newUser.email) localStorage.setItem("auth_email", newUser.email);
      localStorage.setItem("auth_rol", newUser.rol);
    } else {
      // Si mandan un rol nulo, limpiamos todo
      limpiarLocalStorage();
    }
  };

  // 3. Monitorear cambios entre pestañas (Opcional pero recomendado en lugar del setInterval)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "auth_rol" && e.newValue !== user.rol) {
        setUserState({
          id: localStorage.getItem("auth_id") || undefined,
          nombre: localStorage.getItem("auth_nombre") || undefined,
          email: localStorage.getItem("auth_email") || undefined,
          rol: e.newValue,
        });
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [user.rol]);

  const limpiarLocalStorage = () => {
    localStorage.removeItem("auth_id");
    localStorage.removeItem("auth_nombre");
    localStorage.removeItem("auth_email");
    localStorage.removeItem("auth_rol");
  };

  const logout = () => {
    setUserState({
      id: undefined,
      nombre: undefined,
      email: undefined,
      rol: null,
    });
    
    limpiarLocalStorage();

    // Intentar borrar cookies del cliente (opcional)
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  };

  const isAuthenticated = user.rol !== null;

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}