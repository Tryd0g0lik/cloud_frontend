import { includes } from "lodash";
import { CookieUser } from "@Services/cookieServices";
import Encrypto from "@Services/encrypts";

const handlerLogin = (e?: React.MouseEvent) => (key?: string) => {
  if (e && (e.type) && (((e.type).toLowerCase() !== 'click') || (
    (e.target as HTMLElement).textContent?.toLowerCase() !== 'login'
  ))) {
    return false
  } else if (e) {
    // Условие если был клик
    null
    return true;
  }

  // Below is the FIRST login (the first receiveing data).
  if (!key) {
    return false;
  }
  // GET of key name from cookie
  const cookieUser = new CookieUser(key);
  let result = cookieUser.getOneCookie();
  if (!result) {
    return false;
  }
  if ('true'.includes(result.toLowerCase())) {
    let cookie = (document.cookie).match(/user_session_\d+/) as Array<string> | null | string;
    // GET if user's number id from the key's name.
    cookie = cookie ? (cookie as Array<string>).pop() as string : null;
    if (!result) {
      return false
    }
    const encrypto = new Encrypto(cookie as string);
    // Save the user's id
    localStorage.setItem("session", encrypto.encryptData());
  } else {
    null
  }


  return true;
}
export default handlerLogin;
