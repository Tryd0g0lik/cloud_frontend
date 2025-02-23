/**
 * src\services\request\profileloading.ts
 * The function for loading the user's information, from the server.
 */
import { CookieUser } from "@Services/cookieServices";
import { Usermeta, UserAPI } from "@Interfaces";

/**
 * By requesе with method the 'GET' and API '{{baseUrl}}/api/v1/users/choice/{pk}/' \
 * seтding the reques to the server.* \
 * Are waiting data of user.
 * @returns Usermeta - The user's information.
 */
export async function profileLoader(): Promise<Usermeta | {}> {
  // Get the url for request to the server
  const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL ? process.env.REACT_APP_SERVER_URL as string : "";
  if (!REACT_APP_SERVER_URL) {
    throw new Error("[profileLoader]: Mistake => THe REACT_APP_SERVER_URL can't found")
  }
  // Get the value from the cookie's key.
  const cookie = new CookieUser();
  if (!cookie.checkCoockie("index")) {
    throw new Error('[profileloading::profileLoader]: Mistake => The key "index" in cookie not found!');
  }
  const userId = cookie.getOneCookie("index");
  if (!userId) {

    throw new Error("[profileLoader]: Mistake => THe userId from the cookie can't found")

  };
  // STATE PROFILE TO THE PAGE
  let index__s: string | null = null;
  // GET ID FROM THE URL BY EVENTS OF ADMIN
  const stringArr = (window.location.pathname as string).split("/");
  index__s = ((window.location.pathname).includes("admins/to")) && (/[0-9]+/.test(stringArr[stringArr.length - 2])) ? stringArr[stringArr.length - 2] : null;
  // Create the url + the pathna  me of api for request to the server.
  const url = new URL(`${UserAPI.CHOICE_PK}`.replace(":userId/", `${index__s ? index__s : userId}`), `${REACT_APP_SERVER_URL}`,)
  const response = await fetch(url, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
    },
    credentials: "include" // Ceookie will be include to the request /
  })
  if (!response.ok) {
    throw new Error(`[profileLoader]: Mistake => Server returned status ${response.status}`);
  }
  // Get the user's information from the server.
  const userdata = await response.json();
  if (Object.keys(userdata).length === 0) {
    throw new Error("[profileLoader]: Mistake => User data is empty");
  }
  return userdata
}
