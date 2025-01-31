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
  USER = "Passanger"
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
