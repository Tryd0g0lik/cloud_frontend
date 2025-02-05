
// Fetch()

import { CookieUser } from "@Services/cookieServices";
import { HttpMethods, UserAPI } from "@Interfaces";
import { AES } from "crypto-ts";
/** ---- PATCH Method ----

 * @returns
 */
export async function fetchLoginOut(prop: string) {

  let REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL as string;
  const cookie = new CookieUser();
  const indexOfCookie = cookie.getOneCookie("index");
  let url: string | URL = `${REACT_APP_SERVER_URL}${UserAPI.PATCH}${indexOfCookie}/`;
  let response: Response | undefined = undefined;
  if (!indexOfCookie) {
    const secret_key = process.env.SECRET_KEY || "null";
    // Bufer bytes is a string, so we need to convert it to a string
    const buffer = new Int16Array(128 - secret_key.length);
    const bufferKey = new Uint32Array(buffer);
    Array.from(bufferKey).forEach((byte, index) => {
      bufferKey[index] = secret_key.charCodeAt(byte)
    });

    // const emailEncode: string = JSON.stringify({ data: CryptoJS.AES.encrypt(JSON.parse(prop)["email"], secret_key).toString() });
    // const emailEncode = CryptoJS.AES.encrypt((JSON.parse(prop)["email"]), secret_key).toString()
    // const emailEncode = AES.encrypt((JSON.parse(prop)["email"]), bufferKey).toString()
    const textEncoder = new TextEncoder();
    const secret_key_b = textEncoder.encode(JSON.parse(prop)["email"]).toString();


    const emailEncode = AES.encrypt(secret_key_b, secret_key).toString()
    // response = await fetch(new URL(`${UserAPI.GETofAPI}${emailEncode.replace(":", "__null__")}/`, `${REACT_APP_SERVER_URL}`), {
    url = new URL(`${UserAPI.CHOICE}name/${emailEncode.replace("/", "__null__")}/`, `${REACT_APP_SERVER_URL}`) as URL
    response = await fetch(url, {
      method: HttpMethods.GET,
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      null
    }
  }
  // first is the 'GET' method for get a 'csrftoken'
  response = await fetch(`${REACT_APP_SERVER_URL}${UserAPI.BASIS}`)
  if (!response.ok) {
    return response;
  }
  const result = await response.json();
  response = await fetch(url,
    {
      method: HttpMethods.PATCH,  // HttpMethods.PATCH,
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
