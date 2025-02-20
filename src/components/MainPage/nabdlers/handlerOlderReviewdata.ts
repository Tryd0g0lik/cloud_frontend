/**
 * src\components\MainPage\nabdlers\handlerOlderReviewdata.ts
 */
import {UserAPI, HttpMethods} from "@Interfaces";
import { CookieUser } from "@Services/cookieServices";
import { fetchCSRF } from "@Services/request/getCSRFtoken";


/**
 * Handle older review data from server if user has an admin's permission.
 * @param event : the load event from html
 * @param callback: the callback function - 'useState' of React
 * @returns boolean or Response from server
 */
export async function handlerOlderReviewdata(): Promise<boolean | {data: {users: [any], files:[any]}}> {
  const REACT_APP_SERVER_PORT = process.env.REACT_APP_SERVER_PORT || "8000";
  // CHECK STAUS OF USER/ HIS HAS THE TRUE VALUE OF IS_TAFF
  // 'is_ataff=true' its mean what user has an admin's permission
  const cookie = new CookieUser();
  try{
  if (!cookie.checkCoockie("is_staff")){
    console.log("[handlerOlderReviewdata.ts::handlerOlderReviewdata]: 'is_staff' key not found ");
    return false
  }
  if (!cookie.getOneCookie("is_staff") &&
   "True".toLowerCase() !== cookie.getOneCookie("is_staff")?.toLocaleLowerCase()){
    console.log("[handlerOlderReviewdata.ts::handlerOlderReviewdata]: The user has not permission");
    return false
  }
  const host  = window.location.origin.toString();
  const url = new URL(UserAPI.BASIS, host);
  url.port = `${REACT_APP_SERVER_PORT}`;

  // GET THE CSRFTOKEN
  let result = await fetchCSRF(url);
  if (!result) {
    // NO TOKEN
    console.log("[andlerOlderReviewdata.ts::handlerOlderReviewdata]: The 'csfrtoken' have from the server not Ok!")
    return false;
  }
  // GET ALL REVIEW DATA BY USER AND USER's FILE
    url.pathname = UserAPI.ADMINGETALLREVIEW;

  const response = await fetch(url, {
    method: HttpMethods.GET,
    headers: {
      "X-CSRFToken": result["csrftoken"] || "",
    },
    credentials: "include",
  });
  if (!response.ok) {
    console.log("[andlerOlderReviewdata.ts::handlerOlderReviewdata]: The 'csfrtoken' have from the server not Ok!")
    return false;
  }
  const data = await response.json();
  // useState from react

  return data
} catch (err){
    console.error(`[andlerOlderReviewdata.ts::handlerOlderReviewdata]: Mistake => ${(err as Error).message}`)
    return false;
}
}
