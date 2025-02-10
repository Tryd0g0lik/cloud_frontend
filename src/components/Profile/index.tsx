/**
 * src\components\Profile\index.tsx
 * Open the profile page. In to 'Profile' page, you can see the user's information.
 */
import React, { JSX, useState, useEffect } from "react";
import { Usermeta, UserLevel } from "@Interfaces";
import { HydrateFallback } from "src/components/Loading";
import { profileLoader } from "@Services/request/profileloading"
import { NavbarTopFC } from "src/components/NavbarTop";
import { handlerProfileField } from "./handlers/handlerProfileFields"
// The simple emapty data for the 'Profile's' page.
const plugProfile: Usermeta = {
  "username": "Пользователь",
  "password": false
};
/**
 * Open the prof 'Profile' page.From a first 'Profile' page, you can see the user's information.\
 * - 'setPRofile' - Set the user's information. It is a state to the 'Profile' page.
 * @param {Usermeta} profile - The user's information.
 * @returns JSX.Element - The page's content.
 */
export function ProfileFC(): JSX.Element {
  // profile - The user's information. from the server.
  const [profile, setProfile] = useState<Usermeta>(plugProfile);
  // userName - The user's name.
  const [userName, setUserName] = useState<string>("!");

  useEffect(() => {
  // SEND request to the server. to get the user's information. from the server.
    return (() => {
      (async () => {
        // Run the loader request to the server. It to get the user's information.
        //  from the server.
        const response: Usermeta | {} = await profileLoader();
        if (typeof response === "boolean" && typeof response !== "object") {
          console.log("[ProfileFC]: 'Profile\index.tsx' Mistake => Somefing What wrang not true ")
          return false;
        }

        // Change Set the user's information on the 'Profile' page, from db.
        setProfile({
          "username": (response as Usermeta)["username"] || "",
          "firstname": (response as Usermeta)['first_name'] || undefined,
          "lastname": (response as Usermeta)["last_name"] || undefined,
          "email": (response as Usermeta)["email"] || undefined,
          "userlevel": (response as Usermeta)["is_superuser"] ? (
            (response as Usermeta)["is_superuser"] ?
              UserLevel.ADMIN : UserLevel.PASSANGER) : undefined,
          "password": false,
          "is_staff": (response as Usermeta)["is_superuser"] ? (
            (response as Usermeta)["is_superuser"] ?
              true : false) : undefined,
          "is_active": (response as Usermeta)["is_active"] ? true : false,
          "date_joined": (response as Usermeta)["date_joined"] ? (response as Usermeta)["date_joined"] : undefined,
          "last_login": (response as Usermeta)["last_login"] ? (response as Usermeta)["last_login"] : undefined,
        });
        // Change Set the user's name on the 'Profile' page, from db.
        setUserName((response as Usermeta)["username"] || (response as Usermeta)["first_name"] || "");
      })();
      // The state of the CHECKBOX (for redaction on the PRIFILE's FIELDS).
      const htmlCheckbox = document.querySelectorAll(".profile__fields input[type='checkbox']");
      if (htmlCheckbox.length !== 0) {
        Array.from(htmlCheckbox).forEach((item) => {
          (item as HTMLInputElement).checked = false;
        });
      }
    });
  }, []);
  // greeting - The greeting for the user name.
  const greeting = !userName || userName === "!" || userName === "Пользователь" ? "!" : `, ${userName}!`;
  const maintitle = { maintitle: `Здравствуйте${greeting}` };
  const arr = ["email", "username", "firstname", "userLevel", "password"]
  return <>
    <NavbarTopFC {...maintitle} />

    <section id="profile">

      <div className="profile__fields flex flex-col">
        <div className="w-full ">
          <h2>Страница профиля</h2>
        </div>
        {!profile && <HydrateFallback />}
        {
          profile && Array.from(Object.keys((profile as Usermeta))).map((item, index) => (
            (arr).includes(item) &&

            <div onClick={handlerProfileField} key={String(index)} data-name={item} className="boxfield basis-1/4 md:basis-1/3 w-full flex flex-row flex-nowrap flex-initial ">
              {/* handlerProfileField need to add to the '.boxfield'*/}
                <div className="w-[150px]">{item}</div>
                <div className="boxfield-data w-full max-w-64">
                {(() => {
                  switch (item) {
                    case "email":
                      return "♦♦♦♦♦♦"; //profile.email;
                    case "username":
                      return profile.username;
                    case "firstname":
                      return profile.firstname;
                    case "lastname":
                      return profile.lastname;
                    case "userLevel":
                      return profile.userlevel;
                    case "password":
                      return "♦♦♦♦♦♦";
                    default:
                      return "";
                  }
                })()}

                </div>
                <div data-status="close" className="toggle w-6 h-[17px] p-0 ">
                  <input type="checkbox" className="toggle toggle-success toggle-xs" />
                </div>
              </div>
          ), [])
        }
      </div>
  </section>
  </>
}
