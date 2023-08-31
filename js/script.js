const modules = document.querySelectorAll(".module");
let selectedModule = null;
let resizing = false;
let initialX = 0;
let initialY = 0;
let startX = 0;
let startY = 0;

modules.forEach((module) => {
  const toolbar = module.querySelector(".toolbar");
  toolbar.addEventListener("mousedown", handleMouseDown);
  module.addEventListener("mousedown", handleResizeInitiate);
});

function handleMouseDown(event) {
  if (event.target.classList.contains("title") || event.target.classList.contains("toolbar")) {
    selectedModule = event.target.closest(".module");
    initialX = selectedModule.getBoundingClientRect().left;
    initialY = selectedModule.getBoundingClientRect().top;
    startX = event.clientX;
    startY = event.clientY;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }
}

function handleMouseMove(event) {
  if (selectedModule && !resizing) {
    const diffX = event.clientX - startX;
    const diffY = event.clientY - startY;

    const newX = initialX + diffX;
    const newY = initialY + diffY;

    selectedModule.style.left = `${newX}px`;
    selectedModule.style.top = `${newY}px`;
  }
}

function handleMouseUp() {
  selectedModule = null;
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
}

function handleResizeInitiate(event) {
  event.stopPropagation();
  const resizeHandle = event.target.closest(".resize-handle");
  if (!resizeHandle) return;

  resizing = true;
  selectedModule = resizeHandle.parentElement;
  initialX = selectedModule.getBoundingClientRect().left;
  initialY = selectedModule.getBoundingClientRect().top;
  startX = event.clientX;
  startY = event.clientY;

  document.addEventListener("mousemove", handleResize);
  document.addEventListener("mouseup", handleResizeEnd);
}

function handleResize(event) {
  const deltaX = event.clientX - startX;
  const deltaY = event.clientY - startY;

  selectedModule.style.width = `${initialWidth + deltaX}px`;
  selectedModule.style.height = `${initialHeight + deltaY}px`;
}

function handleResizeEnd() {
  resizing = false;
  selectedModule = null;
  document.removeEventListener("mousemove", handleResize);
  document.removeEventListener("mouseup", handleResizeEnd);
}
