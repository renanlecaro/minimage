/*

See the app in action here : https://minimage.tk

*/
import "./styles.less";
import setupColorPicker from "./colorPicker.js";
import askForIMG from "./getAnImage.js";
import toggleAbleBackground from "./toggleAbleBackground.js";
import setupEditableCanvas from "./editableCanvas.js";
import { makeDownloadLink } from "./canvasMergerAndDonwloaderLink.js";
import pencilSizeSlider from "./pencilSizeSlider.js";
import welcomeAnim from "./welcomeAnim.js";
import { checkRunWithinWebview } from "./checkRunWithinWebview.js";
import { startTask, endTask } from "./spinners.js";
const byId = document.getElementById.bind(document);

checkRunWithinWebview();
let originalFileName, OrginalImage;
askForIMG({
  fileinput: byId("fileinput"),
  onImageCreated: (img, filename) => {
    originalFileName = filename;
    letUserDrawAndDownload(img);
  },
  startTask,
  endTask
});

let { stopAnim, bgColor } = welcomeAnim(byId("welcome"), { fitWindow: true });
byId("fileInputWrapper").style.color = bgColor;

// Lets the user draw on the loaded image
function letUserDrawAndDownload(img) {
  OrginalImage = img;
  stopAnim();
  const canvas = byId("drawzone"),
    drawzoneWrapper = byId("drawzoneWrapper");

  // Switch to drawing mode
  byId("inputForAFile").style.display = "none";
  byId("drawAndDownload").style.display = "";

  console.log(img.width, img.height);
  debugger;
  let maxRes = 3000; //Math.max(img.width, img.height);
  // Fits the canvas to screen
  let imgScale = Math.max(img.width / maxRes, img.height / maxRes, 1);
  img.width = canvas.width = img.width / imgScale;
  img.height = canvas.height = img.height / imgScale;
  drawzoneWrapper.style.maxWidth = img.width;
  drawzoneWrapper.style.maxHeight = img.height;

  // Needs to happen AFTER size measurements
  drawzoneWrapper.appendChild(img);

  let ctx = canvas.getContext("2d");
  let hasDoneFirstDraw = false;
  let barClass = byId("topbar").classList;

  let background = byId("background");

  const { setColorDotSize, refreshColorPreviewBorder } = setupColorPicker(
    byId("pensizePreview"),
    {
      canvasForCursor: canvas,
      onColorChange: setColor,
      elementToContrastWith: background
    }
  );

  let {
    drawWithColor,
    drawWithEraser,
    setPencilSize
  } = setupEditableCanvas(canvas, {
    onMouseDown() {
      if (canvas.getClientRects()[0].height + 2 * 70 > window.innerHeight) {
        barClass.add("drawInProgress");
      }
    },
    onMouseUp() {
      if (!hasDoneFirstDraw) {
        hasDoneFirstDraw = true;
        download.classList.add("usable");
      }
      barClass.remove("drawInProgress");
    },
    OrginalImage
  });

  // Sets draw color at load and when user clicks color input
  function setColor(color) {
    if (color == "eraser") {
      drawWithEraser();
    } else {
      drawWithColor(color);
    }
  }
  // Tap the background to switch its color (usefull for transparent images)
  toggleAbleBackground(background, { onChange: refreshColorPreviewBorder });

  pencilSizeSlider(byId("pensize"), {
    onChange(pxSize) {
      setColorDotSize(pxSize);
      setPencilSize(pxSize);
    }
  });

  makeDownloadLink(byId("download"), {
    OrginalImage,
    originalFileName,
    canvas
  });
}
