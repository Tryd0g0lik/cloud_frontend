import React from "react";
import { UserAPI, HttpMethods } from "@Interfaces";
import { CookieUser } from "@Services/cookieServices";
import { fetchCSRF } from "@Services/request/getCSRFtoken"

export async function handlerFileRemove(e: React.MouseEvent): Promise<boolean> {

  const {target } = e;
  // if (!target || !(target as HTMLInputElement).checked) {
  //   return false;
  // };
  if (!target || !(target as HTMLInputElement).classList.contains("button-delete")) {
    return false;
  }
  e.preventDefault();
  const checkboxFile = [] as Array<HTMLInputElement>;
  Array.from(document.querySelectorAll("input[data-name='checkbox_file']")).forEach(item => {
    if ((item as HTMLInputElement).checked === true) {
      checkboxFile.push(item as HTMLInputElement);
    }

  }) as unknown as Array<HTMLInputElement>;
  if (checkboxFile.length == 0){
    return false;
  }
  const indexFiles = [] as Array<number>;
  Array.from(checkboxFile).forEach((item) => {
    indexFiles.push(Number(item.dataset.number));
  });
  if (indexFiles.length === 0){
    return false;
  }
  // UserAPI
  const cookie = new  CookieUser();
  const userId = cookie.getOneCookie("index");
    if (!userId) {
      return false;
    }

  const url = new URL(UserAPI.BASIS, window.location.origin);
  url.port = process.env.REACT_APP_SERVER_PORT || '8000';

  let result = await fetchCSRF(url);
  url.pathname = `/api/v1/files/${userId}`;

  url.pathname = `${UserAPI.FILESREMOVE_PK}`.replace(':userId', userId);


  const response = await fetch(url, {
    method: HttpMethods.PUT,
    credentials: "include",
    body: JSON.stringify({"files": indexFiles}),
    headers: {
      "X-CSRFToken": result["csrftoken"] || "",
      'Accept': 'application/json',
    }
  })
  if (!response.ok || response.status >= 400) {
    return false;
  }
  checkboxFile.forEach(item =>{
    if(item){
      item.checked = false;
    }
  });
  return true
}
