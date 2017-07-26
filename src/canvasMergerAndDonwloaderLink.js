export function makeDownloadLink(
  link,
  { OrginalImage, canvas, originalFileName }
) {
  // Download button
  var downloadCounter = 0;
  link.addEventListener("click", downloadImage, false);
  function downloadImage(e) {
    let filename = originalFileName + "-minimage-" + downloadCounter + ".png";
    this.href = mergeCanvasAndImage(canvas, OrginalImage).toDataURL(
      "image/png",
      0.5
    );
    this.download = filename;
    downloadCounter++;
  }
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
