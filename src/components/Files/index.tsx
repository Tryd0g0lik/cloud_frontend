import React, { JSX, useState, useEffect } from "react";
import { NavbarTopFC } from "../NavbarTop";
import task0 from "./tasks/task0RequsetFiles";
interface Maintitle { maintitle: string }

export function FilesdFC(maintitle: Maintitle ): JSX.Element{
  const [files, stateFiles] = useState([]);
  useEffect(() => { return () => { task0(stateFiles); } }, []);
  
  return(<>
    <NavbarTopFC {...maintitle} />
    <section id="profile" className="cloud-files ">
      <div className="profile__fields overflow-x-auto w-[100%] flex justify-center">
        <table className="table-zebra  table-pin-rows w-[100%] max-w-screen-lg table-lg">
          {/* head */}
          <thead>
            <tr >
              <th className="w-[1.625rem] ">
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Num.</th>
              <th>Name-file</th>
              <th>Size</th>
              <th>Date</th>
              <th>Pablic-ref</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {/* {files.length === 0 } */}
            {files.length > 0 && files.map((file, index) => {
              return <tr key={index}>

                <tr className={index % 2 === 0 ? "hover flex justify-around w-[100%] max-w-[64rem]" : "flex justify-around w-[100%] max-w-[64rem]"}>
                  <td className="w-[1.625rem]">
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
                  </td>
                  <td>{index}</td>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
              <td>Brown</td>
                </tr>

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
              </tr>}
          </tbody>
        </table>
      </div>

    </section>
  </>);
}
