const DEFAULTCOLOR = "#2b76ce";

export default function(
  pensizePreview,
  { onColorChange, elementToContrastWith }
) {
  const pensizePreviewDot = pensizePreview.children[0];

  function refreshColorPreviewBorder() {
    pensizePreviewDot.style.border =
      "1px solid " +
      borderColor(
        pensizePreviewDot.style.backgroundColor,
        elementToContrastWith.style.backgroundColor
      );
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
  pickColor;
}

function borderColor(foreground, background) {
  let bgL = luminance(background);
  let fgL = luminance(foreground);
  if (bgL > 125 && fgL > 200) return "black";
  if (bgL < 125 && fgL < 25) return "white";
  return "transparent";
}

let paletteColors = "#000000,#FFFFFF,#F44336,#E91E63,#9C27B0,#673AB7,#3F51B5,#2196F3,#03A9F4,#00BCD4,#009688,#4CAF50,#8BC34A,#CDDC39,#FFEB3B,#FFC107,#FF9800,#FF5722,#795548,#9E9E9E,#607D8B".split(
  ","
);

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
      button.innerHTML = "Your selected color";
    }
    button.style.backgroundColor = color.toLowerCase();
    button.addEventListener("click", () => pickColor(color));
    modal.appendChild(button);
  });

  let eraser = document.createElement("button");
  eraser.classList.add("eraser");
  eraser.addEventListener("click", () => pickColor("eraser"));
  eraser.innerHTML = '<img src="/images/eraser.svg"/>Eraser (reveals photo)';
  modal.appendChild(eraser);

  function closeModal() {
    document.body.removeChild(modal);
  }
}
