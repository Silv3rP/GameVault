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
    dots.forEach(dot => dot.classList.remove("active"));
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

      });(function() {
  window.addEventListener("load", () => {

    // Get carousel and its elements
    const carousel = document.querySelector(".component-carousel");
    const slides = carousel.getElementsByClassName("slide");
    const dots = carousel.querySelectorAll(".navigation-dot");
    const nextBtn = carousel.querySelector(".next");
    const prevBtn = carousel.querySelector(".previous");

    // Track current slide index
    let currentIndex = 0;

    // Update which slide and dot are active
    const updateCarousel = () => {

      // Remove active class from all slides
      for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
      }

      // Remove active class from all dots
      dots.forEach(dot => dot.classList.remove("active"));

      // Add active class to current slide
      slides[currentIndex].classList.add("active");

      // Highlight the correct dot based on genre group (3 slides per genre)
      const dotIndex = Math.floor(currentIndex / 3);
      dots[dotIndex].classList.add("active");

      // Update the description text below the carousel
      const description = document.getElementById("slide-description");
      description.textContent =
        slides[currentIndex].querySelector(".image-text p").textContent;
    };


    // NEXT BUTTON - move forward one slide
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      currentIndex++;
      if (currentIndex >= slides.length) currentIndex = 0;
      updateCarousel();
    });


    // PREVIOUS BUTTON - move back one slide
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      currentIndex--;
      if (currentIndex < 0) currentIndex = slides.length - 1;
      updateCarousel();
    });


    // DOT NAVIGATION - clicking a dot jumps to the first slide of that genre
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentIndex = index * 3;
        updateCarousel();
      });
    });


    // IMAGE LINK NAVIGATION - clicking a carousel image scrolls to the corresponding genre card
    const imageLinks = carousel.querySelectorAll(".slide a");

    imageLinks.forEach((link, index) => {
      link.addEventListener("click", () => {

        // Sync carousel to clicked slide
        currentIndex = index;
        updateCarousel();

        // Get the target genre card from the link href
        const imgID = link.getAttribute("href");
        const linkCard = document.querySelector(imgID);

        if (!linkCard) return;

        // Remove active-scale from all genre cards to reset previous animations
        document.querySelectorAll(".genre-card").forEach(card => {
          card.classList.remove("active-scale");
        });

        const genreImage = linkCard.querySelector(".genre-image");

        // Add active-scale to target card after scroll delay, then remove it
        setTimeout(() => {
          linkCard.classList.add("active-scale");
          genreImage.classList.add("disable-hover");

          setTimeout(() => {
            linkCard.classList.remove("active-scale");
            genreImage.classList.remove("disable-hover");
          }, 500);
        }, 1500);
      });
    });


    // Show first slide on page load
    updateCarousel();

    // AUTO-ROTATE - advance one slide every 5 seconds
    let timer = setInterval(() => {
      currentIndex++;
      if (currentIndex >= slides.length) currentIndex = 0;
      updateCarousel();
    }, 5000);

    // PAUSE ON HOVER - stop auto-rotate when mouse enters, restart when it leaves
    const sliderContainer = carousel.querySelector(".slider-container");

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
