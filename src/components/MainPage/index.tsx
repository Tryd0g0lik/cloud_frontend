/**
 * src\components\MainPage\index.tsx
 * Main page
 */
import React, { JSX, useEffect, useState } from 'react';
import { NavbarTopFC } from '../NavbarTop';
import { handlerGeneral } from './nabdlers/hendlerGeneral';

export function MainPageFC(props: { maintitle: string }): JSX.Element {
  const [generalValue, setGeneralValue] = useState<any>(new Object({}) as any);


  useEffect(() => {
    handlerGeneral(setGeneralValue);
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
                  <td>{String(oneuser["userId"])}</td>
                  <td>{oneuser["userName"]}</td>
                  <td>{oneuser["quantityFiles"]}</td>
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
