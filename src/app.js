/*
Minimage, minimal image editor.

See the app in action here : https://minimage.tk

This is a vanillaJS, barebone image editor. 
It is meant to work on chrome for android and not much more. 

*/
document.addEventListener("DOMContentLoaded", function() {
    askForImage(file=>loadImage(file, image=>letUserDrawAndDownload(image)))
})

const byId = document.getElementById.bind(document)
  , DEFAULTCOLOR = "#2b76ce"
  , DEFAULTSIZE = 20;

// Setup of the welcome  UI
function askForImage(callback) {

    let fileinput = byId('fileinput');
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

    // Switch to drawing mode
    byId('inputForAFile').style.display = "none";
    byId('drawAndDownload').style.display = "";

    // Fits the canvas to screen
    let maxRes = Math.max(window.innerHeight, window.innerWidth)
    let imgScale = Math.max(img.width / maxRes, img.height / maxRes, 1)
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
    measureScale()
    window.addEventListener('resize', measureScale);

    
    const colorpicker = byId('colorpicker')
      , pensizePreview = byId('pensizePreview')
      , pensizePreviewDot = byId('pensizePreviewDot')
      , pensize = byId('pensize');
    
    // Sets draw color at load and when user clicks color input  
    function setColor(color) {
        pensizePreviewDot.style.background = ctx.strokeStyle = colorpicker.value = color
        localStorage.setItem('color', color);
    }
    setColor(localStorage.getItem('color') || DEFAULTCOLOR);
    colorpicker.addEventListener('input', e=>setColor(e.target.value))
    
    // Sets draw size at load and when the user interracts with the slider
    function setPencilSize(pxSize) {
        pensizePreviewDot.style.transform = 'scale(' + (pxSize / 10) + ')';
        ctx.lineWidth = pxSize/scale;
        pensize.value=pxSize;
        localStorage.setItem('pensize', pxSize);
    }
    pensize.addEventListener('input', e=>setPencilSize(e.target.value))
    setPencilSize(parseInt(localStorage.getItem('pensize')) || DEFAULTSIZE)
    
    // To make the lines look slightly nicer
    ctx.lineCap = 'round';

    // We cache the mouse position and previous mouse position. 
    // Theay are defined by touch events, and used by the draw loop
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
    let isDrawing = false;

    function startDrawLoop() {
        if(isDrawing) return
        isDrawing = true;
        ctx.beginPath();
        drawLoop()
    }
    function endDrawLoop() {
        isDrawing = false;
    }

    function drawLoop() {
        if(isDrawing){
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
        canvas.addEventListener(touchEventName, function(e) {
            e.preventDefault()
            let {clientX,clientY} = e.touches[0] || {};
            let mouseEvent = new MouseEvent(mouseEventName,{
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
        let filename = (fileinput.value.split('\\').pop().split('.')[0] || 'image') + '-edited.png';
        this.href = canvas.toDataURL('image/png', 0.5)
        this.download = filename
    }

    // Tap the background to switch its color (usefull for transparent images)
    let background = byId('background')
    function switchBackground() {
        currentMode++
        localStorage.setItem('background', currentMode)
        applyBackground()
    }
    function applyBackground() {
        let options = ['#FFF', '#333']
        background.style.backgroundColor = options[currentMode % options.length]
    }
    let currentMode = localStorage.getItem('background') || 0
    applyBackground()
    background.addEventListener('click', switchBackground);

}

