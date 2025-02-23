/**
 * src\components\MainPage\tasks\taskRunHandlersOfReview.ts
 */
import { handlerUserOfReview } from "../handlers/listenerForSectionHtml";
export const task = async () => new Promise(resolve => {
  const rootHTML = document.querySelector("#root");
  if (!rootHTML) {
    return false;
  }
  const mainPageHTML = rootHTML.querySelector("section.main-page");
  if (!mainPageHTML) {
    return false;
  }
  // LISTENER OF HANDLER FOR ADMIN INTERFACE
  (mainPageHTML as HTMLElement).removeEventListener("mousedown", handlerUserOfReview);
  (mainPageHTML as HTMLElement).addEventListener("mousedown", handlerUserOfReview);
  resolve(true);
});
