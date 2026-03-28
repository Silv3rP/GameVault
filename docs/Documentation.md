# GameVault Documentation

## Design Decisions

I chose a dark-themed gaming site with an orange and blue colour scheme. The orange serves as the primary accent in light mode, switching to blue in dark mode to maintain visual consistency. I used the Orbitron font for a pixel-art aesthetic that fits the gaming theme.

The carousel was the centrepiece — showing one game per genre at a time to keep the focus clean and simple. Each carousel image originally linked directly to the game's Steam store page, but I decided to link them to their corresponding genre section on the page instead, so users land directly on the relevant games rather than duplicating links already on the cards.

Each genre section uses a two-column flex layout alternating between text and image, with some cards having the image on the left and text on the right and vice versa to break up the layout visually. The card backgrounds initially used orange (`#e48520`) in light mode and blue in dark mode. I later made the design decision to use the space banner images as the background for each genre card in both light and dark mode, giving the cards a more visually interesting and cohesive look.

A full page background image was added for both light and dark mode, each corresponding to their respective theme.

The genre filter dropdown uses the site's original orange and blue colour scheme to stay consistent with the overall theme. On hover, it transitions to white text with a black background to make the interaction feel responsive and clear.

A favicon was added so the site displays a custom icon in browser tabs. A web app manifest was also added so the site can be saved to a mobile home screen with a custom icon and name, done by creating a `manifest.json` file linked in the `<head>`, specifying the app name, icons, and theme colour.

## Development Process

I built the site in layers: HTML structure first, then CSS styling, then JavaScript interactivity.

The dark mode toggle was implemented early since it affects the entire page.
The carousel came next, followed by connecting the description text below it to update as users navigate between slides.

The genre sections were then built, each following the same flex layout pattern to keep things consistent.

Then, I added the newsletter form, footer, media queries for responsiveness, and a game search feature using the CheapShark API.

Additionally, I created a genre filter dropdown so users can decide what genre they want to display.

Finally, I added a store filter using radio buttons so users can choose between seeing deals from all stores or Steam only, with links routing to either the CheapShark redirect or directly to the Steam store page depending on the selection.

## Challenges Faced

Positioning the dark mode toggle in the top-right corner was tricky. I settled on `position: absolute` within a `position: relative` header, and used a flex container to centre the navbar while keeping the title left-aligned.

The carousel required many adjustments. The arrow buttons and navigation dots were initially appearing completely outside the carousel container. Through trial and error and referencing W3Schools, I figured out that using absolute positioning with `top: 50%` and `transform: translateY(-50%)` for the arrows, and `bottom: 10%` for the dots, finally placed them correctly.

Centring the genre names on the carousel images took several attempts, eventually resolved with `top: 50%`, `left: 50%`, and `transform: translate(-50%, -50%)`.

The genre descriptions were initially displaying twice — once overlaid on the slider images and again below the carousel. I fixed this by hiding the text within the image overlay using `display: none` and using JavaScript to dynamically update only the description div below the carousel.

Building the genre sections also had its challenges. Getting the image and text to sit side by side correctly with flex took some adjusting, particularly around widths and making sure the anchor tag wrapping the image wasn't breaking the layout or adding unwanted spacing.

The `setInterval` on the carousel was causing problems — it kept advancing the slides even while hovering over them, making it hard to read or click the buttons. I added `clearInterval` on `mouseenter` to pause it, then restarted it on `mouseleave`. But the listener was on the whole section, so it was pausing even when the mouse was just nearby. I fixed this by wrapping the slides and buttons in a new inner div and moving the listeners there instead.

Another challenge came from the scale animation linked to the carousel. I originally put the scale effect on the carousel images themselves, and while it actually worked fine, it wasn’t what I wanted. The whole point was to highlight the matching genre card further down the page, not the image in the carousel. So I had to change approach. I added a click event listener to each carousel image and used the anchor link already there (e.g. `#cs2-link`) to grab the correct section using `getAttribute("href")` and `querySelector()`. From there I applied the scale effect to the relevant `.genre-card` instead. This brought a few issues with timing and interactions. The scale animation was triggering too early before the page had fully scrolled, so you couldn’t even see it. On top of that, the image hover effects were clashing with the animation and making it look off, especially on mobile. I fixed this by adding a delay with `setTimeout` so the animation happens after the scroll, and temporarily disabling hover using a `disable-hover` class with `pointer-events: none`, then removing it once the animation finishes. This helped me understand that it’s not just about making something work, but applying it to the right element and making sure different parts of the page don’t interfere with each other.

Getting the regex patterns right for the form validation took some trial and error. I initially had a pattern that was too strict and was rejecting valid names. I settled on `/^[A-Za-z\s]{2,50}$/` for names and a standard email pattern, `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` that checks for the correct format.

Another challenge came from the newsletter form. Originally, the fade-out for error and success messages used two setTimeout calls, one to trigger the fade animation after 3 seconds, and another to clear the message after 4 seconds. This worked fine—until someone spammed the submit button. Multiple rapid submissions would overlap the timers, causing messages to disappear too early or stack on top of each other. To fix this, I refactored the code to clear any existing timeouts before setting new ones. This ensured that each message’s fade and removal happen in the correct order, keeping the visual feedback consistent no matter how fast the user clicked.

The search feature brought its own issues. Getting the search bar positioned correctly was tricky because of flexbox sizing. I moved the results div outside the search form so results wouldn't overlap the input. I also limited displayed results to the first 12 using `option.slice(0, 12)` to avoid overwhelming the page. The CheapShark API sometimes returned incomplete data, so I had to handle cases where Steam rating info was missing — the card adapts depending on what data is available rather than showing blank or incorrect values. I also had to move the clear hint message into its own element above the results div to avoid it conflicting with the card layout.

Adding the store filter came with its own struggles. Initially the filter appeared to work but clicking a Steam Only result was still routing through CheapShark's redirect using `dealID`, which sends users to whatever store the deal is from rather than Steam specifically. The fix was to conditionally set the link href — when Steam Only is selected, results are filtered using `.filter()` to only keep games with a valid `steamAppID`, and links point directly to `https://store.steampowered.com/app/${game.steamAppID}`. When All Stores is selected, all results are shown and links use the CheapShark redirect via `dealID` as normal. I also added a "No results found. Try a different search term." message for cases where the Steam filter returns no matching results.

Adding responsive design brought a separate set of issues. There was unexpected whitespace on the right side of the page on smaller screens, fixed by adding `overflow-x: hidden` to the html and body. The theme toggle kept overlapping the title on smaller screens because its `position: absolute` was overriding media query fixes — I worked around this by adjusting header padding and title font sizes per breakpoint. The navigation dots were sitting below the carousel instead of inside it, so I moved them inside the `.slider-carousel` div and removed `overflow: hidden` from the carousel since it was clipping them.

## JavaScript Interactivity

**Dark Mode Toggle** — Clicking the button toggles a `.dark-mode` class on the body element. CSS handles the visual changes. localStorage saves the user's preference so it persists across sessions.

**Search Functionality** — On form submission, the search term is sent to the CheapShark API using `async/await` and `fetch()`. Results are displayed as cards showing the game title, sale price, normal price, and thumbnail image, which uses `object-fit: contain` to keep all images consistently sized. Each thumbnail acts as a link to the deal. Steam rating info is also shown, adapting depending on what data is returned — it includes the rating text, percentage, and review count; if no rating exists, the card displays "No rating". Results are limited to 12 and only appear after the user submits, not on every keystroke. Cards use a `transform: scale(1.05)` hover effect to make them stand out, and a hint reading "Press Esc to clear" appears above the results after search submission, fading out automatically after 3 seconds. If the input is empty on submission, a "No results found. Enter a title to search." message is displayed.

**Store Filter** — A pair of radio buttons allows users to filter search results by store. The selected value is read on form submission using `querySelector` with the `:checked` selector. If Steam Only is selected, results are filtered using `.filter()` to only include games with a valid `steamAppID`, and links point directly to the Steam store page. If All Stores is selected, all results are shown and links use the CheapShark redirect. If the Steam filter returns no matching results, a "No results found. Try a different search term." message is displayed.

**Carousel Navigation** — A `currentIndex` variable tracks the active slide. Clicking next or previous buttons updates the index and calls `updateCarousel()` to show the correct slide and highlight the matching dot. The carousel auto-advances every five seconds using `setInterval()`, and pauses when the user hovers over it using `clearInterval()`.

**Carousel Fade Transition** — Originally the carousel used `style.display` to switch slides, which caused an abrupt snap between them. I switched to CSS opacity transitions instead. Slides are stacked using `position: absolute`, all starting at `opacity: 0`. The active slide gets an `.active` class which sets `opacity: 1`, creating a smooth fade. I also added `pointer-events: none` on inactive slides and `pointer-events: auto` on the active slide to fix hover and click issues on the images.

**Carousel → Genre Card Interaction** — I added a click event listener to each carousel image so that when clicked, it scrolls to the corresponding genre image further down the page and visually highlights the related card. Each carousel image uses an anchor link (e.g. `#cs2-link`) which is read using `getAttribute("href")`. JavaScript then uses `querySelector()` to locate the matching element in the DOM. A temporary `active-scale` class is applied to the target genre card to create a visual highlight using CSS `transform` and `filter`. This class is removed after a short delay using `setTimeout` to reset the state. To prevent hover effects interfering with the animation, a `disable-hover` class is temporarily applied to the image during the scale animation using `pointer-events: none`, and then removed once the animation completes so the hover effect can return as normal.

**Browser History** — `history.pushState` is called on each search submission and on each carousel image click, adding entries to the browser's history. A `popstate` event listener on the window detects when the user navigates back and clears the search results and input, giving mobile users a natural way to dismiss results using the back button. Carousel clicks also push state so users can navigate back through their genre interactions.

**Description Display** — When the carousel updates, JavaScript queries the current slide's description text and injects it into the description div below using `querySelector()` and `textContent`.

**Genre Filter** — A dropdown above the genre sections allows users to filter which genre is displayed. Selecting a specific genre hides the other three sections using `style.display = 'none'`, while selecting "All Genres" restores all sections to `style.display = 'block'`. This was implemented using a `change` event listener on the dropdown, `querySelectorAll` to grab all genre sections, and `forEach` with an if/else to check each section's `data-genre` attribute against the selected value.

**Newsletter Form** — The form validates first name, last name, and email using regex patterns before submission. If validation fails, an error message shows and the form shakes for visual feedback. On success, a confirmation message appears and the fields are cleared. Both messages fade out using `setTimeout`, and I refactored the code so any previous submission is fully cleared with `clearTimeout()` and `classList.remove()` to prevent overlapping fades when the button is spammed.

## Additional CSS

Images across the site use a greyscale hover effect with CSS `filter: grayscale(100%)` and a brightness transition as well as `transform: scale()` transition to make the page feel more interactive. Only the active carousel slide responds to hover and click events using `pointer-events`.

The theme toggle has a subtle scale animation on hover using `transform: scale(1.2)` with a 0.5s transition. I experimented with background colour transitions too but removed them as they looked off — the scale alone felt cleaner.

Nav links, the search button, and the store filter radio buttons all use a hover effect that scales the element up and transitions the colour to white (`#fff`) with a black (`#000`) background, keeping interactions consistent and responsive across the page.

Back to top arrows in each genre section use a flip and colour swap animation on hover, sourced from [Prismic](https://prismic.io/blog/css-hover-effects).

The form shake animation uses CSS `@keyframes` to move the form left and right with increasing intensity, sourced from [Unused CSS](https://unused-css.com/blog/css-shake-animation/).

Smooth scrolling was added using a single line of CSS — `scroll-behavior: smooth` on the `html` element, sourced from [Go Make Things](https://gomakethings.com/how-to-animate-scrolling-to-anchor-links-with-one-line-of-css/).

The genre card lightmode background image was sourced from [vecteezy](https://www.vecteezy.com/photo/53857937-colorful-space-background-with-a-red-and-blue-swirl-the-colors-are-vibrant-and-the-swirls-are-dynamic)

The genre card darkmode background image was sourced from [vecteezy](https://www.vecteezy.com/photo/11044489-panorama-milky-way-galaxy-with-stars-and-space-dust-in-the-universe)

The light mode background image was sourced from [besthdwallpaper](https://www.besthdwallpaper.com/artistic/japanese-castle-scenery-dt_en-US-81008.html#google_vignette)

The dark mode background image was sourced from [alphacoders](https://wall.alphacoders.com/big.php?i=106826#google_vignette)

## Reflection

Overall I really enjoyed working on this project. It was challenging at times, especially the carousel which took a lot of hours to get right, but that made it more satisfying when it finally worked. I learned a lot about how CSS positioning actually works, how JavaScript interacts with the DOM, and how small changes can have big knock-on effects across a whole page. Going in I had a basic understanding of HTML and CSS but by the end I felt much more confident jumping between the three languages and debugging issues myself. Overall I am happy with how GameVault turned out.