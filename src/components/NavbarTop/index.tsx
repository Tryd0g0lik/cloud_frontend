/**
 * src\components\NavbarTop\index.tsx
 * Upper navigation from the level of the 'head' on page
 */
import React, { JSX, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from 'src/services/redux/store';
import { login, logout } from "src/services/redux/counterSlice";
import { NavbarEndFC } from "./NavbarEnd";
import { CookieUser } from "@Services/cookieServices";
import handlerLogin from "src/components/LoginLogout/handlers/handlerOfProfileActivation";
import { Loginout } from "src/interfaces";
import { includes } from 'lodash';
// import handlerLinkOfLogin from "src/components/NavbarTop/handlers/handlerNavbar";


/* Get params of user for the PRIMARY ACTIVATION of the user 
 after the authentification/resitration of user. */
const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

export function NavbarTopFC(props: { maintitle: string }): JSX.Element {
  const [useactive, setUseactive] = useState(Loginout.LOGIN);
  const task0 = () => new Promise(resolve => resolve((async () => {
    setTimeout(() => {
      const login = handlerLogin();
      login("is_active");
    }, 700);
  })()));
  /** ---- task1 ----
   * The data of 'is_active' geting from the cookie and change  the text to the buttom.
   * If, it is a true, means -> NAVIGATE by profile will be ACTIVATION
   * */
  const task1 = () => new Promise(resolve => resolve((async () => {
    setTimeout(() => {
      const cookieUser = new CookieUser();
      let falseTrue: string | boolean | null = cookieUser.getOneCookie("is_active");

      falseTrue = (falseTrue) ? (
        (falseTrue.toLowerCase()).includes("false") ? false : true
      ) : false;

      // status of a profile.
      setUseactive((falseTrue as boolean) ? Loginout.LOGOUT : Loginout.LOGIN);
    }, 0);
  })()));
  /*  ---- task3 ----
   * The right  upper button, if it has a 'Login' text, the function
   * below inserts the link to the page of the form.
   */
  const task3 = () => new Promise(resolve => resolve((async () => {
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
      }, 700);
    });

  })()));
  /*----- Redux ----- */
  // const curr = useSelector((state: RootState) => state.current.title);
  // const dispatch = useDispatch();
  /* ----- Location - Get params ACTIVATION of USER for SAVING in the COOKIE file. ----- */
  // const query = useQuery();
  // const queryArrayParams = Array.from(query.entries());
  // if (queryArrayParams.length === 3) {
  /**
   * This part of the code will be only one run.\ 
   * It initially receiving data from registration a new user on the site.
   */
  // const use_session_array = queryArrayParams[0];
  // const is_superuser_array = queryArrayParams[1];
  // const is_active_array = queryArrayParams[2];
  // SAVE of user in COOKIE (this coockie does not have a live time)
  // const cookieUser = new CookieUser(use_session_array[0]);
  // cookieUser.setCookie(use_session_array[1]);
  // cookieUser.sessionId = is_superuser_array[0];
  // cookieUser.setCookie(is_superuser_array[1]);
  // cookieUser.sessionId = is_active_array[0];
  // cookieUser.setCookie(is_active_array[1]);
  // }


  /* ----- Handler activation the user profile  ----- */
  useEffect(() => {
    // const cookie = new CookieUser();
    // const is_active_cookie = cookie.getOneCookie('is_active');
    // setUseactive(
    //   is_active_cookie ? (
    //     is_active_cookie?.toLowerCase()?.includes("true") ? Loginout.LOGOUT : Loginout.LOGIN
    //   ) : Loginout.LOGIN
    // );
    return () => {

      (async () => await Promise.all([task0(), task1(), task3()]))();

    }
    // Note: Смотреть примечание ниже по странице.
  }, [])




  return (
    <>
      <div onClick={(e: React.MouseEvent) => {
        // if (useactive.toLowerCase().includes(((e.target as HTMLElement).textContent as string).toLowerCase())) {
        // e.preventDefault()
        if ((location.pathname).includes("/users/registration/") || (
          (location.pathname).includes("/users/login/"))
        ) {
        const login = handlerLogin(e);
        login("is_active");
        }
        // (async () => await Promise.all([task1(), task3()]))();
        /* Change the text to button
          'If the button has the 'Logout' text, it means what
          user is authorized.
          Here is an exit from the profile.
        */
        // dispatch(logout())

        // }
        // if (!useactive.toLowerCase().includes(((e.target as HTMLElement).textContent as string).toLowerCase())) {
        // e.preventDefault()
        /* Change the text to button
        'If the button has the 'Login' text, it means what
          user is no authorized.
          Here is an entrance to the profile.
        */
        // dispatch(login())
        // }

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
              <li>
                <a>Облако</a>
                <ul className="p-2">
                  <li><a className='px-1'>Мои файлы</a></li>
                  <li><a className='px-1'>Submenu 2</a></li>
                </ul>
              </li>
              <li><a>Item 3</a></li>
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
            <li><a>Item 3</a></li>
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
