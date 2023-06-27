import { Navigate, createBrowserRouter } from "react-router-dom";
import {
  Cliente,
  CuentaPorCobrar,
  CuentaPorPagar,
  DashBoard,
  Inventario,
  Proveedores,
  Proyecto,
  Reporte,
  Usuario,
  Home,
} from "../views";
import Login from "../page/Login";
import ErrorPages from "../page/ErrorPages";
import Layout from "../page/Layout";
<<<<<<< HEAD



const usuario = { rol: "admin" };
=======
import RequireLogin from "../utils/require-login";
import ProtectedRoute from "../components/protected-route/protected-route";
>>>>>>> 2cc2a7fd55a550a5a13ed328b3119d4a707eb73a

export const createRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RequireLogin />,
      errorElement: <ErrorPages />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/dashBoard",
          element: (
            <ProtectedRoute roles={["Administrador"]}>
              <DashBoard />
            </ProtectedRoute>
          ),
        },
        {
          path: "/control-usuarios",
          element: (
            <ProtectedRoute
              roles={["Administrador De Usuario", "Administrador"]}
            >
              <Usuario />
            </ProtectedRoute>
          ),
        },
        // Resto de las rutas con comprobaciones de acceso
      ],
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <ErrorPages />,
    },
  ]);

  return router;
};
