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
  const urlSeparat = window.location.href.split("profile")
  if (urlSeparat.length < 2) {
    throw new Error("[task0RequsetFiles::task0]:  Mistake => The local url from the local page not founded!");
  }
  const url = new URL("/api/v1/files/", `${urlSeparat[0]}}`);
  url.port = "8000";
  fetch(url, {
    method: HttpMethods.GET,
    credentials: "include",
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
export default task0;
