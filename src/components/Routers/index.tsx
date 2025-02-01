/***
 * src\components\Routers\index.tsx
 */
import React from "react";
// import { Provider } from "react-redux";
// import { store } from "src/services/redux/store";
import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import { RegistrationFormFC } from "src/components/RegistrationPage";
import { LoginLogoutFC } from "src/components/LoginLogout";
import { NavbarTopFC } from "src/components/NavbarTop";
import { ProfileFC } from "src/components/Profile";


import { Usermeta, UserLevel } from "@Interfaces";
const HeaderToMain = { maintitle: "Главная" };
const HeaderToRegistration = { maintitle: "Регистрация" };
const HeaderLoginLogout = { maintitle: "Авторизация" };

// const userMeta: Usermeta = {
//   username: "NULL",
//   firstname: "NULL",
//   lastname: "NULL",
//   email: "NULL",
//   userlevel: UserLevel.PASSANGER,
//   password: false,
// }
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
  },
  {
    path: "profile/",
    element: <ProfileFC />
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
