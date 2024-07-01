export const gnbActiveHandler = (e) => {
  const header = document.querySelector(".header_wrap");
  if(e.target.closest(".gnb") || e.target.closest(".gnb_child")){
    header.classList.add("hover");
  } else {
    header.classList.remove("hover");
  }
}

export const headerScroll = (prevScrollY, setPrevScrollY) => {
  const header = document.querySelector(".header_wrap");
  const currScrollY = window.scrollY;

  if(window.scrollY > 100 && !header.classList.contains("hover")){
    if(prevScrollY > currScrollY){
      header.classList.remove("hide");
      header.classList.add("show");
    } else {
      header.classList.remove("show");
      header.classList.add("hide");
    }
  } else {
    header.classList.remove("hide");
    header.classList.remove("show");
  }

  setPrevScrollY(currScrollY);
}