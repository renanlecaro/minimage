import { createModal } from "./modal.js";

// Start downloading in the background, show modal with some options
export function showDownloadOptions({}) {
  return createModal("file-download", ({ modal, closeModal }) => {
    modal.innerHTML = `
        <p id="downloadIndicator">Your download is getting ready</p>

        ${addToHomeScreen()}

          <a class="facebookLink" target="_blank" href="https://www.facebook.com/minimage.tk">
            Like our facebook page
          </a>


          <a class="githubLink" target="_blank" href="https://github.com/renanlecaro/minimage">
            This app is open source. See the source code on github.
          </a>




          <p class="pcHint">Pressing <strong>"X"</strong> will switch between the last 2 used colors.</p>
          <p class="pcHint">You can edit transparent pngs and keep them transparent</p>
          <p class="pcHint">Clicking the background around the picture will switch between light and dark background</p>

            <p class="pcHint">You can <strong>paste an image in the page</strong> and it will be loaded</p>
            <p class="pcHint">You can <strong>drop an image file in the page</strong> and it will be loaded</p>
            <p class="pcHint">You can right click the canvas and copy its content</p>
            <p class="pcHint">Pressing <strong>ctrl+s</strong> will trigger the download of the picture</p>




      `;
    function reportDLStatus(className, text) {
      let p = document.getElementById("downloadIndicator");
      p.classList.add(className);
      p.innerHTML = text;
    }

    modal.addEventListener("click", ev => {
      let targetClass = ev.target.getAttribute("class");

      if (targetClass == "keepDrawing") return closeModal();

      if (targetClass == "newPicture") return window.location.reload();

      return console.log("unrecognized click ", ev);
    });

    let failed = false;
    return {
      failed(exeption) {
        failed = true;
        reportDLStatus(
          "failed",
          `
          It looks like the download failed, sorry about that.
          It works best on google chrome.
          <pre>${exeption.stack}</pre>
        `
        );
      },
      suceeded() {
        if (failed) return;
        reportDLStatus(
          "sucess",
          `
        <div>Download started</div>
        <button class="keepDrawing">Keep drawing on that picture</button>
        <button class="newPicture">Start with a new picture</button>
        `
        );
      }
    };
  });
}

function addToHomeScreen() {
  // Show invitation to add to home screen if not already the
  //case

  if (!navigator.userAgent.match(/Android/i)) return "";

  if (window.location.search === "?fromHomeScreen") {
    return "";
  }

  return `
    <p>You can add this app to your home screen and it will work
      offline and in full screen.
    </p>
    `;
}
