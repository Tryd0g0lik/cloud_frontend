import { CookieUser } from "@Services/cookieServices";
import { LocalRef } from "@Interfaces";

/***
 * Check the activation of user's coockie.
 * If user's coockie is not activation, redirect to the activation page.
 */
export function HandlerStateActivation() {
  const cookie = new CookieUser();
  if (!cookie.checkCoockie("is_active")) {
    if (window.location.href === LocalRef.ACTIVATION) {
      return false;
    }
    window.location.href = LocalRef.ACTIVATION;
    
  }
}
