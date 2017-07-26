function randomColor(exception = "") {
  let pal = "#F44336,#E91E63,#9C27B0,#673AB7,#3F51B5,#2196F3,#03A9F4,#00BCD4,#009688,#4CAF50,#8BC34A,#CDDC39,#FFEB3B,#FFC107,#FF9800,#FF5722"
    .split(",")
    .filter(c => c != exception);
  return pal[Math.floor(Math.random() * (pal.length + 0.99))];
}

export default function(canvas) {
  let ctx, w, h;
  let bgColor = randomColor();
  function reset() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, w, h);
    ctx.lineCap = "round";
  }
  reset();
  window.addEventListener("resize", reset);

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

    ctx.strokeStyle = randomColor(bgColor);
    ctx.lineWidth = 20 + Math.random() * 40;
    ctx.beginPath();
    ctx.moveTo(position.x, position.y);
  }
  randomizeInst();

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
    stopAnim
  };
}
