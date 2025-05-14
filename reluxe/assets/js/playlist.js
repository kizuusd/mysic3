document.addEventListener('DOMContentLoaded', function() {
    // Variabel untuk menyimpan data lagu
    let tracks = [];
    
    // Elemen-elemen DOM
    const currentTrackTitle = document.getElementById('current-track-title');
    const currentTrackArtist = document.getElementById('current-track-artist');
    const trackThumb = document.querySelector('.track-thumb');
    const playPauseBtn = document.getElementById('play-pause');
    const prevTrackBtn = document.getElementById('prev-track');
    const nextTrackBtn = document.getElementById('next-track');
    const progressBar = document.querySelector('.progress');
    const progressContainer = document.querySelector('.progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const volumeControl = document.getElementById('volume');

    // State untuk player musik
    let currentTrackIndex = 0;
    let isPlaying = false;
    const audio = new Audio();

    // Fungsi untuk memperbarui playlist dari Deezer API
    window.updatePlaylist = function(newTracks) {
        if (!newTracks || newTracks.length === 0) {
            const playlistContainer = document.getElementById('playlist-container');
            playlistContainer.innerHTML = '<div class="no-results">Tidak ada lagu yang ditemukan. Coba kata kunci lain.</div>';
            return;
        }
        
        tracks = newTracks;
        renderPlaylist();
        loadTrack(0);
    };

    // Render playlist items 
    function renderPlaylist() {
        const playlistContainer = document.getElementById('playlist-container');
        playlistContainer.innerHTML = ''; // Clear container first
        
        tracks.forEach((track, index) => {
            // Pastikan cover selalu tersedia
            const coverUrl = track.cover || './assets/images/fallback.svg';
            
            const trackItem = document.createElement('div');
            trackItem.className = 'track-item';
            trackItem.setAttribute('data-id', track.id);
            trackItem.setAttribute('data-index', index);
            
            trackItem.innerHTML = `
                <div class="track-cover" style="background-image: url(${coverUrl})"></div>
                <div class="track-info">
                    <h3>${track.title}</h3>
                    <p>${track.artist}</p>
                </div>
                <div class="track-duration">${track.duration}</div>
                <div class="track-controls">
                    <button class="play-btn" data-index="${index}"><i class="fas fa-play"></i></button>
                </div>
            `;
            
            playlistContainer.appendChild(trackItem);
        });
        
        // Tambahkan event listener untuk setiap track
        document.querySelectorAll('.track-item').forEach(item => {
            item.addEventListener('click', function(e) {
                // Hindari klik pada button play yang sudah punya event sendiri
                if (e.target.closest('.play-btn')) return;
                
                const index = parseInt(this.getAttribute('data-index'));
                if (currentTrackIndex === index && isPlaying) {
                    pauseTrack();
                } else {
                    currentTrackIndex = index;
                    loadTrack(currentTrackIndex);
                    playTrack();
                }
            });
        });
    }

    // Event listener untuk tombol play/pause
    playPauseBtn.addEventListener('click', function() {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    });

    // Event listener untuk tombol next
    nextTrackBtn.addEventListener('click', function() {
        nextTrack();
    });

    // Event listener untuk tombol previous
    prevTrackBtn.addEventListener('click', function() {
        prevTrack();
    });

    // Event listener untuk update progress bar
    audio.addEventListener('timeupdate', updateProgress);

    // Event listener untuk mengklik progress bar
    progressContainer.addEventListener('click', setProgress);

    // Event listener untuk audio ended
    audio.addEventListener('ended', function() {
        nextTrack();
    });

    // Event listener untuk volume control
    volumeControl.addEventListener('input', function() {
        const volume = volumeControl.value / 100;
        audio.volume = volume;
    });

    // Event listener untuk tombol play di playlist
    document.addEventListener('click', function(e) {
        if(e.target.classList.contains('play-btn') || e.target.parentElement.classList.contains('play-btn')) {
            const button = e.target.classList.contains('play-btn') ? e.target : e.target.parentElement;
            const index = parseInt(button.getAttribute('data-index'));
            
            if (currentTrackIndex === index && isPlaying) {
                pauseTrack();
            } else {
                currentTrackIndex = index;
                loadTrack(currentTrackIndex);
                playTrack();
            }
        }
    });

    // Fungsi untuk memuat track
    function loadTrack(index) {
        if (!tracks.length) return; // Hindari error jika data belum dimuat
        
        if (index < 0) index = tracks.length - 1;
        if (index >= tracks.length) index = 0;
        
        currentTrackIndex = index;
        
        const track = tracks[currentTrackIndex];
        audio.src = track.audioSrc;
        audio.load();
        
        updateTrackInfo(track);
    }

    // Fungsi untuk memperbarui informasi track yang sedang diputar
    function updateTrackInfo(track) {
        currentTrackTitle.textContent = track.title;
        currentTrackArtist.textContent = track.artist;
        // Pastikan cover selalu tersedia 
        trackThumb.style.backgroundImage = `url(${track.cover || './assets/images/fallback.svg'})`;
    }

    // Fungsi untuk memutar track
    function playTrack() {
        audio.play().catch(error => {
            console.error('Error memutar audio:', error);
            alert('Tidak dapat memutar lagu. Silakan coba lagu lain.');
        });
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        highlightCurrentTrack();
    }

    // Fungsi untuk menjeda track
    function pauseTrack() {
        audio.pause();
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }

    // Fungsi untuk memainkan track berikutnya
    function nextTrack() {
        currentTrackIndex++;
        loadTrack(currentTrackIndex);
        if (isPlaying) {
            playTrack();
        }
    }

    // Fungsi untuk memainkan track sebelumnya
    function prevTrack() {
        currentTrackIndex--;
        loadTrack(currentTrackIndex);
        if (isPlaying) {
            playTrack();
        }
    }

    // Fungsi untuk memperbarui progress bar
    function updateProgress() {
        const { duration, currentTime } = audio;
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
            
            // Update current time
            const currentMinutes = Math.floor(currentTime / 60);
            const currentSeconds = Math.floor(currentTime % 60);
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
            
            // Update total time
            const durationMinutes = Math.floor(duration / 60);
            const durationSeconds = Math.floor(duration % 60);
            totalTimeEl.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
        }
    }

    // Fungsi untuk mengatur progress ketika diklik
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        
        audio.currentTime = (clickX / width) * duration;
    }

    // Fungsi untuk menyorot track yang sedang diputar
    function highlightCurrentTrack() {
        const trackItems = document.querySelectorAll('.track-item');
        trackItems.forEach((item) => {
            const index = parseInt(item.getAttribute('data-index'));
            if (index === currentTrackIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Tambahkan hover effect untuk tombol-tombol
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.classList.add('hover');
        });
        button.addEventListener('mouseout', function() {
            this.classList.remove('hover');
        });
    });
    
    // Tampilkan pesan selamat datang jika tidak ada lagu yang dimuat
    if (!tracks || tracks.length === 0) {
        const playlistContainer = document.getElementById('playlist-container');
        if (playlistContainer) {
            playlistContainer.innerHTML = `
                <div class="loading-indicator">
                    <i class="fas fa-music"></i>
                    <p>Selamat datang di Mysic!</p>
                    <p class="small">Cari lagu favorit Anda atau tunggu sebentar untuk melihat lagu populer</p>
                </div>
            `;
        }
    }
}); 