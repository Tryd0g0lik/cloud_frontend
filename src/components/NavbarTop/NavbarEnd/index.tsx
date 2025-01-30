/**
 * src\components\NavbarTop\NavbarEnd\index.tsx
 */
import React, { JSX, useState, useEffect } from 'react';

interface ButtonEndTitle {
  text?: "Login" | "Logout"
}

/**
 * Change a text from the 'a.btn' and  'div.registration' for display or removed
 * @param 'props.text': this is 'HTMLELement.text' for the '.btnend a' of 'a.btn'
 */
export function NavbarEndFC(props: ButtonEndTitle = { text: undefined }): JSX.Element {
  const text = props.text
  return (
    <div className="navbar-end w-20">

      <div className='btnend'>
        {text && <a className="btn">{text}</a>}
      </div>

      <div className={`registration ${text &&
        text === 'Logout' ? "remove" : ''}`} >
        <a href='/users/registration/' className="link link-neutral">Регистрация</a>
      </div>



    </div>
  )
}
