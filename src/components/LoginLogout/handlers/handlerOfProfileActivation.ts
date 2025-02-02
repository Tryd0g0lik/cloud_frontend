/**
 * src\components\LoginLogout\handlers\handlerOfProfileActivation.ts
 */
import { CookieUser } from "@Services/cookieServices";
import { errorFormAuthentification as error } from "@Services/scripts";
import { Loginout } from "src/interfaces";
import { changeDOM, buttonLoginLogout, } from "@Services/scripts";
import { fetchLoginOut } from "@Services/request/loginout";

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
  let passworEmail = "";
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
    // Условие если был клик
    const formHtml = (e.target as HTMLFormElement).form;

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
        formHtml[i].setCustomValidity(error["email"]["valueMissing"]);
        formHtml[i].reportValidity();
        return "Not Ok";
      }
      else if (formHtml[i].name.toLowerCase().includes("password") && !(formHtml[i].checkValidity())) {
        formHtml[i].parentElement.style.border = "1px solid red";
        formHtml[i].setCustomValidity(error["password"]["valueMissing"]);
        return "Not Ok";
      }
      map.set(formHtml[i].name.toLowerCase(), formHtml[i].value)
    }
    passworEmail = JSON.stringify({
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
    passworEmail = JSON.stringify({ is_active: false });
  }
  if ((passworEmail).length > 3) {
    const task0 = () => new Promise(resolve => resolve(fetchLoginOut(passworEmail)
        .then(response => {
          if (response.ok) {
            location.pathname = "/";
          }
          return new Error("[handlerLogin] Response is not OK");
        }).catch(response => {
          console.error(response);
        })

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
