import welcomeAnim from "./welcomeAnim.js";

const byId = document.getElementById.bind(document);

welcomeAnim(byId("testCanvas"), { fitWindow: false });

byId("testDL").addEventListener("click", function(ev) {
  ev.preventDefault();

  byId("testCanvas").toBlob(function(blob) {
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(blob, filename);
    } else {
      var element = document.createElement("a");
      element.setAttribute("href", window.URL.createObjectURL(blob));
      element.setAttribute("download", "fileName.png");
      element.click();
    }
  });
});
