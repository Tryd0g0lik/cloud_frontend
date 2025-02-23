/**
 * src\components\MainPage\handlers\calculateTdCheckbox.ts
 */
/**
 *
 * @param quantity if true It's mean what will return the
 *  max number of checkboxs in the table (admin's interface)
 * @returns boolean (if checkboxs not was found)| number | Array<HTMLInputElement>
 */
export function calculateCheckbox(quantity = false) {
  const checkboxesArr = document.querySelectorAll(".admin-reviews td input[type='checkbox']");
  if (checkboxesArr.length === 0) {
    console.warn("[calculateTdCheckbox.ts::calculateCheckbox]: Chackboxes of files not found!")
    return false;
  }

  // CHECNGE THE STYLE OF DIV.DELETE FROM MAIN PAGE (ADMIN'S EVENTS)
  const resultArr = (Array.from(checkboxesArr)).filter(item => (item as HTMLInputElement).checked === true);
  if (quantity) {
    // GET THE MAX NUMBER OF CHECKBOXS IN THE TABLE (ADMIN'S INTERFACE)
    return Array.from(checkboxesArr).length;
  }
  return resultArr;
}
