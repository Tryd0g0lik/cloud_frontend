/**
 * src\components\MainPage\handlers\handlerChoiseAllUsers.ts
 * @returns
 */

/**
 *
 * @param e MouseEvent BY CHECKBOX FROM EVENTS OF ADMIN's INTERFACE TO THE MAIN PAGE.
 * @returns
 */
export function handlerChoiseAllUser(e: MouseEvent) {
  const checkboxesArr = document.querySelectorAll("input[data-remove='remove']");
  const thCheckboxeHTML = (e.target as HTMLInputElement);


  if (checkboxesArr.length === 0 || !thCheckboxeHTML) {
    console.log("[handlerChoiseAllUsers::handlerChoiseAllFile]: Chackboxes of files not found!");
    return false;
  }
  checkboxesArr.forEach(item => {
    if (!thCheckboxeHTML.checked) {
      (item as HTMLInputElement).checked = false;
    } else {
      (item as HTMLInputElement).checked = true;
    }
  }
);

}
