/**
 * src\components\NavbarTop\NavbarEnd\tasks\task2.ts
 */
import { CookieUser } from "@Services/cookieServices";
const task2 = () => new Promise<void>(resolve => {

  setTimeout(() => {
    const cookie = new CookieUser();
    if (!cookie.checkCoockie("index")) {
      return false;
    }
    const userId = cookie.getOneCookie("index") as string;
    if (userId) {
      const profileLink = document.querySelector('a[href="/profile/"]');
      if (profileLink) {
        (profileLink as HTMLAnchorElement).href =
          (profileLink as HTMLAnchorElement).href + `${userId}/`;
      }
    }
    resolve();
  }, 100);
});
export default task2;
