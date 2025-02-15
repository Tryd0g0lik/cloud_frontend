import React from "react";
import { UserAPI } from "@Interfaces";
import { CookieUser } from "@Services/cookieServices";
import { fetchCSRF } from "@Services/request/getCSRFtoken";

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
