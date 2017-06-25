document.addEventListener("DOMContentLoaded", function() {
    askForImage(file=>loadImage(file, image=>letUserDrawAndDownload(image)))
})
const byId = document.getElementById.bind(document)
  , DEFAULTCOLOR = "#2b76ce"
  , DEFAULTSIZE = 20

// Setup of the welcome / pick an image UI
function askForImage(callback) {

    // Show the upload interface to the user
    byId('inputForAFile').style.display = "";
    drawAndDownload.style.display = "none";

    // Listen for file changes
    var fileinput = byId('fileinput');
    fileinput.addEventListener('change', fileChanged)
    function fileChanged(changeEvent) {
        fileinput.removeEventListener('change', fileChanged);
        // go to next step
        callback(changeEvent.target.files[0])
    }
}

// Transforms the file input content to a real image 
function loadImage(fileToLoad, callback) {

    byId('readme').innerHTML = "<h1>Loading ...</h1>";

    let fileReader = new FileReader();
    fileReader.onload = ()=>createImageWithFileContent(fileReader.result);
    fileReader.readAsDataURL(fileToLoad);

    function createImageWithFileContent(result) {
        let img = new Image();
        img.onload = ()=>callback(img)
        img.src = result
    }
}

// Lets the user draw on the loaded image
function letUserDrawAndDownload(img) {

    const canvas = byId('drawzone')

    // Switch to isDrawing mode
    byId('inputForAFile').style.display = "none";
    byId('drawAndDownload').style.display = "";

    // Fits the canvas to screen
    var maxRes = Math.max(window.innerHeight, window.innerWidth)
    var imgScale = Math.max(img.width / maxRes, img.height / maxRes, 1)
    canvas.width = img.width / imgScale;
    canvas.height = img.height / imgScale;

    // Display the loaded file on the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // We cache some zoom related data to avoid getting them all the time
    var scale, rect;
    function measureScale() {
        rect = canvas.getBoundingClientRect();
        scale = rect.width / canvas.width;
    }
    measureScale()
    window.addEventListener('resize', measureScale);

    // Initialize color picker events
    const colorpicker = byId('colorpicker')
      , pensizePreview = byId('pensizePreview')
      , pensizePreviewDot = byId('pensizePreviewDot')
      , pensize = byId('pensize');

    function setColor(color) {
        pensizePreviewDot.style.background = ctx.strokeStyle = colorpicker.value = color
        localStorage.setItem('color', color);
    }
    setColor(localStorage.getItem('color') || DEFAULTCOLOR);
    colorpicker.addEventListener('input', e=>setColor(e.target.value))
    
    // Initialize pencil size slider events
    function setPencilSize(pxSize) {
        pensizePreviewDot.style.transform = 'scale(' + (pxSize / 10) + ')';
        ctx.lineWidth = pxSize/scale;
        pensize.value=pxSize;
        localStorage.setItem('pensize', pxSize);
    }
    pensize.addEventListener('input', e=>setPencilSize(e.target.value))
    setPencilSize(parseInt(localStorage.getItem('pensize')) || DEFAULTSIZE)
    ctx.lineCap = 'round';

    let mousePos = {
        x: 0,
        y: 0
    }
      , lastPos = mousePos;

    canvas.addEventListener("mousedown", function(e) {
        mousePos = lastPos = getMousePos(e);
        startDrawLoop()
    }, false);

    document.addEventListener("mouseup", endDrawLoop, false);

    canvas.addEventListener("mousemove", function(e) {
        mousePos = getMousePos(e);
    }, false);
    

    // Get the position of the mouse relative to the canvas
    function getMousePos(mouseEvent) {
        return {
            x: (mouseEvent.clientX - rect.left) / scale,
            y: (mouseEvent.clientY - rect.top) / scale
        };
    }

    // Drawing loop is separated from the events
    let frameRequest = null
      , isDrawing = false;

    function startDrawLoop() {
        if(isDrawing) return
        console.log('startDrawLoop')
        isDrawing = true;
        ctx.beginPath();
        drawLoop()
    }
    function endDrawLoop() {
        console.log('endDrawLoop')
        isDrawing = false;
        window.cancelAnimationFrame(frameRequest);
        frameRequest = null;
    }

    function drawLoop() {
        frameRequest = window.requestAnimationFrame(drawLoop);
        renderCanvas();
    }
    function renderCanvas() {
        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
        lastPos = mousePos;
    }
    
    // Handle mobile events
    function proxyTouchToMouse(touchEventName, mouseEventName) {
        canvas.addEventListener(touchEventName, function(e) {
            e.preventDefault()
            var {clientX,clientY} = e.touches[0] || {};
            var mouseEvent = new MouseEvent(mouseEventName,{
                clientX,
                clientY
            });
            canvas.dispatchEvent(mouseEvent);
        }, false);
    }
    proxyTouchToMouse('touchstart', 'mousedown')
    proxyTouchToMouse('touchend', 'mouseup')
    proxyTouchToMouse('touchmove', 'mousemove')

    // Download button
    byId('download').addEventListener('click', downloadImage, false)
    function downloadImage(e) {
        var filename = (fileinput.value.split('\\').pop().split('.')[0] || 'image') + '-edited.png';
        this.href = canvas.toDataURL('image/png', 0.5)
        this.download = filename
    }

    // Tap the background to switch its color (usefull for transparent images)
    var background = byId('background')
    background.addEventListener('click', switchBackground);
    var currentMode = localStorage.getItem('background') || 0
    function switchBackground() {
        currentMode++
        localStorage.setItem('background', currentMode)
        applyBackground()
    }
    function applyBackground() {
        var options = ['#FFF', '#333']
        background.style.backgroundColor = options[currentMode % options.length]
    }
    applyBackground()
    


}
