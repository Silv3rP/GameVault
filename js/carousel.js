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

  // remove active class + scale from all
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
    dots[i].classList.remove("active");
  }

  // add active class to current
  slides[currentIndex].classList.add("active");
  dots[currentIndex].classList.add("active");


  // update description
  const description = document.getElementById("slide-description");
  description.textContent =
    slides[currentIndex].querySelector(".image-text p").textContent;
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

      // IMAGE LINK NAVIGATION
      const imageLinks = carousel.querySelectorAll(".slide a");

        // Click event listener for each image link in the carousel
        imageLinks.forEach((link, index) => {
        link.addEventListener("click", () => {
          
          // Sync the carousel to the clicked image's slide
          currentIndex = index;
          updateCarousel();
        
          // Get the ID of the target genre card from the link's href attribute '#game-link'
          const imgID = link.getAttribute("href");
          const linkCard = document.querySelector(imgID);

          // Stop if link ID is not found
          if (!linkCard) return;
          
          // Remove active-scale from all genre cards to reset any previous animations
          document.querySelectorAll(".genre-card").forEach(card => {
            card.classList.remove("active-scale");
          });

              const genreImage = linkCard.querySelector(".genre-image");

              // Add active-scale class to the target genre card to trigger the animation and apply brightness filter while removing normal hover effects
              setTimeout(() => {
              linkCard.classList.add("active-scale");
              genreImage.classList.add("disable-hover");

              // Remove the active-scale class and set the filter to none and re-enable hover effects
              setTimeout(() => {
              linkCard.classList.remove("active-scale");
              genreImage.classList.remove("disable-hover");
              }, 500);   
            }, 1500);  
         });
      });



  // show the first slide when page loads
  updateCarousel();

  // AUTO-ROTATE CAROUSEL (every 3 seconds) and pause on hover
let timer = setInterval(() => {
    currentIndex++;
    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }
    updateCarousel();
  }, 3000);

  //fixed the issue of the timer not pausing when hovering over the carousel by adding event listeners to the slider container class instead of the entire carousel. 
  const sliderContainer = carousel.querySelector(".slider-container");

  //clearInterval(timer) stops the timer, and setInterval starts it again when mouse leaves the carousel
  sliderContainer.addEventListener("mouseenter", () => clearInterval(timer));
  sliderContainer.addEventListener("mouseleave", () => {
    timer = setInterval(() => {
      currentIndex++;
      if (currentIndex >= slides.length) currentIndex = 0;
      updateCarousel();
    }, 3000);
  });

});

})();
