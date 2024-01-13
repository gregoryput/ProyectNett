import { createBrowserRouter } from "react-router-dom";
import {
  CuentaPorCobrar,
  DashBoard,
  Inventario,
  Proyecto,
  Reporte,
  Usuario,
  Home,
  Proveedores,
  DetailEmpleado,
  FormFacturacion,
  Clientes,
  FormularioOrdenesCompras,
} from "../views";
import CuentaPorPagar from "../views/ViewsCuentasPorPagar/CuentaPorPagar";
import Login from "../page/Login";
import ErrorPages from "../page/ErrorPages";
import RequireLogin from "../utils/require-login";
import ProtectedRoute from "./protected-route/protected-route";
import ConfiguracionPerfil from "../views/ViewUsuario/ConfiguracionPerfil";
import { Toaster } from "react-hot-toast";
import Empleado from "../views/ViewsEmpleado/Empleado";
import { FormConvertToInvoice } from "../views/ViewsCuentaPorCobrar";

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
          path: "/usuarios",
          element: (
            <ProtectedRoute
              roles={["Administrador De Usuario", "Administrador"]}
            >
              <Usuario />
            </ProtectedRoute>
          ),
        },
        {
          path: "/empleado",
          element: (
            <ProtectedRoute
              roles={["Administrador De Usuario", "Administrador"]}
            >
              <Empleado />
            </ProtectedRoute>
          ),
        },
        {
          path: "/empleado/:IdEmpleado",
          element: (
            <ProtectedRoute roles={["Administrador"]}>
              <DetailEmpleado />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cliente",
          element: (
            <ProtectedRoute roles={["Administrador"]}>
              <Clientes />
            </ProtectedRoute>
          ),
        },
        // {
        //   path: "/cliente/:clienteId",
        //   element: (
        //     <ProtectedRoute roles={["Administrador"]}>
        //       <DetailCliente />
        //     </ProtectedRoute>
        //   ),
        // },
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
          path: "/cuenta-por-paga/:ID",
          element: (
            <ProtectedRoute
              roles={["Administrador", "Asistente Administrativo"]}
            >
              <FormConvertToInvoice />
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
          path: "/inventario/form-OrdenCompra",
          element: (
            <ProtectedRoute
              roles={["Administrador", "Asistente Administrativo"]}
            >
              <FormularioOrdenesCompras />
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
        // {
        //   path: "/proveedores/:IdProveedor",
        //   element: (
        //     <ProtectedRoute roles={["Administrador"]}>
        //       <DetailProveedor />
        //     </ProtectedRoute>
        //   ),
        // },
        {
          path: "/proyecto",
          element: (
            <ProtectedRoute
              roles={["Administrador", "Asistente Administrativo", "Asistente"]}
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
