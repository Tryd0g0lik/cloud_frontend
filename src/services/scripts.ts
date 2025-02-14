// import { Loginout } from "src/interfaces";
import { CookieUser } from "@Services/cookieServices";
// import Encrypto from "@Services/encrypts";
// import { result } from "lodash";

/**
 * To the `DOM` add or remove the 'active' class (`div#root.active`).
 */
export function changeDOM(active = false) {
  setTimeout(() => {
    const divHtml = document.getElementById("root");
    if (divHtml) {
      let classes = divHtml.className;
      if ("active".includes(classes) && !active) {
        divHtml.className = classes.replace("active", "");
      } else {
        divHtml.classList.add("active");
      }
    }
  }, 300);
}

/**
 *The function changes the text from right upper button.
 * @param text 'Logout' or 'Login'
 */
export async function buttonLoginLogout() {
  setTimeout(() => {

    const divArray = document.querySelectorAll(".navbar .navbar-end > div");
    if (divArray.length < 2) {
      return false;
    }
    const cookie = new CookieUser();
    if (!cookie.checkCoockie("is_active")) {
      throw new Error('[scripts::buttonLoginLogout]: Mistake => The key "is_active" in cookie not found!');
    }
    const is_active_str = cookie.getOneCookie("is_active");

    divArray.forEach((view, ind) => {
      // if (text.toLowerCase().includes((Loginout.LOGIN).toLowerCase())) {
      if (Boolean(is_active_str) &&
        (is_active_str as string).toLowerCase().includes("true")) {
        if (ind === 0) {
          (view.firstElementChild as HTMLElement).innerText = "Logout";
          (view as HTMLAnchorElement).href = "";
        } else {
          view.classList.add("remove")
        }
      } else {
        if (ind === 0) {
          (view.firstElementChild as HTMLElement).innerText = "Login";
          (view as HTMLAnchorElement).href = "/users/login/";
        } else {
          view.parentElement?.classList.remove("remove");
        }
      }
    });
  }, 300);
}


/**
 * Here, DOM cleanses from the insert
 */
export default async function cleaning() {
  const alterHtml = document.querySelectorAll('.alter');
  if (alterHtml.length === 0) {
    return false
  }
  Array.from(alterHtml).forEach((item) => {
    item.remove();
  });
}



export const errorFormAuthentification = {
  email: {
    valueMissing: "Проверьте указанный вами - email.",
    typeMissing: "Данные не соответствуют шаблонному типу данных.",
  },
  username: {
    valueMissing: "Проверьте символы в имени.",
    typeMissing: "Не тот тип данных",
  },
  password: {
    valueMissing: "Проверьте количество сиволов или наличие пробелов. Min. 6. "
  }
}
