import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginEntrar from './Pages/LoginEntrar/LoginEntrar';
import Perfil from './Pages/Profile/Perfil';
import CadastroUsuario from './Pages/CadastroUsuario/CadastroUsuario';

import History from './Pages/History/Historico'


import NovoLogin from './Pages/NovoLogin/NovoLogin';

import PageDetalhes from './Pages/Detalhes/PageDetalhes';


const router = createBrowserRouter([{
  path: "/login",
  element: <NovoLogin />
},
{
  path: "/entrar",
  element: <LoginEntrar />
}, 
{
  path: "/",
  element: <App />
},
{
  path: "/perfil",
  element: <Perfil />
},
{
  path: "/historico",
  element: <History />
},
{
  path: "/cadastrousuario",
  element: <CadastroUsuario />
}, 
{
  path: "/detalhesimagem",
  element: <PageDetalhes />
}

])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
