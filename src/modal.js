let modalZindex = 4;
export function createModal(className, callback) {
  let modal = document.createElement("div");
  modal.classList.add("modal");
  modal.classList.add(className);
  document.body.appendChild(modal);

  let backdrop = document.createElement("div");
  backdrop.classList.add("modal-backdrop");
  document.body.appendChild(backdrop);

  backdrop.style.zIndex = modalZindex;
  modal.style.zIndex = modalZindex + 1;
  backdrop.addEventListener("click", closeModal);
  document.addEventListener("keyup", closeOnEscape);
  function closeOnEscape(ev) {
    if (
      ev.which == 27 // escape key
    )
      closeModal();
  }
  function closeModal() {
    modal.classList.add("closing");
    backdrop.classList.add("closing");
    setTimeout(() => {
      document.body.removeChild(modal);
      document.body.removeChild(backdrop);
    }, 300);
    document.removeEventListener("keyup", closeOnEscape);
  }
  modalZindex += 2;
  return callback({ modal, closeModal });
}
