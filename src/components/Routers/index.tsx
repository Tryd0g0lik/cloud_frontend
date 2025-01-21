import React from "react";
import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Pages } from "src/interfaces";
import { HomePageFC } from "src/components/HomePage";
import { NavFC } from "src/components/NavPages";
const Router = createBrowserRouter([
  {
    path: Pages.Home,
    element: <NavFC />
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
