import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import SignUp from './Pages/SignUp';

const router= createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  // {
  //   path:"/logIn",
  //   element:<Login/>
  // },
  {
    path:"/signup",
    element:<SignUp/>
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

