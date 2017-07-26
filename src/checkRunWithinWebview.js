export function checkRunWithinWebview() {
  if (navigator.userAgent.match(/Android/i)) {
    let JSONPcall = document.createElement("script");
    JSONPcall.src = "https://iswebview.herokuapp.com/?callback=JSONPcallback";
    document.body.appendChild(JSONPcall);
  }
}
window.JSONPcallback = function(result) {
  if (result.isWebView) {
    document.body.classList.add("runningWithinWebview");
    document.body.innerHTML = `
      Please open minimage.tk with chrome,
       it cannot work within another app.

        There may be an option in the menu above the page,
         something like "Open in Chrome".

         `;
  }
};
