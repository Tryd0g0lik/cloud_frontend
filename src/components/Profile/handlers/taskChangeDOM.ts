import def from "ajv/dist/vocabularies/discriminator";

/**
 * src\components\Profile\handlers\taskChangeDOM.ts
 * @param htmlDiv
 */
const task2ChangeDom = (htmlDiv:HTMLDivElement)=>{
  // CHANGE THE STATUS 'open' to 'close' (to the input field)
  const htmlDivDataStatus = htmlDiv.querySelector("div[data-status]");
  if (!htmlDivDataStatus) {
    throw new Error("[handlerProfileField]: Mistake => DIV[data-status='close'] not found!")
  }
  const dataStatusValue = (htmlDivDataStatus as HTMLDivElement).dataset.status;
  if (dataStatusValue === "open") {
    (htmlDivDataStatus as HTMLDivElement).dataset.status = "close";
  } else {
    (htmlDivDataStatus as HTMLDivElement).dataset.status = "open";
  }
}
export default task2ChangeDom;
