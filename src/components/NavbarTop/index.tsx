import React, { JSX, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from 'src/services/redux/store';
import { login, logout } from "src/services/redux/counterSlice";
import { NavbarEndFC } from "./NavbarEnd";
import handlerLogin from "./handlers/handlerNavbar";
// import { useNavigate, } from 'react-router-dom';
// import { doActiveReferences } from '@Services/menuServise'

export function NavbarTopFC(): JSX.Element {
  const curr = useSelector((state: RootState) => state.current.title);
  const dispatch = useDispatch()
  // const [hand, setHand] = useState(NavbarEndFC.name);
  // useEffect(() => {
  //   doActiveReferences();
  // });
  // const navigate = useNavigate();

  // const handleGoHome = () => {
  //   // Перенаправление на /index
  //   navigate('/index');
  // };
  // const title: { text: "Logout" } | { text: "Login" } = { text: "Logout" }
  const title = "Logout";
  // const curr = undefined


  return (
    <>
      <div onClick={(e: React.MouseEvent) => {
        if ('login'.includes((e.currentTarget as HTMLElement).textContent as string)) {
          e.preventDefault()
          // handlerLogin(e)
          /* Change the text to button */
          // dispatch(login())

        }
        else if ('logout'.includes((e.currentTarget as HTMLElement).textContent as string)) {
          e.preventDefault()
          // handlerLogin(e)
          /* Change the text to button */
          // dispatch(logout())

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
              <li><a>Главная</a></li>
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
            <li><a>Главная</a></li>
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
        {/* <NavbarEndFC text={curr} /> */}
        <NavbarEndFC text={curr} />
      </div>

      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>

    </>
  )
}
