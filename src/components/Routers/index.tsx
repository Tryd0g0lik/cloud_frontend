import React from "react";
import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Pages } from "src/interfaces";
import { HomePageFC } from "src/components/HomePage";
// import { NavFC } from "src/components/NavPages";
import { NavbarTopFC } from "src/components/NavbarTop"
const Router = createBrowserRouter([
  {
    path: Pages.Home,
    element: <NavbarTopFC />
  }

],
  {
    future: {
      v7_relativeSplatPath: true,

    },
  })

export function PagesFC() {
  return <RouterProvider future={{
    v7_startTransition: true,
  }} router={Router} />
}
