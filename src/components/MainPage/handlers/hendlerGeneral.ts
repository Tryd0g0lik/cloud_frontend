/**
 * src\components\MainPage\handlers\hendlerGeneral.ts
 */
import { task1 } from "../tasks/taskSeparatorGeneralData";
import { handlerOlderReviewdata } from "./handlerOlderReviewdata";
interface GeneraReviewData { users: [any], files: [any] };


export async function handlerGeneral(usestate: CallableFunction) {
  /**
   * Get a general review to used of the cloud.
   * By fact , this is a loader the reviews for admin to the main page
   * @param 'usestate': 'useState' from react.
   */
  const response = await handlerOlderReviewdata();
  if (!response) {
    console.warn("hendlerGeneral.ts::handlerGeneral: Maybe something what wrong");
    return false
  };
  // TASK 1
  let task1SetInterval: NodeJS.Timeout;
  task1SetInterval = setInterval(async () => {
    try {
      let result = await task1(response as GeneraReviewData);

      if (result && typeof result === "object" && Object.keys(result).length > 2) {
        clearInterval(task1SetInterval);
        usestate(result);
        console.log("OK - result");
      } else {
        console.log("Not OK - result");
      }
    } catch (error) {
      console.error("Error in task1SetInterval:", error);
      clearInterval(task1SetInterval); // Останавливаем интервал в случае ошибки
    }
  }, 500);

};
