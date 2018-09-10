const DEFAULTCOLOR = "#2b76ce";
import { luminance } from "./colorToRGB.js";
import { paletteColors } from "./palette.js";
import { createModal } from "./modal.js";
export default function(
  pensizePreview,
  { onColorChange, elementToContrastWith, canvasForCursor }
) {
  const pensizePreviewDot = pensizePreview.children[0];
  const pensizePreviewBorder = pensizePreview.children[1];

  function refreshColorPreviewBorder() {
    pensizePreviewBorder.style.background = borderColor(
      currentColor,
      elementToContrastWith.style.backgroundColor
    );
  }

  let currentColor;
  function openInitializedColorPicker() {
    openColorPicker(currentColor, onColorPicked);
  }
  pensizePreview.addEventListener("click", openInitializedColorPicker);
  let previousColor = localStorage.getItem("previousColor") || "eraser";

  function onColorPicked(color) {
    console.log("onColorPicked", color);
    if (currentColor && color !== currentColor) {
      // For toggling between last two colors
      previousColor = currentColor;
    }

    localStorage.setItem("previousColor", previousColor);

    currentColor = color;
    setCursor(canvasForCursor, currentSize, currentColor);
    if (color == "eraser") {
      pensizePreviewDot.style.background = "";
      pensizePreviewDot.classList.add("eraser");
    } else {
      pensizePreviewDot.classList.remove("eraser");
      pensizePreviewDot.style.background = color;
      refreshColorPreviewBorder();
    }
    localStorage.setItem("color", color);
    onColorChange(color);
  }
  let currentSize;
  // Should be 10
  const baseSize = pensizePreviewDot.getBoundingClientRect().width;

  window.addEventListener("keydown", ev => {
    if (String.fromCharCode(ev.which).toLowerCase() === "x") {
      console.log("x switching to " + previousColor);
      onColorPicked(previousColor);
    }
  });

  function setColorDotSize(pxSize) {
    currentSize = pxSize;
    setCursor(canvasForCursor, currentSize, currentColor);
    pensizePreviewDot.style.transform = "scale(" + pxSize / baseSize + ")";
    pensizePreviewBorder.style.transform =
      "scale(" + (pxSize / baseSize + 1 / baseSize) + ")";
  }

  setTimeout(() =>
    onColorPicked(localStorage.getItem("color") || DEFAULTCOLOR)
  );

  return {
    clearColorPicker() {
      pensizePreview.removeEventListener("click", openInitializedColorPicker);
    },
    setColorDotSize,
    refreshColorPreviewBorder
  };
}

function borderColor(foreground, background) {
  if (foreground == "eraser") return "transparent";
  let bgL = luminance(background);
  let fgL = luminance(foreground);
  if (bgL > 125 && fgL > 200) return "black";
  if (bgL < 125 && fgL < 25) return "white";
  return "transparent";
}

function textColor(background) {
  return luminance(background) > 255 / 2
    ? "rgba(0,0,0,0.8)"
    : "rgba(255,255,255,0.8)";
}

function openColorPicker(currentColor, callback) {
  createModal("color-modal", ({ modal, closeModal }) => {
    function pickColor(color) {
      closeModal();
      callback(color);
    }

    paletteColors.forEach(color => {
      let button = document.createElement("button");
      button.classList.add("colorbutton");
      if (color === currentColor) {
        button.classList.add("active");
        button.innerHTML = "Selected";
        button.style.color = textColor(color);
      }
      button.style.backgroundColor = color.toLowerCase();
      button.addEventListener("click", () => pickColor(color));
      modal.appendChild(button);
    });

    let eraser = document.createElement("button");
    eraser.classList.add("eraser");
    eraser.addEventListener("click", () => pickColor("eraser"));
    eraser.innerHTML =
      '<img src="'+require('./eraser-color.svg')+'"/><span class="imagelabel">' +
      ("eraser" === currentColor ? "Eraser selected" : "Eraser") +
      "</span>";
    modal.appendChild(eraser);
  });
}

function setCursor(node, size, color) {
  let s = size < 4 ? 4 : size;
  let c = document.createElement("canvas");
  c.width = c.height = s;
  let ctx = c.getContext("2d");

  if (color == "eraser") drawEraser(ctx, s);
  else drawColorCircle(ctx, s, color);
  let cursor = c.toDataURL("image/png");
  node.style.cursor = `url(${cursor}) ${s / 2} ${s / 2},auto`;
}

function drawColorCircle(ctx, s, color) {
  ctx.beginPath();
  ctx.arc(s / 2, s / 2, s / 2, 0, 2 * Math.PI, false);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawEraser(ctx, s) {
  ctx.fillStyle = "#da502d";
  ctx.fillRect(0, 0, s * 2 / 3, s);
  ctx.fillStyle = "#6584a5";
  ctx.fillRect(s * 2 / 3 - 1, 0, s, s);
  ctx.globalCompositeOperation = "destination-in";
  drawColorCircle(ctx, s, "white");
}
