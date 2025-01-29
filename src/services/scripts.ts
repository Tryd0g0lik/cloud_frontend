import { Loginout } from "src/interfaces";
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
export async function buttonLoginLogout(text: Loginout = Loginout.LOGIN) {
  setTimeout(() => {

    const divArray = document.querySelectorAll(".navbar .navbar-end > div");
    if (divArray.length < 2) {
      return false;
    }

    divArray.forEach((view, ind) => {
      if (text.toLowerCase().includes((Loginout.LOGIN).toLowerCase())) {
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


// Fetch()
/** ---- PATCH Method ----

 * @returns
 */
export async function fetches(prop: string) {

  let REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL as string;
  const cookie = new CookieUser();
  const indexOfCookie = cookie.getOneCookie("index");
  const url = `${REACT_APP_SERVER_URL}/api/v1/users/patch/${indexOfCookie}/`;
  // first is the 'GET' method for get a 'csrftoken'
  let response = await fetch(`${REACT_APP_SERVER_URL}/api/v1/users/`)
  if (!response.ok) {
    return response;
  }
  const result = await response.json();
  response = await fetch(url,
    {
      method: "PATCH",  // HttpMethods.PATCH,
      // mode: 'same-origin' as RequestMode,
      headers: {
        'X-CSRFToken': result["csrftoken"],
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      // credentials: "same-origin" as RequestCredentials,
      credentials: 'include' as RequestCredentials,
      body: prop //
    })
  return response
}
