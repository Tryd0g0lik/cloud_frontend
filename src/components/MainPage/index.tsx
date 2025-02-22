/**
 * src\components\MainPage\index.tsx
 * Main page
 */
import React, { JSX, useEffect, useState } from 'react';
import { NavbarTopFC } from '../NavbarTop';
import { handlerGeneral } from './handlers/hendlerGeneral';
import { handlerUserOfReview } from "./handlers/listenerForSectionHtml";
import { CookieUser } from "@Services/cookieServices";
/**
 * This is task for avents of admin to the main page
 * @returns 
 */
const task = async () => new Promise(resolve => {
  const rootHTML = document.querySelector("#root");
  if (!rootHTML) {
    return false;
  }
  const mainPageHTML = rootHTML.querySelector("section.main-page");
  if (!mainPageHTML) {
    return false;
  }
  // LISTENER OF HANDLER FOR ADMIN INTERFACE
  (mainPageHTML as HTMLElement).removeEventListener("mousedown", handlerUserOfReview);
  (mainPageHTML as HTMLElement).addEventListener("mousedown", handlerUserOfReview);
  resolve(true);
});
export function MainPageFC(props: { maintitle: string }): JSX.Element {
  const [generalValue, setGeneralValue] = useState<any>(null);
  // RUN AFTER UPLOADING
  useEffect(() => {

    const cookie = new CookieUser();
    if (cookie.checkCoockie("is_staff") && "False" !== cookie.getOneCookie("is_staff")) {
      handlerGeneral(setGeneralValue);
      Promise.all([task()]);
    }


  }, []);
  return (<>
    <NavbarTopFC {...props} />
    <section className="main-page p-5">

      <div className="overflow-x-auto">
        {generalValue && (<table className="table">
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
              <th></th>
              <th>User ID</th>
              <th>User Name</th>
              <th>Quantity files of user</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {Array.isArray(generalValue["userNewMeta"]) &&
              generalValue["userNewMeta"].map((oneuser, i) => (
                <tr className={i % 2 === 0 ? 'hover' : ''} data-number={oneuser["userId"]} key={oneuser["userId"]}>
                  <th>{i}</th>
                  <td >{String(oneuser["userId"])}</td>
                  <td data-name="user">{oneuser["userName"]}</td>
                  <td data-files="files">{oneuser["quantityFiles"]}</td>
                </tr>
              ))}

          </tbody>
        </table>
        )
        }
      </div>


    </section>
  </>)

}
