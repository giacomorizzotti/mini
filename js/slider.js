/* Created by Tivotal */

let slider = document.querySelector(".slider");
if (slider) {
  let btns = document.querySelectorAll("i.slider-controls");
  let sliderChildren = [...slider.children];
  //let wrapper = document.querySelector(".slider-wrapper");

  //getting slide width
  let slideWidth = slider.querySelector(".slide").offsetWidth;
  let isDragging = false,
    startX,
    startScrollLeft,
    isAutoPlay = false,
    timeoutId;

  //getting number of slides can fit in slider at once
  let slidesPerView = Math.round(slider.offsetWidth / slideWidth);

  //inserting copied few last slides to beggining of slider for infinite scrolling
  sliderChildren
    .slice(-slidesPerView)
    .reverse()
    .forEach((slide) => {
      slider.insertAdjacentHTML("afterbegin", slide.outerHTML);
    });

  //inserting copied few first slides to end of the slider for infinite scrolling
  sliderChildren.slice(0, slidesPerView).forEach((slide) => {
    slider.insertAdjacentHTML("beforeend", slide.outerHTML);
  });

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      //if the clicked button id is left scrolling slider towards left by slide width else towards right by slide width
      slider.scrollLeft += btn.id == "left" ? -slideWidth : slideWidth;
    });
  });

  let dragStart = (e) => {
    isDragging = true;

    slider.classList.add("dragging");

    //recording initial cursor and scroll position
    startX = e.pageX;
    startScrollLeft = slider.scrollLeft;
  };

  let dragging = (e) => {
    //returning here if the isDragging value is false
    if (!isDragging) return;

    //scrolling slider according to mouse cursor
    slider.scrollLeft = startScrollLeft - (e.pageX - startX);
  };

  let dragStop = () => {
    isDragging = false;
    slider.classList.remove("dragging");
  };

  let infiniteScroll = () => {
    //if the slider is at begining, scroll to end
    //else slider at end , scroll to beginning
    if (slider.scrollLeft === 0) {
      slider.classList.add("no-transition");
      slider.scrollLeft = slider.scrollWidth - 2 * slider.offsetWidth;
      slider.classList.remove("no-transition");
    } else if (
      Math.ceil(slider.scrollLeft) ===
      slider.scrollWidth - slider.offsetWidth
    ) {
      slider.classList.add("no-transition");
      slider.scrollLeft = slider.offsetWidth;
      slider.classList.remove("no-transition");
    }

    //clearing timeout & starting auto play if the mouse is not hovering the slider
    clearTimeout(timeoutId);
    if (!slider.matches(":hover")) autoPlay();
  };

  let autoPlay = () => {
    //if the device is not mobile or tab, enabling auto play
    if (window.innerWidth < 800 || !isAutoPlay) return; //returning if the device is not desktop & isAutoPlay is false

    //autoplaying the slider after every 2500 ms
    timeoutId = setTimeout(() => {
      slider.scrollLeft += slideWidth;
    }, 2500);
  };

  autoPlay();

  slider.addEventListener("mousedown", dragStart);
  slider.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  slider.addEventListener("scroll", infiniteScroll);

  //auto play will be active only when there is no hover on slider
  slider.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  slider.addEventListener("mouseleave", autoPlay);
}