# GameVault Documentation

## Project Overview

For this project, I built **GameVault**, a gaming website designed to help users discover games by genre and find deals using an API. 

The idea was to make something that actually feels like a real gaming site rather than just a basic assignment. I went with a **single-page layout** so everything is accessible without reloading the page, and focused heavily on interactivity to make it feel dynamic.

---

## Design Decisions

I decided early on to go with a **dark gaming-style theme**, using:

- Orange as the main accent in light mode  
- Blue as the accent in dark mode  
- The **Orbitron font** to give it that futuristic / gaming feel  

Originally, the genre cards just had solid colours, but I changed that later to **space background images** because it made everything feel more cohesive and visually interesting.

The **carousel** became the centrepiece of the page. Instead of linking directly to game store pages, I changed it so clicking a slide brings you to the relevant section on the page. That way it actually helps with navigation instead of duplicating links.

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
I used a class toggle on the body and saved the preference in `localStorage` so it stays even after refresh.

---

### Carousel
I found this to be the most challenging.

- Uses `setInterval` to auto-rotate  
- Pauses on hover using `clearInterval`  
- Uses grouped slides (3 per genre)  
- Only 4 dots instead of 12 (calculated using `Math.floor(index / 3)`)  

I also switched from `display` to **opacity transitions** to make it smooth.

---

### Carousel → Genre Interaction
Clicking a carousel image scrolls to a section and briefly scales the matching card.

This took a few tries because:
- The animation was triggering too early  
- Hover effects were interfering  

I fixed it using `setTimeout` and temporarily disabling hover.

---

### Search Feature (API)
I used the CheapShark API with `fetch()` and `async/await`.

- Displays results as cards  
- Limits results to 12  
- Handles missing data (like ratings)  
- Shows messages if no results found  

---

### Store Filter
Users can choose:

- All stores  
- Steam only  

If Steam is selected:
- Results are filtered using `.filter()`  
- Links go directly to Steam instead of CheapShark  

---

### Genre Filter
Dropdown lets users show one genre or all.

This works by:
- Looping through sections  
- Matching `data-genre`  
- Changing `style.display`

---

### Newsletter Form
- Uses regex for validation  
- Shows success/error messages  
- Form shakes on error  

I had an issue where messages overlapped if you spammed submit, so I fixed it by clearing existing timeouts before setting new ones.

---

## Performance Considerations

- Limited search results to 12 to avoid overload  
- Used opacity instead of display changes for smoother rendering  
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

The project is hosted on GitHub and deployed using GitHub Pages.

This allowed me to:
- Track changes using commits  
- Manage versions of the project  
- Make the site publicly accessible  

---

## Challenges Faced

### Carousel Issues
When I increased slides to 12:
- Dots broke (`undefined` errors)  
- Fixed by separating dot logic and slide logic  

---

### Hover + Interval Conflict
Carousel kept moving while hovering  
→ Fixed using `clearInterval` and better event targeting  

---

### Animation Timing
Scroll + scale animation didn’t line up  
→ Fixed with `setTimeout` delay  

---

### Form Spam Bug
Messages overlapped when clicking fast  
→ Fixed using `clearTimeout`  

---

### API Data Problems
Some results had missing info  
→ Handled with conditional rendering  

---

## Limitations & Improvements

If I had more time, I would:

- Replace `setTimeout` with `IntersectionObserver`  
- Add backend support for the newsletter  
- Improve API error handling  
- Optimise large images  
- Add more advanced filters  
- Improve keyboard accessibility  

---

## Reflection

Overall, I enjoyed building this project a lot. The carousel alone took a lot of time, media queries also needed a lot of refinements but it helped me understand how JavaScript actually works with the DOM.

The biggest thing I learned was that small changes can break other parts of the page, so debugging and testing properly is really important.

I also feel much more confident now working across HTML, CSS, and JavaScript together instead of treating them as separate things.