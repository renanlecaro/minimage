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

// Lets the user draw on the loaded image
function letUserDrawAndDownload(img) {
  OrginalImage = img;
  const canvas = byId("drawzone"),
    drawzoneWrapper = byId("drawzoneWrapper");
  drawzoneWrapper.appendChild(img);

  // Switch to drawing mode
  byId("inputForAFile").style.display = "none";
  byId("drawAndDownload").style.display = "";

  // Fits the canvas to screen
  let maxRes = Math.max(window.innerHeight, window.innerWidth);
  let imgScale = Math.max(img.width / maxRes, img.height / maxRes, 1);
  img.style.maxWidth = canvas.width = img.width / imgScale;
  img.style.maxHeight = canvas.height = img.height / imgScale;

  let ctx = canvas.getContext("2d");
  let { drawWithColor, drawWithEraser, setPencilSize } = setupEditableCanvas(
    canvas,
    {}
  );

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
