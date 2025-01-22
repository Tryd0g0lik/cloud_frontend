/**
 * src\services\redux\store.ts
 * Redux store
 */
import { configureStore } from "@reduxjs/toolkit";
import currentReducer from "./counterSlice"
export const store = configureStore({
  reducer: {
    current: currentReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
