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
  // CHECKIING AND REMOVE the OLD ALTER
  let alterHTML = (e.target as HTMLFormElement).parentElement as HTMLElement;
  alterHTML = (alterHTML.parentElement as HTMLFormElement).querySelector(".loader-form + .alert") as HTMLElement;

  if (alterHTML && alterHTML.classList.contains("alert")) {
    alterHTML.remove();
  }
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

  // PUBLIC MESSAGE
  alterHTML = (e.target as HTMLFormElement).parentElement as HTMLElement;
  if (!response.ok) {
    (alterHTML as HTMLElement).insertAdjacentHTML("afterend", alterIsNotOk);

    return false;
    // throw new Error(`[handlerFormFiles.ts::handlerFormFile]: Mistake => HTTP error! status: ${response.status}`);
  }


  (alterHTML as HTMLElement).insertAdjacentHTML("afterend", alterIsOk);



  fileContainer.value = '';
  return response;

};

const alterIsNotOk = `<div role="alert" class="alert alert-error">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6 shrink-0 stroke-current"
    fill="none"
    viewBox="0 0 24 24">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>Файл не загружен!</span>
</div>`
const alterIsOk = `
<div role="alert" class="alert alert-success">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6 shrink-0 stroke-current"
    fill="none"
    viewBox="0 0 24 24">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>Файл загружен!</span>
</div>
`
