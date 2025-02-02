/**
 * src\components\Loading.tsx
 */
import React from "react";

/**
 * Dispatches the loading spinner on page.
 * @returns JSX.Element - The page's content.
 */
export function HydrateFallback(): React.JSX.Element {
  return <div><span className="loading loading-spinner text-primary"></span></div>;
}

