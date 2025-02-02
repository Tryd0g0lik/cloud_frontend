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
  const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL ? process.env.REACT_APP_SERVER_URL as string : "";
  if (!REACT_APP_SERVER_URL) {
    throw new Error("[clientLoadder]: Mistake => THe REACT_APP_SERVER_URL can't found")
  }
  const cookie = new CookieUser();
  const userId = cookie.getOneCookie("index");
  if (!userId) {
    throw new Error("[clientLoadder]: Mistake => THe userId from the cookie can't found")
  }
  console.log(`Check the userId: ${userId}`)
  const url = new URL(`${UserAPI.CHOICE}${userId}/`, `${REACT_APP_SERVER_URL}`,)
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`[clientLoadder]: Mistake => Server returned status ${response.status}`);
  }
  const userdata = await response.json();
  if (Object.keys(userdata).length === 0) {
    throw new Error("[clientLoadder]: Mistake => User data is empty");
  }
  return userdata
}
// Ошибка на сервере !!!!!!!!!!!!!
