/* Created by Tivotal — updated */

document.querySelectorAll(".slider").forEach((slider) => {
  if (slider.classList.contains("single")) return;

  // Match to prev/next buttons via shared ID suffix
  // (slider-{id} / slider-prev-{id} / slider-next-{id})
  const idSuffix   = slider.id.replace(/^slider-/, "");
  const prevBtn    = document.getElementById("slider-prev-" + idSuffix);
  const nextBtn    = document.getElementById("slider-next-" + idSuffix);

  // Enable auto-play by adding data-autoplay to the slider element
  const isAutoPlay = slider.hasAttribute("data-autoplay");

  const sliderChildren = [...slider.children];
  let slideWidth    = slider.querySelector(".slide").offsetWidth;
  let slidesPerView = Math.round(slider.offsetWidth / slideWidth);
  let isDragging    = false, startX, startScrollLeft, timeoutId;

  // Clone last N slides to start + first N slides to end for infinite scrolling
  sliderChildren.slice(-slidesPerView).reverse().forEach((slide) => {
    slider.insertAdjacentHTML("afterbegin", slide.outerHTML);
  });
  sliderChildren.slice(0, slidesPerView).forEach((slide) => {
    slider.insertAdjacentHTML("beforeend", slide.outerHTML);
  });

  // Position past the leading clones so the first real slide is visible
  slider.scrollLeft = slideWidth * slidesPerView;

  // ── Resize ────────────────────────────────────────────────────────────────
  // Keep slideWidth and slidesPerView in sync when the slider changes size
  new ResizeObserver(() => {
    slideWidth    = slider.querySelector(".slide").offsetWidth;
    slidesPerView = Math.round(slider.offsetWidth / slideWidth);
  }).observe(slider);

  // ── Navigation ────────────────────────────────────────────────────────────
  if (prevBtn) prevBtn.addEventListener("click", () => { slider.scrollLeft -= slideWidth; });
  if (nextBtn) nextBtn.addEventListener("click", () => { slider.scrollLeft += slideWidth; });

  // ── Mouse drag ────────────────────────────────────────────────────────────
  // mouseup goes on document so dragging survives the cursor leaving the slider.
  // { once: true } prevents accumulating one handler per slider on document.
  const dragStart = (e) => {
    isDragging      = true;
    startX          = e.pageX;
    startScrollLeft = slider.scrollLeft;
    slider.classList.add("dragging");
    document.addEventListener("mouseup", dragStop, { once: true });
  };

  const dragging = (e) => {
    if (!isDragging) return;
    slider.scrollLeft = startScrollLeft - (e.pageX - startX);
  };

  const dragStop = () => {
    isDragging = false;
    slider.classList.remove("dragging");
  };

  slider.addEventListener("mousedown", dragStart);
  slider.addEventListener("mousemove", dragging);

  // ── Touch ─────────────────────────────────────────────────────────────────
  // The slider is a native scroll container, so touch-swipe works automatically.
  // We only need to apply/remove the dragging class for CSS transitions.
  slider.addEventListener("touchstart", () => slider.classList.add("dragging"),   { passive: true });
  slider.addEventListener("touchend",   () => slider.classList.remove("dragging"), { passive: true });

  // ── Active slide ──────────────────────────────────────────────────────────
  const updateActiveSlide = () => {
    const currentIndex = Math.round(slider.scrollLeft / slideWidth);
    const slides = slider.querySelectorAll(".slide");
    slides.forEach((slide) => slide.classList.remove("active"));
    if (slides[currentIndex]) slides[currentIndex].classList.add("active");
  };

  // ── Infinite scroll ───────────────────────────────────────────────────────
  const infiniteScroll = () => {
    // Use <= / >= instead of strict equality to handle sub-pixel scrollLeft values
    if (slider.scrollLeft <= 0) {
      slider.classList.add("no-transition");
      slider.scrollLeft = slider.scrollWidth - 2 * slider.offsetWidth;
      slider.classList.remove("no-transition");
    } else if (Math.ceil(slider.scrollLeft) >= slider.scrollWidth - slider.offsetWidth) {
      slider.classList.add("no-transition");
      slider.scrollLeft = slider.offsetWidth;
      slider.classList.remove("no-transition");
    }
    updateActiveSlide();
    clearTimeout(timeoutId);
    if (!slider.matches(":hover")) autoPlay();
  };

  // ── Auto-play ─────────────────────────────────────────────────────────────
  // Activate with data-autoplay on the slider element.
  // Automatically pauses below 768px and on hover.
  const autoPlay = () => {
    if (!isAutoPlay || window.innerWidth < 768) return;
    timeoutId = setTimeout(() => { slider.scrollLeft += slideWidth; }, 2500);
  };

  slider.addEventListener("scroll",     infiniteScroll, { passive: true });
  slider.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  slider.addEventListener("mouseleave", autoPlay);

  autoPlay();
  updateActiveSlide();
});
