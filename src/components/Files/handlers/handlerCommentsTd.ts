import React from "react";
import { HandlerStateActivation } from "src/components/handlerUserNotActive";


export function handlerCommentTd(e: React.MouseEvent<HTMLTableCellElement>): boolean {
  const {target} = e;
  const {localName, classList } = (target as HTMLElement);
  if (!localName || (localName &&
    localName !== "td") || (localName &&
    localName === "td" && !classList.contains("comment-file"))){
    return false;
  }
  e.preventDefault();
  // CHECK THE I'is_active' FROM COOCKIE
  HandlerStateActivation();
  const targetTextContent = (target as HTMLTableCellElement).textContent;
  const datasetNumber = (target as HTMLTableCellElement).dataset.number;
  (target as HTMLTableCellElement).textContent = "";
  // CREAT THE INPUT
  const inputHtml = document.createElement("input");
  inputHtml.type = "text";
  inputHtml.dataset.number = datasetNumber;
  // RELOCATION THE OLD TEXT TO THE INPUT
  inputHtml.className = (target as HTMLElement).className;
  if (targetTextContent){
    inputHtml.placeholder = targetTextContent;
  }
  (target as HTMLTableCellElement).appendChild(inputHtml);
  return true;
}


