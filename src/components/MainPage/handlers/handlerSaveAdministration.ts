/**
 * src\components\MainPage\handlers\handlerSaveAdministration.ts
 */
import React from "react";
import { UserAPI, HttpMethods } from "@Interfaces";
import { CookieUser } from "@Services/cookieServices";
import { fetchCSRF } from "@Services/request/getCSRFtoken";

/**
 * Button's handler for admin's events saving of user's changes in admin status
 * @param e: MouseEvent
 * @returns
 */
export async function handlerSaveAdministrator(e: React.MouseEvent): Promise<boolean> {
  const { target } = e;
  if (!target || !(target as HTMLInputElement).classList.contains("save-admin")) {
    return false;
  }
  e.preventDefault();
  // GET LIST CHECKBOXES FROM "input[data-name='choiceAdmin']"
  const checkboxFile = [] as Array<HTMLInputElement>;
  Array.from(document.querySelectorAll("input[data-name='choiceAdmin']")).forEach(item => {
    if ((item as HTMLInputElement).checked === true) {
      checkboxFile.push(item as HTMLInputElement);
    }
});
  if (checkboxFile.length == 0) {
    return false;
  }
  // GET LIST of user id
  const indexUsers = [] as Array<number>;
  Array.from(checkboxFile).forEach((item) => {
    indexUsers.push(Number(item.dataset.number));
  });
  if (indexUsers.length == 0) {
    return false;
  }
  // GET USER Id from cookie
  const cookie = new CookieUser();
  const userId = cookie.getOneCookie("index");
  if (!userId) {
    return false;
  }
  // GET CSRF token
  const url = new URL(UserAPI.BASIS, window.location.origin);
  url.port = process.env.REACT_APP_SERVER_PORT || '8000';
  let result = await fetchCSRF(url);
  // PUT request. Change status of admin for user
  url.pathname = `${UserAPI.ADMIN_CHANGE_STATUS_PK}`.replace(':userId', userId);
  const response = await fetch(url, {
    method: HttpMethods.PATCH,
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
