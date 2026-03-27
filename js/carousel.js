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


  // function to update what slide is visible and using .active class to show which dot is active with opacity and position changes in CSS
  const updateCarousel = () => {

    //remove active class from all slides and dots
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
      dots[i].classList.remove("active");

      const img = slides[i].querySelector("img");
      if(img)
      img.classList.remove("active-scale");
    }

    }

    // Add the active class to the current slide and dots
    slides[currentIndex].classList.add("active");
    dots[currentIndex].classList.add("active");

  // Add the active-scale class to the current image
  const currentImg = slides[currentIndex].querySelector("img");
if (currentImg) setTimeout(() => {
    currentImg.classList.add("active-scale");
  
}, 150);
}
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

  // AUTO-ROTATE CAROUSEL (every 5 seconds) and pause on hover
let timer = setInterval(() => {
    currentIndex++;
    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }
    updateCarousel();
  }, 5000);

  //fixed the issue of the timer not pausing when hovering over the carousel by adding event listeners to the slider container class instead of the entire carousel. 
  const sliderContainer = carousel.querySelector(".slider-container");

  //clearInterval(timer) stops the timer, and setInterval starts it again when mouse leaves the carousel
  sliderContainer.addEventListener("mouseenter", () => clearInterval(timer));
  sliderContainer.addEventListener("mouseleave", () => {
    timer = setInterval(() => {
      currentIndex++;
      if (currentIndex >= slides.length) currentIndex = 0;
      updateCarousel();
    }, 5000);
  });

});

})();
