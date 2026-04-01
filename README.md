# GameVault – Video Game Genre Encyclopedia

**GitHub Repository:**

https://github.com/ColmN-Dev/GameVault

**Public URL:** 

https://colmn-dev.github.io/GameVault/

**Vercel:** 

https://game-vault-cnd.vercel.app/

---

## Project Description/Concept

GameVault is a video game genre encyclopedia I built as a single-page application. I wanted to create an interactive, visually engaging site that highlights four gaming genres I enjoy — Shooter, RPG, Horror, and Indie — each with three curated games I chose myself. Users can explore genres, search for game deals via the CheapShark REST API, and filter results by store. I also added dark mode, a genre filter dropdown, and a fully interactive carousel showcasing all twelve games.

---

## Features

* Auto-rotating genre carousel with manual navigation, pause-on-hover, and smooth fade transitions
* Genre filter dropdown allowing users to display all genres or a single genre of their choice
* Four curated genre sections with game info, images, and links to their respective store pages
* Carousel-to-genre interaction where clicking a carousel image scrolls to the corresponding section and highlights the related genre card with a smooth scale animation using JavaScript and dynamic class manipulation
* Game deal search using the CheapShark REST API, fetching the top 12 results with sale price, normal price, and Steam rating displayed on interactive result cards
* Store filter radio buttons to switch between all store deals or Steam only results
* Dark mode toggle with persistent state via `localStorage`
* Newsletter signup form with regex validation, shake animation, and fade-out feedback messages
* Browser History API integration for back button support on search and carousel interactions
* Fully responsive design for mobile, tablet, and desktop
* Smooth scrolling navigation between sections
* PWA support via web app manifest (installable on mobile home screen)
* Open Graph and social sharing meta tags for better link previews
* Favicon and Orbitron font for a consistent gaming aesthetic
* Modular JavaScript structure with separate files: `dark-mode.js`, `carousel.js`, `form.js`, `filter.js`, and `search.js`

---

## Tech Stack

* **HTML** – semantic single-page structure
* **CSS** – layout, styling, responsive design, and dark mode
* **JavaScript** – interactivity, DOM manipulation, and REST API integration

---

## Design Decisions

I chose a dark-themed gaming aesthetic with an orange and blue colour scheme — orange for light mode and blue for dark mode. I used the Orbitron font for its pixel-art gaming feel. I used space banner images as the genre card backgrounds in both themes and added full page background images that correspond to each mode. I expanded the carousel to showcase all twelve games, using four navigation dots representing each genre group rather than twelve individual dots to keep the UI clean. I added the genre filter and store filter to give users control over what content they see. Full design decisions, development process, challenges faced, and JavaScript interactivity details are in `documentation.md`.

---

## Wireframes

I created wireframes at the start of the project to plan the layout and structure before building anything.

![GameVault Wireframe](images/wireframe.png)

---

## Testing

| Test | Result |
|------|--------|
| Lighthouse Performance | 64 |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |
| Responsive design tested across mobile, tablet, laptop, and desktop | Pass |
| Dark mode tested across all elements | Pass |
| Form validation tested with valid and invalid inputs | Pass |
| CheapShark API tested with valid search terms and empty input | Pass |
| Steam filter tested with and without results | Pass |
| Carousel auto-rotation and manual navigation tested | Pass |
| Back button behaviour tested on mobile | Pass |

### Biome Lint Output

```bash
PASTE YOUR BIOME OUTPUT HERE
```

---

## Issues

| Title | Severity | Description |
|-------|----------|-------------|
| Performance score | Low | My Lighthouse performance score dropped from 100 to 64 after adding full page background images and twelve carousel images. The images are compressed but further optimisation could improve this. |

---

## Future Work

* Further image optimisation to improve the Lighthouse performance score
* Additional keyboard navigation for full accessibility
* Potential OOP refactor using JavaScript classes for the carousel and search components
* Pagination or show more functionality for search results

---

## Author

Colm Nolan / ColmN-Dev

---

## Webpage Preview – Light Mode
![GameVault Homepage Light Mode](images/GVLMSS.png)

---

## Webpage Preview – Dark Mode
![GameVault Homepage Dark Mode](images/GVDMSS.png)
