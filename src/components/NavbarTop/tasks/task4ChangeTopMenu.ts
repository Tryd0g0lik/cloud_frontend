/**
 * src\components\NavbarTop\NavbarEnd\tasks\task4.ts
 * There is function for correction the links from dashboard. This is \
 * the level top of dashboard,
 *
 * Varialble 'selectors' - array of objects with keys and values (link) for\
 * coretion the links/pathnams from dashboard/ This pathnams for a template "/profile/\w+/{userId}/"
 */

import { CookieUser } from "@Services/cookieServices";
import { LocalRef } from "@Interfaces";
const task4 = () => new Promise<void>(resolve => {
  setTimeout(() => {
    const cookie = new CookieUser();
    if (!cookie.checkCoockie("index")) {
      return false;
    }
    const userId = cookie.getOneCookie("index") as string;
    if (!userId) {
      throw new Error("[NavbarTopFC::task4]There is not userId");
    }
    const selectors = [
      { ".cloud .cloud-file": `${LocalRef.PROFILE_FILES}${userId}/` },
    ];
    selectors.forEach((item) => {
      const selector = Array.from(Object.keys(item))[0];
      const link = Array.from(Object.values(item))[0];
      const profileLinks = document.querySelectorAll(selector);
      if (profileLinks) {
        Array.from(profileLinks).forEach((item) => {
          (item as HTMLAnchorElement).href = link;
        });
      }
    });
    resolve();
  }, 100);
});

export default task4;
