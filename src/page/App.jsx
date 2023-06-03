import Login from "./Login"
//import Menu from "../layout/Menu"
import { Routes, Route } from "react-router-dom"
import Layout from "./Layout"
import ErrorPages from "./ErrorPages"
import { Cliente, CuentaPorCobrar, CuentaPorPagar, DashBoard, Proveedores, Proyecto, Reporte, Usuario } from "../views"


function App() {

  return (
    <Routes>

      {/* Rutas publica */}
      <Route path="/" element={<Login/>}/>

      {/* Rutas protegidas */}
       <Route path="/app" element={<Layout/>}>
        
        <Route path="dashboard" element={<DashBoard/>} />
        <Route path="proyecto" element={<Proyecto/>} />
        <Route path="cliente" element={<Cliente/>} />
        <Route path="proveedor" element={<Proveedores/>} />
        <Route path="cuentaPorCobrar" element={<CuentaPorCobrar/>} />
        <Route path="cuentaPorPagar" element={<CuentaPorPagar/>} />
        <Route path="usuario" element={<Usuario/>} />
        <Route path="reporte" element={<Reporte/>} />
       
       </Route>

       <Route path="*" element={<ErrorPages/>}/>
    </Routes>
  )
}

export default App
