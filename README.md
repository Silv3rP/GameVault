# GameVault – Video Game Genre Encyclopedia

A single-page application built with HTML, CSS, and JavaScript. GameVault is a video game encyclopedia highlighting four genres — Shooter, RPG, Horror, and Indie — each featuring three curated games, with additional game deal search functionality powered by the CheapShark REST API.

Created as part of a college assignment to demonstrate front-end development, JavaScript interactivity, and DOM manipulation.

🔗 Live site:

  https://colmn-dev.github.io/GameVault/
  
🔗 Vercel: 

  https://game-vault-cnd.vercel.app/

---

## Tech Stack
- **HTML** – semantic single-page structure
- **CSS** – layout, styling, responsive design, and dark mode
- **JavaScript** – interactivity, DOM manipulation, and REST API integration

---

## Features

* Auto-rotating genre carousel with manual navigation, pause-on-hover, and smooth fade transitions
* Genre filter dropdown allowing users to display all genres or a single genre of their choice
* Four curated genre sections with game info, images, and Steam store links
* Game deal search using the CheapShark REST API, fetching the top 12 results with sale price, normal price, and Steam rating displayed on interactive result cards
* Store filter radio buttons to switch between all store deals or Steam only results
* Dark mode toggle with persistent state via `localStorage`
* Newsletter signup form with regex validation, shake animation, and fade-out feedback messages
* Fully responsive design for mobile, tablet, and desktop
* Smooth scrolling navigation between sections
* PWA support via web app manifest (installable on mobile home screen)
* Open Graph and social sharing meta tags for better link previews
* Favicon and Orbitron font for a consistent gaming aesthetic
* Modular JavaScript structure with separate files: `dark-mode.js`, `carousel.js`, `form.js`, `filter.js`, and `search.js`

---

## Notes
This site is a **static front-end project only**.
No backend or database is included as this was outside the scope of the assignment.

---

## Author
Colm Nolan / ColmN-Dev

---

## Webpage Preview – Light Mode
![GameVault Homepage Light Mode](images/GVLM.png)

---

## Webpage Preview – Dark Mode
![GameVault Homepage Dark Mode](images/GVDM.png)
