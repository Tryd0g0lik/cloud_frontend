/* src\components\Profile\handlers\taskNewInput.ts
      * Pressed to the checkbox from user's the profile page.
      * If this was:
      * - a first click on the input field (checkbox type),
      * means that User want to redact (one of more) the field. Run the TASK0
      * - if the not first click on the input field (checkbox type), means that
      * user changed the text in field. Run the TASK1.
      */
import React from "react";
// TASK0 - CREATE  INPUT field and INSER of the TEXT TYPE
 const task0 = async (htmlDiv: HTMLDivElement, handler: CallableFunction) => {
   if (!htmlDiv || !(htmlDiv.className).includes("boxfield")) {
     throw new Error("[boxfieldDataHtml::task0]: Mistake => 'htmlDiv' not found!");
   };
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

   // let boxfieldDataHtml = htmlDiv.querySelector(".boxfield");
   //  if (!boxfieldDataHtml) {
   //    throw new Error("[boxfieldDataHtml::task0]: Mistake => DIV.boxfield not found!")
   //  };
  // INSERTS 'onclick' for the input field of the text type/

   const boxfieldDataHtml = htmlDiv.querySelector(".boxfield-data");
  if (!boxfieldDataHtml) {
    throw new Error("[boxfieldDataHtml]: Mistake => DIV.boxfield-data not found!")
  };

  const oldText = (boxfieldDataHtml as HTMLDivElement).textContent;
   boxfieldDataHtml.innerHTML = `${getHtmlElement(oldText)}`;
   //  htmlDiv.onclick = null;
   //  htmlDiv.onkeydown = (e: KeyboardEvent) => handler(e);
};
export default task0;
