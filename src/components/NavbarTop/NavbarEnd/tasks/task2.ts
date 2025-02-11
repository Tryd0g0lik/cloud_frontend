import { CookieUser } from "@Services/cookieServices";
const task2 = () => new Promise<void>(resolve => {

  setTimeout(() => {
    const coockie = new CookieUser();
    const userId = coockie.getOneCookie("index") as string;
    if (userId) {
      const profileLink = document.querySelector('a[href="/profile/"]');
      if (profileLink) {
        (profileLink as HTMLAnchorElement).href =
          (profileLink as HTMLAnchorElement).href + `${userId}/`;
      }
    }
    resolve();
  }, 100)
});
export default task2;
