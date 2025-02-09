/**
 * src\components\Profile\handlers\handlerProfileFields.ts
 */
import { CookieUser } from "@Services/cookieServices";
import { Usermeta, UserAPI } from "@Interfaces";
import { concat } from "lodash";
// interface StetusField{
//   status: "close" | "open";
// }
type Status = "close" | "open";
export async function handlerProfileField(e: MouseEvent): Promise<boolean>{
  const status: Status = "close";

  const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL ? process.env.REACT_APP_SERVER_URL as string : "";
  if (!REACT_APP_SERVER_URL) {
    throw new Error("[handlerProfileField]: Mistake => THe REACT_APP_SERVER_URL can't found")
  };
  if ((e.type) && (!(e.type).toLowerCase().includes("click"))) {
    return false;
  }
  const target = (e.target as HTMLElement);

  if (target && (!target.dataset.status) || (target.dataset.status && target.dataset.status !== "close" && target.dataset.status !== "open") ){
    return false
  }
  e.preventDefault()
  const field = async () => {
    // Click on the input field (by checkbox type) for redact the text of the field.
    const htmlInput = target;
    if (!htmlInput || (htmlInput as HTMLInputElement).type !== 'checkbox') {
      throw new Error ("[handlerProfileField]: Mistake => The input field is not checkbox type!")
    }
    /**
     *  After click on the the input field (checkbox type) we select the
     * parent DIV
     */
    const htmlDiv = htmlInput.parentElement?.parentElement;
    if ((htmlDiv && htmlDiv.className
      && ("boxfield").includes(htmlDiv.className as string))){
      // TASK0 - INSER INPUT field of the TEXT TYPE
      const task0 = async () =>{
        const getHtmlElement = async (oldText: string|null): Promise<HTMLElement> => {
          const htmlInput = document.createElement("input");
          htmlInput.type = "text";
          htmlInput.className = "boxfield-input";
          if (oldText){
            htmlInput.placeholder = oldText;
          }
          return htmlInput;

        }
        const boxfieldDataHtml = htmlDiv.querySelector(".boxfield-data") as HTMLDivElement;
        if (!boxfieldDataHtml){
          throw new Error("[boxfieldDataHtml]: Mistake => DIV.boxfield-data not found!")
        };
        // INSER HENDLER for the input field of the text type/
        (boxfieldDataHtml as HTMLDivElement).onclick = (e: MouseEvent) => handlerProfileField(e);
        const oldText = (boxfieldDataHtml as HTMLDivElement).textContent;
        boxfieldDataHtml.innerHTML = `${await getHtmlElement(oldText)}`;

      };

      // TASK1 - REMOVE the INPUT field of the TEXT TYPE/
      const task1 = async () => {
        const boxfieldDataHtml = htmlDiv.querySelector(".boxfield-data") as HTMLDivElement;
        if (!boxfieldDataHtml){
          throw new Error("[boxfieldDataHtml]: Mistake => DIV.boxfield-data not found!")
        };
        const htmlInputText = boxfieldDataHtml.querySelector(".boxfield-input") as HTMLInputElement;
        if (!htmlInputText || htmlInputText.tagName.toLowerCase() !== 'input' || htmlInputText.type !== "text"){
          throw new Error("[htmlInputText]: Mistake => INPUT.boxfield-input not found!")
        };
        // get the new contant of the input field of the text type
        const newText = htmlInputText.value;
        if (newText){
          boxfieldDataHtml.innerHTML = '<span className="loading loading-spinner loading-xs"></span>';
          const response = await fetch()
          // boxfieldDataHtml.textContent = newText;
        };

        // boxfieldDataHtml.innerHTML = `${(boxfieldDataHtml as HTMLDivElement).textContent}`;
      }
      // TASK2 - TOTAL task
      const task2 = async () => {
        if ((htmlInput as HTMLInputElement).checked) {
          task0();
        } else {
          null
        }
      }

      // boxfieldDataHtml
      // INSER checked to the INPUT of the checkbox type
      return true;
  };
  status.replace(status, target.dataset.status === "close"? "open": "close");

  if (status === "open" as Status){
    null
  } else{
    null
  }

  // {/*defaultChecked */ } checked
return true;
}}
