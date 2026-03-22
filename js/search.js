(async () => {

    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('gameSearch');
    const results = document.getElementById('results');

    // Listen for submit event on the search form
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const value = searchInput.value.trim();
        // Clear previous results
        results.innerHTML = ""; 

        
        // If input is empty, show hint to enter search term
        if (value.length === 0) {
            results.innerHTML = "<span><p class='clear-hint'>No results found. Enter a title to search.</p></span>";
            return;
        }
        

            
        // If user has entered a search term, show hint to clear results and fade out hint after 3 seconds
        const hint = document.getElementById('search-hint');

        if (value.length > 0) {
            hint.textContent = "Press Esc or Delete to clear";
        } 

        setTimeout(() => {
                hint.classList.add("message-fade-out");
            }, 3000);
        

        // Fetch data from CheapShark API 
        try {
            const data = await (await fetch(`https://www.cheapshark.com/api/1.0/deals?title=${value}`)).json();
            
                data.slice(0,12).forEach(game => {
                const card = document.createElement('div');
                card.className = 'game-result';

                // Grab steam rating data 
                const ratingPercent = Number(game.steamRatingPercent);
                const ratingText = game.steamRatingText;
                const ratingCount = Number(game.steamRatingCount);

                let steamRating;

                // Handle what steam data to display based on what data is available. 
                // If there is a rating percent and count, show both. 
                // If there is only a rating percent, show that and rating text (regardless of count). 
                // If there is no rating data, show "No rating" 
                if (ratingPercent > 0 && ratingCount > 0) {
                    steamRating = `${ratingText} (${ratingPercent}%, ${ratingCount} reviews)`;
                } 
                else if (ratingPercent > 0){
                    steamRating = `${ratingText} (${ratingPercent}%)`;
                } else {
                    steamRating = "No rating";
                }

                // Title
                const title = document.createElement('h3');
                title.textContent = game.title;

                // Reduced price
                const price = document.createElement('p');
                price.textContent = `Price: €${game.salePrice}`;
                
                // Normal price
                const normal = document.createElement('span');
                normal.id = 'normal-price';
                normal.textContent = `Was: €${game.normalPrice}`;
                price.appendChild(document.createElement('br'));
                price.appendChild(normal); 

                // Steam rating
                const rating = document.createElement('p');
                rating.className = 'steam-rating';
                rating.textContent = steamRating;

                // Link and thumbnail img
                const link = document.createElement('a');
                link.href = `https://www.cheapshark.com/redirect?dealID=${game.dealID}`;
                link.target = '_blank';

                const img = document.createElement('img');
                img.src = game.thumb;
                img.alt = `${game.title} thumbnail`;
                img.className = 'game-thumbnail';

                link.appendChild(img);

                // Built the card
                card.append(title, price, normal, rating, link);

                // Show results
                results.appendChild(card);

            });

        } catch (err) {
            console.error(err);
        }
    });

    // Clear input/results when user presses Escape or Delete key
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Delete') {
            searchInput.value = '';
            results.innerHTML = '';
            
        }
    });

})();