/**
 * src\App.tsx
 */
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PagesFC } from "./components/Routers";
const root = document.getElementById("root")

if (!root) {
  throw new Error("Id 'root' from DOM not was found!")
}
createRoot(root).render(
  <StrictMode> 
    <PagesFC />
  </StrictMode>

)

