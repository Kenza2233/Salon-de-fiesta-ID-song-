document.addEventListener('DOMContentLoaded', () => {

    // 1. PEMBOLEHUBAH GLOBAL & RUJUKAN DOM
    let songs = [];

    const genreFilter = document.getElementById('genre-filter');
    const letterFilterContainer = document.getElementById('letter-filter');
    const resultsContainer = document.getElementById('results');
    const randomBtn = document.getElementById('random-btn');
    const searchBox = document.getElementById('search-box');
    const themeSwitcher = document.querySelector('.theme-switcher');
    const toggleThemeBtn = document.getElementById('toggle-theme-btn');
    const themeOptions = document.querySelector('.theme-options');

    // 3. FUNGSI UNTUK MEMAPARKAN LAGU
    function displaySongs(songList) {
        resultsContainer.innerHTML = '';
        if (songList.length === 0) {
            resultsContainer.innerHTML = '<p>No songs found.</p>';
            return;
        }

        songList.forEach(song => {
            const songCard = document.createElement('div');
            songCard.className = 'song-card';
            songCard.setAttribute('data-aos', 'fade-up');
            songCard.dataset.id = song.id;

            songCard.innerHTML = `
                <div class="card-header">
                    <div class="song-id">${song.id}</div>
                    <button class="copy-btn" title="Copy ID">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zM9 2H7v1h2V2z"/>
                        </svg>
                    </button>
                </div>
                <h3>${song.title}</h3>
                <p>Artist: ${song.artist}</p>
                <div class="song-meta">
                    <span class="song-genre">${song.genre || 'N/A'}</span>
                </div>
            `;
            resultsContainer.appendChild(songCard);

            const copyBtn = songCard.querySelector('.copy-btn');
            copyBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Hentikan event dari merebak ke kad lagu
                navigator.clipboard.writeText(song.id).then(() => {
                    copyBtn.title = 'Copied!';
                    setTimeout(() => {
                        copyBtn.title = 'Copy ID';
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy ID: ', err);
                });
            });
        });

        // Refresh AOS untuk mengesan elemen baru
        // Kelewatan kecil diperlukan untuk AOS mengesan elemen baru selepas grid dikemas kini
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    }

    // 4. FUNGSI UNTUK POPULASI PENAPIS
    function populateFilters(songList) {
        const genres = [...new Set(songList.map(song => song.genre).filter(Boolean))];

        genres.sort().forEach(genre => {
            const option = document.createElement('option');
            option.value = genre;
            option.textContent = genre;
            genreFilter.appendChild(option);
        });

        // Cipta butang huruf
        const allButton = document.createElement('button');
        allButton.className = 'letter-button all-letters active';
        allButton.textContent = 'All';
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
        const searchTerm = searchBox.value.toLowerCase();

        const filteredSongs = songs.filter(song => {
            const genreMatch = selectedGenre === 'all' || song.genre === selectedGenre;
            const letterMatch = activeLetter === 'all' || song.title.toUpperCase().startsWith(activeLetter);
            const searchMatch = song.title.toLowerCase().includes(searchTerm) || song.artist.toLowerCase().includes(searchTerm);

            return genreMatch && letterMatch && searchMatch;
        });

        displaySongs(filteredSongs);
    }

    // Fungsi untuk animasi menaip
    function typeWriter(text, i, fnCallback) {
        if (i < (text.length)) {
            document.getElementById("typing-title").innerHTML = text.substring(0, i+1);
            setTimeout(function() {
                typeWriter(text, i + 1, fnCallback)
            }, 100);
        } else if (typeof fnCallback == 'function') {
            setTimeout(fnCallback, 700);
        }
    }

    function displayRandomSong() {
        // Reset all filters to default
        genreFilter.value = 'all';
        searchBox.value = '';
        if (letterFilterContainer.querySelector('.active')) {
            letterFilterContainer.querySelector('.active').classList.remove('active');
        }
        letterFilterContainer.querySelector('.all-letters').classList.add('active');

        // Select and display 1 to 4 random songs
        const shuffled = [...songs].sort(() => 0.5 - Math.random());
        const count = Math.floor(Math.random() * 4) + 1; // Random number between 1 and 4
        const randomSongs = shuffled.slice(0, count);
        displaySongs(randomSongs);
    }

    // 6. INISIALISASI APLIKASI
    async function init() {
        // Ambil data lagu dari fail JSON
        try {
            const response = await fetch('songs.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            songs = data.songs;
        } catch (error) {
            console.error("Gagal memuatkan data lagu:", error);
            resultsContainer.innerHTML = "<p>Maaf, data lagu tidak dapat dimuatkan. Sila cuba lagi kemudian.</p>";
            return;
        }

        let activeLetter = 'all';

        // Sediakan penapis
        populateFilters(songs);

        // Paparkan semua lagu pada mulanya
        displaySongs(songs);

        // Mulakan animasi menaip
        typeWriter("SDF Id Search", 0, function() {
            // Optional: do something after typing is done
        });

        // Set active theme button on load
        const currentTheme = localStorage.getItem('theme') || 'original';
        themeOptions.querySelector('.active').classList.remove('active');
        themeOptions.querySelector(`[data-theme="${currentTheme}"]`).classList.add('active');


        // Tambah Event Listeners
        genreFilter.addEventListener('change', () => {
            // Reset letter filter when genre changes
            if (letterFilterContainer.querySelector('.active')) {
                letterFilterContainer.querySelector('.active').classList.remove('active');
            }
            letterFilterContainer.querySelector('.all-letters').classList.add('active');
            activeLetter = 'all';
            filterAndDisplaySongs(activeLetter);
        });

        letterFilterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('letter-button')) {
                letterFilterContainer.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');
                activeLetter = e.target.dataset.letter;
                filterAndDisplaySongs(activeLetter);
            }
        });

        randomBtn.addEventListener('click', displayRandomSong);
        searchBox.addEventListener('input', () => filterAndDisplaySongs(activeLetter));

        toggleThemeBtn.addEventListener('click', () => {
            themeSwitcher.classList.toggle('open');
        });

        themeOptions.addEventListener('click', (e) => {
            if (e.target.classList.contains('theme-btn')) {
                const theme = e.target.dataset.theme;
                document.documentElement.dataset.theme = theme;
                localStorage.setItem('theme', theme); // Save theme to localStorage

                // Update active class
                themeOptions.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');

                // Close the menu
                themeSwitcher.classList.remove('open');
            }
        });

        // Hide/show theme switcher on scroll
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                // Downscroll
                themeSwitcher.classList.add('hidden-by-scroll');
                themeSwitcher.classList.remove('open'); // Also close menu on scroll
            } else {
                // Upscroll
                themeSwitcher.classList.remove('hidden-by-scroll');
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
        }, false);
    }

    init();
});
