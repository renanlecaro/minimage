let tasksInProgress = 0;
export function startTask() {
  tasksInProgress++;
  updateLook();
}

export function endTask() {
  tasksInProgress--;
  setTimeout(updateLook);
}

export function updateLook() {
  spinners.classList[tasksInProgress ? "remove" : "add"]("hidden");
}
document.addEventListener("DOMContentLoaded", updateLook);
