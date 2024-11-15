import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom'
import ErrorPage from './pages/ErrorPage.jsx'
import Login from './pages/Login.jsx'

import './index.css'


const router = createBrowserRouter([

  {
    path: '/',
    element: <Navigate to="/login" />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
