// App.tsx
import { Routes, Route } from "react-router-dom";
import Login from "./common/login";

import Usuarios from "./admin/pages/usuarios_page";
import Solicitudes from "./admin/pages/solicitudes_page";
import Espacios from "./admin/pages/espacios_page";
import Inventario from "./admin/pages/inventario_page";
import Periodos from "./admin/pages/periodos_page";
import Reportes from "./admin/pages/reportes_page";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/solicitudes" element={<Solicitudes/>} />
      <Route path="/espacios" element={<Espacios/>} />
      <Route path="/usuarios" element={<Usuarios/>} />
      <Route path="/inventario" element={<Inventario/>} />
      <Route path="/periodos" element={<Periodos/>} />
      <Route path="/reportes" element={<Reportes/>} />
      {/*<Route path="/materias" element={<Materias/>} /> */}
    </Routes>
  );
}
