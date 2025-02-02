
// Fetch()

import { CookieUser } from "@Services/cookieServices";
import { UserAPI } from "@Interfaces";

/** ---- PATCH Method ----

 * @returns
 */
export async function fetchLoginOut(prop: string) {

  let REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL as string;
  const cookie = new CookieUser();
  const indexOfCookie = cookie.getOneCookie("index");
  const url = `${REACT_APP_SERVER_URL}${UserAPI.PATCH}${indexOfCookie}/`;
  // first is the 'GET' method for get a 'csrftoken'
  let response = await fetch(`${REACT_APP_SERVER_URL}${UserAPI.BASIS}`)
  if (!response.ok) {
    return response;
  }
  const result = await response.json();
  response = await fetch(url,
    {
      method: "PATCH",  // HttpMethods.PATCH,
      // mode: 'same-origin' as RequestMode,
      headers: {
        'X-CSRFToken': result["csrftoken"],
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      // credentials: "same-origin" as RequestCredentials,
      credentials: 'include' as RequestCredentials,
      body: prop //
    })
  return response
}
