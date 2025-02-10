/**
 * src\components\Profile\handlers\handlerProfileFields.ts
 */
// import { CookieUser } from "@Services/cookieServices";
// import { Usermeta, UserAPI } from "@Interfaces";
// import { concat } from "lodash";
import task0 from "./taskNewInput";
import task1 from "./taskREmoveInput";
import { fetchLoginOut } from "@Services/request/loginout";
// interface StetusField{
//   status: "close" | "open";
// }
type Status = "close" | "open";
export async function handlerProfileField(e: MouseEvent) {
  const status: Status = "close";

  const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL ? process.env.REACT_APP_SERVER_URL as string : "";
  if (!REACT_APP_SERVER_URL) {
    throw new Error("[handlerProfileField]: Mistake => THe REACT_APP_SERVER_URL can't found")
  };
  if ((e.type) && (!(e.type).toLowerCase().includes("click"))) {
    return false;
  }
  const target = (e.target as HTMLElement);

  if (target && (!((target as HTMLElement).parentElement as HTMLElement).dataset.status) || (
    ((target as HTMLElement).parentElement as HTMLElement).dataset.status &&
    target.dataset.status !== "close" &&
    target.dataset.status !== "open")) {
    return false
  }
  e.preventDefault()


    /**
     *  After click on the the input field (checkbox type) we select the
     * parent DIV
     */
  const htmlDiv = ((target as HTMLElement).parentElement as HTMLElement).parentElement as HTMLDivElement;
  if (!htmlDiv || (htmlDiv && htmlDiv.className && htmlDiv.className !== null
    && !("boxfield").includes(htmlDiv.className as string))) {
    throw new Error("[handlerProfileField]: Mistake => DIV.boxfield not found!")
  }

  // TOTAL task lOOK what the PLACE of Event.
  if ((target as HTMLInputElement).type === "checkbox") {
    task0(htmlDiv, handlerProfileField);
    return true;
  } else {
    //@ts-ignore
    const resolve: boolean | [HTMLDivElement, string] = await task1(htmlDiv, handlerProfileField);

    // Simple CHECKS the data
    if (!resolve && (typeof resolve === "boolean")) {
      throw new Error("[handlerProfileFields.ts::task2]: Mistake => resolve not found!")
    }
    // now it contains the loader animation.
    const htmlDiv = (resolve as [HTMLDivElement, string])[0];
    // get new text from the input field of the text type
    const newtext = (resolve as [HTMLDivElement, string])[1]
    if (!htmlDiv || !newtext) {
      throw new Error("[handlerProfileFields.ts::task2]: Mistake => 'htmlDiv' or 'newtect' not found!")
    }
    const body = JSON.stringify({ username: newtext });
    // SEND the NEW TEXT to the server. This from the inpute (type text) field.
    const response = await fetchLoginOut(body) //await fetch()

    // CHANGING THE:
    // - inser the new contant of the input field of the text type
  }
  // CHANGE THE STATUS 'open' to 'close' (to the input field)
  const htmlDivDataStatus = htmlDiv.querySelector("div[data-status]");
  if (!htmlDivDataStatus) {
    throw new Error("[handlerProfileField]: Mistake => DIV[data-status='close'] not found!")
  }
  const dataStatusValue = (htmlDivDataStatus as HTMLDivElement).dataset.status;
  if (dataStatusValue === "open") {
    (htmlDivDataStatus as HTMLDivElement).dataset.status = "close";
  } else {
    (htmlDivDataStatus as HTMLDivElement).dataset.status = "open";
  }

      return true;
};

