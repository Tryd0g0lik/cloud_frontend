
/**
 * src\services\request\loginout.ts
 */

import { CookieUser } from "@Services/cookieServices";
import { HttpMethods, UserAPI } from "@Interfaces";
import { AES, mode, pad, enc } from "crypto-ts";
/** ---- PATCH Method ----
 * @param prop JSON string for data of request's body.
 * @param index__s This is the user id. The events of admin is triger for geting \
 * the user id from URL and insert to the url of request to the server
 * @returns
 */
export async function fetchLoginOut(prop: string, index__s: string | null = null) {

  let REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL || null;
  const cookie = new CookieUser();

  let indexOfCookie = cookie.getOneCookie("index");
  let url: string | URL = `${REACT_APP_SERVER_URL}${UserAPI.PATCH_PK}`.replace(":userId", index__s ? index__s : indexOfCookie as string);
  let response: Response | null = null;
  // If a cookies data files are empty, we neet to get (restore) the user's id
  if (!indexOfCookie) {
    const secret_key = process.env.REACT_APP_SECRET_KEY || "null";
    // ENCRYPT
    // Encrypt of email and sending to the server. We need to get the user ID
    const textEncoder = new TextEncoder();
    const numbStr = Array.from(textEncoder.encode(secret_key)).join('');
    const key = enc.Utf8.parse(numbStr.slice(0, 32));
    const iv = enc.Utf8.parse(numbStr.slice(0, 16));

    const encrypt = AES.encrypt(JSON.parse(prop)["email"], key, {
      "iv": iv,
      "mode": mode.CBC,
      "padding": pad.PKCS7
    }).toString();
    url = new URL(`${UserAPI.CHOICE}name/`, `${REACT_APP_SERVER_URL}`) as URL;
    url.searchParams.set('data', encrypt);
    response = await fetch(url, {
      method: HttpMethods.GET,
      headers: {
        'Accept': 'application/json',
        // "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`[loginout.ts::fetchLoginOut]: HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    indexOfCookie = result['data'] as string;
    url = `${REACT_APP_SERVER_URL}${UserAPI.PATCH_PK}`.replace(":userId", indexOfCookie as string);
  }

  // CSRFTOKEN
  // first is the 'GET' method for get a 'csrftoken'
  response = await fetch(`${REACT_APP_SERVER_URL}${UserAPI.BASIS}`);
  if (!response.ok) {
    throw new Error(`[loginout.ts::fetchLoginOut]: HTTP error! status: ${response.status}`);
  }
  const result = await response.json();
  // AUTHORISATION AND MORE DATA OF CHANGED
  response = await fetch(url,
    {
      method: HttpMethods.PATCH,
      // mode: 'same-origin' as RequestMode,
      headers: {
        'X-CSRFToken': result["csrftoken"],
        'Accept': 'application/json',
      },
      // credentials: "same-origin" as RequestCredentials,
      credentials: 'include' as RequestCredentials,
      body: prop //
    });
  return response;
};
