import { triggerDownload } from "./canvasMergerAndDonwloaderLink.js";
export function detectCtrlS({ canvas, OrginalImage, originalFileName }) {
  window.addEventListener("keydown", event => {
    if (event.ctrlKey || event.metaKey) {
      if (String.fromCharCode(event.which).toLowerCase() === "s") {
        event.preventDefault();
        triggerDownload(canvas, originalFileName, OrginalImage);
      }
    }
  });
}
