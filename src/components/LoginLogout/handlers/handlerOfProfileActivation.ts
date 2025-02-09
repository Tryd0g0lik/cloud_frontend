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
  // CHECK the event type. THis is the mous clik of thhe keyboard of 'Enter'.
  if (e && (e.type) && (
    ((e.type).toLowerCase() !== 'click') && ((e as React.KeyboardEvent).key !== 'Enter')
  )) {
    return false
  }
  else if ((location.pathname.includes("/users/login/")) &&
    (e && (e as React.KeyboardEvent).key === 'Enter')
  ) {
    (e as React.MouseEvent).preventDefault();
    /**
     *  KEYBOARD is the board down the 'Enater', was pressed.
     *  LOGIN & LOGOUT from the authorization form/ppage
     *  */
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
      // VALIDATE the form
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
    // SEND the data to the server for activation the user to the profile.
    passworEmail = JSON.stringify({
      "email": map.get("email").slice().trim(),
      "password": map.get("password").slice().trim(),
      is_active: true,
    });
    map.clear();
  }

  else if (e && (e.target as HTMLElement).localName === 'a' &&
    ((e as React.MouseEvent).target as HTMLElement).textContent?.toLowerCase() === Loginout.LOGOUT.toLowerCase()
  ) {
    (e as React.MouseEvent).preventDefault();
    /** MOUSE CLIKE
     * If was the mouse clike on the button from menu. This is from
     * the level top of the dashboard  of the rigth side buttom
     */
    passworEmail = JSON.stringify({ is_active: false });
  }
  if ((passworEmail).length > 3) {
    const task0 = async () => fetchLoginOut(passworEmail)
      .then(async (response) => {
      /**
       * Check a status of response
       */
          if (response.ok) {
            const result = await response.json();
            return result;
          }
          return new Error("[handlerLogin] Response is not OK");
        }).catch(response => {
          console.error(response);
        })
      .then((resp) => {
        if (resp instanceof Error) {
          null
        }
        else if (resp["is_session"]) {
          /**
           * If user was activation to web site, then his redictet to the profile page of web site
           */
          const linHtml = document.querySelector(".navbar a[href*='/profile/']");
          if (linHtml) {
            const textOfLink = (linHtml as HTMLAnchorElement).href;
            if (!textOfLink) {
              return false;
            }
            location.pathname = textOfLink;
          }
          location.pathname = "/"
        }
        else {
          location.pathname = "/"
        }
        // setTimeout(() => location.pathname = "/", 4000)

      });
    task0();
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
  // TASKS ASYNC
  // Run tasks some in parallel.
  const cookie = new CookieUser();
  const session = cookie.getOneCookie(key);
  if (!session) {
    return false
  }
  // const task0 = () => new Promise(resolve => resolve(receivingDataOfFirstLogin(key as string)));
  const task1 = () => new Promise<void>(resolve => { changeDOM("true".includes(key) ? true : false); resolve() });
  const task2 = () => new Promise<void>(resolve => { buttonLoginLogout(); resolve() });
  (async () => {
    await Promise.allSettled([task1(), task2()]); // task0(),
  })();
  return true;
}
export default handlerLogin;
