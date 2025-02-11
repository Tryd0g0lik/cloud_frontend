// COMMON
export enum Pages {
  Home = "/"
}

export enum HttpMethods {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export enum Loginout {
  LOGOUT = "Logout",
  LOGIN = "Login"
}

export enum UserLevel {
  ADMIN = "Admin",
  PASSANGER = "Passanger"
}


export enum UserAPI {
  BASIS = "/api/v1/users/",
  CHOICE = "/api/v1/users/choice/",
  PATCH = "/api/v1/users/patch/",
  GETofAPI = "/api/v1/users/get/"
}

export interface FetchParams {
  method: HttpMethods,
  body?: string,
  headers?: {
    "X-CSRFToken"?: string,
    "Content-Type": "application/json"
  },
  credentials?: "some-origin"
}
// COOKIE
export interface CookiOptions {
  expires?: Date | string,
  path?: string,
  domain?: string,
  secure?: boolean,
  sameSite?: "Strict" | "Lax" | "None"
}

// H1 header insede of page
export interface HeaderForPages {
  maintitle: string
}

// PROFILE
export interface Usermeta {
  username: string,
  firstname?: string,
  lastname?: string,
  email?: string,
  userlevel?: UserLevel.PASSANGER | UserLevel.ADMIN,
  password: boolean,
  is_suoeruser?: boolean,
  is_active?: boolean,
  is_staff?: boolean,
  "date_joined"?: string,
  "last_login"?: string,
  "first_name"?: string,
  "last_name"?: string,

}
// interface Profile {
//   usermeta: Usermeta,
// }
