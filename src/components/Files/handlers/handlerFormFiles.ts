/**
 * src\components\Files\handlers\handlerFormFile.ts
 */
import React, { ChangeEvent, FormEvent } from "react"
import { HttpMethods, UserAPI } from "@Interfaces";
import { CookieUser } from "@Services/cookieServices";
const REACT_APP_SERVER_PORT = process.env.REACT_APP_SERVER_PORT || '8000';
export async function handlerFormFile(e:FormEvent): Promise<boolean| object> {
  if (!(e.target as HTMLFormElement).form &&
  (e.target as HTMLFormElement).form[0].type !== 'file' &&
  (e.target as HTMLFormElement).form[0].value.length === 0) {
    return false
  }
  const fileContainer = (e.target as HTMLFormElement).form[0];
  // GET DATA OF FILE
  const file = fileContainer.files[0];
  if (!file) {
    return false
  }
  const fileData = new FormData();
  fileData.append('file', file);

  // GET TOKEN
  const url = new URL(UserAPI.BASIS, window.location.origin)
  url.port = REACT_APP_SERVER_PORT;
  let response = await fetch(url);
  if (!response.ok && response.status !== 200) {
    throw new Error(`[handlerFormFiles.ts::handlerFormFile]: Mistake => HTTP error! status: ${response.status}`);
  }
  const result = await response.json();
  // const url = new URL('/api/v1/files/', window.location.origin)
  url.pathname = '/api/v1/files/';
  const cookie = new CookieUser()
  cookie.sessionId = "csrftoken";
  cookie.setCookie(result["csrftoken"] || "");
  response = await fetch(url, {
    method: HttpMethods.POST,
    body: fileData,
    credentials: "include",
    headers:{
      "X-CSRFToken": result["csrftoken"] || "",
      'Accept': 'application/json',
    }
  });
  if (!response.ok) {
    throw new Error(`[handlerFormFiles.ts::handlerFormFile]: Mistake => HTTP error! status: ${response.status}`);
  }
  return response;

};
