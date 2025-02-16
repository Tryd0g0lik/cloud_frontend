/**
 * src\components\Files\handlers\handlerReferralBufers.ts
 * @param e
 * @returns
 */

/**
 * After the event click by referral-anchor element, the text \
 * of the referral link will be copied to the bufer and we see the message alter.
 * This massage will be removed after 5 seconds.
 * @param e :MouseEvent
 * @returns
 */
export function handlerReferralBufers(e: MouseEvent) {
  const {target, type} = e;
  const {localName, classList} = target as HTMLElement;
  if (type !== "click" || (type === "click" &&
    !classList.contains("referral-anchor")
  )) {
    return false;
  }
  e.preventDefault();
  const textContent = (target as HTMLAnchorElement).href;
  if (!textContent || textContent.length < 10 ) {
    return false;
  }

  const divAlertHmtl = document.createElement("div");
  divAlertHmtl.id = "alert";
  divAlertHmtl.classList.add("alert");
  divAlertHmtl.classList.add("referral-alert");
  divAlertHmtl.classList.add("alert-info");
  divAlertHmtl.innerText = 'Текст скопирован в буфер обмена';

    navigator.clipboard.writeText(textContent)
    .catch((err)=>{
    divAlertHmtl.innerText = 'Не удалось скопировать текст';
    console.error('Не удалось скопировать текст: ', err);

}).then(()=>{
  ((e.target as HTMLElement).parentElement as HTMLElement).insertAdjacentElement("afterend", divAlertHmtl)
  console.log('Текст скопирован в буфер обмена')
})
.finally(()=>{
    const alertElement = document.querySelector('.referral-alert');
    if (!alertElement){
      return false;
    }
    (alertElement as HTMLElement).style.display = 'block';
    setTimeout(() => {
      (alertElement as HTMLElement).remove();
    }, 2000)
});

}
