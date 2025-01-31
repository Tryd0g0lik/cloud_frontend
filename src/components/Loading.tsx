import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { isVoidExpression } from "typescript";


export function HydrateFallback(): React.JSX.Element {
  return <div><span className="loading loading-spinner text-primary"></span></div>;
}

