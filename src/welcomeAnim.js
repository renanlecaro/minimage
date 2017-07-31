const coolColors = "#F44336,#E91E63,#9C27B0,#673AB7,#3F51B5,#2196F3,#03A9F4,#00BCD4,#009688,#4CAF50,#8BC34A,#CDDC39,#FFEB3B,#FFC107,#FF9800,#FF5722".split(
  ","
);

//import { luminance } from "./colorToRGB.js";
// const darkCoolColors = coolColors.filter(c => luminance(c) < 150);

function randomColor(colorPool, exception = "") {
  let withoutEx = colorPool.filter(c => c != exception);
  return withoutEx[Math.floor(Math.random() * withoutEx.length)];
}

export default function(canvas, { fitWindow }) {
  let ctx, w, h;
  let bgColor = "#F44336"; //randomColor(darkCoolColors);
  function reset() {
    if (fitWindow) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    w = canvas.width;
    h = canvas.height;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, w, h);
    ctx.lineCap = "round";
    randomizeInst();
  }

  let position, speed, acceleration, timeoutHandle, accelerationTimeoutHandle;
  function randomizeInst() {
    position = {
      // x: Math.random() * w,
      // y: Math.random() * h
      x: w / 2,
      y: h / 2
    };
    speed = {
      x: Math.random() * 10 - 5,
      y: Math.random() * 10 - 5
    };
    acceleration = {
      x: Math.random() * 10 - 5,
      y: Math.random() * 10 - 5
    };

    ctx.strokeStyle = randomColor(coolColors, bgColor);
    ctx.lineWidth = 20 + Math.random() * 40;
    ctx.beginPath();
    ctx.moveTo(position.x, position.y);
  }

  reset();
  window.addEventListener("resize", reset);

  function randomAcceletation() {
    acceleration = {
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1
    };
    // speed.x*=0.2;
    // speed.y*=0.2;

    accelerationTimeoutHandle = setTimeout(
      randomAcceletation,
      100 + Math.random() * 200
    );
  }
  randomAcceletation();
  function renderCanvas() {
    ctx.moveTo(position.x, position.y);
    speed.x *= 0.95;
    speed.y *= 0.95;

    speed.x += acceleration.x;
    speed.y += acceleration.y;
    position.x += speed.x;
    position.y += speed.y;
    ctx.lineTo(position.x, position.y);
    ctx.stroke();
    if (
      position.x < -50 ||
      position.x > w + 50 ||
      position.y < -50 ||
      position.y > h + 50
    )
      randomizeInst();
  }

  let isDrawing = true;
  function drawLoop() {
    if (isDrawing) {
      window.requestAnimationFrame(drawLoop);
      renderCanvas();
    }
  }

  drawLoop();

  function stopAnim() {
    isDrawing = false;
    clearTimeout(accelerationTimeoutHandle);
    window.removeEventListener("resize", reset);
  }

  return {
    stopAnim,
    bgColor
  };
}
