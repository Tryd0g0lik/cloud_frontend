/* src\components\Profile\handlers\taskNewInput.ts
  * Pressed to the checkbox from user's the profile page.
  * If this was:
  * - a first click on the input field (checkbox type),
  * means that User want to redact (one of more) the field. Run the TASK0
  * - if the not first click on the input field (checkbox type), means that
  * user changed the text in field. Run the TASK1.
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
