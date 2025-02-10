/**
 * src\components\Profile\handlers\handlerProfileFields.ts
 */
// import { CookieUser } from "@Services/cookieServices";
// import { Usermeta, UserAPI } from "@Interfaces";
// import { concat } from "lodash";
import React from "react";
import { EventHandler } from "react";
import task0 from "./taskNewInput";
import task1 from "./taskRemoveInput";
import task2ChangeDom from "./taskChangeDOM";
import { fetchLoginOut } from "@Services/request/loginout";
// interface StetusField{
//   status: "close" | "open";
// }
type Status = "close" | "open";
export function handlerProfileField(e: React.MouseEvent | KeyboardEvent) {
  const status: Status = "close";
  // CHECK .ENV
  const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL ? process.env.REACT_APP_SERVER_URL as string : "";
  if (!REACT_APP_SERVER_URL) {
    throw new Error("[handlerProfileField]: Mistake => THe REACT_APP_SERVER_URL can't found")
  };
  // CHECK the EVENT TYPE
  if ((e.type) && (!(e.type).toLowerCase().includes("click") && ((e as KeyboardEvent).key &&
    (e as KeyboardEvent).key !== 'Enter'))) {
    return false;
  }
  // CHECK the PLACE of EVENT
  const target = (e.target as HTMLElement);
  if (((e.type).toLowerCase().includes("click") && target && !((target as HTMLElement).parentElement as HTMLElement).dataset.status) || (
    (e.type).toLowerCase().includes("click") && ((target as HTMLElement).parentElement as HTMLElement).dataset.status &&
    ((target as HTMLElement).parentElement as HTMLElement).dataset.status !== "close" &&
    ((target as HTMLElement).parentElement as HTMLElement).dataset.status !== "open") &&
    ((e as KeyboardEvent).key.toLowerCase().includes("Enter") && !((target as HTMLElement).parentElement as HTMLElement).classList.contains("boxfield-data"))) {
    return false
  }
  /**
   *  After click on the the input field (checkbox type) we select the
   * parent DIV
   */
  let htmlDiv = ((target as HTMLElement).parentElement as HTMLElement).parentElement as HTMLDivElement;
  if (!htmlDiv || (htmlDiv && htmlDiv.className && htmlDiv.className !== null
    && !(htmlDiv.className).includes("boxfield"))) {
    throw new Error("[handlerProfileField]: Mistake => DIV.boxfield not found!")
  }

  // // TOTAL TASK lOOK what the PLACE of Event.
  // if ((e.type).toLowerCase().includes("click") && (target as HTMLInputElement).type !== "checkbox") {
  //   throw new Error("[handlerProfileFields.ts]: Mistake => 'INPUT.checkbox' not found!")
  // }
  // SELECT the HTMLElement
  const dataStatus = ((target as HTMLInputElement).parentElement as HTMLInputElement).dataset.status;
  if (dataStatus && dataStatus === "close" && (e.type).toLowerCase().includes("click")) {
    // TASK0
    task0(htmlDiv, handlerProfileField);
    htmlDiv.onclick = null;
    htmlDiv.onkeydown = handlerProfileField;
  } else if ((e as KeyboardEvent).key === 'Enter') {
    // TASK1
    const htmlDiv2 = ((target as HTMLElement).parentElement as HTMLElement).parentElement as HTMLDivElement;
    const resolve: boolean | [HTMLDivElement, string] = task1(htmlDiv2, handlerProfileField);

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
    // const response = await
    fetchLoginOut(body)
      .then(respone => {
        if (respone.ok) {
          htmlDiv.innerHTML = newtext;
        }
      });
    htmlDiv.onkeydown = null;
    (htmlDiv as HTMLDivElement).onclick = handlerProfileField;

    // CHANGING THE:
    // - inser the new contant of the input field of the text type
  }

  task2ChangeDom(htmlDiv);


};

