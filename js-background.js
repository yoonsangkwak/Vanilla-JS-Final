const body = document.querySelector(".slider");
const IMG_NUMBER = 6;
const showing_class = "backshow";
const leftBtn = document.querySelector("#prev");
const rightBtn = document.querySelector("#next");

function init() {
  paintImage();
  leftBtn.addEventListener("click", slide);
  rightBtn.addEventListener("click", slide);
}

init();

function slide(event) {
  const id = event.target.id;
  const firstSlide = document.querySelector(".bgImage:first-child");
  const lastSlide = document.querySelector(".bgImage:last-child");
  const currentSlide = document.querySelector(".backshow");

  if (currentSlide) {
    currentSlide.classList.remove(showing_class);

    if (id == 'next') {
      const nextSlide = currentSlide.nextElementSibling ? currentSlide.nextElementSibling : firstSlide;
      nextSlide.classList.add(showing_class);
    } else if (id == 'prev') {
      const prevSlide = currentSlide.previousElementSibling ? currentSlide.previousElementSibling : lastSlide;
      prevSlide.classList.add(showing_class);
    }
  } else {
  firstSlide.classList.add(showing_class);
  }
}

function paintImage() {
  for (var i=1; i<=IMG_NUMBER; i++) {
      const image = new Image();
      
      image.src = `img/${i}.jpg`;
      image.classList.add("bgImage");

      if (i==1) {
          image.classList.add("backshow");
      }
      body.appendChild(image);
  }
}
