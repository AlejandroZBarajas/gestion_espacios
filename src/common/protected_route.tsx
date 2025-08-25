import { Navigate } from "react-router-dom";

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[]; // ej. ["administrador"]
  userRole: string | null; // obtenido de cookies o contexto
}

export function RoleProtectedRoute({
  children,
  allowedRoles,
  userRole,
}: RoleProtectedRouteProps) {
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />; // redirige a login o página principal
  }

  return <>{children}</>;
}
