import React, { JSX, useState, useEffect } from 'react';

interface ButtonEndTitle {
  text?: "Login" | "Logout"
}
/**
 * Change a text from the 'a.btn' and  'div.registration' for display or removed
 * @param 'props.text': this is 'HTMLELement.text' for the '.btnend a' of 'a.btn'
 */
export function NavbarEndFC(props: ButtonEndTitle = { text: undefined }): JSX.Element {


  // const [title, setTitle] = useState(props.text);
  const [classtitle, setClasstitle] = useState<string>("");
  //
  // useEffect(() => {
  //   if (props.text) {
  //     if (((props?.text as string).toLowerCase()).includes("Login".toLowerCase())) {
  //       // setTitle(props?.text as "Login" )
  //       // if (props?.text === "Login") {
  //       // setClasstitle("remove")
  //       // }
  //       // else {
  //       setClasstitle("")
  //       // }
  //     } else if (((props?.text as string).toLowerCase()).includes("Logout".toLowerCase())) {
  //       setClasstitle("remove")
  //       // setTitle(props.text)
  //     }
  //   }

  // }, [])

  return (
    <div className="navbar-end w-20">

      <div className='btnend'>
        {props.text && <a className="btn">{props.text}</a>}
      </div>
      {/* <div className={`registration ${classtitle}`} > */}
      <div className={`registration`} >
        <a className="link link-neutral">Регистрация</a>
      </div>

    </div>
  )
}
