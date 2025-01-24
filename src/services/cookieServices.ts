/**
 * src\services\cookieServise.ts
 * Here is the class of Cookie and methods of the set new sessionId and to get the sessionId
 */

interface CookieOptions {
  key?: string;
  value?: string;
  max_age?: string;
  path?: string;
  domain?: string;
  secure?: boolean;
}

/**
 * Services for a work wiht the cookie
 */
export class CookieUser {
  private _sessionId: string
  constructor(sessionId: string) {
    this._sessionId = sessionId;
  }

  /**
   * The sessionId (the cookie's key) will recieve.
   */
  get sessionId(): string {
    return this._sessionId
  }

  /**
 * Set the new sessionId (the cookie's key).
 */
  set sessionId(value: string) {
    this._sessionId = value;
  }

  /**
   *
   * @param value: string | number. Value for a sessiionId /key.
   * @param options: object.\
   * ```ts
   * interface CookieOptions {
   *   key?: string;
   *   value?: string;
   *   max_age?: string;
   *   path?: string;
   *   domain?: string;
   *   secure?: boolean;
   * }
   * ```
   * @param secureBool: Boolean. It has value the true  by default. 'secureBoll', \
   * it is one from everyone properties of the cookie browser.
   */
  setCookie(value: string | number,
    options: CookieOptions = {}, secureBool = true): boolean {

    options = {
      path: "/",
      secure: secureBool,
      ...options
    };
    try {
    // GET KEY
    const key = this.sessionId.slice();
    // ENCODE
    let updateCookie = encodeKeyValueOfCookie(key, value);

    // get PARAMS for document.cookie
      for (let optionsKey in options) {
        updateCookie += `; ${optionsKey}`;
        // if (Object.hasOwn(options, optionsKey)) {
        updateCookie += `=${options[optionsKey as keyof CookieOptions]}`
      // }
      }
    document.cookie = updateCookie;
      return true;
    } catch (e: unknown | object | string) {
      throw new Error(e as string)
    }
  }

  /**
   * Encode the sessionId (key).
   * @param key: string, If , the key to the enrty point equals the 'undefined',\
   * the key receives a value from the 'this.sessionId'
   * @returns the encoded string
   */
  __encodeKey(key: undefined | string = undefined): string {
    if (key && key.match(/^\w+$/)) {
      key = encodeURIComponent(key);
    } else {
      if (this.sessionId.match(/^\w+$/)) {
        key = encodeURIComponent(this.sessionId);
      } else {
        key = this.sessionId.slice();
      }
    }
    return key.slice()
  }

  /***
   * Get one the line of cookie.
   */
  getOneCookie(key: undefined | string = undefined): string | null {
    // const keyBool = this.checkCoockie(key);

    const cookies = document.cookie
    // return cookieRow.slice()
    if (key) {
      key = this.__encodeKey(key);
      const parts = `; ${cookies}`.split(`; ${key}=`)
      if (parts.length === 2) {
        return parts.pop()?.split(';').shift() as string;
      }
    }

    return null;
  }

  /**
   * Entry point gets a sessionId (key) from the cookie.\
   * Checks the key. If the sessionId exists, means return the true.\
   *  It, not exists, return the false.
   */
  checkCoockie(key: undefined | string = undefined): boolean {

    // ENCODE
    key = this.__encodeKey(key);
    // if (key && key.match(/^\w+$/)) {
    //   key = encodeURIComponent(key);
    // } else {
    //   if (this.sessionId.match(/^\w+$/)) {
    //     key = encodeURIComponent(this.sessionId);
    //   } else {
    //     key = this.sessionId.slice();
    //   }
    // }
    // CHECKs
    if (this.getOneCookie(key) !== null) {
      return true;
    }
    return false;
  }

  /**
   * Removing the data (the single row) by an one the key.\
   * First, the key will go for verification whether it exists or not.
   */
  deleteCookie(): boolean {
    let key = this.sessionId.slice();
    if (!this.checkCoockie(key)) {
      return false;
    }

    if (key.match(/^\w+$/)) {
      key = encodeURIComponent(key);
    } else if (!key.match(/^\w+$/)) {
      return true
    }

    return false
  }
}


/**
 * Encode a key and value for the key before when be save in cookie
 */
export function encodeKeyValueOfCookie(key: string, value: string | number): string {

  let updateCookie: string = "";
  if (String(value).match(/^\w+$/) && String(key).match(/^\w+$/)) {
    updateCookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  }
  else if (String(value).match(/^\w+$/) && !String(key).match(/^\w+$/)) {
    updateCookie = `${encodeURIComponent(key)}=${value}`;
  }
  else if (!String(value).match(/^\w+$/) && String(key).match(/^\w+$/)) {
    updateCookie = `${key}=${encodeURIComponent(key)}`;
  } else {
    updateCookie = `${key}=${value}`;
  }
  return updateCookie;
}

