import { includes } from "lodash";
import { CookieUser } from "@Services/cookieServices";
import Encrypto from "@Services/encrypts";
import { Loginout } from "src/interfaces";
import { changeDOM, buttonLoginLogout } from "@Services/scripts";
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


  /**
   * Entry point receives the key by name the 'is_session'.\
   * If the 'is_session' is the 'true', IT is means what user is activate to web site.\
   * Next,  run the fun 'receivingDataOfFirstLogin()'.
   */
  if (!key) {
    return false;
  }
  // TASKS async
  // Run tasks some in parallel.
  const task0 = () => new Promise(resolve => resolve(receivingDataOfFirstLogin(key as string)));
  const task1 = () => new Promise(resolve => resolve((async () => changeDOM("true".includes(key) ? true : false))()));
  const task2 = () => new Promise(resolve => { resolve((async () => buttonLoginLogout(Loginout.LOGIN))()) });
  (async () => {
    await Promise.race([task0(), task1(), task2()]);
  })();
  return true;
}
export default handlerLogin;


/**
 * We can get the number (index) of user from db.\
 * When the 'is_session' is 'true', from template string the '/user_session_\d+/' receive \
 * the user ID. It number (type string) and saving in the localstorage.
 * @param key string. It is key name the 'is_session' from a cookie.
 * @returns
 */
async function receivingDataOfFirstLogin(key: string) {
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
}
