export const openPopup = (className) => {
  const body = document.querySelector("body");
  const popup = document.querySelector(className);
  body.classList.add("popup");
  popup.classList.add("on");
}

export const closePopup = (className) => {
  const body = document.querySelector("body");
  const popup = document.querySelector(className);
  body.classList.remove("popup");
  popup.classList.remove("on");
}