/**
 * src\components\MainPage\handlers\handlerAddUser.ts
 * @returns
 */
import React from "react";
import { LocalRef } from "@Interfaces";

/**
 *
 * @param e MouseEvent
 * @returns
 */
export function handlerButtonAddNewUser(e: React.MouseEvent) {

  // GET THE HTML OF DIV.ADDUSER (button for adding a new user ) FROM MAIN PAGE
  const divHTML = document.querySelector("div.adduser");
  if (!divHTML) {
    console.warn("[handlerAddUser.ts::handlerAddNewUser]: 'div.ADDUSER' Not found in DOM!")
    return false;
  }

  // RELOCATION TO THE PAGE FOR ADD NEW USERS (ADMIN INTERFACE)
  window.location.href = LocalRef.REGISTRATION;



}
