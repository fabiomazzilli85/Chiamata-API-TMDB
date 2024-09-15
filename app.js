const apiKey = '8ace0fff523a317c94b868afc016abba'; // Inserisci qui la tua API Key
const movieTitles = ['Nuovo cinema Paradiso', 'Taxi Driver', 'C\Era una volta in America', 'Pulp Fiction', 'Back to the Future', 'Toro scatenato']; // Array di titoli di film

// Funzione per cercare un film e aggiungere una card
function fetchMovie(title) {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}`)
    .then(response => response.json())
    .then(data => {
      const movieList = document.getElementById('movie-list'); // Elemento dove inserire le card
      
      // Controllo se sono presenti risultati per il film
      if (data.results.length > 0) {
        const movie = data.results[0]; // Prendo il primo risultato corrispondente al titolo

        const imageUrl = movie.backdrop_path 
          ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` 
          : 'https://via.placeholder.com/500x300?text=No+Image';
        
        const movieItem = document.createElement('div');
        movieItem.classList.add('col-md-4', 'mb-4'); // Aggiunge classi di Bootstrap per layout responsive
        
        movieItem.innerHTML = `
          <div class="card h-100">
            <img src="${imageUrl}" class="card-img-top" alt="Immagine di ${movie.original_title}">
            <div class="card-body">
              <h5 class="card-title text-center mb-3">${movie.original_title}</h5>
              <p class="card-text text-center"><strong>Uscita:</strong> ${movie.release_date}</p>
              <p class="card-text">${movie.overview ? movie.overview.substring(0, 100) + '...' : 'Nessuna descrizione disponibile.'}</p>
            </div>
          </div>
        `;
        
        movieList.appendChild(movieItem); // Aggiunge la card alla lista
      } else {
        console.log(`Nessun film trovato per il titolo: ${title}`);
      }
    })
    .catch(error => console.error('Errore:', error));
}

// Ciclo per cercare ogni film nell'array
movieTitles.forEach(title => {
  fetchMovie(title);
});
