import React from "react"
const handlerLogin = async (e: React.MouseEvent): Promise<boolean> => {
  if ((e.type) && (((e.type).toLowerCase() !== 'click') || (
    (e.target as HTMLElement).textContent?.toLowerCase() !== 'login'
  ))) {
    return false
  }
  // fetch()

  return true
}
export default handlerLogin
