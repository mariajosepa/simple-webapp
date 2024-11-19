import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom'
import ErrorPage from './pages/ErrorPage.jsx'
import Login from './pages/Login.jsx'
import Inventario from './pages/Inventario.jsx'
import Reservas from './pages/Reservas.jsx'
import Historial from './pages/Historial.jsx'
import Monitoreo from './pages/Monitoreo.jsx'
import Grabaciones from './pages/Grabaciones.jsx'
import Admin from './pages/Administracion.jsx'
import Ayuda from './pages/Ayuda.jsx'
import Autenticacion from './pages/Autenticacion.jsx'
import Recuperacion from './pages/Recuperación.jsx'

import './index.css'
import Layout from './components/Layout/Layout.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/autenticacion',
    element: <Autenticacion />,
  },
  {
    path: '/recuperacion',
    element: <Recuperacion />,
  },
  {
    path: '/',
    element: <Layout/>, // Wrap pages with Layout
    children: [
      {
        path: 'inventario',
        element: <Inventario />,
      },
      {
        path: 'reservas',
        element: <Reservas />,
      },
      {
        path: 'historial',
        element: <Historial />,
      },
      {
        path: 'monitoreo',
        element: <Monitoreo />,
      },
      {
        path: 'grabaciones',
        element: <Grabaciones />,
      },
      {
        path: 'admin',
        element: <Admin />,
      },
      {
        path: 'ayuda',
        element: <Ayuda />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
