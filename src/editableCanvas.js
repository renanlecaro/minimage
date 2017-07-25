export default function(canvas, {}) {
  // We cache some zoom related data to avoid getting them all the time
  let scale, rect;
  function measureScale() {
    rect = canvas.getBoundingClientRect();
    scale = rect.width / canvas.width;
  }
  measureScale();
  window.addEventListener("resize", measureScale);

  let ctx = canvas.getContext("2d");

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
  function proxyTouchToMouse(
    touchEventName,
    mouseEventName,
    eventTarget = canvas
  ) {
    canvas.addEventListener(
      touchEventName,
      function(e) {
        e.preventDefault();
        let { clientX, clientY } = e.touches[0] || {};
        let mouseEvent = new MouseEvent(mouseEventName, {
          clientX,
          clientY
        });
        eventTarget.dispatchEvent(mouseEvent);
      },
      false
    );
  }
  proxyTouchToMouse("touchstart", "mousedown");
  proxyTouchToMouse("touchend", "mouseup", document);
  proxyTouchToMouse("touchmove", "mousemove");

  return {
    drawWithEraser() {
      ctx.globalCompositeOperation = "destination-out";
    },
    drawWithColor(color) {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color;
    },
    setPencilSize(pxSize) {
      ctx.lineWidth = pxSize / scale;
    }
  };
}
