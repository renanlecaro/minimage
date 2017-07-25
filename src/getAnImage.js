export default function({ onImageCreated, fileinput }) {
  // Callbacks onImageCreated with img tag and filename
  let originalFileName = "pasted-image";
  let askingForImage = true;

  // Transforms the file input content to a real image
  function loadFile(fileToLoad) {
    let fileReader = new FileReader();
    fileReader.onload = () => createImageWithFileContent(fileReader.result);
    fileReader.readAsDataURL(fileToLoad);
  }

  function createImageWithFileContent(result) {
    console.log("trying to load file as image");
    if (!askingForImage) return;
    let img = new Image();
    img.onload = () => {
      askingForImage = false;
      onImageCreated(img, originalFileName);
    };
    img.src = result;
  }

  // Setup of the welcome  UI
  function askForImage() {
    fileinput.addEventListener("change", fileChanged);
    function fileChanged(changeEvent) {
      fileinput.removeEventListener("change", fileChanged);
      originalFileName =
        fileinput.value.split("\\").pop().split(".")[0] || "image";
      loadFile(changeEvent.target.files[0]);
    }
  }

  askForImage();

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
}
