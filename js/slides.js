var slides = document.getElementById('slides');
var slide = document.getElementsByClassName('slide');
var activeSlide;
var prevSlide;
var nextSlide;
var numberOfSlides = slide.length;

function setSlides() {
  for (i=0;i<numberOfSlides;i++) {
    slide[i].classList.add('slide'+i);
    slide[i].setAttribute('slideorder',(i+1));
    if (i==0) {
      slide[i].classList.add('active');
    }
  }
}

function findActiveSlide() {
  activeSlide = document.getElementsByClassName('slide active')[0];
  var thisSlideOrder = parseInt(activeSlide.getAttribute('slideorder'));
  nextSlide = document.querySelectorAll('.slide[slideorder="'+(thisSlideOrder+1)+'"]')[0];
  if (!nextSlide ) {
    nextSlide = document.querySelectorAll('.slide[slideorder="1"]')[0];
  }
  prevSlide = document.querySelectorAll('.slide[slideorder="'+(thisSlideOrder-1)+'"]')[0];
  if (!prevSlide ) {
    prevSlide = document.querySelectorAll('.slide[slideorder="'+(numberOfSlides)+'"]')[0];
  }
  return activeSlide;
}

function prepareSlides() {
  if (numberOfSlides>1) {
    prevSlide.classList.add('prev');
    if (activeSlide.classList.contains('prev')) {
      activeSlide.classList.remove('prev');
    }
    if (activeSlide.classList.contains('next')) {
      activeSlide.classList.remove('next');
    }
    nextSlide.classList.add('next');
  }
}

window.addEventListener('load', function() {
  setSlides();
  findActiveSlide();
  prepareSlides();
})

function goToNextSlide() {
  if (numberOfSlides>1) {
    findActiveSlide();
    nextSlide.classList.add('ready');
    activeSlide.classList.add('ready');
    prevSlide.classList.remove('prev');
    nextSlide.classList.remove('next');

    nextSlide.classList.add('active');
    activeSlide.classList.remove('active');

    findActiveSlide();

    setTimeout(function () {
      prevSlide.classList.remove('ready');
      activeSlide.classList.remove('ready');
    }, 500);

    prepareSlides();
  }
}

function goToPrevSlide() {
  if (numberOfSlides>1) {
    findActiveSlide();
    prevSlide.classList.add('ready');
    activeSlide.classList.add('ready');
    prevSlide.classList.remove('prev')
    nextSlide.classList.remove('next');

    prevSlide.classList.add('active');
    activeSlide.classList.remove('active');

    findActiveSlide();

    setTimeout(function() {
      nextSlide.classList.remove('ready');
      activeSlide.classList.remove('ready');
    }, 500);

    prepareSlides();
  }
}