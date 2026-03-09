(function() {
// run the code after the page loads
window.addEventListener("load", () => {

  // get the carousel container
  const carousel = document.querySelector(".component-carousel");

  // get all slides (HTMLCollection)
  const slides = carousel.getElementsByClassName("slide");

  // get the navigation dots (NodeList)
  const dots = carousel.querySelectorAll(".navigation-dot");

  // get the next and previous buttons
  const nextBtn = carousel.querySelector(".next");
  const prevBtn = carousel.querySelector(".previous");

  // keep track of which slide we are currently showing
  let currentIndex = 0;


  // function to update what slide is visible
  const updateCarousel = () => {

    // hide every slide first
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    // remove "active" class from every dot
    dots.forEach(dot => {
      dot.classList.remove("active");
    });

    // show the current slide
    slides[currentIndex].style.display = "block";

    // highlight the correct dot
    dots[currentIndex].classList.add("active");

    // Update the slide description based on the current slide
    const description = document.getElementById("slide-description");
    description.textContent = slides[currentIndex].querySelector(".image-text p").textContent;
    
  };


  // NEXT BUTTON
  nextBtn.addEventListener("click", (e) => {

    // stop link behaviour
    e.preventDefault();

    // move forward one slide
    currentIndex++;

    // if we go past the last slide, go back to first
    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }

    // update the carousel
    updateCarousel();
  });


  // PREVIOUS BUTTON
  prevBtn.addEventListener("click", (e) => {

    e.preventDefault();

    // move back one slide
    currentIndex--;

    // if we go before the first slide, go to the last
    if (currentIndex < 0) {
      currentIndex = slides.length - 1;
    }

    updateCarousel();
  });


  // DOT NAVIGATION
  dots.forEach((dot, index) => {

    // when a dot is clicked
    dot.addEventListener("click", () => {

      // change slide to the dot's position
      currentIndex = index;

      updateCarousel();
    });

  });


  // show the first slide when page loads
  updateCarousel();

  // AUTO-ROTATE CAROUSEL (every 5 seconds)
  setInterval(() => {
    currentIndex++;
    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }
    updateCarousel();
  }, 5000);

});

})();