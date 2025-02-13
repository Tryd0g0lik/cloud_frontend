/**
 * src\services\cookieServise.ts
 * Here is the class of Cookie and methods of the set new sessionId and to get the sessionId
 *
 * `https://github.com/js-cookie/js-cookie/` module is an alternative for a code below.
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
 * Services for a work wiht the cookie.
 * @sessionId string. It is a key for cookie.
 */
export class CookieUser {
  private _sessionId?: string
  private __liveTimer: number | string
  constructor() {
    this._sessionId = undefined;
    this.__liveTimer = 86400;
  }

  /**
   * The new sessionId (the cookie's key) saving in objects.
   * The 'sessionId' it is 'set'/'get'
   */
  get sessionId(): string {
    return this._sessionId as string
  }

  /**
 * Set the new sessionId (the cookie's key).
 */
  set sessionId(value: string) {
    this._sessionId = value;
  }

  /***
   * For set up the time in seconds. \
   * Default is live time  the 24 hours.
   * Timer of live single line to the cookie. \
   * 'object.liveTime = 2' It is a number of seconds.
   * It is a timer of live for a key's cookie.
   * This parrameter used to the 'setCookie' method for\
   * attribute 'options'. Look to the entry point from 'setCookie'.
   * @param values: number. It is a number of seconds.
   */
  set liveTimer(value: number) {
    this.__liveTimer = value * 1000;
  }

  /***
     * For get the time in seconds. \
     * Default is live time  the 24 hours.
     * Timer of live single line to the cookie. It is a number of seconds.
     * It is a timer of live for a key's cookie.
     * This parrameter used to the 'setCookie' method for\
     * attribute 'options'. Look to the entry point from 'setCookie'.
     */
  get liveTime(): string {
    const secondsStr = (this.__liveTimer).toString().slice();
    return secondsStr;
  }

  /**
   *
   * @param value: string | number. Value for a sessiionId /key.
   * @param options: object.\
   * ```ts
   * interface CookieOptions {
   *   key?: string;
   *   value?: string;
   *   max_age?: string; By default is live time to the 24 hours. Read to the below/
   *   path?: string;
   *   domain?: string;
   *   secure?: boolean;
   * }
   * ```
   * Mag_age: \
   * For get the time in seconds. \
   * Default is live time  the 24 hours.
   * Timer of live single line to the cookie. It is a number of seconds.
   * It is a timer of live for a key's cookie.
   * This parrameter used  for\
   * attribute 'options'. Look to the entry point.\
   * You can your self set uo the timer of live - 'options.max_age'. \
   * Don't forget you 'options.max_age * 1000'. Or, if you don't \
   * will be change this 'options' then You can inserting a number/integer to \
   * the method of 'object.liveTime = 2' (simple integer in sconds).
   *
   * @param secureBool: Boolean. It has value the true (by default). 'secureBoll', \
   * it is one from everyone properties of the cookie browser. It is \
   * the Cookie to only be transmitted over secure protocol as https.
   */
  setCookie(value: string | number,
    options: CookieOptions = { max_age: this.liveTime, }, secureBool = false): boolean {

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
   * Get one a line of cookie by a key.
   */
  getOneCookie(key: undefined | string = undefined): string | null {
    // const keyBool = this.checkCoockie(key);

    const cookies = document.cookie


    key = key ? this.__encodeKey(key) : this.__encodeKey();
    const parts = `; ${cookies}`.split(`; ${key}=`)
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() as string;
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
 * Encode a key and value for the key, before when be save in cookie
 */
export function encodeKeyValueOfCookie(key: string, value: string | number): string {

  let updateCookie: string = "";
  if (String(value).match(/^\w+$/) && String(key).match(/^\w+$/)) {
    updateCookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  }
  else if (String(value).match(/^\w+$/) && !String(key).match(/^\w+$/)) {
    updateCookie = `${key}=${encodeURIComponent(value)}`;
  }
  else if (!String(value).match(/^\w+$/) && String(key).match(/^\w+$/)) {
    updateCookie = `${encodeURIComponent(key)}=${value}`;
  } else {
    updateCookie = `${key}=${value}`;
  }
  return updateCookie;
}

