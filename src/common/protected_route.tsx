import { Navigate } from "react-router-dom";

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[]; 
  userRole: string | null; 
}

export function RoleProtectedRoute({
  children,
  allowedRoles,
  userRole,
}: RoleProtectedRouteProps) {
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />; 
  }

  return <>{children}</>;
}
