/**
 *
 * src\components\MainPage\handlers\hendlerButtomLocation.ts
 */
/**
 * Checnge the location/position of the DIV.ADDUSER element (buttom for user add).
 * It is necessary to get the height and width of the browser.
 * Next, is necessary to get the location of the checkbox.
 * And, change the location of the DIV.ADDUSER (buttom for user add) element.
 * @returns void
 */
export function logElementButtonAdd() {
  // ADD LISTENER FOR EVENTS OF RESIZE WINDOW.
  // We need to get the size of woindow brwser.
  const elementHTML = document.querySelector("table th input[type='checkbox']");
  const sectionHtml = document.querySelector("section.main-page");
  const divHTMLAdd = document.querySelector("div.adduser");
  if (!elementHTML || !divHTMLAdd || !sectionHtml ) {
    console.warn("[hendlerButtomLocation::logElementPositions]: HTMLElement Not found in DOM!")
    return false;
  }


  // GET SIZE OF BROWSERS
  const rectRemove = elementHTML.getBoundingClientRect();
  const widthBrowser = rectRemove.width;

  // GET LOCATION THE BUTTON ADD FROM <TH> ELEMENT TO THE BROWSER
  (divHTMLAdd as HTMLDivElement).style.top = `${sectionHtml.scrollHeight - (sectionHtml.scrollHeight - 224)}px`;
  (divHTMLAdd as HTMLDivElement).style.right = `${widthBrowser - (widthBrowser - widthBrowser) + 17 }px`;

}
