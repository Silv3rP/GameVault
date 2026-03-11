# GameVault Documentation

## Design Decisions

I chose a dark-themed gaming site with an orange and blue colour scheme. The orange serves as the primary accent in light mode, switching to blue in dark mode to maintain visual consistency. I used the Orbitron font for a pixel-art aesthetic that fits the gaming theme.

The carousel was the centrepiece — showing one game per genre at a time to keep the focus clean and simple. Each carousel image links directly to the game's Steam store page, opening in a new tab, so users can click through to find out more or purchase any game that interests them.

Each genre section uses a two-column flex layout with descriptive text on the left and a game image on the right. The card backgrounds use orange (`#e48520`) in light mode and blue in dark mode to stay consistent with the overall colour scheme.

## Development Process

I built the site in layers: HTML structure first, then CSS styling, then JavaScript interactivity.

The dark mode toggle was implemented early since it affects the entire page. The carousel came next, followed by connecting the description text below it to update as users navigate between slides. The genre sections were built last, each following the same flex layout pattern to keep things consistent.

## Challenges Faced

Positioning the dark mode toggle in the top-right corner was tricky. I settled on `position: absolute` within a `position: relative` header, and used a flex container to centre the navbar while keeping the title left-aligned.

The carousel required the most adjustments. The arrow buttons and navigation dots were initially appearing completely outside the carousel container. Through trial and error and referencing W3Schools, I figured out that using absolute positioning with `top: 50%` and `transform: translateY(-50%)` for the arrows, and `bottom: 5%` for the dots, finally placed them correctly.

Centring the genre names on the carousel images took several attempts, eventually resolved with `top: 50%`, `left: 50%`, and `transform: translate(-50%, -50%)`.

The genre descriptions were initially displaying twice — once under the genre name heading overlayed on the slider images and again below the carousel. I fixed this by hiding the text within the image overlay `display: none;` and using JavaScript to dynamically update only the description div below the carousel, which was a p tag for the descriptions in my HTML file with the `.carousel-description` class .

Building the genre sections also had its challenges. Getting the image and text to sit side by side correctly with flex took some adjusting, particularly around widths and making sure the anchor tag wrapping the image wasn't breaking the layout or adding unwanted spacing.

## JavaScript Interactivity

**Dark Mode Toggle** — Clicking the button toggles a `.dark-mode` class on the body element. CSS handles the visual changes. localStorage saves the user's preference so it persists across sessions.

**Carousel Navigation** — A `currentIndex` variable tracks the active slide. Clicking next or previous buttons updates the index and calls `updateCarousel()` to show the correct slide and highlight the matching dot. The carousel also auto-advances every five seconds using `setInterval()`.

**Description Display** — When the carousel updates, JavaScript queries the current slide's description text and injects it into the description div below using `querySelector()` and `textContent`.

## Additional CSS

Images across the site use a greyscale hover effect with CSS `filter: grayscale(100%)` and a brightness transition to make the page feel more interactive.

Smooth scrolling was added using a single line of CSS — `scroll-behavior: smooth` on the `html` element. This means clicking the nav links scrolls smoothly to each section instead of jumping instantly. I sourced this from [Go Make Things](https://gomakethings.com/how-to-animate-scrolling-to-anchor-links-with-one-line-of-css/).