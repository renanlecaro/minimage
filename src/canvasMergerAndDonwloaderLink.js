export function makeDownloadLink(
  link,
  { OrginalImage, canvas, originalFileName, startTask, endTask }
) {
  // Download button
  var downloadCounter = 0;
  link.addEventListener("click", downloadImage, false);
  function downloadImage(e) {
    startTask();
    e.preventDefault();
    let filename = originalFileName + "-minimage-" + downloadCounter + ".png";
    mergeCanvasAndImage(canvas, OrginalImage);
    downloadCanvas(canvas, filename, endTask);
    downloadCounter++;
  }
}

function downloadCanvas(canvas, filename, callback) {
  canvas.toBlob(function(blob) {
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(blob, filename);
    } else {
      let url = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      document.body.appendChild(link);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.click();
      setTimeout(callback);
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      }, 3000);
    }
  });
}

export function mergeCanvasAndImage(canvas, img) {
  // Pastes the image as a canvas background
  var ctx = canvas.getContext("2d");
  let oldComposite = ctx.globalCompositeOperation;
  ctx.globalCompositeOperation = "destination-over";

  // Draw the orignal image
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = oldComposite;

  return canvas;
}
