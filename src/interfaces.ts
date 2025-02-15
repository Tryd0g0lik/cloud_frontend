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

// API URL
export enum UserAPI {
  BASIS = "/api/v1/users/",
  CHOICE = "/api/v1/users/choice/",
  CHOICE_PK = "/api/v1/users/choice/:userId/",
  PATCH = "/api/v1/users/patch/",
  PATCH_PK = "/api/v1/users/patch/:userId/",
  GETofAPI = "/api/v1/users/get/",
  FILESREMOVE_PK = "/api/v1/files/:userId/remove/", // :userId - replace to the id: string of the string
  FILESCOMMENT_PK = "/api/v1/files/:userId/update_comment/", // :userId - replace to the id: string of the string
  REFERRAL_LINKS = "/api/v1/files/:userId/referral_links/", // :userId - replace to the id: string of the string
}
export enum LocalRef {
  ACTIVATION = "/users/login/", // Page where we can see the form actiovation
  REGISTRATION = "/users/registration/", // // Page where we can see the form user's registration
  PROFILEFILES = "/profile/files/"
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
