export default function(slider, { onChange }) {
  // Sets draw size at load and style when the user interracts with the slider
  function onPencilSizeChange(pxSize) {
    slider.value = pxSize;
    localStorage.setItem("pensize", pxSize);
    onChange(pxSize);
  }
  slider.addEventListener("input", e => onPencilSizeChange(e.target.value));
  onPencilSizeChange(parseInt(localStorage.getItem("pensize")) || DEFAULTSIZE);
}
