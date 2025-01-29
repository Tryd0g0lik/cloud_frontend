import React from "react";
// import { Provider } from "react-redux";
// import { store } from "src/services/redux/store";
import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Pages } from "src/interfaces";
import { RegistrationFormFC } from "src/components/RegistrationPage";
import { LoginLogoutFC } from "src/components/LoginLogout";
// import { NavFC } from "src/components/NavPages";
import { NavbarTopFC } from "src/components/NavbarTop";

const HeaderToMain = { maintitle: "Главная" };
const HeaderToRegistration = { maintitle: "Регистрация" };
const HeaderLoginLogout = { maintitle: "Авторизация" };
const Router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarTopFC {...HeaderToMain} />
  },
  {
    path: "users/registration/",
    element: <RegistrationFormFC {...HeaderToRegistration} />
  },
  {
    path: "users/login/",
    element: <LoginLogoutFC {...HeaderLoginLogout} />
  }

],
  {
    future: {
      v7_relativeSplatPath: true,

    },
  }
)

export function PagesFC() {
  return <RouterProvider future={{
    v7_startTransition: true,
  }} router={Router} />
}
{/* <Passwor> 3!p~TT{:(Cdx/eBf  </Passwor> */ }
