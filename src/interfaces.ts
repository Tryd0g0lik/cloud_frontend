export enum Pages {
  Home = "/"
}

export enum FetchMethods {
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

export interface FetchParams {
  method: FetchMethods,
  body?: string,
  headers?: {
    "X-CSRFToken"?: string,
    "Content-Type": "application/json"
  }
}

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
