import askForIMG from "./getAnImage.js";

import welcomeAnim from "./welcomeAnim.js";
import { makeDownloadLink } from "./canvasMergerAndDonwloaderLink.js";

const byId = document.getElementById.bind(document);

askForIMG({
  fileinput: byId("fileinput"),
  onImageCreated: (img, filename) => {
    document.body.appendChild(img);
    makeDownloadLink(byId("testDL"), {
      OrginalImage: img,
      originalFileName: "youpi",
      canvas: byId("testCanvas")
    });
    byId("testDL").innerHTML = "Download ready";
  }
});
welcomeAnim(byId("testCanvas"));
