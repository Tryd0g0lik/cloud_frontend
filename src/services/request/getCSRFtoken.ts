/**
 * src\services\request\getCSRFtoken.ts
 */
import { CookieUser } from "@Services/cookieServices";
/**
 * Get token "csrftoken". After the reseving the token,\
 * it self save in cookie to the 10 secons. After that, the token will be deleted.
 * @param url: string | URL - url of the server
 * @returns object of type '{"csrftoken": string }'.
 */
export async function fetchCSRF(url: string | URL) {
  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok && response.status !== 200) {
    return false;
  }
  const result = await response.json();

  const cookie = new CookieUser();
  cookie.sessionId = "csrftoken";
  cookie.liveTimer = 10;
  cookie.setCookie(result["csrftoken"] || "");
  return result;

}
