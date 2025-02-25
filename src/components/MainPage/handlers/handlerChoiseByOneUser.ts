/**
 * src\components\MainPage\handlers\handlerChoiseByOneUser.ts
 * @returns
 */

import { calculateCheckbox } from "./calculateTdCheckbox";
import { logElementPositions } from "./hendlerButtomLocation";

/**
 *
 * @param e MouseEvent BY CHECKBOX FROM EVENTS OF ADMIN's INTERFACE TO THE MAIN PAGE.
 * @returns
 */
export function handlerChoiseByOne(e: MouseEvent) {
  const {target} = e;
  // const {}
  // CREAT  LISTENER pf EVENTD FOR CHECKBOX TO THE TD ELEMENT (ADMIN INTERFACE)
logElementPositions();
  // const checkboxesArr = document.querySelectorAll(".admin-reviews td input[type='checkbox']");
  // const thCheckboxeHTML = (e.target as HTMLInputElement)
  // GET THE HTML OF DIV.DELETE (buttom for delete ) FROM MAIN PAGE
  const divHTML = document.querySelector("div.delete");
  if (!divHTML) {
    console.warn("[handlerChoiseByOneUser.ts::handlerChoiseByOne]: 'div.delete' Not found in DOM!");
    return false;
  }

  // if (checkboxesArr.length === 0) {
  //   console.log("[handlerChoiseByOneUser.ts::handlerChoiseByOne]: Chackboxes of files not found!")
  //   return false;
  // }

  // CHECNGE THE STYLE OF DIV.DELETE (buttom for delete ) (buttom of delete ) FROM MAIN PAGE (ADMIN'S EVENTS)
  const calculate = calculateCheckbox();

  if (calculate && (calculate as Array<HTMLInputElement>).length === 0) {
    (divHTML as HTMLDivElement).style.display = `none`;
  } else if (calculate){
    (divHTML as HTMLDivElement).style.display = `block`;
  }



}
