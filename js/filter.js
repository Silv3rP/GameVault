(function () {


    // Get the genre filter dropdown id and all genre section classes
    const genreFilter = document.getElementById('genre-filter');
    const genreSection = document.querySelectorAll('.genre-section');

    genreFilter.addEventListener('change', function ()  {

        // Get the current selected genre from the dropdown
        const currentGenre = this.value;

        // Loop through all genre sections with data-genre and show/hide based on the selected genre or show all if "all" is selected
        genreSection.forEach(section => {
            if (currentGenre === 'all' || section.dataset.genre === currentGenre) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });
})(); 