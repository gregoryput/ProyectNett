import { createBrowserRouter } from "react-router-dom"
import { Cliente, CuentaPorCobrar, CuentaPorPagar, DashBoard, Inventario, Proveedores, Proyecto, Reporte, Usuario } from "../views"
import Login from "../page/Login"
import ErrorPages from "../page/ErrorPages";
import Layout from "../page/Layout";

export const router = createBrowserRouter([
    
    {
        path: "/",
        element: <Layout/>,
        errorElement: <ErrorPages />,
        children:[
            {
                index:true,
                path: "/",
                element: <DashBoard />,
            },
             {
                path: "proyecto",
                element: <Proyecto />,
            },
            {
                path: "invetario",
                element: <Inventario />,
            },
            {
                path: "cliente",
                element: <Cliente />,
            },
            {
                path: "proveedor",
                element: <Proveedores />,
            },
            {
                path: "cuentaPorCobrar",
                element: <CuentaPorCobrar />,
            },
            {
                path: "cuentaPorPagar",
                element: <CuentaPorPagar />,
            },
            {
                path: "usuario",
                element: <Usuario />,
            },
            {
                path: "reporte",
                element: <Reporte />,
            },
            

        ]
      },

    {
        path: "/login",
        element: <Login/>,
        errorElement: <ErrorPages />,
      },
  ]);