/**
 * src\services\cookieServise.ts
 * Here is the class of Cookie and methods of the set new sessionId and to get the sessionId
 */

interface CookieOptions {
  max_age?: string
  path?: string
  domain?: string
  secure?: boolean
}

/**
 * Services for a work wiht the cookie
 */
class CookieUser {
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

  setCookie(value: string | number,
    options: CookieOptions = {}) {

    options = {
      path: "/",
      secure: true,
      ...options
    };
    // GET KEY
    const key = this.sessionId;
    // ENCODE
    let updateCookie = encodeKeyValueOfCookie(key, value);

    // get PARAMS for document.cookie
    for (let optionKey in options) {
      updateCookie += `; ${optionKey}`;
      if (options[optionKey] !== true) {
        updateCookie += `=${options[optionKey]}`
      }
    }
    document.cookie = updateCookie;
  }

  /**
   * Entry point gets a sessionId (key) from the cookie.\
   * Checks the key. If the sessionId exists, means return the true.\
   *  It, not exists, return the false.
   */
  checkCoockie(key: string): boolean {

    // ENCODE
    if (key.match(/^\w+$/)) {
      key = encodeURIComponent(key);
    }
    // CHECKs
    if (document.cookie[key]) {
      return true;
    }
    return false;
  }

  /**
   * Removing the data (the single row) by an one the key.\
   * First, the key will go for verification whether it exists or not.
   */
  deleteCookie(): boolean {
    let key = this.sessionId;
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
function encodeKeyValueOfCookie(key: string, value: string | number): string {

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
