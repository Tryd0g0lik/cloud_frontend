/**
 * src\components\MainPage\tasks\taskLoaderReviewDataForAdmin.ts
 */
import { handlerOlderReviewdata } from "../nabdlers/handlerOlderReviewdata";


// CREATE LOADER DATA FOR EXISTS THE ADMIN
export const task0 = (usestate: CallableFunction) => new Promise(resolve => {
    /**
     * This is task was created for start work in parallel stream\
     * Loader data for user which has admin's prmission.
     * @param usestate: 'useState' from react
     */
    (async () => {
      const response = await handlerOlderReviewdata();
      if (!response) {
        console.log("MainPageFC::handlerOlderReviewdata: Something what wrong");
      }
      usestate(response as { data: { users: [any], files: [any] } });
      resolve(true)
    })();
  });
