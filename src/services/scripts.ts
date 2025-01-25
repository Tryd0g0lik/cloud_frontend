import { Loginout } from "src/interfaces";

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
 *
 * @param text 'Logout' or 'Login'
 */
export function buttonLoginLogout(text: Loginout = Loginout.LOGIN) {
  setTimeout(() => {
    const divArray = document.querySelectorAll(".navbar .navbar-end > div");
    if (divArray.length < 2) {
      return false;
    }

    divArray.forEach((view, ind) => {
      if (text.toLowerCase().includes("login")) {
        if (ind === 0) {
          (view.firstElementChild as HTMLElement).innerText = "Logout";
        } else {
          view.classList.add("remove")
        }
      } else {
        if (ind === 0) {
          (view.firstElementChild as HTMLElement).innerText = "Login";
        } else {
          view.parentElement?.classList.remove("remove");
        }
      }
    });
  }, 300);
}


