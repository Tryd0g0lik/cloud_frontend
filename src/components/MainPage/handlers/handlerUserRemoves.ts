/**
 * src\components\MainPage\handlers\handlerUserRemoves.ts
 */
import React from "react";
import { UserAPI, HttpMethods } from "@Interfaces";
import { CookieUser } from "@Services/cookieServices";
import { fetchCSRF } from "@Services/request/getCSRFtoken";
import { HandlerStateActivation } from "src/components/handlerUserNotActive";

/**
 * Button hendler the event to the remove users from the system. (admin interface)
 * An empty user list that we can't send (admin interface). Min one the quantity of users.
 * @param e
 * @returns
 */
export async function handlerUserRemove(e: React.MouseEvent): Promise<boolean> {

  const { target } = e;
  if (!target || !(target as HTMLInputElement).classList.contains("button-delete")) {
    return false;
  }
  HandlerStateActivation();
  e.preventDefault();
  const checkboxFile = [] as Array<HTMLInputElement>;
  Array.from(document.querySelectorAll("input[data-name='checkbox_user']")).forEach(item => {
    if ((item as HTMLInputElement).checked === true) {
      checkboxFile.push(item as HTMLInputElement);
    }

  }) as unknown as Array<HTMLInputElement>;
  if (checkboxFile.length == 0){
    return false;
  }
  const indexUsers = [] as Array<number>;
  Array.from(checkboxFile).forEach((item) => {
    indexUsers.push(Number(item.dataset.number));
  });
  if (indexUsers.length === 0) {
    return false;
  }
  // GET USER Id from cookie
  const cookie = new  CookieUser();
  const userId = cookie.getOneCookie("index");
    if (!userId) {
      return false;
    }
  // GET CSRF token
  const url = new URL(UserAPI.BASIS, window.location.origin);
  url.port = process.env.REACT_APP_SERVER_PORT || '8000';
  let result = await fetchCSRF(url);
  // Uncheck all checkbox in input[data-name='choiceAdmin']
  checkboxFile.forEach(item => {
    if (item) {
      item.checked = false;
    }
  });
  // PUT request. Change status of admin for user
  url.pathname = `${UserAPI.ADMIN_REMOVE_USERS_PK}`.replace(':userId', userId);
  const response = await fetch(url, {
    method: HttpMethods.PUT,
    credentials: "include",
    body: JSON.stringify({ "users": indexUsers }),
    headers: {
      "X-CSRFToken": result["csrftoken"] || "",
      'Accept': 'application/json',
    }
  });
  if (!response.ok || response.status >= 400) {
    return false;
  }

  return true;
}
