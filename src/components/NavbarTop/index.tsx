/**
 * src\components\NavbarTop\index.tsx
 * Upper navigation from the level of the 'head' on page
 */
import React, { JSX, useEffect, useState } from 'react';
import { NavbarEndFC } from "./NavbarEnd";

import handlerLogin from "src/components/LoginLogout/handlers/handlerOfProfileActivation";
import { Loginout } from "src/interfaces";
import task2 from './tasks/task2ChangeLink';
import task1 from './tasks/task1CheckCookie';
import task0 from './tasks/task0';
import task3 from './tasks/task3ChangeButton';
import task4 from './tasks/task4ChangeTopMenu';
import task5 from './tasks/task5ProfileLoader';
export function NavbarTopFC(props: { maintitle: string }): JSX.Element {
  const [useactive, setUseactive] = useState(Loginout.LOGIN);

  /* ----- Handler (all taskS) activation the user profile  ----- */
  useEffect(() => {
    (async () => await Promise.allSettled([
      // task5(),
      task0(), task1(setUseactive),
      task3(), task2(),
      task4(),
    ]))(); //
    return () => {
    }
    // Note: Смотреть примечание ниже по странице.
  }, [])

  return (
    <>
      <div onClick={(e: React.MouseEvent) => {
        const login = handlerLogin(e);
        login("is_active");
      }} className="navbar bg-base-100">
        <div className="navbar-start w-20">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><a href=''>Главная</a></li>
              {useactive.includes("Logout") && <li>
                <details className="cloud">
                  <summary>Облако</summary>
                  <ul className="p-2">
                    <li><a className='cloud-files px-1'>Мои файлы</a></li>
                    <li><a className='px-1'>Submenu 2</a></li>
                  </ul>
                </details>
              </li>}
              {useactive.includes("Logout") && <li><a href="/profile/">Профиль</a></li>}
            </ul>
            <div className="navbar-end w-20">
              <a className="btn ">{useactive}</a>
            </div>
          </div>

          <a className="btn btn-ghost text-xl ">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a href="/">Главная</a></li>
            {/*
              * 'useactive' если имеет значение "Logout" значит пользователь активирован на
              * сайте и ему доступно меню проыиля.
              * Если имеет значение "Login" значит пользователь НЕ активирован на сайте.
              *
              * "Logout" - Даный текст можно видеть в правой верхней кнопке. В активном режиме
              * мы должны иметь кнопку для выхода из профиля.
              *
              * "Login" - Текст можно видеть в правой верхней кнопке. В НЕ активном режиме
              * мы должны иметь кнопку для входа в профиль.
              *
              *
              * Почему "Logout" и "Login" ?
              * Изначально текст создавался для изменеия текста в кнопке (верхнее меню).
              * При активации пользователя, в куки получаем данне 'is_active="True/False"'.
              *
              * Для решения - дать доступ к меню или НЕ дать ориентируемся конечно на'is_active'.
              * "Logout" и "Login" ипользуется , так как был уже создан и новые переменные в коде
              * НЕ возстребованы.
              *
            */}
            {useactive.includes("Logout") && <li>
              <details className="cloud">
                <summary>Облако</summary>
                <ul className="p-2">
                  <li><a className='cloud-file px-1'>Мои файлы</a></li>
                  <li><a className='px-1'>Submenu 2</a></li>
                </ul>
              </details>
            </li>}
            {useactive.includes("Logout") && <li><a href="/profile/">Профиль</a></li>}
          </ul>
        </div>
        <NavbarEndFC text={useactive} />
      </div>

      <section className="h1" >
        <h1 className="text-3xl font-bold underline pb-8">
          {props.maintitle}
        </h1>
      </section>

    </>
  )
}
