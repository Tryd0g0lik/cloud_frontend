/**
 * src\components\MainPage\handlers\addListeners.ts
 */
import { CookieUser } from "@Services/cookieServices";
import { handlerAdminClickByCheckbox } from './habdlerAdminEventCheckbox';
import { handlerChoiseByOne } from './handlerChoiseByOneUser';
export function addListener() {
  // GET COOKIE
  const cookie = new CookieUser();
  if (!cookie.checkCoockie("is_staff")) {
    console.warn("[addListeners.ts::MainPageFC]: 'is_staff' not faound to the cookie");
    return false;
  }
  // CHECK COOKIE
  if (!cookie.getOneCookie("is_staff")) {
    // THIS IS USER IS NOT ADMIN
    return false;
  }

  /* ---- !!! THIS IS lISTENER EVENT FROM THE CLICK ONLY !!! CHECKBOX FROM THE TABLE  ---- */
  // CREAT EVENT LISTENER FOR CHECKBOX OF USERS FROM ADMIN INTERFACE
  const checkboxHTML = document.querySelector(".admin-reviews th input[type='checkbox']");
  if (!checkboxHTML) {
    console.log("[addListeners.ts::MainPageFC]: 'th checkbox' Not found in DOM!")
    return false;
  }
  // LISTENER THE ADMIN's EVENTS FOR CHECKBOX OF SELECTORS "TABLE TH INPUT"
  (checkboxHTML as HTMLElement).removeEventListener("click", handlerAdminClickByCheckbox);
  (checkboxHTML as HTMLElement).addEventListener("click", handlerAdminClickByCheckbox);

  // LISTENER THE ADMIN's EVENTS FOR CHECKBOX OF SELECTORS "TABLE TD INPUT"
  const tableHTMLArr = document.querySelectorAll(".admin-reviews tr td:first-of-type");
  if (tableHTMLArr.length === 0) {
    console.log("[addListeners.ts::MainPageFC]: 'th checkbox' Not found in DOM!")
    return false;
  }
  tableHTMLArr.forEach(item => {
    (item as HTMLTableElement).removeEventListener("click", handlerChoiseByOne);
    (item as HTMLTableElement).addEventListener("click", handlerChoiseByOne);
  });
}
