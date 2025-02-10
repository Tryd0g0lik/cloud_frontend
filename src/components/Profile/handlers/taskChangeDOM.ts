
/**
 * src\components\Profile\handlers\taskChangeDOM.ts
 * @param htmlDiv
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
