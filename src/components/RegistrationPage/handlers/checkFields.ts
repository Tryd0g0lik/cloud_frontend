import { json } from "body-parser";
import { includes } from "lodash"
import { KeyboardEvent } from "react"


// REACT_APP_SERVER_URL = (REACT_APP_SERVER_URL === undefined) ? "" : REACT_APP_SERVER_URL;
const sendFieldsOfRegistr = async (e: KeyboardEvent): Promise<string> => {
  let REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL as string;
  const regexUsername = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
  const regexLogin = /^[a-zA-Z\s0-9_-]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if ((e.type) && (!(e.type).toLowerCase().includes("keydown")) || (
    e.key && !(e.key.toLowerCase()).includes("enter")
  )) {
    return "Not Ok"
  }
  e.preventDefault()
  const map = new Map()
  const formHtml = (e.target as HTMLFormElement).form
  for (let i = 0; i < formHtml.length; i++) {
    // Remove the color red from border of the label
    if (formHtml[i].parentElement.style.border.length > 0) {
      const lebalHtml = formHtml[i].parentElement;
      lebalHtml.style.border = ""
    };

    if (formHtml[i].name.toLowerCase().includes("email") && (
      !(formHtml[i].checkValidity()) || !(emailRegex.test(formHtml[i].value)
      ))) {
      formHtml[i].parentElement.style.border = "1px solid red";
      return "Not Ok";
    }
    else if (formHtml[i].name.toLowerCase().includes("username") && (!(
      formHtml[i].checkValidity()
    ) || !(regexUsername.test(formHtml[i].value))
    )) {
      formHtml[i].parentElement.style.border = "1px solid red";
      return "Not Ok";
    }
    // else if (formHtml[i].name.toLowerCase().includes("first_name") && (
    //   !(formHtml[i].checkValidity()) || !(regexLogin.test(formHtml[i].value))
    // )) {
    //   formHtml[i].parentElement.style.border = "1px solid red";
    //   return "Not Ok";
    // }

    else if (formHtml[i].name.toLowerCase().includes("password") && !(formHtml[i].checkValidity())) {
      formHtml[i].parentElement.style.border = "1px solid red";
      return "Not Ok";
    }
    else if (formHtml[i].name.toLowerCase().includes("password2") && !(formHtml[i].checkValidity()) && !(
      (formHtml[i - 1].value) === formHtml[i].value)) {
      formHtml[i].parentElement.style.border = "1px solid red";
      return "Not Ok";
    }
    map.set(formHtml[i].name.toLowerCase(), formHtml[i].value)
  }
  // const headers = new Headers({
  //   "Set-Cookie": "name1=value1",
  // })
  // const requestBody = JSON.stringify({
  const requestBody = JSON.stringify({
    "username": map.get("username"),
    "first_name": null,
    "email": map.get("email"),
    "password": map.get("password"),
    "is_superuser": false
  }
  )
  try {
    const response = await fetch(`${REACT_APP_SERVER_URL}/api/v1/users/choice/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: requestBody
    })
    if (response.ok) {
      const responseJson = await response.json();
      return String(responseJson);
    }
    if (!response.ok) {

      // Если ответ не успешный (например, 4xx или 5xx)
      return response.json().then(err => {
        const message = ""
        if (typeof (err) === "object") {

          throw new Error(JSON.stringify(err));
        }
        throw new Error(err.message || 'Ошибка');
      });
    }
    // else {
    //   const errorData = await response.body;
    //   return "Not Ok"
    // }
    // const resultJson = await response;
    // return "Ok"
  } catch (e: unknown | any) {
    console.error(e.message)
  } finally {
    null
  }
  return "Ok"
}

export default sendFieldsOfRegistr
