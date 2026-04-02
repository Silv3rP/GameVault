# GameVault Documentation

## Project Overview

For this project, I built **GameVault**, a gaming website designed to help users discover games by genre and find deals using an API.

The idea was to make something that actually feels like a real gaming site rather than just a basic assignment. I went with a **single-page layout** so everything is accessible without reloading the page, and focused heavily on interactivity to make it feel dynamic.

---

## Design Decisions

I decided early on to go with a **dark gaming-style theme**, using:

- Orange as the main accent in light mode
- Blue as the accent in dark mode
- The **Orbitron font** to give it a futuristic / gaming style

Originally, the genre cards just had solid colours, but I changed that later to **space background images** because it made everything feel more cohesive and visually interesting. I also added full page background images for both light and dark mode, each corresponding to their respective theme.

The **carousel** became the centerpiece of the page. Instead of linking directly to game store pages, I changed it so clicking a slide brings you to the relevant section on the page. That way it actually helps with navigation instead of duplicating links.

The genre filter dropdown uses the site's original orange and blue colour scheme. On hover it transitions to white text with a black background to make the interaction feel responsive. Game store links point to each game's respective store page rather than specifically Steam, since Fable II is only available on the Xbox store.

---

## Development Process

I built the project in layers:

1. HTML structure first
2. Then CSS styling
3. Then JavaScript functionality

After that I added features step by step:

- Dark mode toggle
- Carousel
- Genre sections
- Newsletter form
- Search feature (API)
- Filters
- Responsive design

Building it this way made it easier to debug because I always knew what part caused an issue.

---

## Role of JavaScript

JavaScript is what makes the whole site actually work.

Without it, the site would just be static. With JavaScript, I was able to:

- Load game data dynamically from an API
- Update content based on user actions
- Add animations and timed behaviour
- Validate forms and give feedback

Basically, it turns the site from a layout into something interactive.

---

## Key JavaScript Manipulations

Here are the main ways I used JavaScript:

- Event listeners (`click`, `submit`, `change`, `hover`)
- DOM selection (`querySelector`, `querySelectorAll`)
- Class manipulation (`classList.add/remove/toggle`)
- Timers (`setInterval`, `setTimeout`, clearing them properly)
- Fetch API with `async/await`
- Local storage (dark mode saving)
- History API (`pushState`, `popstate`)
- Dynamic content updates (`textContent`, injected HTML)
- Conditional logic (`if/else`, `.filter()`)

---

## JavaScript Interactivity

### Dark Mode
Clicking the toggle button adds or removes a `.dark-mode` class on the body element. CSS handles all the visual changes based on that class. I used `localStorage.setItem` to save the user's preference and `localStorage.getItem` on page load to restore it, so the chosen theme persists across sessions.

---

### Carousel
The carousel was the most complex feature to build. A `currentIndex` variable tracks which slide is active. Clicking next or previous buttons updates the index and calls `updateCarousel()` which removes the `active` class from all slides and adds it to the current one. CSS handles the fade transition using `opacity` — slides start at `opacity: 0` and the active slide gets `opacity: 1`.

The carousel features all twelve curated games grouped into four genres with three slides each. Rather than showing twelve navigation dots which would clutter the UI, I kept four dots — one per genre. `Math.floor(currentIndex / 3)` calculates which dot to highlight based on the current slide index. Clicking a dot jumps to the first slide of that genre using `index * 3`. The auto-rotation interval runs every three seconds using `setInterval` and is cleared on `mouseenter` using `clearInterval`, then restarted on `mouseleave`.

---

### Carousel to Genre Interaction
Each carousel image has a click event listener that scrolls to the corresponding genre card further down the page. The target element is found using `getAttribute("href")` to read the anchor link on the image, then `querySelector()` to locate the matching element in the DOM. A temporary `active-scale` class is applied to the genre card which triggers a CSS scale and brightness animation. The class is removed after a short delay using `setTimeout` to reset the state. To prevent hover effects interfering with the animation, a `disable-hover` class using `pointer-events: none` is temporarily applied to the image and removed once the animation finishes. `history.pushState` is also called on each click to support browser back button navigation.

---

### Search Feature (API)
On form submission the search term is sent to the CheapShark REST API using `fetch()` and `async/await`. Results are displayed as cards showing the game title, sale price, normal price with a strikethrough, Steam rating, and a thumbnail image. Steam rating adapts based on what data is returned — it shows rating text, percentage, and review count if available, or "No rating" if not. Results are limited to 12 using `.slice(0, 12)`. If the input is empty a message prompts the user to enter a title. A hint reading "Press Esc to clear" appears after submission and fades out after three seconds using `setTimeout`. The entire search result area is cleared on each new submission using `results.innerHTML = ""`. `history.pushState` is called on submission so the back button clears the results via a `popstate` event listener.

---

### Store Filter
A pair of radio buttons lets users filter search results by store. The selected value is read on form submission using `querySelector` with the `:checked` selector. If Steam Only is selected, results are filtered using `.filter()` to only include games with a valid `steamAppID`, and links point directly to `https://store.steampowered.com/app/${game.steamAppID}`. If All Stores is selected all results are shown and links use the CheapShark redirect via `dealID`. If the Steam filter returns no matching results a "No results found. Try a different search term." message is shown.

---

### Genre Filter
A dropdown above the genre sections lets users display all genres or a single one. A `change` event listener on the dropdown reads the selected value. `querySelectorAll` grabs all elements with the class `genre-section`. A `forEach` loop checks each section's `data-genre` attribute against the selected value. Matching sections are shown using `style.display = 'block'` and non-matching ones are hidden using `style.display = 'none'`. Selecting "All Genres" sets every section back to `style.display = 'block'`.

---

### Newsletter Form
The form validates first name, last name, and email using regex patterns before allowing submission. The name pattern `/^[A-Za-z\s]{2,50}$/` accepts letters and spaces between two and fifty characters. The email pattern `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` checks for a valid email format. If validation fails an error message is displayed and the form shakes using a CSS `@keyframes` animation. If all fields are valid a success message appears and the fields are cleared. Both messages fade out using two `setTimeout` calls — one to trigger the fade animation and another to remove the message entirely. I refactored this to use `clearTimeout` before setting new timers so rapid submissions don't cause messages to overlap or disappear too early.

---

## Performance Considerations

- Limited search results to 12 to avoid overload
- Used opacity instead of display changes for smoother rendering
- Used API search on form submission as opposed to every keystroke to prevent unnecessary API calls
- Cleared timers to prevent stacking bugs
- Reduced unnecessary event triggers
- Balanced large images with usability

---

## Accessibility

- Used semantic HTML (`header`, `nav`, `section`, `footer`)
- Added `alt` text to images
- Used labels for form inputs
- Kept colour contrast readable in both modes
- Made interactions visually clear

---

## Version Control & Hosting

The project is hosted on GitHub and deployed on both GitHub Pages and Vercel. I made over 100 commits throughout development, each with a meaningful message describing what was changed. This helped me track progress, revert if needed, and manage the project properly rather than making one large submission at the end.

---

## Challenges Faced

### Carousel Navigation Dots Breaking with 12 Slides
When I expanded the carousel from four slides to twelve, the navigation dots broke. The original code used `dots[i]` inside the same loop as the slides, so when `i` reached 4 or higher `dots[i]` returned `undefined` and threw an error, stopping the function before the active class could be applied to the current slide. I fixed this by separating the loops — slides use their own index loop while dots are cleared with `forEach`. I also introduced `Math.floor(currentIndex / 3)` to calculate which of the four genre dots should be active, and updated dot click behaviour to jump to `index * 3` to land on the first slide of that genre group.

### Hover and Interval Conflict on Carousel
The `setInterval` kept advancing slides even while the user was hovering over the carousel, making it hard to read or interact with. I added `clearInterval` on `mouseenter` to pause it and restarted it on `mouseleave`. The problem was that the listener was on the whole carousel section, so it paused even when the mouse was just nearby. I fixed this by moving the listeners to an inner container wrapping only the slides and buttons.

### Animation Timing on Carousel to Genre Interaction
The scale animation on the genre card was triggering too early before the page had finished scrolling, so it was invisible by the time you got there. I added a `setTimeout` delay so the animation fires after the scroll completes. I also had hover effects clashing with the animation, so I temporarily applied `pointer-events: none` via a `disable-hover` class during the animation and removed it once it finished.

### Form Spam Bug
If the newsletter submit button was clicked rapidly, the fade-out timers for success and error messages would overlap and cause messages to disappear too early or stack on top of each other. I fixed this by storing the timer references in variables and calling `clearTimeout` on them before setting new ones, ensuring each message always completes its full fade cycle regardless of how fast the user clicks.

### API Data Problems
The CheapShark API sometimes returned incomplete data — some games had no Steam rating information at all. Rather than showing blank or broken values I used conditional logic to check what data was available and adapt the card output accordingly. If a rating percentage and count exist both are shown. If only a percentage exists that is shown with the rating text. If nothing exists the card displays "No rating".

### Store Filter Link Routing
Initially the Steam Only filter appeared to work but clicking a result still routed through CheapShark's redirect using `dealID`, which sends users to whatever store the deal is from rather than Steam specifically. The fix was to conditionally set the link `href` — Steam Only results now link directly to `https://store.steampowered.com/app/${game.steamAppID}` while All Stores results continue to use the CheapShark redirect.

### Responsive Design and Media Queries
Making the site responsive across different screen sizes was more difficult than expected. While the layout worked well on desktop, several issues appeared on smaller screens.

One issue was **unexpected horizontal scrolling**, caused by elements slightly exceeding the viewport width. This created empty space on the side of the page and broke the layout. I fixed this by applying `overflow-x: hidden` to the `html` and `body` elements to prevent content from overflowing.

The **genre section layout** also became a problem. The two-column flex layout looked good on desktop but became too cramped on mobile. I solved this using media queries to switch the layout to `flex-direction: column`, allowing the image and text to stack vertically for better readability.

The **header and dark mode toggle** caused layout issues as well. Because the toggle used `position: absolute`, it overlapped the title on smaller screens. I fixed this by adjusting font sizes, spacing, and padding within media queries to better fit smaller viewports.

Finally, the **carousel controls (arrows and dots)** needed repositioning, as they were misaligned or pushed outside the container on certain screen sizes. This was resolved by refining their positioning within the carousel container.

Responsive design required repeated testing and small adjustments, as fixing one issue often affected other parts of the layout.

---

## Limitations & Improvements

If I had more time, I would:

- Replace `setTimeout` with `IntersectionObserver` for the carousel animation
- Add backend support for the newsletter
- Improve API error handling
- Optimise large images further
- Add more advanced search filters
- Improve keyboard accessibility with ARIA labels

---

## Reflection

Overall, I enjoyed building this project a lot. The carousel alone took a lot of time, and media queries required a lot of refinements, but it helped me understand how JavaScript actually works with the DOM.

The biggest thing I learned was that small changes can break other parts of the page, so debugging and testing properly is really important.

I also feel much more confident now working across HTML, CSS, and JavaScript together instead of treating them as separate things.