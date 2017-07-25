export default function(link, { OrginalImage, canvas, originalFileName }) {
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

function mergeCanvasAndImage(canvas, img) {
  let clone = document.createElement("canvas");
  clone.width = canvas.width;
  clone.height = canvas.height;
  var ctx = clone.getContext("2d");
  // Draw the orignal image
  ctx.drawImage(img, 0, 0, clone.width, clone.height);
  // And then the user's mess on top
  ctx.drawImage(canvas, 0, 0);
  return clone;
}
