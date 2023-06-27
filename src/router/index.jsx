import { createBrowserRouter } from "react-router-dom";
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
import RequireLogin from "../utils/require-login";
import ProtectedRoute from "../components/protected-route/protected-route";


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
        {
          path: "/cliente",
          element: (
            <ProtectedRoute roles={["Administrador"]}>
              <Cliente />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cuenta-por-cobrar",
          element: (
            <ProtectedRoute roles={["Administrador"]}>
              <CuentaPorCobrar />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cuenta-por-pagar",
          element: (
            <ProtectedRoute roles={["Administrador"]}>
              <CuentaPorPagar />
            </ProtectedRoute>
          ),
        },
        {
          path: "/inventario",
          element: (
            <ProtectedRoute roles={["Administrador"]}>
              <Inventario />
            </ProtectedRoute>
          ),
        },
        {
          path: "/proveedores",
          element: (
            <ProtectedRoute roles={["Administrador"]}>
              <Proveedores />
            </ProtectedRoute>
          ),
        },
        {
          path: "/proyecto",
          element: (
            <ProtectedRoute roles={["Administrador"]}>
              <Proyecto />
            </ProtectedRoute>
          ),
        },
        {
          path: "/reporte",
          element: (
            <ProtectedRoute roles={["Administrador"]}>
              <Reporte />
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