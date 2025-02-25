import React from "react";
import { HttpMethods, UserAPI } from "@Interfaces";
import { CookieUser } from "@Services/cookieServices";
import { fetchCSRF } from "@Services/request/getCSRFtoken";
import { HandlerStateActivation } from "src/components/handlerUserNotActive";

/**
 * src\components\Files\handlers\handlerFileNameInput.ts \
 * Then we handle the input filed for file's name and listen the event of keyboard and key 'Enter' , \
 * to send PATCH request to server with a new file's name. When we received a response \
 * of server and status code 200 (from response) we add \
 * a new file's name (update the state of all files).
 * @param e : React.KeyboardEvent<HTMLInputElement>
 * @returns boolean or Response from server
 */
export async function handlerFileNameInput(e: React.KeyboardEvent<HTMLInputElement> ): Promise<boolean|Response> {
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
    console.log("[handlerFileNameInput.ts::handlerFileNameInput]: The 'csfrtoken' have from the server not Ok!");
    return false;
  }
  // GET USER ID FROM COOKIE
  const cookie = new CookieUser();
  if (!cookie.checkCoockie("index")) {
    console.log("[handlerFileNameInput.ts::handlerFileNameInput]: THe user id from cookie not found!");
    return false;
  }

  url.pathname = UserAPI.FILESRENAME_PK.replace(":userId", cookie.getOneCookie("index") as string);
  // GET ID OF THE FILE
  const cellHtml = (target as HTMLInputElement).parentElement;
  if (!cellHtml || cellHtml.localName !== "td" || (
    cellHtml.localName === "td" && !cellHtml.dataset.number
  )) {
    return false;
  }
  const extansion = (target as HTMLInputElement).placeholder.split(".");
  const newName = (target as HTMLInputElement).value;
  const newExtansion = newName.split(".");
  // cellHtml.dataset.number
  const body_ = JSON.stringify({
    "new_name": `${newName.split(".").length > 1 ? newName.split(".")[0] : newName}.${extansion ? (
      newExtansion.length <= 1 ?
        extansion[extansion.length - 1] :
        newExtansion[newExtansion.length - 1]
    ) : ''}`,
    "fileId": cellHtml.dataset.number
  });
  const response = await fetch(url, {
    method: HttpMethods.POST,
    body: body_,
    headers: {
      "X-CSRFToken": result["csrftoken"] || "",
      "Content-Type": "application/json" },
    credentials: "include"
  });
  HandlerStateActivation();


  if (!response.ok) {

    console.log("[handlerFileNameInput.ts::handlerFileNameInput]: The file with this name already exists!");

    return false;
  }

return response;

}
