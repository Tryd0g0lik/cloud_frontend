/**
 * src\components\LoginLogout\handlers\handlerOfProfileActivation.ts
 */
import { CookieUser } from "@Services/cookieServices";
import Encrypto from "@Services/encrypts";
import { Loginout } from "src/interfaces";
import { changeDOM, buttonLoginLogout, fetches } from "@Services/scripts";
import { result } from "lodash";
/**
 * This function has two  entry-points.\
 *
 * @param e MouseEvent | null. First point.\
  * Function for change the boolean's value for the 'is_active' of db.\
 * It means, what the user go out from \
 * the profile. Or 'true' - it means what the user is an authorized.
 *
 * @param key string. By default, values this is the "is_active". \
 * Second point works with a rigth upper button. It change the text of button \
 * and a link inserts to the html's DOM (if 'Login' text).
 * It function look up the key "is_active" to the cookie. Then, \
 * the function makes of changes.
 * @returns boolean.
 */
const handlerLogin = (e?: React.MouseEvent) => (key: string = "is_active") => {
  if (e && (e.type) && ((e.type).toLowerCase() !== 'click')) {
    return false
  } else if (
    e && (e.target as HTMLElement).localName === 'a' &&
    ((e as React.MouseEvent).target as HTMLElement)?.textContent?.toLowerCase() === Loginout.LOGIN.toLowerCase()
  ) {
    (e as React.MouseEvent).preventDefault();
    // Условие если был клик
    (async () => {
      fetches(JSON.stringify({ is_active: true }))
        .then(response => {
          if (response.ok) {
            return true;
          }
          return false;
        }).catch(response => {
          console.error(response);
        });
    })();
    return true;
  } else if (e && (e.target as HTMLElement).localName === 'a' &&
    ((e as React.MouseEvent).target as HTMLElement).textContent?.toLowerCase() === Loginout.LOGOUT.toLowerCase()
  ) {
    (e as React.MouseEvent).preventDefault();
    // Условие если был клик
    (async () => {
      fetches(JSON.stringify({ is_active: false }))
        .then(response => {
          if (response.ok) {
            return true;
          }
          return false;
        }).catch(response => {
          console.error(response);
        })
        .then((result) => location.pathname = "/");
    })();
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
  const cookie = new CookieUser();
  const session = cookie.getOneCookie(key);
  if (!session) {
    return false
  }
  // const task0 = () => new Promise(resolve => resolve(receivingDataOfFirstLogin(key as string)));
  const task1 = () => new Promise(resolve => resolve((async () => changeDOM("true".includes(key) ? true : false))()));
  const task2 = () => new Promise(resolve => { resolve(buttonLoginLogout(Loginout.LOGIN)) });
  (async () => {
    await Promise.all([task1(), task2()]); // task0(),
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
// async function receivingDataOfFirstLogin(key: string) {
//   // GET of key name from cookie
//   const cookieUser = new CookieUser();
//   cookieUser.sessionId = key;
//   let result = cookieUser.getOneCookie();
//   if (!result) {
//     return false;
//   }
//   if ('true'.includes(result.toLowerCase())) {
//     let cookie = (document.cookie).match(/user_session_\d+/) as Array<string> | null | string;
//     // GET if user's number id from the key's name.
//     cookie = cookie ? ((cookie as Array<string>).pop() as string).split("_").pop() as string : null;
//     if (!result) {
//       return false
//     }
//     const encrypto = new Encrypto(cookie as string);
//     // Save the user's id
//     localStorage.setItem("session", encrypto.encryptData());

//   } else {
//     null
//   }
// }
