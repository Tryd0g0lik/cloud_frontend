import React, {JSX, useEffect, useState} from 'react';
import { UserLevel } from "@Interfaces";
import { NavbarTopFC } from '../NavbarTop';
import { task0 } from './tasks/taskLoaderReviewDataForAdmin';
import { task1 } from './tasks/taskSeparatorGeneralData';
interface GeneraReviewData { data: { users: [any], files: [any] } }
export function MainPageFC(props: { maintitle: string }): JSX.Element{
  const [reviewdata, setReviewdata] = useState<GeneraReviewData>({} as GeneraReviewData);
  
  useEffect(()=>{ 
    return ()=>{
      
      (async () => {
        await task0(setReviewdata);
        if (reviewdata) {
          const result = await task1(reviewdata ? reviewdata as GeneraReviewData : {} as GeneraReviewData)
          console.log(result)
        }
      })();
      
    }
  }, []);
  return (<>
    <NavbarTopFC {...props} />
    <section className="main-page">
      {reviewdata && <div className="reviewdata">Admin</div> || < div className="reviewdata">Hallo word</div>
      } 

    </section>
  </>)
  
}
