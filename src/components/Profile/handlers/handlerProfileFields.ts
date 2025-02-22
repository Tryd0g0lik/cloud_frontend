/**
 * src\components\Profile\handlers\handlerProfileFields.ts
 */
import insertNewInputTask0 from "./taskNewInput";
import removeInputTask1 from "./taskRemoveInput";
import changeDomTask2 from "./taskChangeDOM";
import { fetchLoginOut } from "@Services/request/loginout";
const map = new Map();

/**
 * This function is a hendler:
 * - fileds from the Profile page. \
 * These fields is containe information about user (name, surname, email, password,).\
 * Inside this fields (handlerProfileField we have the sub-function) we can updpdate the content.\
 * @param e :  MouseEvent | KeyboardEvent
 * @returns
 */
export function handlerOlderProfile(e: MouseEvent | KeyboardEvent): boolean {
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

  // SELECT the HTMLElement
  const dataStatus = ((target as HTMLInputElement).parentElement as HTMLInputElement).dataset.status;
  if ((dataStatus && dataStatus === "close" || "open") && (e.type).toLowerCase().includes("click")) {
    // TASK0 - CREATE  INPUT field and INSER of the TEXT TYPE
    insertNewInputTask0(htmlDiv);
  } else if ((e as KeyboardEvent).key === 'Enter') {
    // TASK1 update the content to the Profile page.
    const htmlDiv2 = ((target as HTMLElement).parentElement as HTMLElement).parentElement as HTMLDivElement;
    // TASK1 - REMOVE the INPUT field of the TEXT TYPE
    const resolve: boolean | [HTMLDivElement, string] = removeInputTask1(htmlDiv2, map);

    // Simple CHECKS the data
    if (!resolve && (typeof resolve === "boolean")) {
      throw new Error("[handlerProfileFields.ts::task2]: Mistake => resolve not found!")
    }
    // GET ID FROM THE URL BY EVENTS OF ADMIN
    let index__s: string | null = null;
    const stringArr = (window.location.pathname as string).split("/");
    index__s = ((window.location.pathname).includes("admins/to")) && (/[0-9]+/.test(stringArr[stringArr.length - 2])) ? stringArr[stringArr.length - 2] : null;
    const bodyArray = Array.from(map.entries());
    const bodyObj: Record<string, string> = {};
    bodyArray.forEach(arr => {
      bodyObj[`${arr[0]}`] = arr[1];
    });
    const body = JSON.stringify(bodyObj);
    // TASK3 - SEND the NEW TEXT to the server. This from the inpute (type text) field.
    fetchLoginOut(body, index__s?.trim())
      .then(respone => {
        if (respone.ok) {
          const newtext = respone.json().catch(err => {
            console.error(new Error(`[handlerProfileFields.ts]: Mistake => ${err.statck}`));
          })
          return newtext;
        }
      })
      .then(result => {
        // 'result' this is the object FROM THE SERVER.
        // GET THE NAME of FIELD (Element.dataset.< this name >)
        const nameField = htmlDiv.dataset.name;
        // SELECTS a FIELD for updating of content.
        const htmlDivContent = htmlDiv.querySelector(".boxfield-data");
        if (!htmlDivContent && !nameField) {
          throw new Error("[handlerProfileFields]: Mistake => 'DIV.boxfield-data' not found!")
        }
        // UPDATE the CONTENT
        (htmlDivContent as HTMLDivElement).innerHTML = result[nameField as string];
      }).catch(err => {
        console.error(new Error(`[handlerProfileFields.ts]: Response from the server.  Mistake => ${err.stack}`));

      });
  }
  // TASK2
  changeDomTask2(htmlDiv);

  return false;
};

