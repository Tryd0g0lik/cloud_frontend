import React from "react";
import { UserAPI } from "@Interfaces";
import { CookieUser } from "@Services/cookieServices";
import { fetchCSRF } from "@Services/request/getCSRFtoken";

/**
 * Then we handle the input of comments and listen the event of keyboard and key 'Enter' , \
 * to send PATCH request to server with a new comment. When we received a response \
 * of server and status code 200 (from response) we removing the input field (from cell) and add \
 * a new comment (update the state of all files).
 * @param e : React.KeyboardEvent<HTMLInputElement>
 * @returns boolean or Response from server
 */
export async function handlerCommentInput(e: React.KeyboardEvent<HTMLInputElement> ): Promise<boolean|Response> {
  const {target} = e;
  const {localName, type} = target as HTMLInputElement;
  if (!localName || (localName && localName !== "input") || (
    localName && localName === "input" && type !== "text"
  ) || (
    (e as React.KeyboardEvent).key !== "Enter"
  )){
    return false;
  };
  const url = new URL(UserAPI.BASIS, window.location.origin);
  url.port = process.env.REACT_APP_SERVER_PORT || '8000';

  // GET THE CSRFTOKEN
  let result = await fetchCSRF(url);
  if (!result) {
    // NO TOKEN
    return false;
  }
  // GET USER ID FROM COOKIE
  const cookie = new CookieUser();
  if (!cookie.checkCoockie("index")) {
    return false;
  }

  url.pathname = UserAPI.FILESCOMMENT_PK.replace(":userId", cookie.getOneCookie("index") as string);
  // GET ID OF THE FILE
  const cellHtml = (target as HTMLInputElement).parentElement;
  if (!cellHtml || cellHtml.localName !== "td" || (
    cellHtml.localName === "td" && !cellHtml.dataset.number
  )) {
    return false;
  }
  // cellHtml.dataset.number
  const body_ = JSON.stringify({
    "comment": (target as HTMLInputElement).value,
    "fileId": cellHtml.dataset.number
  });
  const response = await fetch(url, {
    method: "PATCH",
    body: body_,
    headers: {
      "X-CSRFToken": result["csrftoken"] || "",
      "Content-Type": "application/json" },
    credentials: "include"
  });
  if (!response.ok) {
    return false;
  }


return response;

}
