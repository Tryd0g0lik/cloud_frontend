import React, { JSX, useState } from "react";
import { Usermeta, UserLevel } from "@Interfaces";
import { HydrateFallback } from "src/components/Loading";
import { profileLoader } from "@Services/request/profileloading"
import { NavbarTopFC } from "../NavbarTop";



export function ProfileFC(): JSX.Element {
  const [profile, setProfile] = useState<Usermeta | null>(null);

  (async () => {
    const response: Usermeta | {} = await profileLoader();
    if ((typeof response).includes("boolean")) {
      console.log("[ProfileFC]: 'Profile\index.tsx' Mistake => Somefing What wrang not true ")
      return false;
    }

    setProfile({
      "username": (response as Usermeta)["username"] ? (response as Usermeta)["username"] : "",
      "firstname": (response as Usermeta)['first_name'] ? (response as Usermeta)["first_name"] : undefined,
      "lastname": (response as Usermeta)["last_name"] ? (response as Usermeta)["last_name"] : undefined,
      "email": (response as Usermeta)["email"] ? (response as Usermeta)["email"] : undefined,
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
  })()
  if (!profile) {
    return <HydrateFallback />
  }

  const maintitle = { maintitle: profile && (profile as Usermeta).firstname ? `Здравствуйте, ${(profile as Usermeta).firstname}!` : "Ваш профиль!" };
  return <>
    <NavbarTopFC {...maintitle} />

    <section id="profile">

    <div className="profile__fields">
        <div className="w-full max-w-9/10 field_h2"><h2>Страница профиля</h2></div>

        {
          profile && Array.from(Object.keys((profile as Usermeta))).map((item, index) => (

            <div id={String(index)} data-name={item} className="w-full max-w-1/3"><div>{item}</div><div>{
              "email".includes(item) ? profile.email : ("username".includes(item) ? profile.username : (
                "firstname".includes(item) ? profile.firstname : (
                  "lastname".includes(item) ? profile.lastname : (
                    "userLevel".includes(item) ? profile.userlevel : (
                      "password".includes(item) ? `♦♦♦♦♦♦` : ""
                    )
                  )
                )
              )
              )
            }
            </div></div>
          ), [])
        }
      </div>
  </section>
  </>
}
