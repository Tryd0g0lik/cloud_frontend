/**
 * src\components\MainPage\index.tsx
 * Main page
 */
import React, { JSX, useEffect, useState } from 'react';
import { NavbarTopFC } from '../NavbarTop';
import { handlerGeneral } from './handlers/hendlerGeneral';
import { handlerUserOfReview } from "./handlers/listenerForSectionHtml";
import { handlerChoiseAllUser } from './handlers/handlerChoiseAllUsers';
import { CookieUser } from "@Services/cookieServices";
import { handlerUserRemove } from './handlers/handlerUserRemoves';
import { logElementPositions } from './handlers/hendlerButtomLocation';
import { handlerAdminClickByCheckbox } from './handlers/habdlerAdminEventCheckbox';
import { handlerChoiseByOne } from './handlers/handlerChoiseByOneUser';
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

function addListener() {
  // GET COOKIE
  const cookie = new CookieUser();
  if (!cookie.checkCoockie("is_staff")) {
    console.warn("[MainPage/index.tsx::MainPageFC]: 'is_staff' not faound to the cookie");
    return false;
  }
  // CHECK COOKIE
  if (!cookie.getOneCookie("is_staff")) {
    // THIS IS USER IS NOT ADMIN
    return false;
  }

  /* ---- !!! THIS IS lISTENER EVENT FROM THE CLICK ONLY !!! CHECKBOX FROM THE TABLE  ---- */
  // CREAT EVENT LISTENER FOR CHECKBOX OF USERS FROM ADMIN INTERFACE
  const checkboxHTML = document.querySelector(".admin-reviews th input[type='checkbox']");
  if (!checkboxHTML) {
    console.log("[MainPage/index.tsx::MainPageFC]: 'th checkbox' Not found in DOM!")
    return false;
  }
  // LISTENER THE ADMIN's EVENTS FOR CHECKBOX OF SELECTORS "TABLE TH INPUT"
  (checkboxHTML as HTMLElement).removeEventListener("click", handlerAdminClickByCheckbox);
  (checkboxHTML as HTMLElement).addEventListener("click", handlerAdminClickByCheckbox);

  // LISTENER THE ADMIN's EVENTS FOR CHECKBOX OF SELECTORS "TABLE TD INPUT"
  const tableHTMLArr = document.querySelectorAll(".admin-reviews tr td:first-of-type");
  if (tableHTMLArr.length === 0) {
    console.log("[MainPage/index.tsx::MainPageFC]: 'th checkbox' Not found in DOM!")
    return false;
  }
  tableHTMLArr.forEach(item => {
    (item as HTMLTableElement).removeEventListener("click", handlerChoiseByOne);
    (item as HTMLTableElement).addEventListener("click", handlerChoiseByOne);
  });
}

export function MainPageFC(props: { maintitle: string }): JSX.Element {
  const [generalValue, setGeneralValue] = useState<any>(null);

  // RUN AFTER UPLOADING
  useEffect(() => {
    handlerGeneral(setGeneralValue);
    Promise.all([task()]);
    return () => {
      // ADD LISTENER FOR CHECKBOX OF USERS FROM ADMIN INTERFACE
      setTimeout(() => {

        addListener()
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
            </tr>
          </thead>
          <tbody >
            {/* row 1 */}
            {Array.isArray(generalValue["userNewMeta"]) &&
              generalValue["userNewMeta"].map((oneuser, i) => (
                <tr className={i % 2 === 0 ? 'hover' : ''} data-number={oneuser["userId"]} key={oneuser["userId"]}>

                  <td className="w-[1.625rem]">
                    <label>
                      <input data-remove="remove" type="checkbox" data-name="checkbox_user" className="checkbox" />
                    </label>
                  </td>
                  <td className="w-[1.625rem]">{i}</td>
                  <td >{String(oneuser["userId"])}</td>
                  <td data-name="user">{oneuser["userName"]}</td>
                  <td data-files="files">{oneuser["quantityFiles"]}</td>
                </tr>
              ))}
          </tbody>
        </table>

        )

        }
        {generalValue && (<div style={{ display: "none" }} className="delete  w-[12rem] absolute left-0 z-[3] max-h-10 bottom-0">
          <button onClick={async (e: React.MouseEvent) => {

            await handlerUserRemove(e);

          }} className="button-delete btn">Delete</button>
        </div>)}
      </div>

    </section>
  </>)

}
