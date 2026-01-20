import { createContext,  useState, useEffect } from "react";
import type { ReactNode } from "react";
import { getCookie } from "./cookie";

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

// Exportar el contexto para useAuth
export { AuthContext };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData>(() => {
    // Inicializar el estado con los datos de las cookies al cargar
    return {
      id: getCookie("id") || undefined,
      nombre: getCookie("nombre") || undefined,
      email: getCookie("email") || undefined,
      rol: getCookie("rol"),
    };
  });

  // Actualizar el estado cuando cambien las cookies
  useEffect(() => {
    const interval = setInterval(() => {
      const rolActual = getCookie("rol");
      if (rolActual !== user.rol) {
        setUser({
          id: getCookie("id") || undefined,
          nombre: getCookie("nombre") || undefined,
          email: getCookie("email") || undefined,
          rol: rolActual,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [user.rol]);

  const logout = () => {
    setUser({
      id: undefined,
      nombre: undefined,
      email: undefined,
      rol: null,
    });
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