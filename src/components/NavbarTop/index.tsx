/**
 * src\components\NavbarTop\index.tsx
 * Upper navigation from the level of the 'head' on page
 */
import React, { JSX, useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useSelector, useDispatch } from "react-redux";
// import type { RootState } from 'src/services/redux/store';
// import { login, logout } from "src/services/redux/counterSlice";
import { NavbarEndFC } from "./NavbarEnd";
import { CookieUser } from "@Services/cookieServices";
import handlerLogin from "src/components/LoginLogout/handlers/handlerOfProfileActivation";
import { Loginout } from "src/interfaces";
// import { includes } from 'lodash';
// import handlerLinkOfLogin from "src/components/NavbarTop/handlers/handlerNavbar";


/* Get params of user for the PRIMARY ACTIVATION of the user
 after the authentification/resitration of user. */
// const useQuery = () => {
//   return new URLSearchParams(useLocation().search)
// }

export function NavbarTopFC(props: { maintitle: string }): JSX.Element {
  const [useactive, setUseactive] = useState(Loginout.LOGIN);
  const task0 = () => new Promise<void>(resolve => {
    setTimeout(() => {
      const login = handlerLogin();
      login("is_active");
      resolve();
    }, 200);

  });

  /** ---- task1 ----
   * The data of 'is_active' geting from the cookie and change  the text to the buttom.
   * If, it is a true, means -> NAVIGATE by profile will be ACTIVATION
   * */
  const task1 = () => new Promise<void>(resolve => {
    setTimeout(() => {
      const cookieUser = new CookieUser();
      let falseTrue: string | boolean | null = cookieUser.getOneCookie("is_active");

      falseTrue = (falseTrue) ? (
        (falseTrue.toLowerCase()).includes("false") ? false : true
      ) : false;

      // status of a profile.
      setUseactive((falseTrue as boolean) ? Loginout.LOGOUT : Loginout.LOGIN);
      resolve();
    }, 0);
  });

  /*  ---- task3 ----
   * The right  upper button, if it has a 'Login' text, the function
   * below inserts the link to the page of the form.
   */
  const task3 = () => new Promise<void>(resolve => {
    setTimeout(() => {
      const ancorHtml = document.querySelectorAll(".navbar-end a");
      if (!ancorHtml) {
        console.log('Button is invaid.');
        return false
      }
      Array.from(ancorHtml).forEach((item) => {
        if ((item as HTMLAnchorElement).textContent?.toLowerCase().includes((Loginout.LOGIN).toLowerCase())) {
          (item as HTMLAnchorElement).href = "/users/login/";
        } else if ((item as HTMLAnchorElement).textContent?.toLowerCase().includes((Loginout.LOGOUT).toLowerCase())) {
          (item as HTMLAnchorElement).href = "";
        }
      });
      resolve();
    }, 100);
  });


  /* ----- Handler activation the user profile  ----- */
  useEffect(() => {
    const task2 = () => new Promise<void>(resolve => {

      setTimeout(() => {
        const coockie = new CookieUser();
        const userId = coockie.getOneCookie("index") as string;
        if (userId) {
          const profileLink = document.querySelector('a[href="/profile/"]');
          if (profileLink) {
            (profileLink as HTMLAnchorElement).href =
              (profileLink as HTMLAnchorElement).href + `${userId}/`;
          }
        }
        resolve();
      }, 100)
    });
    (async () => await Promise.allSettled([task0(), task1(), task3(), task2(),]))(); //
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
                <details>
                  <summary>Облако</summary>
                  <ul className="p-2">
                    <li><a className='px-1'>Мои файлы</a></li>
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
              <details>
                <summary>Облако</summary>
                <ul className="p-2">
                  <li><a className='px-1'>Мои файлы</a></li>
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
