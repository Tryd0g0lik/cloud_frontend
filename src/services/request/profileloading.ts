import { CookieUser } from "@Services/cookieServices";
import { Usermeta, UserAPI } from "@Interfaces";

/**
 * By requesе with method the 'GET' and API '{{baseUrl}}/api/v1/users/choice/{pk}/' seтding the reques to the server.* \
 * Are waiting data of user.
 * @returns
 *
 */
export async function profileLoader(): Promise<Usermeta | {}> {
  const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL ? process.env.REACT_APP_SERVER_URL as string : "";
  const cookie = new CookieUser();
  const index = cookie.getOneCookie("index");
  if (!index) {
    throw new Error("[clientLoadder]: Mistake => THe index from the cookie can't found")
  }
  const url = new URL(`${UserAPI.CHOICE}${index}/`, `${REACT_APP_SERVER_URL}`,)
  const response = await fetch(url)
  if (!response.ok) {
    return {};
  }
  const userdata = await response.json();
  return userdata
}
