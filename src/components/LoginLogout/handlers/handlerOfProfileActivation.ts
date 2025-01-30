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
const handlerLogin = (e?: React.MouseEvent | React.KeyboardEvent) => (key: string = "is_active") => {
  let data = "";
  // LOGIN & LOGOUT button (right top dashboard)
  if (e && (e.type) && (
    ((e.type).toLowerCase() !== 'click') && ((e as React.KeyboardEvent).key !== 'Enter')
  )) {
    return false
  }
  else if ((location.pathname.includes("/users/login/")) &&
    (e && (e as React.KeyboardEvent).key === 'Enter')
  ) {
    (e as React.MouseEvent).preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexUsername = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
    // Условие если был клик
    const formHtml = (e.target as HTMLFormElement).form;
    // .parentElement as HTMLLabelElement).parentElement as HTMLFormElement);

    const map = new Map();
    for (let i = 0; i < formHtml.length; i++) {
      // Remove the color red from border of the label
      if (formHtml[i].parentElement.style.border.length > 0) {
        const lebalHtml = formHtml[i].parentElement;
        lebalHtml.style.border = ""
      };

      if (formHtml[i].name.toLowerCase().includes("email") && (
        !(formHtml[i].checkValidity()) || !(emailRegex.test(formHtml[i].value)
        ))) {
        formHtml[i].parentElement.style.border = "1px solid red";
        return "Not Ok";
      }
      else if (formHtml[i].name.toLowerCase().includes("password") && !(formHtml[i].checkValidity())) {
        formHtml[i].parentElement.style.border = "1px solid red";
        return "Not Ok";
      }
      map.set(formHtml[i].name.toLowerCase(), formHtml[i].value)
    }
    data = JSON.stringify({
      "email": map.get("email"),
      "password": map.get("password"),
      is_active: true,
    });
  }
  else if (e && (e.target as HTMLElement).localName === 'a' &&
    ((e as React.MouseEvent).target as HTMLElement).textContent?.toLowerCase() === Loginout.LOGOUT.toLowerCase()
  ) {
    (e as React.MouseEvent).preventDefault();
    // Условие если был клик
    data = JSON.stringify({ is_active: false });
  }
  // else if (location.pathname.includes("users/login/")) {
  //   (e as React.MouseEvent).preventDefault();
  //   data = JSON.stringify({ is_active: true });
  // }
  if ((data).length > 3) {
    const task0 = () => new Promise(resolve => resolve(fetches(data)
        .then(response => {
          if (response.ok) {
            return true;
          }
          return false;
        }).catch(response => {
          console.error(response);
        })
      .then((result) => location.pathname = "/")
    ));
    (async () => await Promise.all([task0()]))();
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
  const cookie = new CookieUser();
  const session = cookie.getOneCookie(key);
  if (!session) {
    return false
  }
  // const task0 = () => new Promise(resolve => resolve(receivingDataOfFirstLogin(key as string)));
  const task1 = () => new Promise(resolve => resolve((async () => changeDOM("true".includes(key) ? true : false))()));
  const task2 = () => new Promise(resolve => { resolve(buttonLoginLogout()) });
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
