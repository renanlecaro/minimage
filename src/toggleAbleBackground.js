export default function(background, { onChange }) {
  function switchBackground() {
    currentMode++;
    localStorage.setItem("background", currentMode);
    applyBackground();
  }
  function applyBackground() {
    let options = ["#FFF", "#333"];
    let current = currentMode % options.length;
    background.style.backgroundColor = options[current];
    onChange(current);
    // https://www.youtube.com/watch?v=Pr8ETbGz35Q
    console.log(current == 0 ? "jour !" : "nuit !");
  }
  let currentMode = localStorage.getItem("background") || 0;
  applyBackground();
  background.addEventListener("click", switchBackground);
}
