/***
 * src\components\Routers\index.tsx
 */
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RegistrationFormFC } from "src/components/RegistrationPage";
import { LoginLogoutFC } from "src/components/LoginLogout";
import { ProfileFC } from "src/components/Profile";
import { FilesdFC } from "src/components/Files";
import { MainPageFC } from "../MainPage";
import { LocalRef } from "@Interfaces";
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
    path: LocalRef.REGISTRATION_ADMIN,
    element: <RegistrationFormFC {...HeaderToRegistration} />
  },
  {
    path: LocalRef.ACTIVATION,
    element: <LoginLogoutFC {...HeaderLoginLogout} />
  },
  {
    path: LocalRef.PROFILE_FILE_USER_PK,
    element: <ProfileFC />,
  },
  {
    path: LocalRef.ADMIN_TO_PROFILE_USER_PK,
    // loader: state,
    element: <ProfileFC />,
  },
  {
    path: LocalRef.PROFILE_USER_PK,
    element: <FilesdFC {...cloud} />,
  },
  {
    path: LocalRef.ADMIN_TO_FILE_USER_PK,
    // loader: state,
    element: <FilesdFC {...cloud} />,
  }

],
  {
    future: {
      v7_relativeSplatPath: true,

    },
  }
);

export function PagesFC() {
  return <RouterProvider future={{
    v7_startTransition: true,
  }} router={Router} />;
};
