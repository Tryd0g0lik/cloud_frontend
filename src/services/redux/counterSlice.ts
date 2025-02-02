/**
 * src\services\redux\counterSlice.ts
 */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchLoginOut } from "@Services/request/loginout";
import { HttpMethods, Loginout } from "src/interfaces";
export interface TitleState {
  title: "Login" | "Logout"
}


const initialState: TitleState = {
  title: "Login",
}

// const encrypto = new Encrypto(localStorage.getItem("session") as string);

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
// const url = `${REACT_APP_SERVER_URL}/api/v1/users/patch/${encrypto.decrypt}/`;

// const url = new URL(`/api/v1/users/patch/${encrypto.decrypt}/`, `${REACT_APP_SERVER_URL}`);
/**
 * For a text to  buttom-end. Is 'login' or 'logout'  after the event 'click' by byttom.
 *  * Function for change the boolean's value to the 'is_active'.
 * @param bool boolean. The default value is 'false'. \
 * It means, what the user go out from \
 * the his profile. 'true' - it means what the user is an authorized.
 */
export const titleSlice = createSlice({
  name: 'title',
  initialState,
  reducers: {
    login: (state) => {
      // const task0 = () => new Promise(resolve => resolve(async () => )
      // if (state.title === Loginout.LOGOUT) {
        (async () => {
          fetchLoginOut(JSON.stringify({ is_active: false })).then(response => {
              if (response.ok) {
                state.title = Loginout.LOGIN;
                return true;
              }
              return false;
            }).catch(response => {
              console.error(response);
            });
        })();
      // }
    },

    logout: (state) => {
      // if (state.title === Loginout.LOGIN) {
        (async () => {
          fetchLoginOut(JSON.stringify({ is_active: true })).then(response => {
              if (response.ok) {
                state.title = Loginout.LOGOUT;
                return true;
              }
              return false;
            }).catch(response => {
              console.error(response);
            });
        })();
      // }
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


