import React from "react";
import { fetchCSRF } from "@Services/request/getCSRFtoken";
import { UserAPI, HttpMethods } from "@Interfaces";
import { CookieUser } from "@Services/cookieServices";

/**
 *src\components\Files\handlers\handlerReferralLinks.ts\
 * For run handler the the button and for get the referral links:
 *  - first we geting the csrf token from the server
 *  - then we send GET request to server with user id to the url.
 *   If we received a response of server and status code 200, \
 * this handler returning  the true and the referral-link insed cookie.
 * @param e: React.MouseEvent<HTMLButtonElement>
 * @returns boolean.
 */
export async function handlerReferralLinks(e: React.MouseEvent<HTMLButtonElement>): Promise<boolean> {
  const {target, type} = (e);
  const { classList, localName } = (target as HTMLElement);
  if (type !== "click" ||
    (type === "click" && localName !== "button") ||
    ((type === "click" && localName === "button" && !classList.contains("button-referral")))) {
    return false;
  }
  // prevent the default action of the button
  e.preventDefault();
  const url = new URL(UserAPI.BASIS, window.location.origin);
  url.port = process.env.REACT_APP_SERVER_PORT || '8000';

  // GET THE CSRFTOKEN
  let result = await fetchCSRF(url);
  if (!result) {
    // NO TOKEN
    console.log("[handlerReferralLinks.ts::handlerReferralLinks]: The 'csfrtoken' have from the server not Ok!")
    return false;
  }
  // GET USER ID FROM COOKIE
  const cookie = new CookieUser();
  if (!cookie.getOneCookie("index")) {
    console.log("[handlerReferralLinks.ts::handlerReferralLinks]: THe user id from cookie not found!")
    return false;
  }
  // GET THE FILE ID
  const tdHTML = (target as HTMLElement).parentElement;
  if (!tdHTML || !tdHTML.classList.contains("link-file") &&
    (tdHTML.classList.contains("link-file")  && !tdHTML.dataset.number)){
    console.log("[handlerReferralLinks.ts::handlerReferralLinks]: The dataset the number not found!");
      return false;
    }
  const fileId = tdHTML.dataset.number as string;
  // GET THE USER ID FROM COOKIE AND ADD THE FILE ID TO THE COOKIE
  const userId = cookie.getOneCookie("index");
  url.pathname = UserAPI.REFERRAL_LINKS.replace(':userId', userId as string);
  cookie.liveTimer = 10;
  cookie.sessionId = "fileId";
  cookie.setCookie(fileId);

  const response = await fetch(url, {
    method: HttpMethods.GET,
    credentials: "include",
    headers: {
      "X-CSRFToken": result["csrftoken"] || "",
      // 'Accept': 'application/json',
    }
  });
  if (!response.ok){
    console.log("[handlerReferralLinks.ts::handlerReferralLinks]: The response have from the server not Ok!")
    return false;
  }
  // If true then we have the referral links in the cookie/
  return true;
}
