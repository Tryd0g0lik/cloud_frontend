/**
 * src\services\encrypts.ts
 */
import CryptoJS from "crypto-js";
const secretKey = process.env.REACT_APP_SECRET_KEY ? process.env.REACT_APP_SECRET_KEY as string : "need_secret_key";


/**
 * For the encrypt of data, where data it is type of string.\
 * Enatry-point receives for encryply.
 *
 * 'this.encryotData' = Method returns a string after encrypt.
 *
 * Get a secret_message 'this.dencrypt = < secret_message_for_decrypt >' for decrypt.\
 * And second the 'this.dencrypt' return a basis message/text.
 */
class Encrypto {
  __secretKey: string
  message: string

  /**
   *
   * @param message: string. For encrypt.
   */
  constructor(message: string) {
    this.message = message;
    this.__secretKey = `${secretKey}`;
  }

  /**
   *
   * @returns Type string. Methot returns a string after encrypt.
   */
  encryptData(): string {
    const key = this.__secretKey.slice();
    const ciphertext = CryptoJS.AES.encrypt(this.message.slice(), key).toString();
    return ciphertext;
  }

  /**
   * Get a secret_message 'this.dencrypt = < secret_message_for_decrypt >' for decrypt.
   * @param seccret_message: string.
   */
  set dencrypt(seccret_message: string) {
    this.message = seccret_message;
  }

  /**
   * @return a basis message/text after the decrypt.
   */
  get decrypt(): string {
    const key = this.__secretKey.slice();
    const bytes = CryptoJS.AES.decrypt(this.message.slice(), key);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText
  }
}
