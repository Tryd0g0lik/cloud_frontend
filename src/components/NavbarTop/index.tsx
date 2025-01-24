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
import handlerLogin from "./handlers/handlerNavbar";
import { CookieUser } from "src/services/cookieServices";
// import { useNavigate, } from 'react-router-dom';
// import { doActiveReferences } from '@Services/menuServise'

/* Get params of user for the PRIMARY ACTIVATION of the user 
 after the authentification/resitration of user. */
const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}
export function NavbarTopFC(props: { maintitle: string }): JSX.Element {
  // Redux
  const curr = useSelector((state: RootState) => state.current.title);
  const dispatch = useDispatch();
  // Location - Get params of user for the PRIMARY ACTIVATION
  const query = useQuery();
  const queryArrayParams = Array.from(query.entries());
  if (queryArrayParams.length === 3) {
    const use_session_array = queryArrayParams[0];
    const is_superuser_array = queryArrayParams[1];
    const is_active_array = queryArrayParams[2];
    // SAVE of user in COOKIE
    const cookieUser = new CookieUser(use_session_array[0]);
    cookieUser.setCookie(use_session_array[1]);
    cookieUser.sessionId = is_superuser_array[0];
    cookieUser.setCookie(is_superuser_array[1]);
    cookieUser.sessionId = is_active_array[0];
    cookieUser.setCookie(is_active_array[1]);
  }
  return (
    <>
      <div onClick={(e: React.MouseEvent) => {
        if ('login'.toLowerCase().includes(((e.target as HTMLElement).textContent as string).toLowerCase())) {
          e.preventDefault()
          handlerLogin(e)
          /* Change the text to button */
          dispatch(logout())

        }
        if ('logout'.toLowerCase().includes(((e.target as HTMLElement).textContent as string).toLowerCase())) {
          e.preventDefault()
          /* Change the text to button */
          dispatch(login())


        }

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
              <a className="btn ">Профиль</a>
            </div>
          </div>

          <a className="btn btn-ghost text-xl ">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a href="/">Главная</a></li>
            <li>
              <details>
                <summary>Облако</summary>
                <ul className="p-2">
                  <li><a className='px-1'>Мои файлы</a></li>
                  <li><a className='px-1'>Submenu 2</a></li>
                </ul>
              </details>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <NavbarEndFC text={curr} />
      </div>

      <section className="h1" >
        <h1 className="text-3xl font-bold underline pb-8">
          {props.maintitle}
        </h1>
      </section>

    </>
  )
}
