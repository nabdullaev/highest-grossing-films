document.addEventListener("DOMContentLoaded", function () {
    // Fetch the JSON file and display the films
    fetch('./films_data.json')
        .then(response => response.json())
        .then(films => {
            displayFilms(films);
            
            // Search functionality
            const searchInput = document.getElementById('search');
            searchInput.addEventListener('input', (event) => {
                const filteredFilms = films.filter(film => 
                    film.title.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    film.director.join(' ').toLowerCase().includes(event.target.value.toLowerCase())
                );
                displayFilms(filteredFilms);
            });
        })
        .catch(err => console.error('Error fetching films data: ', err));

    // Function to display the films
    function displayFilms(films) {
        const filmList = document.getElementById('film-list');
        filmList.innerHTML = '';  // Clear the existing content

        films.forEach(film => {
            const filmCard = document.createElement('div');
            filmCard.classList.add('film-card');
            filmCard.innerHTML = `
                <h3>${film.title}</h3>
                <p><strong>Release Year:</strong> ${film.release_year}</p>
                <p><strong>Director(s):</strong> ${film.director.join(', ')}</p>
                <p><strong>Box Office:</strong> ${film.box_office}</p>
                <p><strong>Country:</strong> ${film.country}</p>
            `;
            filmList.appendChild(filmCard);
        });
    }
});
