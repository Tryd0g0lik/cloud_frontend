/**
 * src\components\MainPage\index.tsx
 * Main page
 */
import React, { JSX, useEffect, useState } from 'react';
import { NavbarTopFC } from '../NavbarTop';
import { handlerGeneral } from './handlers/hendlerGeneral';
import { handlerUserRemove } from './handlers/handlerUserRemoves';
import { addListener } from "./handlers/addListeners";
import { task } from "./tasks/taskRunHandlersOfReview";
import { CookieUser } from "@Services/cookieServices";
import { handlerButtonAddNewUser } from './handlers/handlerButtonAddUser';
import { logElementButtonAdd } from './handlers/hendlerButtomAddLocation';


export function MainPageFC(props: { maintitle: string }): JSX.Element {
  const [generalValue, setGeneralValue] = useState<any>(null);
  const [adminId, setAdminId] = useState<Number | null>(null);

  // RUN AFTER UPLOADING
  useEffect(() => {
    (async () => {
      const cookie = new CookieUser();
      if (!cookie.checkCoockie("is_staff") || !cookie.checkCoockie("index")) {
        console.error(new Error("[MainPage/index.tsx::MainPageFC]: 'is_staff' or 'index' not faound to the cookie"));
        return false;
      }
      const staff = cookie.getOneCookie("is_staff");
      const index = cookie.getOneCookie("index");
      if (!staff) {
        console.error(new Error("[MainPage/index.tsx::MainPageFC]: Something what wromg! 'is_staff' (cookie) if not 'true'. It's шьзщыышиду for admin permissions!!"));
        return false;
      }
      setAdminId(Number(index));
    }
    )()
    handlerGeneral(setGeneralValue);
    Promise.all([task()]);
    return () => {
      // ADD LISTENER FOR CHECKBOX OF USERS FROM ADMIN INTERFACE
      setTimeout(() => {
        logElementButtonAdd();
        window.removeEventListener("resixze", logElementButtonAdd);
        window.addEventListener("resixze", logElementButtonAdd);
        addListener();
      }, 700);
    }

  }, []);
  return (<>
    <NavbarTopFC {...props} />
    <section className="main-page p-5">

      <div className="overflow-x-auto">
        {generalValue && (<table className="table admin-reviews">
          {/* head */}
          <thead>
            <tr>
              <th colSpan={4}>
                <div className="stats shadow m-auto flex" >
                  <div className="stat place-items-center">
                    <div className="stat-title">Files</div>
                    <div className="stat-value">{generalValue["quantityAllFiles"]}</div>
                    <div className="stat-desc">Quantity of files</div>
                  </div>

                  <div className="stat place-items-center">
                    <div className="stat-title">Users</div>
                    <div className="stat-value text-secondary">{generalValue["quantityAllUsers"]}</div>
                    <div className="stat-desc text-secondary">Quality of user </div>
                  </div>

                  <div className="stat place-items-center">
                    <div className="stat-title">Downloaded</div>
                    <div className="stat-value">{generalValue["filesDownloading"]}</div>
                    <div className="stat-desc">Quantity of files downloaded</div>
                  </div>
                </div>
              </th>
            </tr>
            < tr >
              <th className="num w-[1.625rem] ">
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th className="w-[1.625rem]">Num.</th>
              <th>User ID</th>
              <th>User Name</th>
              <th>Quantity files of user</th>
              <th>Administration</th>
            </tr>
          </thead>
          <tbody >
            {/* row 1 */}
            {Array.isArray(generalValue["userNewMeta"]) && adminId &&
              generalValue["userNewMeta"].filter(oneuser => oneuser["userId"] !== adminId).map((oneuser, i) => (

                <tr className={i % 2 === 0 ? 'hover' : ''} data-number={oneuser["userId"]} key={oneuser["userId"]}>

                  <td className="w-[1.625rem]">
                    <label>
                      <input data-remove="remove" type="checkbox" data-number={oneuser["userId"]} data-name="checkbox_user" className="checkbox" />
                    </label>
                  </td>
                  <td className="w-[1.625rem]">{i}</td>
                  <td >{String(oneuser["userId"])}</td>
                  <td data-name="user">{oneuser["userName"]}</td>
                  <td data-files="files">{oneuser["quantityFiles"]}</td>
                  <td className="w-[1.625rem]">
                    <label>
                      <input type="checkbox" defaultChecked className="checkbox checkbox-xs" />
                    </label>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        )

        }
        {/* button for user delete */}
        {generalValue && (<div style={{ display: "none" }} className="delete  w-[12rem] absolute left-0 z-[3] max-h-10 bottom-0">
          <button onClick={async (e: React.MouseEvent) => {

            await handlerUserRemove(e);
            handlerGeneral(setGeneralValue);
          }} className="button-delete btn">Delete</button>
        </div>)}
        {/* button for adding user */}
        {generalValue && (<div className="adduser  w-[6rem] absolute right-0 z-[3] max-h-10 bottom-0">
          <button onClick={(e: React.MouseEvent) => {
            handlerButtonAddNewUser(e);
          }} className="button-adduser btn">Add user</button>
        </div>)}
        {generalValue && (<div className="adduser  w-[6rem] absolute right-0 z-[3] max-h-10 bottom-0">
          <button className="btn btn-outline">Default</button>
          <button onClick={(e: React.MouseEvent) => {
            handlerButtonAddNewUser(e);
          }} className="button-delete btn">Add user</button>
        </div>)}
      </div>

    </section>
  </>)

}
