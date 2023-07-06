import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider,} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { createRouter  } from './router/index';
import Modal from 'react-modal';


import "./index.css"

const router = createRouter();
// Configura la raíz del modal
Modal.setAppElement('#root');


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
  </React.StrictMode>,
)
