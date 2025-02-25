/**
 * src\components\MainPage\handlers\habdlerAdminEventCheckbox.ts
 */
import { calculateCheckbox } from "./calculateTdCheckbox";
import { handlerChoiseAllUser } from "./handlerChoiseAllUsers";
import { logElementPositions } from "./hendlerButtomLocation";

export function handlerAdminClickByCheckbox(e: MouseEvent) {
  const { target, } = e;
  const { tagName } = target as HTMLElement; // Selector: "table th HTMLInputElement"
  if (tagName.toLowerCase() !== "input") {
    return false;
  }
  // GET CHANGED SIZE OF WINDOW
  logElementPositions();
  window.onresize = logElementPositions;

  // GET THE HTML OF DIV.DELETE (buttom for delete) FROM MAIN PAGE
  const divHTML = document.querySelector("div.delete");
  if (!divHTML) {
    console.warn("[habdlerAdminEventCheckbox.ts::handlerAdminClickByCheckbox]: 'div.delete' Not found in DOM!");
    return false;
  }
  // Selectors: "table td Array<HTMLInputElement>" Where "input.checked === true"!
  const calculateArr = calculateCheckbox();
  // Selector: "table td Array<HTMLInputElement>.length".
  // Here is a totale quantity of checkboxes from the selectors "td input" (not "th input") to the table !
  const calculateMaxNum = calculateCheckbox(true);
  // CHECNGE THE STYLE OF DIV.DELETE (buttom for delete)  FROM MAIN PAGE (ADMIN'S EVENTS)
  if ((divHTML as HTMLDivElement).style.display && (!calculateArr || calculateArr)) {
    if (
      (calculateArr && (calculateArr as Array<HTMLInputElement>).length === 0) && (
        ((target as HTMLInputElement).checked === true)
      )
    ) {
      if (
        (divHTML as HTMLDivElement).style.display.toLowerCase().includes("none")
      ) {
        (divHTML as HTMLDivElement).style.display = `block`;
      } else {
        (divHTML as HTMLDivElement).style.display = `none`;
      };
    }
    else if (
      calculateArr &&
      (calculateArr as Array<HTMLInputElement>).length > 0 &&
      (calculateArr as Array<HTMLInputElement>).length === (calculateMaxNum as number)
    ) {
      if ((divHTML as HTMLDivElement).style.display.toLowerCase().includes("block")) {
        (divHTML as HTMLDivElement).style.display = `none`;

      } else {
        (divHTML as HTMLDivElement).style.display = `block`;
      }
    }
    else if ((calculateArr) &&
      (calculateArr as Array<HTMLInputElement>).length > 0

    ) {
      if ((divHTML as HTMLDivElement).style.display.toLowerCase().includes("block")) {
        (divHTML as HTMLDivElement).style.display.toLowerCase().includes("block");
        if (
          ((target as HTMLInputElement).checked === true) &&
          (calculateArr as Array<HTMLInputElement>).length > 0) {
          (divHTML as HTMLDivElement).style.display = `block`;

        }
        else if (
          ((target as HTMLInputElement).checked !== true) &&
          (calculateArr as Array<HTMLInputElement>).length === 0) {
          (divHTML as HTMLDivElement).style.display = `none`;
        }
        else {
          (divHTML as HTMLDivElement).style.display = `none`;
        }
      };
    };
  }
  handlerChoiseAllUser(e);
};
