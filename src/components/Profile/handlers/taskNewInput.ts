/* src\components\Profile\handlers\taskNewInput.ts
  * This is a sub-task of the handlerProfileFields.ts
  * - After the Event 'click' on the input field (of type checkbox) .beginning to the chacge DOM.
  *
  * Pressed to the checkbox from user's the profile page.
  * If was Event 'click':
  * - click on the input field (checkbox type), and 'dataset.status' has value "close"
  * means that User want to redact (one of more) content of field. Run the TASK0.
  * - if 'dataset.status' has value "open", means that
  * user not changed. Run the TASK0 - return the basis state of the field.
  * Note: The basis state of the field (checkbox type) will return after the Event 'keyboard' 'Enter'.
  * 'Enter' the runs the TASK2
  */
// TASK0 - CREATE  INPUT field and INSER of the TEXT TYPE
const insertNewInputTask0 = async (htmlDiv: HTMLDivElement) => {
   if (!htmlDiv || !(htmlDiv.className).includes("boxfield")) {
     throw new Error("[boxfieldDataHtml::task0]: Mistake => 'htmlDiv' not found!");
   };
  const boxfieldDataHtml = htmlDiv.querySelector(".boxfield-data");
  const nputHtml = htmlDiv.querySelector(".boxfield-input");
  if (!nputHtml) {
    const getHtmlElement = (oldText: string | null): HTMLElement | string => {
      const htmlInput = document.createElement("input");
      htmlInput.type = "text";
      htmlInput.className = "boxfield-input";
      if (oldText) {
        htmlInput.placeholder = oldText;
      }
      //  return htmlInput.innerHTML;
      return htmlInput.outerHTML;

    };

    if (!boxfieldDataHtml) {
      throw new Error("[boxfieldDataHtml::tosk0]: Mistake => DIV.boxfield-data not found!")
    };

    const oldText = (boxfieldDataHtml as HTMLDivElement).textContent;
    boxfieldDataHtml.innerHTML = `${getHtmlElement(oldText)}`;
  } else {
    const inputHtml = htmlDiv.querySelector(".boxfield-input");
    if (!inputHtml) {
      throw new Error("[boxfieldDataHtml::tosk0]: Mistake => DIV.boxfield-data not found!")
    };
    const oldContent = (inputHtml as HTMLInputElement).placeholder;
    (boxfieldDataHtml as HTMLDivElement).innerHTML = oldContent;
  }
   //  htmlDiv.onclick = null;
   //  htmlDiv.onkeydown = (e: KeyboardEvent) => handler(e);
};
export default insertNewInputTask0;
