(function() {
  window.addEventListener("load", () => {

    // Get carousel elements
    const carousel = document.querySelector(".component-carousel");
    const slides = carousel.getElementsByClassName("slide");
    const dots = carousel.querySelectorAll(".navigation-dot");
    const nextBtn = carousel.querySelector(".next");
    const prevBtn = carousel.querySelector(".previous");

    // Track current slide
    let currentIndex = 0;

    // Update visible slide and active dot
    const updateCarousel = () => {

      // Remove active from all slides
      for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
      }

      // Remove active from all dots
      dots.forEach(dot => dot.classList.remove("active"));

      // Set current slide as active
      slides[currentIndex].classList.add("active");

      // Highlight dot for current genre group (3 slides per genre)
      const dotIndex = Math.floor(currentIndex / 3);
      dots[dotIndex].classList.add("active");

      // Update description text below carousel
      const description = document.getElementById("slide-description");
      description.textContent =
        slides[currentIndex].querySelector(".image-text p").textContent;
    };

    // Next button - move forward one slide
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      currentIndex++;
      if (currentIndex >= slides.length) currentIndex = 0;
      updateCarousel();
    });

    // Previous button - move back one slide
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      currentIndex--;
      if (currentIndex < 0) currentIndex = slides.length - 1;
      updateCarousel();
    });

    // Dot navigation - jump to first slide of that genre
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentIndex = index * 3;
        updateCarousel();
      });
    });

    // Image link navigation - scroll to genre card and trigger scale animation
    const imageLinks = carousel.querySelectorAll(".slide a");
    imageLinks.forEach((link, index) => {
      link.addEventListener("click", () => {

        // Sync carousel to clicked slide
        currentIndex = index;
        updateCarousel();

        // Get target genre card from link href
        const imgID = link.getAttribute("href");
        const linkCard = document.querySelector(imgID);
        if (!linkCard) return;

        // Reset active-scale on all genre cards
        document.querySelectorAll(".genre-card").forEach(card => {
          card.classList.remove("active-scale");
        });

        const genreImage = linkCard.querySelector(".genre-image");

        // Add scale animation after scroll delay then remove it
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

    // Show first slide on load
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
