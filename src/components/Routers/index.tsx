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
import { FilesdFC } from "src/components/Files";
import { MainPageFC } from "../MainPage";
import { LocalRef, UserAPI } from "@Interfaces";

const HeaderToMain = { maintitle: "Главная" };
const HeaderToRegistration = { maintitle: "Регистрация" };
const HeaderLoginLogout = { maintitle: "Авторизация" };
const cloud = { maintitle: "Облако" };

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainPageFC {...HeaderToMain} />
  },
  {
    path: LocalRef.REGISTRATION,
    element: <RegistrationFormFC {...HeaderToRegistration} />
  },
  {
    path: LocalRef.ACTIVATION,
    element: <LoginLogoutFC {...HeaderLoginLogout} />
  },
  {
    path: LocalRef.PROFILE_FILE_USER_PK,
    element: <ProfileFC />,
    // loader: async () => {
    //   if (userId) {
    //     const coockie = new CookieUser();
    //     const userId = coockie.getOneCookie("index")
    //     return <Navigate to={`profile/${userId}/`} />
    //   }
    //   return <Navigate to="/" />
    // }
  },
  {
    path: LocalRef.ADMIN_TO_PROFILE_USER_PK,
    element: <ProfileFC />,
  },
  {
    path: LocalRef.PROFILE_USER_PK,
    element: <FilesdFC {...cloud} />,
  },
  {
    path: LocalRef.ADMIN_TO_PROFILE_USER_PK,
    element: <FilesdFC {...cloud} />,
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
{/* < login: work801@mail.ru />
  <Passwor> 3!p~TT{:(Cdx/eBf  </Passwor> */ }
