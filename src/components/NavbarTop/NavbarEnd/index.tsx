import React, { JSX, useState, useEffect } from 'react';

interface ButtonEndTitle {
  text?: "Login" | "Logout"
}
/**
 * Change a text from the 'a.btn' and  'div.registration' for display or removed
 * @param 'props.text': this is 'HTMLELement.text' for the '.btnend a' of 'a.btn'
 */
export function NavbarEndFC(props: ButtonEndTitle = { text: undefined }): JSX.Element {


  const [name, setName] = useState("login");
  const [classname, setClassname] = useState<string>("");
  // 
  if (props?.text !== undefined) {
    setName(props?.text as "Login" | "Logout")
    if (props?.text === "Login") {
      setClassname("remove")
    }
    else {
      setClassname("")
    }
  }
  return (
    <div className="navbar-end w-20">

      <div className='btnend'>
        <a className="btn">{name}</a>
      </div>
      <div className={`registration ${classname}`} >
        <a className="link link-neutral">Регистрация</a>
      </div>

    </div>
  )
}
