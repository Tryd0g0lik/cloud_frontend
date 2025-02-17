/**
 * src\components\Files\handlers\handlerChoiseAllFiles.ts
 * @returns
 */
import React from "react";
export function handlerChoiseAllFile(e: MouseEvent) {
  const checkboxesArr = document.querySelectorAll("input[data-name='checkbox_file']");
  const thCheckboxeHTML = (e.target as HTMLInputElement)


  if (checkboxesArr.length === 0 || !thCheckboxeHTML) {
    console.log("[handlerChoiseAllFiles::handlerChoiseAllFile]: Chackboxes of files not found!")
    return false;
  }
  // const checked = (item as HTMLInputElement).checked;

  checkboxesArr.forEach(item => {
    if (!thCheckboxeHTML.checked) {
      (item as HTMLInputElement).checked = false;
    } else {
    (item as HTMLInputElement).checked = true;
  }
});


}
