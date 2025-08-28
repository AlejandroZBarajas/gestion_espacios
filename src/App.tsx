import { Routes, Route } from "react-router-dom";
import Login from "./common/login";
import { getCookie } from "./common/cookie";
import { RoleProtectedRoute } from "./common/protected_route";

import Usuarios from "./admin/pages/usuarios_page";
import Solicitudes from "./admin/pages/solicitudes_page";

import InventarioPage from "./admin/pages/inventario_page";
import Periodos from "./admin/pages/periodos_page";
import Reportes from "./admin/pages/reportes_page";
import MateriasPage from "./admin/pages/materias_pages";
import EspaciosPage from "./admin/pages/espacios_page";
import VerEspaciosPage from "./docente/pages/ver_espacios_page";
import MisSolicitudesPage from "./docente/pages/mis_solicitudes_page";
import MisReportesPage from "./docente/pages/mis_reportes_page";


export default function App() {
  const userRole = getCookie("rol");
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/solicitudes" element={
        <RoleProtectedRoute allowedRoles={["administrador"]} userRole={userRole}>
          <Solicitudes />
        </RoleProtectedRoute>} />

      <Route path="/espacios" element={
        <RoleProtectedRoute allowedRoles={["administrador"]} userRole={userRole}>
          <EspaciosPage/>
        </RoleProtectedRoute>} />

      <Route path="/usuarios" element={
        <RoleProtectedRoute allowedRoles={["administrador"]} userRole={userRole}>
          <Usuarios />
      </RoleProtectedRoute>} />

      <Route path="/inventario" element={
        <RoleProtectedRoute allowedRoles={["administrador"]} userRole={userRole}>
          <InventarioPage/>
        </RoleProtectedRoute>} />

      <Route path="/periodos" element={
        <RoleProtectedRoute allowedRoles={["administrador"]} userRole={userRole}>
          <Periodos />
        </RoleProtectedRoute>} />

      <Route path="/reportes" element={
        <RoleProtectedRoute allowedRoles={["administrador"]} userRole={userRole}>
          <Reportes />
        </RoleProtectedRoute>} />

      <Route path="/materias" element={
        <RoleProtectedRoute allowedRoles={["administrador"]} userRole={userRole}>
          <MateriasPage />
        </RoleProtectedRoute>} />

      <Route path="/verespacios" element={
        <RoleProtectedRoute allowedRoles={["docente"]} userRole={userRole}>
          <VerEspaciosPage/>
        </RoleProtectedRoute>} />

      <Route path="/missolicitudes" element={
        <RoleProtectedRoute allowedRoles={["docente"]} userRole={userRole}>
          <MisSolicitudesPage />
        </RoleProtectedRoute>} />

      <Route path="/misreportes" element={
        <RoleProtectedRoute allowedRoles={["docente"]} userRole={userRole}>
          <MisReportesPage />
        </RoleProtectedRoute>} />

    </Routes>
  );
}
