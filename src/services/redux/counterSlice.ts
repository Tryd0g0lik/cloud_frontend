/**
 * src\services\redux\counterSlice.ts
 */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TitleState {
  title: "Login" | "Logout"
}


const initialState: TitleState = {
  title: "Login",
}

/**
 * For a text to  buttom-end. Is 'login' or 'logout'  after the event 'click' by byttom.
 */
export const titleSlice = createSlice({
  name: 'title',
  initialState,
  reducers: {
    login: (state) => {
      state.title = "Login"
    },

    logout: (state) => {
      state.title = "Logout"
    },

    changeTitle: (state: TitleState,
      action: PayloadAction<"Login" | "Logout">) => {
      state.title = action.payload
    }
  }
})

export const { login, logout, changeTitle } = titleSlice.actions;
export default titleSlice.reducer
