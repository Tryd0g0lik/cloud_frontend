/**
* src\components\Profile\handlers\taskREmoveInput.ts
* This is a sub-task of the handlerProfileFields.ts
* - Remove the INPUT field of the TEXT TYPE. This is after Event 'Enter' from the input field.
*/
const removeInputTask1 = (htmlDiv: HTMLDivElement, maping: Map<string, string> ): [HTMLDivElement, string] | boolean => {

  if (!(htmlDiv.className).includes('boxfield')) {
    console.warn(Error("[boxfieldDataHtml::task1]: Mistake => 'Div.boxfield' not found!"));
    return false;
  }
  // Name of field from the Event;
  const nameOfField = htmlDiv.dataset.name;

  const boxfieldDataHtml = htmlDiv.querySelector(".boxfield-data") as HTMLDivElement;
  if (!boxfieldDataHtml) {
    console.warn(new Error("[boxfieldDataHtml::task1]: Mistake => DIV.boxfield not found!"));
    return false;
  };
  // SELECT THE INPUT field of type text
  const htmlInputText = boxfieldDataHtml.querySelector(".boxfield-input") as HTMLInputElement;
  if (!htmlInputText || htmlInputText.tagName.toLowerCase() !== 'input' || htmlInputText.type !== "text") {
    console.warn(new Error("[htmlInputText]: Mistake => INPUT.boxfield-input not found!"));
    return false;
  };
  // GET THE NEW CONTANT of the input field of the text type
  const newText = htmlInputText.value;
  if (!newText || (((newText as string).trim().length) == 0)) {
    return false;
  };
  maping.set(nameOfField as string, newText);
  boxfieldDataHtml.innerHTML = '<span className="loading loading-spinner loading-xs"></span>';
  return [boxfieldDataHtml, newText];
};
export default removeInputTask1;
