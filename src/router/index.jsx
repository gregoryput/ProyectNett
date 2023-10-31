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
  Detail,
  FormFacturacion,
} from "../views";
import Login from "../page/Login";
import ErrorPages from "../page/ErrorPages";
import RequireLogin from "../utils/require-login";
import ProtectedRoute from "./protected-route/protected-route";
import ConfiguracionPerfil from "../views/ViewUsuario/ConfiguracionPerfil";
import { Toaster } from "react-hot-toast";

export const createRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <RequireLogin />
          <Toaster position="top-center" />
        </>
      ),
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
          path: "/cliente/:clienteId",
          element: (
            <ProtectedRoute roles={["Administrador"]}>
              <Detail />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cuenta-por-cobrar",
          element: (
            <ProtectedRoute
              roles={["Administrador", "Asistente Administrativo"]}
            >
              <CuentaPorCobrar />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cuenta-por-cobrar/form-facturacion",
          element: (
            <ProtectedRoute
              roles={["Administrador", "Asistente Administrativo"]}
            >
              <FormFacturacion />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cuenta-por-pagar",
          element: (
            <ProtectedRoute
              roles={["Administrador", "Asistente Administrativo"]}
            >
              <CuentaPorPagar />
            </ProtectedRoute>
          ),
        },
        {
          path: "/inventario",
          element: (
            <ProtectedRoute
              roles={["Administrador", "Asistente Administrativo"]}
            >
              <Inventario />
            </ProtectedRoute>
          ),
        },
        {
          path: "/proveedores",
          element: (
            <ProtectedRoute
              roles={["Administrador", "Asistente Administrativo"]}
            >
              <Proveedores />
            </ProtectedRoute>
          ),
        },
        {
          path: "/proyecto",
          element: (
            <ProtectedRoute
              roles={["Administrador", "Asistente Administrativo", "asistente"]}
            >
              <Proyecto />
            </ProtectedRoute>
          ),
        },
        {
          path: "/reporte",
          element: (
            <ProtectedRoute
              roles={["Administrador", "Administrador De Usuario"]}
            >
              <Reporte />
            </ProtectedRoute>
          ),
        },
        // Resto de las rutas con comprobaciones de acceso
        {
          path: "/Configuracion",
          element: (
            <ProtectedRoute
              roles={[
                "Administrador",
                "Asistente Administrativo",
                "Asistente",
                "Administrador De Usuario",
              ]}
            >
              <ConfiguracionPerfil />
            </ProtectedRoute>
          ),
        },
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
