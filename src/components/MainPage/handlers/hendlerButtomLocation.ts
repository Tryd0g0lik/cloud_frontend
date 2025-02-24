/**
 *
 * src\components\MainPage\handlers\hendlerButtomLocation.ts
 */
/**
 * Checnge the location/position of the DIV.DELETE element (buttom for delete).
 * It is necessary to get the height and width of the browser.
 * Next, is necessary to get the location of the checkbox.
 * And, change the location of the DIV.DELETE (buttom for delete) element.
 * @returns void
 */
export function logElementPositions() {
  // ADD LISTENER FOR EVENTS OF RESIZE WINDOW.
  // We need to get the size of woindow brwser.
  const elementHTML = document.querySelector("table th input[type='checkbox']");
  const sectionHtml = document.querySelector("section.main-page");
  const divHTML = document.querySelector("div.delete");
  if (!elementHTML || !sectionHtml || !divHTML) {
    console.warn("[hendlerButtomLocation::logElementPositions]: HTMLElement Not found in DOM!")
    return false;
  }


  // GET SIZE OF BROWSERS
  const rect = elementHTML.getBoundingClientRect();
  const heightBrowser = rect.height;
  const widthBrowser = rect.width;
  // GET LOCATION THE BUTTON DELETE FROM <TH> ELEMENT TO THE BROWSER
  (divHTML as HTMLDivElement).style.top = `${sectionHtml.scrollHeight - (sectionHtml.scrollHeight - 224)}px`;
  (divHTML as HTMLDivElement).style.left = `${widthBrowser}px`;

}
