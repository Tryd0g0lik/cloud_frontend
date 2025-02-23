/**
 * src\components\Files\tasks\task0.ts
 */

import { HttpMethods } from "@Interfaces";
import { CookieUser } from "@Services/cookieServices";

/**
 * Here we make a request to the server. The server will be return a list of user's files.\
 * The cookie files be used in the request.
 * @param func - The function for the 'useState'.
 * @returns
 */
const task0 = (func: CallableFunction) => new Promise<void>(resolve => {
  const cookie = new CookieUser();
  if (!cookie.checkCoockie('index')) {
    throw new Error("[task0RequsetFiles::task0]:  Mistake => The key 'index' in cookie not found!");
  }
  const index = cookie.getOneCookie("index");
  const urlSeparat = window.location.href.split(".")
  if (urlSeparat.length < 2) {
    throw new Error("[task0RequsetFiles::task0]:  Mistake => The local url from the local page not founded!");
  }
  const url = new URL(":8000/api/v1/files/", `${urlSeparat[0]}.${urlSeparat[0]}`);
  fetch(url, {
    method: HttpMethods.GET,
    credentials: "include",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      // "Authorization": `Token `
    }
  })
    .catch((e) => {
      throw new Error(`[task0RequsetFiles::task0]:  Mistake => The request to the server \
can't found! ${e}`)
    })
    .then(response => {
      if (response.ok) {
        const result = response.json();
        return result;
      }
      return false
    })
    .then(result => {
      if (result) {
        func(result)
      }
      func([]);
      resolve();
    })


});
