// src\components\Profile\handlers\taskREmoveInput.ts
// TASK1 - REMOVE the INPUT field of the TEXT TYPE/
const task1 = (htmlDiv: HTMLDivElement, handler: CallableFunction ): [HTMLDivElement, string] | boolean => {

  if (!(htmlDiv.className).includes('boxfield')) {
    throw Error("[boxfieldDataHtml::task1]: Mistake => 'Div.boxfield' not found!");
  }


  const boxfieldDataHtml = htmlDiv.querySelector(".boxfield-data") as HTMLDivElement;
  if (!boxfieldDataHtml) {
    throw new Error("[boxfieldDataHtml::task1]: Mistake => DIV.boxfield not found!")
  };
  // SELECT THE INPUT field of type text
  const htmlInputText = boxfieldDataHtml.querySelector(".boxfield-input") as HTMLInputElement;
  if (!htmlInputText || htmlInputText.tagName.toLowerCase() !== 'input' || htmlInputText.type !== "text") {
    throw new Error("[htmlInputText]: Mistake => INPUT.boxfield-input not found!")
  };
  // GET THE NEW CONTANT of the input field of the text type
  const newText = htmlInputText.value;
  if (!newText || (((newText as string).trim().length) == 0)) {
    return false;
  };

  boxfieldDataHtml.innerHTML = '<span className="loading loading-spinner loading-xs"></span>';
  // ADD 'onclick'
  // htmlDiv.onkeydown = null;
  // htmlDiv.onclick = (e: MouseEvent) => handler(e);
  return [boxfieldDataHtml, newText];
}
export default task1;
