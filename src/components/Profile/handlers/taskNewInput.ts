/* src\components\Profile\handlers\taskNewInput.ts
      * Pressed to the checkbox from user's the profile page.
      * If this was:
      * - a first click on the input field (checkbox type),
      * means that User want to redact (one of more) the field. Run the TASK0
      * - if the not first click on the input field (checkbox type), means that
      * user changed the text in field. Run the TASK1.
      */
// TASK0 - CREATE  INPUT field and INSER of the TEXT TYPE
 const task0 = async (htmlDiv: HTMLDivElement, handler: CallableFunction) => {
  const getHtmlElement = async (oldText: string | null): Promise<HTMLElement> => {
    const htmlInput = document.createElement("input");
    htmlInput.type = "text";
    htmlInput.className = "boxfield-input";
    if (oldText) {
      htmlInput.placeholder = oldText;
    }
    return htmlInput;

  }
  let boxfieldDataHtml = htmlDiv.querySelector(".boxfield");
  // INSERTS 'onclick' for the input field of the text type/
   (boxfieldDataHtml as HTMLDivElement).onclick = (e: MouseEvent) => handler(e);
  boxfieldDataHtml = htmlDiv.querySelector(".boxfield-data");
  if (!boxfieldDataHtml) {
    throw new Error("[boxfieldDataHtml]: Mistake => DIV.boxfield-data not found!")
  };

  const oldText = (boxfieldDataHtml as HTMLDivElement).textContent;
  boxfieldDataHtml.innerHTML = `${await getHtmlElement(oldText)}`;

};
export default task0;
