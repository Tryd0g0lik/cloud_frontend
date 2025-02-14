import React, { JSX, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { NavbarTopFC } from "../NavbarTop";
import { CookieUser } from "@Services/cookieServices";
import { handlerFormFile } from "./handlers/handlerFormFiles"
import { handlerOlderFiles } from "./handlers/handlerOlderFiles";
import { LocalRef } from "@Interfaces";
interface Maintitle { maintitle: string }

export function FilesdFC(maintitle: Maintitle ): JSX.Element{
  const [files, stateFiles] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {

    return () => {
      // CHECK THE ACTIVATION OF USER'S COOCKIE
      const cookie = new CookieUser();
      if (!cookie.checkCoockie("is_active")) {
        navigate(LocalRef.ACTIVATION);
      }
      (async () => {
        const response = await handlerOlderFiles();
        if (!response) { return }
        stateFiles(response as Array<never>);

      })();
    }
  }, []);

  return(<>
    <NavbarTopFC {...maintitle} />
    <section id="profile" className="cloud-files flex justify-center ">
      <div className="profile__fields w-[100%] max-w-screen-lg flex justify-center relative overflow-visible">
        <table className="table-zebra  table-pin-rows w-[100%] max-w-screen-lg">
          {/* head */}
          <thead className="w-[100%] max-w-screen-lg">
            <tr className="flex justify-around w-[100%] max-w-[64rem]">
              <th className="num w-[1.625rem] ">
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Num.</th>
              <th>Name-file</th>
              <th>Size</th>

              <th>Date</th>
              <th>Pablic-ref</th>
              <th >Loading file</th>
            </tr>
          </thead>
          <tbody className="w-[100%] max-w-screen-lg">
            {/* row 1 */}
            {/* {files.length === 0 } */}
            {files.length > 0 && Array.from(files).map((file, index) => {
              return <tr key={index} className={index % 2 === 0 ? "hover flex justify-around w-[100%] max-w-[64rem]" : "flex justify-around w-[100%] max-w-[64rem]"}>
                <td className="w-[1.625rem]">
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </td>
                <td className="num">{index}</td>
                <td>{file["original_name"]}</td>
                <td>{file["size"]}</td>
                <td>{file["upload_date"]}</td>
                <td></td>
                <td ></td>
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
      </div>
      <div className="loader delete  w-[12rem] absolute left-0 z-[3] max-h-10 -top-12">
        <button className="btn btn-outline">Default</button>
      </div>

    </section>
  </>);
}
