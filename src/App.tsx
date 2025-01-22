/**
 * src\App.tsx
 */
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PagesFC } from "./components/Routers";
import { store } from "./services/redux/store";
import { Provider } from "react-redux";
const root = document.getElementById("root")

if (!root) {
  throw new Error("Id 'root' from DOM not was found!")
}
createRoot(root).render(
  <StrictMode> 
    <Provider store={store}>
      <PagesFC />
    </Provider>
  </StrictMode>

)

