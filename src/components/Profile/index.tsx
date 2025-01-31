import React, { JSX } from "react";


interface Usermeta {
  username: string,
  firstname?: string,
  lastname?: string,
  email: string,
  // userlevel: UserLevel.User
}
interface Profile {
  usermeta: Usermeta
}

export function ProfileFC(): JSX.Element {

  return <section id="profile">
    <div className="profile__fields">
      <div className="w-full max-w-9/10 field_h2"><h2>Profile</h2></div>

      <div className="w-full max-w-1/3 ..."><div>Username</div><div></div></div>

    </div>
    <div className="profile__fields"></div>
    <div className="profile__fields"></div>
  </section>
}
