import React, {JSX, useState} from "react";
import { NavbarTopFC } from "../NavbarTop";
interface Maintitle { maintitle: string }
export function FilesdFC(maintitle: Maintitle ): JSX.Element{
  
  return(<>
    <NavbarTopFC {...maintitle} />
    <section id="profile" className="cloud-files ">
      <div className="profile__fields overflow-x-auto w-[100%] flex justify-center">
        <table className="table-zebra  table-pin-rows w-[100%] max-w-screen-lg table-lg">
          {/* head */}
          <thead>
            <tr >
              <th>
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
            <tr className="hover">
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
              <td>Brown</td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th >2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
              <td>Brown</td>
            </tr>

            {/* row 3 */}
            <tr className="hover">
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
              <td>Brown</td>
            </tr>
          </tbody>
        </table>
      </div>

    </section>
  </>);
}
