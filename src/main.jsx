import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// React router import
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Layout from './component/Layout/Layout.jsx';
import Home from './component/Home/Home.jsx';
import Login from './component/Login/Login.jsx';
import Register from './component/Register/Register.jsx';
import HeroRegister from './component/HeroRegister/HeroRegister.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children:[
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/heroRegister",
        element: <HeroRegister></HeroRegister>
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
