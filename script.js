document.addEventListener('DOMContentLoaded', () => {

    // 1. PEMBOLEHUBAH GLOBAL & RUJUKAN DOM
    let songs = [];

    const genreFilter = document.getElementById('genre-filter');
    const langFilter = document.getElementById('lang-filter');
    const letterFilterContainer = document.getElementById('letter-filter');
    const resultsContainer = document.getElementById('results');

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
            songCard.dataset.id = song.id;

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
        // Kelewatan kecil diperlukan untuk AOS mengesan elemen baru selepas grid dikemas kini
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    }

    // 4. FUNGSI UNTUK POPULASI PENAPIS
    function populateFilters(songList) {
        const genres = [...new Set(songList.map(song => song.genre))];
        const languages = [...new Set(songList.map(song => song.language))];

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
    function filterAndDisplaySongs(activeLetter = 'all') {
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

    // 6. INISIALISASI APLIKASI
    async function init() {
        // Ambil data lagu dari fail JSON
        try {
            const response = await fetch('songs.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            songs = await response.json();
        } catch (error) {
            console.error("Gagal memuatkan data lagu:", error);
            resultsContainer.innerHTML = "<p>Maaf, data lagu tidak dapat dimuatkan. Sila cuba lagi kemudian.</p>";
            return;
        }

        let activeLetter = 'all';

        // Sediakan penapis dan paparkan semua lagu pada mulanya
        populateFilters(songs);
        displaySongs(songs);

        // Tambah Event Listeners
        genreFilter.addEventListener('change', () => filterAndDisplaySongs(activeLetter));
        langFilter.addEventListener('change', () => filterAndDisplaySongs(activeLetter));

        letterFilterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('letter-button')) {
                letterFilterContainer.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');
                activeLetter = e.target.dataset.letter;
                filterAndDisplaySongs(activeLetter);
            }
        });
    }

    init();
});
