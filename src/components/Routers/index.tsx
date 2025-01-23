import React from "react";
// import { Provider } from "react-redux";
// import { store } from "src/services/redux/store";
import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Pages } from "src/interfaces";
import { RegistrationFormFC } from "src/components/RegistrationPage"
// import { NavFC } from "src/components/NavPages";
import { NavbarTopFC } from "src/components/NavbarTop";

const HeaderToMain = { maintitle: "Главная" }
const HeaderToRegistration = { maintitle: "Регистрация" }

const Router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarTopFC {...HeaderToMain} />
  },
  {
    path: "users/registration/",
    element: <RegistrationFormFC {...HeaderToRegistration} />
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
