/*

See the app in action here : https://minimage.tk

*/
import "./styles.less";
import setupColorPicker from "./colorPicker.js";
import askForIMG from "./getAnImage.js";
import toggleAbleBackground from "./toggleAbleBackground.js";
import setupEditableCanvas from "./editableCanvas.js";
import canvasMergerAndDonwloaderLink from "./canvasMergerAndDonwloaderLink.js";
import pencilSizeSlider from "./pencilSizeSlider.js";
import welcomeAnim from "./welcomeAnim.js";
const byId = document.getElementById.bind(document),
  DEFAULTSIZE = 20;

let originalFileName, OrginalImage;
askForIMG({
  fileinput: byId("fileinput"),
  onImageCreated: (img, filename) => {
    originalFileName = filename;
    letUserDrawAndDownload(img);
  }
});

let { stopAnim, bgColor } = welcomeAnim(byId("welcome"));
byId("fileInputWrapper").style.color = bgColor;

// Lets the user draw on the loaded image
function letUserDrawAndDownload(img) {
  OrginalImage = img;
  stopAnim();
  const canvas = byId("drawzone"),
    drawzoneWrapper = byId("drawzoneWrapper");
  drawzoneWrapper.appendChild(img);

  // Switch to drawing mode
  byId("inputForAFile").style.display = "none";
  byId("drawAndDownload").style.display = "";

  // Fits the canvas to screen
  let maxRes = Math.max(window.innerHeight, window.innerWidth);
  let imgScale = Math.max(img.width / maxRes, img.height / maxRes, 1);
  img.width = canvas.width = img.width / imgScale;
  img.height = canvas.height = img.height / imgScale;
  drawzoneWrapper.style.maxWidth = img.width;
  drawzoneWrapper.style.maxHeight = img.height;

  let ctx = canvas.getContext("2d");
  let hasDoneFirstDraw = false;
  let {
    drawWithColor,
    drawWithEraser,
    setPencilSize
  } = setupEditableCanvas(canvas, {
    onMouseUp: () => {
      if (!hasDoneFirstDraw) {
        hasDoneFirstDraw = true;
        download.classList.add("usable");
      }
    }
  });

  // Sets draw color at load and when user clicks color input
  function setColor(color) {
    if (color == "eraser") {
      drawWithEraser();
    } else {
      drawWithColor(color);
    }
  }

  let background = byId("background");

  const { setColorDotSize, refreshColorPreviewBorder } = setupColorPicker(
    byId("pensizePreview"),
    {
      canvasForCursor: canvas,
      onColorChange: setColor,
      elementToContrastWith: background
    }
  );
  // Tap the background to switch its color (usefull for transparent images)
  toggleAbleBackground(background, { onChange: refreshColorPreviewBorder });

  pencilSizeSlider(byId("pensize"), {
    onChange(pxSize) {
      setColorDotSize(pxSize);
      setPencilSize(pxSize);
    }
  });

  canvasMergerAndDonwloaderLink(byId("download"), {
    OrginalImage,
    originalFileName,
    canvas
  });
}
