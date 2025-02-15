
/**
 * src\components\Profile\handlers\taskChangeDOM.ts \
 * Change the status of the input field from 'open' to 'close' and chane the the input field (checkbox type) \
 *  to the true or false
 */
const changeDomTask2 = (htmlDiv: HTMLDivElement) => {
  // CHANGE THE STATUS 'open' to 'close' (to the input field)
  const htmlDivDataStatus = htmlDiv.querySelector("div[data-status]");
  if (!htmlDivDataStatus) {
    throw new Error("[handlerProfileField]: Mistake => DIV[data-status='close'] not found!")
  }
  const dataStatusValue = (htmlDivDataStatus as HTMLDivElement).dataset.status;
  if (dataStatusValue === "open") {
    (htmlDivDataStatus as HTMLDivElement).dataset.status = "close";
    (htmlDivDataStatus.querySelector("input[type='checkbox']") as HTMLInputElement).checked = false;
  } else {
    (htmlDivDataStatus as HTMLDivElement).dataset.status = "open";
  }
}
export default changeDomTask2;
