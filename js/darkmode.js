//Dark Mode Toggle Script for switching between light and dark themes on the website.
//It listens for a click event on the toggle button, toggles the 'dark-mode' class on the body element, and updates the icon accordingly.
( () => {
    //Pull the classes for darkmode and applies them to the page
    const toggle = document.getElementById('theme-toggle');
    const icon = document.querySelector('.icon');

     // Load saved theme on page load
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        icon.src = 'images/sun.png';
    } else {
        icon.src = 'images/moon.png';
    }

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');


        //If dark mode is active, set the icon to a sun image; otherwise, set it to a moon image and save light/dark mode preference in localStorage.
        if (document.body.classList.contains('dark-mode')) {
            icon.src = 'images/sun.png';
            localStorage.setItem('theme', 'dark');
        } else {
            icon.src = 'images/moon.png';
            localStorage.setItem('theme', 'light');
        }

    });

    })();