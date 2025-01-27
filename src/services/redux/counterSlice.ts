/**
 * src\services\redux\counterSlice.ts
 */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Encrypto from "@Services/encrypts";
import { result } from "lodash";
import { HttpMethods, Loginout } from "src/interfaces";
let REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL as string;
export interface TitleState {
  title: "Login" | "Logout"
}


const initialState: TitleState = {
  title: "Login",
}

const encrypto = new Encrypto(localStorage.getItem("session") as string);

// const fetches = () => fetch(
//   `${REACT_APP_SERVER_URL}/api/v1/users/patch/${encrypto.decrypt}/`,
//   {
//     method: HttpMethods.PATCH,
//     headers: {
//       "content-type": "application/json",
//     },
//     body: JSON.stringify({ is_active: false })
//   }
// )
const url = `${REACT_APP_SERVER_URL}/api/v1/users/patch/${encrypto.decrypt}/`;
/**
 * For a text to  buttom-end. Is 'login' or 'logout'  after the event 'click' by byttom.
 */
export const titleSlice = createSlice({
  name: 'title',
  initialState,
  reducers: {
    login: (state) => {
      // const task0 = () => new Promise(resolve => resolve(async () => )
      if (state.title === Loginout.LOGOUT) {
        (async () => {
          const response = await fetch(`${REACT_APP_SERVER_URL}/api/v1/users/`)
          if (!response.ok) {
            return false;
          }
          const result = await response.json();
          fetch(url,
            {
              method: HttpMethods.PATCH,
              headers: {
                'X-CSRFToken': result["csrftoken"],
                "content-type": "application/json",
              },
              credentials: "same-origin" as RequestCredentials,
              body: JSON.stringify({ is_active: false })
            }).then(response => {
              if (response.ok) {
                state.title = Loginout.LOGIN;
                return true;
              }
              return false;
            }).catch(response => {
              console.error(response);
            });
        })();
      }
    },

    logout: (state) => {
      if (state.title === Loginout.LOGIN) {
        (async () => {
          const response = await fetch(`${REACT_APP_SERVER_URL}/api/v1/users/`)
          if (!response.ok) {
            return false;
          }
          const result = await response.json();
          fetch(url,
            {
              method: HttpMethods.PATCH,
              headers: {
                'X-CSRFToken': result["csrftoken"],
                "content-type": "application/json",
              },
              credentials: "same-origin" as RequestCredentials,
              body: JSON.stringify({ is_active: false })
            }).then(response => {
              if (response.ok) {
                state.title = Loginout.LOGOUT;
                return true;
              }
              return false;
            }).catch(response => {
              console.error(response);
            });
        })();
      }
      // state.title = Loginout.LOGOUT
    },

    changeTitle: (state: TitleState,
      action: PayloadAction<"Login" | "Logout">) => {
      state.title = action.payload
    }
  }
})

export const { login, logout, changeTitle } = titleSlice.actions;
export default titleSlice.reducer
