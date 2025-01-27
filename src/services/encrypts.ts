/**
 * src\services\encrypts.ts
 */
import CryptoJS from "crypto-js";
const SECRETKEY = process.env.REACT_APP_SECRET_KEY ? process.env.REACT_APP_SECRET_KEY as string : "need_secret_key";


/**
 * For the encrypt of data, where data it is type of string.\
 * Enatry-point receives for encryply.
 *
 * 'this.encryotData' = Method returns a string after encrypt.
 *
 * Get a secret_message 'this.dencrypt = < secret_message_for_decrypt >' for decrypt.\
 * And second the 'this.dencrypt' return a basis message/text.
 */
export default class Encrypto {
  message: string

  /**
   *
   * @param message: string. For encrypt.
   */
  constructor(message: string) {
    this.message = message;
  }

  get __secretKey() {
    return `${SECRETKEY}`.slice();
  }

  /**
   *
   * @returns Type string. Methot returns a string after encrypt.
   */
  encryptData(): string {
    const key = this.__secretKey;
    if (!this.message) {
      // throw new Error("[Encrypto.encryptData]: Mistake => 'message' is invalid.")
      return "";
    }
    const ciphertext = CryptoJS.AES.encrypt(this.message.slice(), key).toString();
    return ciphertext;
  }

  /**
   * Get a new message 'this.dencrypt = < secret_message_for_decrypt >' for decrypt.
   * @param seccret_message: string.
   */
  set dencrypt(message: string) {
    this.message = message;
  }

  /**
   * @return a basis message/text after the decrypt.
   */
  get decrypt(): string {
    const key = this.__secretKey;
    if (!this.message) {
      // throw new Error("[Encrypto.decrypt]: Mistake => 'message' is invalid.")
      return "";
    }
    const bytes = CryptoJS.AES.decrypt(this.message.slice(), key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText
  }
}
