 
export function makeDownloadLink(
  link,
  { OrginalImage, canvas, originalFileName }
) {
  // Download button
  function downloadImage(e) {
    e.preventDefault(); 
    triggerDownload(canvas, originalFileName, OrginalImage);
  }
  link.addEventListener("click", downloadImage);
}

function nope(e) {
  console.log(e);
}
var downloadCounter = 0;
export function triggerDownload(
  canvas,
  originalFileName,
  OrginalImage,
  failed = nope,
  suceeded = nope
) {
  let filename = originalFileName + "-minimage-" + downloadCounter + ".png";
  mergeCanvasAndImage(canvas, OrginalImage, failed, suceeded);
  downloadCanvas(canvas, filename, failed, suceeded);

  downloadCounter++;
}

export function mergeCanvasAndImage(canvas, img, failed, suceeded) {
  try {
    // Pastes the image as a canvas background
    var ctx = canvas.getContext("2d");
    let oldComposite = ctx.globalCompositeOperation;
    ctx.globalCompositeOperation = "destination-over";

    // Draw the orignal image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = oldComposite;
    suceeded && setTimeout(suceeded);
    return canvas;
  } catch (e) {
    failed && failed(e);
  }
}

function downloadCanvas(canvas, filename, failed, suceeded) {
  try {
    canvas.toBlob(function(blob) {
      try {
        if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveBlob(blob, filename);
          suceeded && setTimeout(suceeded);
        } else {
          let url = window.URL.createObjectURL(blob);
          let link = document.createElement("a");
          document.body.appendChild(link);
          link.setAttribute("href", url);
          link.setAttribute("download", filename);
          link.click();
          suceeded && setTimeout(suceeded);
          setTimeout(() => {
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
          }, 3000);
        }
      } catch (e) {
        failed && failed(e);
      }
    });
  } catch (e) {
    failed && failed(e);
  }
}
