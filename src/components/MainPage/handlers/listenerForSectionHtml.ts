/**
 * src\components\MainPage\handlers\listenerForSectionHtml.ts
 */
import { LocalRef } from "@Interfaces";
// import { set_state } from "@Services/myRedux";
export async function handlerUserOfReview(e: MouseEvent) {
  const { type, target } = e;
  // CHECK TYPE OF EVENT
  if (!type || (
    type && type.toLowerCase() !== "mousedown".toLowerCase()
  )) {
    return;
  }
  // CHECCK PALCE OF EVENT
  const { localName } = target as HTMLElement;
  if (!localName || (
    type && type.toLowerCase() === "mousedown" && (
      localName && localName.toLowerCase() !== "td"
    ))
  ) {
    return;
  }
  // CHECK TARGET OF EVENT
  if (!(target as HTMLElement).dataset || (
    (target as HTMLElement).dataset && !(target as HTMLElement).dataset.name
  )) {
    return;
  }
  // CHOICE HTMLELEMENT
  const trHTML = (target as HTMLElement).parentElement;
  if (!trHTML || (trHTML && !trHTML.dataset) || (
    trHTML && trHTML.dataset && !trHTML.dataset.number
  )) {
    return;
  }
  // GET DATA OF HTML-ELement
  const userIdstr = trHTML.dataset.number as string;
  // set_state(userIdstr);
 // RELOCATION
  setTimeout(()=>{
    window.location.href = `${window.location.origin}${LocalRef.ADMIN_TO_FILE_USER_PK}`.replace(":pk", userIdstr);
}, 500);
}
