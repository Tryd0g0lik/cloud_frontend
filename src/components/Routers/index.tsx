import React from "react";
import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Pages } from "src/interfaces";
import { HomePageFC } from "src/components/HomePage"

const Router = createBrowserRouter([
  {
    path: Pages.Home,
    element: <HomePageFC />
  }
])

export function PagesFC() {
  return <RouterProvider router={Router} />
}
