const DEFAULTCOLOR = "#2b76ce";
import colorToRGB from "./colorToRGB.js";
import { paletteColors } from "./palette.js";
export default function(
  pensizePreview,
  { onColorChange, elementToContrastWith }
) {
  const pensizePreviewDot = pensizePreview.children[0];

  function refreshColorPreviewBorder() {
    pensizePreviewDot.style.border =
      "1px solid " +
      borderColor(currentColor, elementToContrastWith.style.backgroundColor);
  }

  let currentColor;
  pensizePreview.addEventListener("click", () =>
    openColorPicker(currentColor, onColorPicked)
  );
  function onColorPicked(color) {
    currentColor = color;
    if (color == "eraser") {
      pensizePreviewDot.style.background = "";
      pensizePreviewDot.classList.add("eraser");
    } else {
      pensizePreviewDot.classList.remove("eraser");
      pensizePreviewDot.style.background = color;
      localStorage.setItem("color", color);
      refreshColorPreviewBorder();
    }
    onColorChange(color);
  }

  function setColorDotSize(pxSize) {
    pensizePreviewDot.style.transform = "scale(" + pxSize / 10 + ")";
  }

  setTimeout(() =>
    onColorPicked(localStorage.getItem("color") || DEFAULTCOLOR)
  );

  return {
    setColorDotSize,
    refreshColorPreviewBorder
  };
}

function luminance(color) {
  return colorToRGB(color).reduce((a, b) => a + b, 0) / 3;
  pickColor;
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
  let modal = document.createElement("div");
  modal.classList.add("modal");
  document.body.appendChild(modal);

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
    '<img src="/images/eraser-color.svg"/><span class="imagelabel">' +
    ("eraser" === currentColor ? "Eraser selected" : "Eraser") +
    "</span>";
  modal.appendChild(eraser);

  function closeModal() {
    modal.classList.add("closing");
    setTimeout(() => document.body.removeChild(modal), 300);
  }
}
