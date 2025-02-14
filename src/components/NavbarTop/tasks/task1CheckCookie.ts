 /**
  * src\components\NavbarTop\NavbarEnd\tasks\task1.ts
  *  ---- task1 ----
   * The data of 'is_active' geting from the cookie and change  the text to the buttom.
   * If, it is a true, means -> NAVIGATE by profile will be ACTIVATION
   * */
import { CookieUser } from "@Services/cookieServices";
import { Loginout } from "src/interfaces";
const task1 = (func: CallableFunction) => new Promise<void>(resolve => {
  setTimeout(() => {
    const cookieUser = new CookieUser();
    // if (!cookieUser.checkCoockie("is_active")) {
    // throw new Error('[task1CheckCookie::task1]: Mistake => The key "is_active" in cookie not found!');
    // }
    let falseTrue: string | boolean | null = cookieUser.getOneCookie("is_active");

    falseTrue = (falseTrue) ? (
      (falseTrue.toLowerCase()).includes("false") ? false : true
    ) : false;

    // status of a profile.
    // setUseactive((falseTrue as boolean) ? Loginout.LOGOUT : Loginout.LOGIN);
    func((falseTrue as boolean) ? Loginout.LOGOUT : Loginout.LOGIN);
    resolve();
  }, 0);
});
export default task1;
