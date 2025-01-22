import React from "react"
const handlerLogin = (e: React.MouseEvent): boolean => {
  if ((e.type) && ((e.type).toLowerCase() !== 'click')) {
    return false
  }
  const divHtml = document.querySelector(".navbar-end .btnend");
  // const linkHtml = divHtml?.getHTML
  // if ('login'.includes((e.currentTarget as HTMLElement).textContent as string)) {
  //   e.preventDefault()

  // }
  // else if ('logout'.includes((e.currentTarget as HTMLElement).textContent as string)) {
  //   e.preventDefault()
  //   null

  // }


  // const target = (e.target) as HTML

  return true
}
export default handlerLogin
