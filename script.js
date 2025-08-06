document.addEventListener('DOMContentLoaded', () => {

    // 1. DATA LAGU (MOCK DATA)
    const songs = [
        { id: 'L001', title: 'Aku dan Bintang', artist: 'Peterpan', genre: 'Pop', language: 'Melayu' },
        { id: 'L002', title: 'Bohemian Rhapsody', artist: 'Queen', genre: 'Rock', language: 'Inggeris' },
        { id: 'L003', title: 'Cindai', artist: 'Siti Nurhaliza', genre: 'Tradisional', language: 'Melayu' },
        { id: 'L004', title: 'Dynamite', artist: 'BTS', genre: 'K-Pop', language: 'Korea' },
        { id: 'L005', title: 'Enter Sandman', artist: 'Metallica', genre: 'Rock', language: 'Inggeris' },
        { id: 'L006', title: 'Fantasia Bulan Madu', artist: 'Search', genre: 'Rock', language: 'Melayu' },
        { id: 'L007', title: 'Gangnam Style', artist: 'PSY', genre: 'K-Pop', language: 'Korea' },
        { id: 'L008', title: 'Hotel California', artist: 'Eagles', genre: 'Rock', language: 'Inggeris' },
        { id: 'L009', title: 'Isabella', artist: 'Search', genre: 'Rock', language: 'Melayu' },
        { id: 'L010', title: 'Jerat Percintaan', artist: 'Siti Nurhaliza', genre: 'Pop', language: 'Melayu' },
        { id: 'L011', title: 'Kau Ilhamku', artist: 'Man Bai', genre: 'Pop', language: 'Melayu' },
        { id: 'L012', title: 'Like a Rolling Stone', artist: 'Bob Dylan', genre: 'Folk', language: 'Inggeris' },
        { id: 'L013', title: 'Madu Tiga', artist: 'P. Ramlee', genre: 'Klasik', language: 'Melayu' },
        { id: 'L014', title: 'Nirmala', artist: 'Siti Nurhaliza', genre: 'Tradisional', language: 'Melayu' },
        { id: 'L015', title: 'One', artist: 'U2', genre: 'Rock', language: 'Inggeris' },
        { id: 'L016', title: 'Pelangi Petang', artist: 'Sudirman', genre: 'Pop', language: 'Melayu' },
        { id: 'L017', title: 'Stairway to Heaven', artist: 'Led Zeppelin', genre: 'Rock', language: 'Inggeris' },
        { id: 'L018', title: 'Yesterday', artist: 'The Beatles', genre: 'Pop', language: 'Inggeris' }
    ];

    // 2. RUJUKAN ELEMEN DOM
    const genreFilter = document.getElementById('genre-filter');
    const langFilter = document.getElementById('lang-filter');
    const letterFilterContainer = document.getElementById('letter-filter');
    const resultsContainer = document.getElementById('results');

    let activeLetter = 'all';

    // 3. FUNGSI UNTUK MEMAPARKAN LAGU
    function displaySongs(songList) {
        resultsContainer.innerHTML = '';
        if (songList.length === 0) {
            resultsContainer.innerHTML = '<p>Tiada lagu ditemui.</p>';
            return;
        }

        songList.forEach(song => {
            const songCard = document.createElement('div');
            songCard.className = 'song-card';
            songCard.setAttribute('data-aos', 'fade-up');

            songCard.innerHTML = `
                <div class="song-id">${song.id}</div>
                <h3>${song.title}</h3>
                <p>Artis: ${song.artist}</p>
                <div class="song-meta">
                    <span class="song-genre">${song.genre}</span>
                    <span class="song-lang">${song.language}</span>
                </div>
            `;
            resultsContainer.appendChild(songCard);
        });

        // Refresh AOS untuk mengesan elemen baru
        AOS.refresh();
    }

    // 4. FUNGSI UNTUK POPULASI PENAPIS
    function populateFilters() {
        const genres = [...new Set(songs.map(song => song.genre))];
        const languages = [...new Set(songs.map(song => song.language))];

        genres.sort().forEach(genre => {
            const option = document.createElement('option');
            option.value = genre;
            option.textContent = genre;
            genreFilter.appendChild(option);
        });

        languages.sort().forEach(lang => {
            const option = document.createElement('option');
            option.value = lang;
            option.textContent = lang;
            langFilter.appendChild(option);
        });

        // Cipta butang huruf
        const allButton = document.createElement('button');
        allButton.className = 'letter-button all-letters active';
        allButton.textContent = 'Semua';
        allButton.dataset.letter = 'all';
        letterFilterContainer.appendChild(allButton);

        for (let i = 65; i <= 90; i++) { // A-Z
            const letter = String.fromCharCode(i);
            const button = document.createElement('button');
            button.className = 'letter-button';
            button.textContent = letter;
            button.dataset.letter = letter;
            letterFilterContainer.appendChild(button);
        }
    }

    // 5. FUNGSI UNTUK MENAPIS DAN MEMAPARKAN
    function filterAndDisplaySongs() {
        const selectedGenre = genreFilter.value;
        const selectedLang = langFilter.value;

        const filteredSongs = songs.filter(song => {
            const genreMatch = selectedGenre === 'all' || song.genre === selectedGenre;
            const langMatch = selectedLang === 'all' || song.language === selectedLang;
            const letterMatch = activeLetter === 'all' || song.title.toUpperCase().startsWith(activeLetter);
            return genreMatch && langMatch && letterMatch;
        });

        displaySongs(filteredSongs);
    }

    // 6. EVENT LISTENERS
    genreFilter.addEventListener('change', filterAndDisplaySongs);
    langFilter.addEventListener('change', filterAndDisplaySongs);

    letterFilterContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('letter-button')) {
            // Urus kelas 'active'
            letterFilterContainer.querySelector('.active').classList.remove('active');
            e.target.classList.add('active');

            activeLetter = e.target.dataset.letter;
            filterAndDisplaySongs();
        }
    });

    // 7. INISIALISASI
    function init() {
        populateFilters();
        displaySongs(songs);
    }

    init();
});
