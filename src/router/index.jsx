import { Navigate, createBrowserRouter } from "react-router-dom"
import { Cliente, CuentaPorCobrar, CuentaPorPagar, DashBoard, Inventario, Proveedores, Proyecto, Reporte, Usuario } from "../views"
import Login from "../page/Login"
import ErrorPages from "../page/ErrorPages";
import Layout from "../page/Layout";



const usuario = { rol: "usuario" };

export const createRouter = () => {

  const roles = {
    admin: [
      "/", // Panel de control
      "/proyecto",
      "/inventario",
      "/cliente",
      "/proveedor",
      "/cuentaPorCobrar",
      "/cuentaPorPagar",
      "/usuario",
      "/reporte"
    ],
    usuario: [
      "/", // Panel de control
      "/proyecto",
      "/inventario",
      "/cliente",
      "/cuentaPorCobrar",
      "/cuentaPorPagar"
    ]
  };

  const tieneAcceso = (rol, ruta) => {
    const rutasPermitidas = roles[rol];
    return rutasPermitidas && rutasPermitidas.includes(ruta);
  };

  const PrivateRoute = ({ path, element }) => {
    const tienePermiso = tieneAcceso(usuario.rol, path);

    if (tienePermiso) {
      return element;
    } else {
      return <Navigate to="/Login" replace />;
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      errorElement: <ErrorPages />,
      children: [
        {
          index: true,
          path: "/",
          element: <PrivateRoute path="/" element={ <DashBoard />} />,

        },
        {
          path: "proyecto",
          element: <PrivateRoute path="/proyecto" element={<Proyecto />} />,
        },
        {
          path: "cliente",
          element: <PrivateRoute path="/cliente" element={<Cliente />} />,
        },
        {
            path: "proveedor",
            element: <PrivateRoute path="/proveedor" element={<Proveedores />} />,
        },
        {
          path: "inventario",
          element: <PrivateRoute path="/inventario" element={<Inventario />} />,
        },

        {
            path: "cuentaPorCobrar",
            element: <PrivateRoute path="/cuentaPorCobrar" element={<CuentaPorCobrar />} />,
          },

          {
            path: "cuentaPorPagar",
            element: <PrivateRoute path="/cuentaPorPagar" element={<CuentaPorPagar />} />,
          },
          {
            path: "usuario",
            element: <PrivateRoute path="/usuario" element={<Usuario />} />,
          },
          {
            path: "reporte",
            element: <PrivateRoute path="/reporte" element={<Reporte />} />,
          },
        // Resto de las rutas con comprobaciones de acceso
      ],
    },
    {
      path: "/login",
      element: <Login/>,
      errorElement: <ErrorPages />,
    }
  ]);

  return router;
};
