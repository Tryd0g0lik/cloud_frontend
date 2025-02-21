/**
 * src\components\Files\handlers\handlerOlderFiles.ts
 */
import { fetchCSRF } from "@Services/request/getCSRFtoken";
import { CookieUser } from "@Services/cookieServices";
import React, { ChangeEvent, FormEvent } from "react"
import { HttpMethods, UserAPI } from "@Interfaces";

/**
 * Thi is loader (handl) fiiles to the server
 * @param e
 * @returns
 */
export async function handlerOlderFiles(index__s: string | null = null): Promise<[] | [{ files: [] }]> { // funcState:CallableFunction

  const cookie = new CookieUser();
  const userId = cookie.getOneCookie("index");
  if (!userId) {
    return [];
  }
  const url = new URL(UserAPI.BASIS, window.location.origin);
  url.port = process.env.REACT_APP_SERVER_PORT || '8000';

  let result = await fetchCSRF(url);
  if (index__s) {
    url.pathname = UserAPI.FILES_PK.replace(":userId", index__s);
  } else {
  url.pathname = UserAPI.FILES_PK.replace(":userId", userId);
  }
  // SEND FILE TO SERVER

  const response = await fetch(url, {
    method: HttpMethods.GET,
    credentials: "include",
    headers: {
      "X-CSRFToken": result["csrftoken"] || "",
      'Accept': 'application/json',
    }
  });
  if (!response.ok) {
    return []
  }
  result = await response.json();
  return result["files"];
};
