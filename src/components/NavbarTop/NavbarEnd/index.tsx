import React, { JSX, useState, useEffect } from 'react';

export function NavbarEndFC(): JSX.Element {
  const [profile, setProfile] = useState<Array<{ __html: JSX.Element }> | null>(null)
  return (
    <div className="navbar-end w-20">

      <div className='btnend'>
        <a className="btn ">Профиль</a>
      </div>
      <div className='registration'>
        <a className="link link-neutral">Регистрация</a>
      </div>

    </div>
  )
}
