/*

See the app in action here : https://minimage.tk

*/
import "./styles.less"

document.addEventListener("DOMContentLoaded", function() {
  askForImage();
});

window.addEventListener("paste", function(ev) {
  handleDataTransferItems(ev.clipboardData.items);
});

document.body.addEventListener("dragover", function(ev) {
  ev.preventDefault();
  ev.stopPropagation();
});
document.body.addEventListener("drop", function(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  handleDataTransferItems(ev.dataTransfer.items);
});

function handleDataTransferItems(items) {
  // Tries to paste an image
   let imageFile = Array.prototype.find.call(
    items,
    e => e.kind == "file" && e.type.match("image")
  );
  originalFileName = "pasted-image";
  if (imageFile) {
    console.log("parsing pasted image content");
    loadFile(imageFile.getAsFile());
    return;
  }
  // Tries to load a remote image given its adress
  let url = Array.prototype.find.call(items, e => e.kind == "string");
  if (url) {
    console.log("parsing url content");
    url.getAsString(s => createImageWithFileContent(s));
  }
}

const byId = document.getElementById.bind(document),
  DEFAULTCOLOR = "#2b76ce",
  DEFAULTSIZE = 20;

var originalFileName = "pasted-image";
let askingForImage = true;
// Setup of the welcome  UI
function askForImage() {
  let fileinput = byId("fileinput");
  fileinput.addEventListener("change", fileChanged);
  function fileChanged(changeEvent) {
    fileinput.removeEventListener("change", fileChanged);
    // go to next step

    originalFileName =
      fileinput.value.split("\\").pop().split(".")[0] || "image";
    loadFile(changeEvent.target.files[0]);
  }
}

// Transforms the file input content to a real image
function loadFile(fileToLoad) {
  byId("readme").innerHTML = "<h1>Loading ...</h1>";

  let fileReader = new FileReader();
  fileReader.onload = () => createImageWithFileContent(fileReader.result);
  fileReader.readAsDataURL(fileToLoad);
}

function createImageWithFileContent(result) {
  console.log("trying to load file as image");
  if (!askingForImage) return;
  let img = new Image();
  img.onload = () => letUserDrawAndDownload(img);
  img.src = result;
}
// Lets the user draw on the loaded image
function letUserDrawAndDownload(img) {
  askingForImage = false;
  const canvas = byId("drawzone");

  // Switch to drawing mode
  byId("inputForAFile").style.display = "none";
  byId("drawAndDownload").style.display = "";

  // Fits the canvas to screen
  let maxRes = Math.max(window.innerHeight, window.innerWidth);
  let imgScale = Math.max(img.width / maxRes, img.height / maxRes, 1);
  canvas.width = img.width / imgScale;
  canvas.height = img.height / imgScale;


  // Display the loaded image on the canvas
  let ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);


  // We cache some zoom related data to avoid getting them all the time
  let scale, rect;
  function measureScale() {
    rect = canvas.getBoundingClientRect();
    scale = rect.width / canvas.width;
  }
  measureScale();
  window.addEventListener("resize", measureScale);

  const colorpicker = byId("colorpicker"),
    pensizePreview = byId("pensizePreview"),
    pensizePreviewDot = byId("pensizePreviewDot"),
    pensize = byId("pensize");

  // Sets draw color at load and when user clicks color input
  function setColor(color) {
    pensizePreviewDot.style.background = ctx.strokeStyle = colorpicker.value = color;
    localStorage.setItem("color", color);
    refreshColorPreviewBorder();
  }
  function refreshColorPreviewBorder() {
    let pensizePreviewDot = byId("pensizePreviewDot");
    pensizePreviewDot.style.border =
      "1px solid " +
      borderColor(
        pensizePreviewDot.style.backgroundColor,
        byId("background").style.backgroundColor
      );
  }
  setColor(localStorage.getItem("color") || DEFAULTCOLOR);
  colorpicker.addEventListener("input", e => setColor(e.target.value));

  // Sets draw size at load and stylewhen the user interracts with the slider
  function setPencilSize(pxSize) {
    pensizePreviewDot.style.transform = "scale(" + pxSize / 10 + ")";
    ctx.lineWidth = pxSize / scale;
    pensize.value = pxSize;
    localStorage.setItem("pensize", pxSize);
  }
  pensize.addEventListener("input", e => setPencilSize(e.target.value));
  setPencilSize(parseInt(localStorage.getItem("pensize")) || DEFAULTSIZE);

  // To make the lines look slightly nicer
  ctx.lineCap = "round";

  // We cache the mouse position and previous mouse position.
  // Theay are defined by touch events, and used by the draw loop
  let mousePos = {
      x: 0,
      y: 0
    },
    lastPos = mousePos;

  canvas.addEventListener(
    "mousedown",
    function(e) {
      mousePos = lastPos = getMousePos(e);
      startDrawLoop();
    },
    false
  );

  document.addEventListener("mouseup", endDrawLoop, false);

  canvas.addEventListener(
    "mousemove",
    function(e) {
      mousePos = getMousePos(e);
    },
    false
  );

  // Get the position of the mouse relative to the canvas
  function getMousePos(mouseEvent) {
    return {
      x: (mouseEvent.clientX - rect.left) / scale,
      y: (mouseEvent.clientY - rect.top) / scale
    };
  }

  // Drawing loop is separated from the events￼

  let isDrawing = false;

  function startDrawLoop() {
    if (isDrawing) return;
    isDrawing = true;
    ctx.beginPath();
    drawLoop();
  }
  function endDrawLoop() {
    isDrawing = false;
  }

  function drawLoop() {
    if (isDrawing) {
      window.requestAnimationFrame(drawLoop);
      renderCanvas();
    }
  }
  function renderCanvas() {
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
    lastPos = mousePos;
  }

  // Proxy mobile events to their mouse counterpart
  function proxyTouchToMouse(touchEventName, mouseEventName) {
    canvas.addEventListener(
      touchEventName,
      function(e) {
        e.preventDefault();
        let { clientX, clientY } = e.touches[0] || {};
        let mouseEvent = new MouseEvent(mouseEventName, {
          clientX,
          clientY
        });
        canvas.dispatchEvent(mouseEvent);
      },
      false
    );
  }
  proxyTouchToMouse("touchstart", "mousedown");
  proxyTouchToMouse("touchend", "mouseup");
  proxyTouchToMouse("touchmove", "mousemove");

  // Download button
  var downloadCounter = 0;
  byId("download").addEventListener("click", downloadImage, false);
  function downloadImage(e) {
    let filename = originalFileName + "-minimage-" + downloadCounter + ".png";
    this.href = canvas.toDataURL("image/png", 0.5);
    this.download = filename;
    downloadCounter++;
  }

  // Tap the background to switch its color (usefull for transparent images)
  let background = byId("background");
  function switchBackground() {
    currentMode++;
    localStorage.setItem("background", currentMode);
    applyBackground();
  }
  function applyBackground() {
    let options = ["#FFF", "#333"];
    background.style.backgroundColor = options[currentMode % options.length];
    refreshColorPreviewBorder();
  }
  let currentMode = localStorage.getItem("background") || 0;
  applyBackground();
  background.addEventListener("click", switchBackground);
}

function colorToRGBA(color) {
  var canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  return [...ctx.getImageData(0, 0, 1, 1).data];
}
function luminance(color) {
  return colorToRGBA(color).slice(0, 3).reduce((a, b) => a + b, 0) / 3;
}

function borderColor(foreground, background) {
  let bgL = luminance(background);
  let fgL = luminance(foreground);
  if (bgL > 125 && fgL > 200) return "black";
  if (bgL < 125 && fgL < 25) return "white";
  return "transparent";
}
