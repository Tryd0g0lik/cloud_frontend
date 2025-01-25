/**
 * To the `DOM` add or remove the 'active' class (`div#root.active`).
 */
export default function changeDOM(active = false) {
  setTimeout(() => {
    const divHtml = document.getElementById("root");
    if (divHtml) {
      let classes = divHtml.className;
      if ("active".includes(classes) && !active) {
        divHtml.className = classes.replace("active", "");
      } else {
        divHtml.classList.add("active");
      }
    }
  }, 800);
}
