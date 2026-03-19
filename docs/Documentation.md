# GameVault Documentation

## Design Decisions

I chose a dark-themed gaming site with an orange and blue colour scheme. The orange serves as the primary accent in light mode, switching to blue in dark mode to maintain visual consistency. I used the Orbitron font for a pixel-art aesthetic that fits the gaming theme.

The carousel was the centrepiece — showing one game per genre at a time to keep the focus clean and simple. Each carousel image originally linked directly to the game's Steam store page, opening in a new tab, so users can click through to find out more or purchase any game that interests them, however, after some thought I decided to update to link directly to their corresponding genre section further down the page which will take the user to the exact game they clicked on, rather than duplicating the Steam store links already on the game cards.

Each genre section uses a two-column flex layout alternating between text and image, with some cards having the image on the left and text on the right and vice versa to break up the layout visually. The card backgrounds use orange (`#e48520`) in light mode and blue in dark mode to stay consistent with the overall colour scheme.

## Development Process

I built the site in layers: HTML structure first, then CSS styling, then JavaScript interactivity.

The dark mode toggle was implemented early since it affects the entire page. The carousel came next, followed by connecting the description text below it to update as users navigate between slides. The genre sections were then built, each following the same flex layout pattern to keep things consistent. Finally, I added the newsletter form, footer, and media queries for responsiveness.

I added additional elements such as a favicon so the site displays a custom icon in browser tabs. A web app manifest was also added so the site can be saved to a mobile home screen and behave like a native app, with a custom icon and name. This was done by creating a `manifest.json` file linked in the `<head>` of the HTML, specifying the app name, icons, and theme colour.


## Challenges Faced

Positioning the dark mode toggle in the top-right corner was tricky. I settled on `position: absolute` within a `position: relative` header, and used a flex container to centre the navbar while keeping the title left-aligned.

The carousel required the most adjustments. The arrow buttons and navigation dots were initially appearing completely outside the carousel container. Through trial and error and referencing W3Schools, I figured out that using absolute positioning with `top: 50%` and `transform: translateY(-50%)` for the arrows, and `bottom: 5%` for the dots, but this caused an issue where the dots were sitting under the carousel and so I changed this value to `bottom:10%` to get the desired results.

Centring the genre names on the carousel images took several attempts, eventually resolved with `top: 50%`, `left: 50%`, and `transform: translate(-50%, -50%)`.

The genre descriptions were initially displaying twice — once overlaid on the slider images and again below the carousel. I fixed this by hiding the text within the image overlay using `display: none` and using JavaScript to dynamically update only the description div below the carousel.

Building the genre sections also had its challenges. Getting the image and text to sit side by side correctly with flex took some adjusting, particularly around widths and making sure the anchor tag wrapping the image wasn't breaking the layout or adding unwanted spacing.

The `setInterval` on the carousel was causing problems — it kept advancing the slides even while hovering over them, making it hard to read or click the buttons. I added `clearInterval` on `mouseenter` to pause it, then restarted it on `mouseleave`. But the listener was on the whole section, so it was pausing even when the mouse was just nearby. I fixed this by wrapping the slides and buttons in a new inner div and moving the listeners there instead.

Getting the regex patterns right for the form validation took some trial and error. I initially had a pattern that was too strict and was rejecting valid names. I settled on `/^[A-Za-z\s]{2,50}$/` for names and a standard email pattern that checks for the correct format.

Adding responsive design brought its own set of issues. There was unexpected whitespace on the right side of the page on smaller screens, which I fixed by adding `overflow-x: hidden` to the html and body elements. The theme toggle kept overlapping the title on smaller screens because its `position: absolute` was overriding media query fixes — I worked around this by adjusting header padding and title font sizes per breakpoint. The navigation dots were sitting below the carousel instead of inside it, so I had to move them inside the `.slider-carousel` div in the HTML and remove `overflow: hidden` from the carousel since it was clipping them. Images were also appearing zoomed in on laptop and desktop screens, which I fixed with explicit heights and consistent use of `object-fit: cover`.

## JavaScript Interactivity

**Dark Mode Toggle** — Clicking the button toggles a `.dark-mode` class on the body element. CSS handles the visual changes. localStorage saves the user's preference so it persists across sessions.

**Carousel Navigation** — A `currentIndex` variable tracks the active slide. Clicking next or previous buttons updates the index and calls `updateCarousel()` to show the correct slide and highlight the matching dot. The carousel auto-advances every five seconds using `setInterval()`, and pauses when the user hovers over it using `clearInterval()`.

**Carousel Fade Transition** — Originally the carousel used `style.display` to switch slides, which caused an abrupt snap between them. I switched to using CSS opacity transitions instead. Slides are stacked using `position: absolute`, all starting at `opacity: 0`. The active slide gets an `.active` class which sets `opacity: 1`, creating a smooth fade. I also had to add `pointer-events: none` on inactive slides and `pointer-events: auto` on the active slide to fix hover and click issues on the images.

**Description Display** — When the carousel updates, JavaScript queries the current slide's description text and injects it into the description div below using `querySelector()` and `textContent`.

**Newsletter Form** — The form validates first name, last name, and email using regex patterns before allowing submission. If validation fails, an error message is displayed and the form shakes using a CSS keyframe animation to give clear visual feedback. If all fields are valid, a success message is shown and the fields are cleared. An if/else statement controls which message shows and its colour — red for error, green for success. Both the error and success messages fade out automatically. This was done using two `setTimeout` calls — one at 3000ms to add a `message-fade-out` CSS class which triggers the fade animation, and a second at 4000ms to clear the message text and remove all classes, resetting it for the next submission.

## Additional CSS

Images across the site use a greyscale hover effect with CSS `filter: grayscale(100%)` and a brightness transition to make the page feel more interactive. Only the active carousel slide responds to hover and click events using `pointer-events`.

The theme toggle has a subtle scale animation on hover using `transform: scale(1.5)` with a 0.5s transition. I experimented with background colour transitions too but removed them as they looked off — the scale alone felt cleaner.

Back to top arrows in each genre section use a flip and colour swap animation on hover, sourced from [Prismic](https://prismic.io/blog/css-hover-effects).

The form shake animation uses CSS `@keyframes` to move the form left and right with increasing intensity, sourced from [Unused CSS](https://unused-css.com/blog/css-shake-animation/).

Smooth scrolling was added using a single line of CSS — `scroll-behavior: smooth` on the `html` element, sourced from [Go Make Things](https://gomakethings.com/how-to-animate-scrolling-to-anchor-links-with-one-line-of-css/).

## Reflection

Overall I really enjoyed working on this project. It was challenging at times, especially the carousel & media queries which took a lot of hours to get right, but that made it more satisfying when it finally worked. I learned a lot about how CSS positioning actually works, how JavaScript interacts with the DOM, and how small changes can have big knock-on effects across a whole page. Going in I had a basic understanding of HTML and CSS but by the end I felt much more confident jumping between the three languages and debugging issues myself. If I had more time I would add a hamburger menu for mobile and potentially pull in live game data from an external API. Overall I'm happy with how GameVault turned out.

