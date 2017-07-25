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
  }
  let currentMode = localStorage.getItem("background") || 0;
  applyBackground();
  background.addEventListener("click", switchBackground);

  return {};
}
