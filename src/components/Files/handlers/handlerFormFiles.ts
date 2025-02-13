/**
 * src\components\Files\handlers\handlerFormFile.ts
 */
import { fetchCSRF } from "@Services/request/getCSRFtoken";
import React, { ChangeEvent, FormEvent } from "react"
const REACT_APP_SERVER_PORT = process.env.REACT_APP_SERVER_PORT || '8000';
import { HttpMethods, UserAPI } from "@Interfaces";


export async function handlerFormFile(e:FormEvent): Promise<boolean| object> {
  if (!(e.target as HTMLFormElement).form &&
  (e.target as HTMLFormElement).form[0].type !== 'file' &&
  (e.target as HTMLFormElement).form[0].value.length === 0) {
    return false
  }
  const fileContainer = (e.target as HTMLFormElement).form[0];
  // GET THE FILE
  const file = fileContainer.files[0];
  if (!file) {
    return false
  }
  const fileData = new FormData();
  fileData.append('file', file);
  const url = new URL(UserAPI.BASIS, window.location.origin)
  url.port = REACT_APP_SERVER_PORT;
  // GET THE CSRFTOKEN
  const result = await fetchCSRF(url);
  url.pathname = '/api/v1/files/';
  // SEND FILE TO SERVER
  const response = await fetch(url, {
    method: HttpMethods.POST,
    body: fileData,
    credentials: "include",
    headers: {
      "X-CSRFToken": result["csrftoken"] || "",
      'Accept': 'application/json',
    }
  });
  if (!response.ok) {
    throw new Error(`[handlerFormFiles.ts::handlerFormFile]: Mistake => HTTP error! status: ${response.status}`);
  }
  return response;

};
