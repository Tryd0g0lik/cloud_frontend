/**
 * src\components\Files\index.tsx
 */
import React, { JSX, useState, useEffect, MouseEventHandler } from "react";
import { useLoaderData } from "react-router-dom";
import { NavbarTopFC } from "../NavbarTop";
import { CookieUser } from "@Services/cookieServices";
import { handlerFormFile } from "./handlers/handlerFormFiles";
import { handlerFileRemove } from "./handlers/handlerFileRemoves";
import { handlerOlderFiles } from "./handlers/handlerOlderFiles";
import { HandlerStateActivation } from "../handlerUserNotActive";
import { handlerCommentTd } from "./handlers/handlerCommentsTd";
import { handlerCommentInput } from "./handlers/handlerCommentsInput";
import { handlerReferralLinks } from "./handlers/handlerReferralLinks";
import { handlerReferralBufers } from "./handlers/handlerReferralBufers";
import { handlerFileNameTd } from "./handlers/handlerFileNameTd";
import { handlerFileNameInput } from "./handlers/handlerFileNameInput";
import { handlerChoiseAllFile } from "./handlers/handlerChoiseAllFiles";

const REACT_APP_SERVER_PORT = process.env.REACT_APP_SERVER_PORT || '8000';
interface Maintitle { maintitle: string }

/**
 * Cloud of files
 */
export function FilesdFC(maintitle: Maintitle ): JSX.Element{
  const [files, stateFiles] = useState([]);
  // HandlerStateActivation();


  useEffect(() => {

    // CHOICE ALL FILES FROM the SINGLE CLICK 
    function addListener() {
      // CREAT EVENT LISTENER FOR CHECKBOX
      const checkboxHTML = document.querySelector(".table-zebra th input[type='checkbox']");
      if (!checkboxHTML) {
        console.log("[Files/index.tsx::FilesdFC]: 'th checkbox' Not found in DOM!")
        return false;
      }
      // LISTENER FOR CHECKBOX
      (checkboxHTML as HTMLElement).removeEventListener("click", (e: MouseEvent) => handlerChoiseAllFile(e));
      (checkboxHTML as HTMLElement).addEventListener("click", (e: MouseEvent) => handlerChoiseAllFile(e));

    }
    addListener();
    return () => {
      HandlerStateActivation();
      (async () => {
        // STATE FILES TO THE PAGE 
        let index__s: string | null = null;
        // GET ID FROM THE URL BY EVENTS OF ADMIN
        const stringArr = (window.location.pathname as string).split("/");
        index__s = ((window.location.pathname).includes("admins/to")) && (/[0-9]+/.test(stringArr[stringArr.length - 2])) ? stringArr[stringArr.length - 2] : null
        // GET THE FILES FROM THE SERVER
        const response = await handlerOlderFiles(index__s);
        if (!response) { return }
        stateFiles(response as Array<never>);

      })();

    }
  }, []);

  return(<>
    <NavbarTopFC {...maintitle} />
    <section onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {

      // HANDLER FOR GET REFERRAL LINKS
      const response = await handlerReferralLinks(e);
      if (!response) {
        console.log("[Files/index.tsx::FilesdFC]: The response have from the server not Ok!")
        return false;
      }
      const cookie = new CookieUser();
      if (cookie.checkCoockie("referral_link")) {

        const cellHTML = (e.target as HTMLElement).parentElement
        if (!cellHTML || (cellHTML && !cellHTML.classList.contains("link-file"))) {
          console.log("[Files/index.tsx::FilesdFC]: '.link-file' Not found!")
          return false;
        }
      if (!cookie.checkCoockie("referral_link")) {
        console.log("[Files/index.tsx::FilesdFC]: 'referral_link' Not found in cookie!")
        return false;
        }
        // GET URL FOR BUFER
        const pathname = (cookie.getOneCookie("referral_link") as string).slice(1, -1);
        const url = new URL(pathname, window.location.origin);
        url.port = REACT_APP_SERVER_PORT;
        // CREATE ANCHOR HTML ELEMENT FOR THE LINK
        const anchorHTML = document.createElement("a");
        anchorHTML.href = url.toString();
        anchorHTML.innerText = " referral link";
        anchorHTML.className = "referral-anchor link link-hover m-auto";
        cellHTML.innerHTML = "";
        // PUBLISH ANCOR THE ELEMENT FOR THE LINK
        cellHTML.appendChild(anchorHTML);

      }
      // CREAT EVENT LISTENER FOR COPY LINK IN BUFER 
      const referralLinkHTML = document.querySelector(".referral-anchor") as HTMLInputElement;
      if (!referralLinkHTML) {
        console.log("[Files/index.tsx::FilesdFC]: '.referral_link' Not found in DOM!")
        return false;
      }
      // LISTENER FOR COPY LINK IN BUFER
      referralLinkHTML.removeEventListener("click", (e: MouseEvent) => handlerReferralBufers(e));
      referralLinkHTML.addEventListener("click", (e: MouseEvent) => handlerReferralBufers(e));

    }} id="profile" className="cloud-files flex justify-center ">
      <div className="profile__fields w-[100%] max-w-screen-lg flex justify-center relative overflow-visible">
        <table onKeyDown={(e: React.KeyboardEvent) => {
          if ((e as React.KeyboardEvent).key !== "Enter") {
            return false;
          }
          HandlerStateActivation();
          const { classList } = (e.target as HTMLElement);
          if (classList.contains("comment-file")) {
          // HANDLER INPUT FROM THE COMMENT
            handlerCommentInput(e as React.KeyboardEvent<HTMLInputElement>)
            .then(async (response) => {
              if (!response) {
                const response = await handlerOlderFiles();
                if (!response) { return }
                stateFiles(response as Array<never>);
                return false;
              };
              const result = await (response as Response).json();
              return result;
            })
            .then((result) => {
              if (!result) {
                return false;
              };
              const divHmtl = (e.target as HTMLInputElement).parentElement;
              if (divHmtl?.classList.contains("comment-file")) {
                divHmtl.removeChild(divHmtl.firstChild as HTMLInputElement);
              }
              (async () => {
                const response = await handlerOlderFiles();
                if (!response) { return }
                stateFiles(response as Array<never>);

              })();
            })
          } else if (classList.contains("name-file")) {
            // HANDLE INPUT FROM THE FILE's NAME 
            handlerFileNameInput(e as React.KeyboardEvent<HTMLInputElement>)
              .then(async (response) => {
                if (!response) {
                  return false;
                };
                const result = await (response as Response).json();
                return result;
              })
              .then((result) => {
                const divAlertHmtl = document.createElement("div");
                divAlertHmtl.id = "alert";
                divAlertHmtl.classList.add("alert");
                divAlertHmtl.classList.add("referral-alert");
                divAlertHmtl.classList.add("alert-info");
                if (!result) {
                  divAlertHmtl.classList.add("error")
                  divAlertHmtl.innerText = 'Похоже файл с таким именем уже существует!';
                  ((e.target as HTMLElement).parentElement as HTMLElement).insertAdjacentElement("afterend", divAlertHmtl);
                  return false;
                };
                divAlertHmtl.innerText = 'Файл переименован';
                ((e.target as HTMLElement).parentElement as HTMLElement).insertAdjacentElement("afterend", divAlertHmtl);
                const divHmtl = (e.target as HTMLInputElement).parentElement;
                if (divHmtl?.classList.contains("name-file")) {
                  divHmtl.removeChild(divHmtl.firstChild as HTMLInputElement);
                }
                (async () => {
                  const response = await handlerOlderFiles();
                  if (!response) { return }
                  stateFiles(response as Array<never>);

                })();
              })
              .finally(() => {
                const alertElement = document.querySelector('.referral-alert');
                if (!alertElement) {
                  return false;
                }
                (alertElement as HTMLElement).style.display = 'block';
                setTimeout(() => {
                  (alertElement as HTMLElement).remove();
                }, 2000)
              })
          }
        }} className="table-zebra  table-pin-rows w-[100%] max-w-screen-lg">
          {/* head */}
          <thead className="w-[100%] max-w-screen-lg">
            <tr className="flex justify-around w-[100%] max-w-[64rem]">
              <th className="num w-[1.625rem] ">
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th className="num w-[100%] max-w-[100px]">Num.</th>
              <th className="name-file overflow-hidden min-w-[100px]  w-[100%]  max-w-[200px]">Name-file</th>
              <th className="size-file overflow-hidden min-w-20  w-[100%]  max-w-[100px]">Size</th>
              <th className="comment-file overflow-hidden min-w-20  w-[100%]  max-w-[225px] ">Comments</th>
              <th className="loaded-file overflow-hidden min-w-[100px]  w-[100%]  max-w-[200px]">Date-loaded</th>
              <th className="download-file overflow-hidden min-w-[100px]  w-[100%]  max-w-[200px]">Date-downloaded</th>
              <th className="link-file overflow-hidden min-w-[100px]  w-[100%]  max-w-[200px]">Pablic-ref</th>

            </tr>
          </thead>
          <tbody onClick={(e: React.MouseEvent | React.KeyboardEvent): boolean => {

            if (e.type === "click") {
              // HANDLER FOR COMMENT's CELL
              const result = handlerCommentTd(e as React.MouseEvent<HTMLTableCellElement>);
              if (!result) {
                // HANDLER FOR CELL OF FILE's NAME
                handlerFileNameTd(e as React.MouseEvent<HTMLTableCellElement>);
              }
            }

            return true;
          }} className="w-[100%] max-w-screen-lg">
            {/* row */}
            {files.length > 0 && Array.from(files).map((file, index) => {
              return <tr key={index} className={index % 2 === 0 ? "hover flex justify-around w-[100%] max-w-[64rem]" : "flex justify-around w-[100%] max-w-[64rem]"}>
                <td className="w-[1.625rem]">
                  <label>
                    <input data-number={file["id"]} data-name="checkbox_file" type="checkbox" className="checkbox" />
                  </label>
                </td>
                <td className="num w-[100%] max-w-[100px]" >{index}</td>
                <td data-number={file["id"]} className="name-file overflow-hidden min-w-[100px]  w-[100%]  max-w-[200px]">{file["original_name"]}</td>
                <td className="size-file overflow-hidden min-w-20  w-[100%]  max-w-[100px]">{file["size"]}</td>
                <td data-number={file["id"]} className="comment-file overflow-hidden min-w-20  w-[100%]  max-w-[225px]">{file["comment"]}</td>
                <td className="loaded-file overflow-hidden min-w-[100px]  w-[100%]  max-w-[200px]">{file["upload_date"]}</td>
                <td className="download-file overflow-hidden min-w-[100px]  w-[100%]  max-w-[200px]">{file["last_downloaded"]}</td>
                <td data-number={file["id"]} className="link-file  overflow-hidden min-w-[100px]  w-[100%]  max-w-[200px] flex"><button className="button-referral btn btn-xs marg m-auto">Поделиться ссылкой</button></td>
              </tr>
            }) || <tr className="flex justify-around w-[100%] max-w-[64rem]">
                <td className="w-1.625rem">
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
                </td>
                <th></th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>}

          </tbody>
        </table>
        {
          <div className="loader w-[12rem] absolute right-0 z-[3] max-h-10 -top-12">

            <form onChange={async (e: React.FormEvent) => {
              handlerFormFile(e)
                .then(response => {
                  if (!response) {
                    return false;
                  };
                  return response
                })
                .catch((err) => {
                  console.log(err)
                })
                .then(async () => {
                  HandlerStateActivation();
                  const result = await handlerOlderFiles();
                  if (!result) { return }
                  if (result.length === 0) { return }
                  else {
                    stateFiles(result as unknown as Array<never>);
                  }

                })


            }} className="loader-form absolute bottom-0" >
              <input type="file" className="loader-file file-input file-input-bordered file-input-xs w-full max-w-xs" />
            </form>
          </div>
        }
        <div className="loader delete  w-[12rem] absolute left-0 z-[3] max-h-10 -top-12">
          <button onClick={async (e: React.MouseEvent) => {

            await handlerFileRemove(e);
            const response = await handlerOlderFiles();
            if (!response) { return }
            stateFiles(response as Array<never>);

          }} className="button-delete btn">Delete</button>
        </div>
      </div>


    </section>
  </>);
}
