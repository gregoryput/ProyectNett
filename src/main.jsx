import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider,} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { createRouter  } from './router/index';
import "./index.css"


// // Roles del usuario actual (puedes obtenerlos desde tu sistema de autenticación)
// const userRoles = ["admin"];

// // Crear las rutas basadas en los roles del usuario
const router = createRouter();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
  </React.StrictMode>,
)
