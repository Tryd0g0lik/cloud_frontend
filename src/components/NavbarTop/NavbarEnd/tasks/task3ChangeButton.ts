/*
 * src\components\NavbarTop\NavbarEnd\tasks\task3.ts
 * ---- task3 ----
 * The right  upper button, if it has a 'Login' text, the function
 * below inserts the link to the page of the form.
 */
import { Loginout } from "src/interfaces";
const task3 = () => new Promise<void>(resolve => {
  setTimeout(() => {
    const ancorHtml = document.querySelectorAll(".navbar-end a");
    if (!ancorHtml) {
      console.log('Button is invaid.');
      return false;
    }
    Array.from(ancorHtml).forEach((item) => {
      if ((item as HTMLAnchorElement).textContent?.toLowerCase().includes((Loginout.LOGIN).toLowerCase())) {
        (item as HTMLAnchorElement).href = "/users/login/";
      } else if ((item as HTMLAnchorElement).textContent?.toLowerCase().includes((Loginout.LOGOUT).toLowerCase())) {
        (item as HTMLAnchorElement).href = "";
      }
    });
    resolve();
  }, 100);
});
export default task3;
