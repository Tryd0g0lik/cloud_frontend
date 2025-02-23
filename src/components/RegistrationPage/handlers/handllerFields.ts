/***
 * src\components\RegistrationPage\handlers\handllerFields.ts
 */
import cleaning, { errorFormAuthentification } from "@Services/scripts";
import { KeyboardEvent } from "react"
import { UserLevel, UserAPI } from "@Interfaces";
/**
 * Here is we creat a new user of web-site.
 * @param e This is the Event (KeyboardEvent) of registration.
 * @returns 'OK' or 'Not OK'
 */
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

    // CHECK ON FALIDATE
    if (formHtml[i].name.toLowerCase().includes("email") && (
      !(formHtml[i].checkValidity()) || !(emailRegex.test(formHtml[i].value)
      ))) {
      formHtml[i].parentElement.style.border = "1px solid red";
      formHtml[i].setCustomValidity(errorFormAuthentification["email"]["valueMissing"]);
      formHtml[i].reportValidity();
      return "Not Ok";
    }
    else if (formHtml[i].name.toLowerCase().includes("username") && (!(
      formHtml[i].checkValidity()
    ) || !(regexUsername.test(formHtml[i].value)) || formHtml[i].value.length < 4 ||
      formHtml[i].value.length > 20
    )) {
      formHtml[i].parentElement.style.border = "1px solid red";
      formHtml[i].setCustomValidity(errorFormAuthentification["username"]["valueMissing"]);
      formHtml[i].reportValidity();
      return "Not Ok";
    }
    else if (formHtml[i].name.toLowerCase().includes("password") &&
      !(formHtml[i].checkValidity() || formHtml[i].value.length < 6)) {
      formHtml[i].parentElement.style.border = "1px solid red";
      formHtml[i].setCustomValidity(errorFormAuthentification["password"]["valueMissing"]);
      return "Not Ok";
    }
    else if (formHtml[i].name.toLowerCase().includes("password2") && !(formHtml[i].checkValidity()) && !(
      (formHtml[i - 1].value) === formHtml[i].value)) {
      formHtml[i].parentElement.style.border = "1px solid red";
      formHtml[i].setCustomValidity(errorFormAuthentification["password"]["valueMissing"]);
      return "Not Ok";
    }
    // SAVE THE DATA IN THE MAP
    map.set(formHtml[i].name.toLowerCase(), formHtml[i].value)
  }
  // SAVE THE DATA IN JSON FROM THE MAP
  const requestBody = JSON.stringify({
    "username": map.get("username"),
    "first_name": null,
    "email": map.get("email"),
    "password": map.get("password"),
    "is_staff": false
  }
  )
  try {
    // CREATE THE PARALLEL STREAMED - TASK0
    const task0 = () => new Promise<void>(resolve => { cleaning(); resolve()});
    (async () => await Promise.allSettled([task0]))();
    // REQUUEST FOR GET CRF TOKEN FROM THE SERVER
    let response = await fetch(`${REACT_APP_SERVER_URL}${UserAPI.BASIS}`)
    if (!response.ok) {
      throw new Error(`[loginout.ts::fetchLoginOut]: HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    // SEND TO THE DATA TO THE SERVER
    response = await fetch(`${REACT_APP_SERVER_URL}${UserAPI.CHOICE}`, {
      method: "POST",
      headers: {
        'X-CSRFToken': result["csrftoken"],
        "content-type": "application/json",
      },
      body: requestBody
    })
    if (response.ok) {
      const responseJson = await response.json();
      const messageHtml = "<div class='alter'><storng>Сообщение на почте</storng>";
      (formHtml.parentElement as HTMLFormElement).insertAdjacentHTML("afterend", messageHtml);
      return String(responseJson);
    }
    if (!response.ok) {

      // Если ответ не успешный (например, 4xx или 5xx)
      response.json().then(err => {
        if (typeof (err) === "object") {
          let messageHtml = "<div class='alter error'>";
          Array.from(Object.keys(err)).forEach((key) => {
            messageHtml += `<storng>${key}:</storng> ${err[key]}. `;

          });
          messageHtml += "</div>";

          (formHtml.parentElement as HTMLFormElement).insertAdjacentHTML("afterend", messageHtml);
          return messageHtml
        }
        (formHtml.parentElement as HTMLFormElement).insertAdjacentHTML("afterend",
          `<div <div class='alter error'>${'Ошибка'}</div>`);
      });
    }
  } catch (e: unknown | any) {
    console.error(e.message)
  } finally {
    null
  }
  return "Ok"
}

export default sendFieldsOfRegistr
