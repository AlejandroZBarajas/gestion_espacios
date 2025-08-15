// App.tsx
import { Routes, Route } from "react-router-dom";
import Login from "./common/login";

import Usuarios from "./admin/pages/usuarios";
import Solicitudes from "./admin/pages/solicitudes";
import Espacios from "./admin/pages/espacios";
import Inventario from "./admin/pages/inventario";
import Periodos from "./admin/pages/periodos";
import Reportes from "./admin/pages/reportes";

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
    </Routes>
  );
}
