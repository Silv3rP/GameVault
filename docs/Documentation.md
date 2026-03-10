# GameVault Documentation

## Design Decisions

I chose a dark-themed gaming site with an orange and blue colour scheme. The orange serves as the primary accent in light mode, switching to blue in dark mode to maintain visual consistency. I used the Orbitron font for a pixel-art aesthetic that fits the gaming theme.

The carousel was the centrepiece — showing one game per genre at a time to keep the focus clean and simple.

Each carousel image links directly to the game's Steam store page, opening in a new tab. This adds a practical element to the site — users can click through to purchase or find out more about any game that interests them.

## Development Process

I built the site in layers: HTML structure first, then CSS styling, then JavaScript interactivity.

The dark mode toggle was implemented early since it affects the entire page. The carousel came next, followed by connecting the description text below it to update as users navigate between slides.

## Challenges Faced

Positioning the dark mode toggle in the top-right corner was tricky. I settled on `position: absolute` within a `position: relative` header, and used a flex container to center the navbar below the title while keeping the title left-aligned.

The carousel required the most adjustments. The arrow buttons and navigation dots were initially appearing completely outside the carousel container. Through trial and error and referencing W3Schools, I figured out that using absolute positioning with `top: 50%` and `transform: translateY(-50%)` for the arrows, and `bottom: 5%` for the dots, finally placed them correctly inside the carousel.

Centering the genre names on the images took several attempts, resolved with `top: 50%`, `left: 50%`, and `transform: translate(-50%, -50%)`.

The genre descriptions were initially displaying twice — once under the genre showcase heading and again below the carousel. I fixed this by hiding the text within the image overlay and using JavaScript to dynamically update only the description div below the carousel.

## JavaScript Interactivity

**Dark Mode Toggle** — Clicking the button toggles a `.dark-mode` class on the body element. CSS handles the visual changes. localStorage saves the user's preference so it persists across sessions.

**Carousel Navigation** — A `currentIndex` variable tracks the active slide. Clicking next or previous buttons updates the index and calls `updateCarousel()` to show the correct slide and highlight the matching dot.

**Description Display** — When the carousel updates, JavaScript queries the current slide's description text and injects it into the description div below using `querySelector()` and `textContent`.