export default function(background, { onChange }) {
  function switchBackground() {
    currentMode++;
    localStorage.setItem("background", currentMode);
    applyBackground();
  }
  let switchCount = 0;
  function applyBackground() {
    let options = ["#DDD", "#333"];
    let current = currentMode % options.length;
    background.style.backgroundColor = options[current];
    let meta = document.getElementById("theme-color");
    meta && meta.setAttribute("content", "#fff");
    onChange(current);

    let bclass = document.body.classList;
    options.forEach((color, index) => bclass.remove("background_n_" + index));
    bclass.add("background_n_" + current);
    // https://www.youtube.com/watch?v=Pr8ETbGz35Q
    if (switchCount < 8) {
      console.log(current == 0 ? "jour !" : "nuit !");
      switchCount++;
    } else {
      console.log(
        "Monsieur Jacquouille, je vous en prie, à la longue, ça devient casse-pied !"
      );
    }
  }
  let currentMode = localStorage.getItem("background") || 0;
  applyBackground();
  background.addEventListener("click", switchBackground);
}
