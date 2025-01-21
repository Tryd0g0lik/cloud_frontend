// import React { JsxEmit, useEffect, useState } from "react";
import React from "react"

export function HomePageFC(): React.JSX.Element {

  return (<>
    {/* <NavFC /> */}
    <section className='profilesAll'>
      <div className='list-profiles'>
        <h1>Hello word!!</h1>
        <ul>
          {
            /* Array.from(profiles).map((item, index) => (
              <li className='profile' key={index} data-userx={String(item.id)}>
                <a href={`/profile/${item.id}`}>{item.first_name}</a>
              </li>
            )) */
          }
        </ul>
      </div>
    </section>
  </>)
}
