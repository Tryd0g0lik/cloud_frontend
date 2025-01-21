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
])

export function PagesFC() {
  return <RouterProvider router={Router} />
}
