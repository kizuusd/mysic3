// Deezer API Integration

// CORS Proxy untuk mengatasi masalah CORS saat mengakses API Deezer
const CORS_PROXY = 'https://corsproxy.io/?';
const DEEZER_API = 'https://api.deezer.com';

// Class untuk mengelola API Deezer
class DeezerAPI {
    constructor() {
        this.tracks = [];
        this.currentQuery = '';
    }

    // Mencari lagu berdasarkan query
    async searchTracks(query) {
        if (!query || query.trim() === '') {
            // Jika query kosong, gunakan chart
            return this.getTopTracks();
        }

        this.currentQuery = query;
        const url = `${CORS_PROXY}${DEEZER_API}/search?q=${encodeURIComponent(query)}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error.message || 'Error mengambil data dari Deezer');
            }
            
            // Transformasi data ke format yang dibutuhkan aplikasi
            this.tracks = data.data.map((track, index) => ({
                id: track.id,
                title: track.title,
                artist: track.artist.name,
                duration: this.formatDuration(track.duration),
                cover: track.album.cover_medium || './assets/images/fallback.svg',
                audioSrc: track.preview
            }));
            
            return this.tracks;
        } catch (error) {
            console.error('Error searching tracks:', error);
            return [];
        }
    }

    // Mendapatkan top tracks jika tidak ada query pencarian
    async getTopTracks() {
        const url = `${CORS_PROXY}${DEEZER_API}/chart/0/tracks`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error.message || 'Error mengambil data dari Deezer');
            }
            
            // Transformasi data ke format yang dibutuhkan aplikasi
            this.tracks = data.data.map((track, index) => ({
                id: track.id,
                title: track.title,
                artist: track.artist.name,
                duration: this.formatDuration(track.duration),
                cover: track.album.cover_medium || './assets/images/fallback.svg',
                audioSrc: track.preview
            }));
            
            return this.tracks;
        } catch (error) {
            console.error('Error fetching top tracks:', error);
            return [];
        }
    }

    // Format durasi dari detik ke format mm:ss
    formatDuration(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    // Mendapatkan detail lagu berdasarkan ID
    async getTrackById(id) {
        const track = this.tracks.find(t => t.id === id);
        if (track) return track;
        
        // Jika tidak ditemukan di cache, ambil dari API
        const url = `${CORS_PROXY}${DEEZER_API}/track/${id}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error.message || 'Error mengambil data lagu');
            }
            
            return {
                id: data.id,
                title: data.title,
                artist: data.artist.name,
                duration: this.formatDuration(data.duration),
                cover: data.album.cover_medium || './assets/images/fallback.svg',
                audioSrc: data.preview
            };
        } catch (error) {
            console.error('Error fetching track by ID:', error);
            return null;
        }
    }
}

// Inisialisasi Deezer API
const deezerAPI = new DeezerAPI();

// Mendapatkan elemen-elemen DOM untuk pencarian
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    // Memuat top tracks saat halaman dimuat
    deezerAPI.getTopTracks()
        .then(tracks => {
            if (typeof updatePlaylist === 'function') {
                updatePlaylist(tracks);
            }
        });
    
    // Event listener untuk tombol pencarian
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    // Event listener untuk input pencarian (saat Enter ditekan)
    if (searchInput) {
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Fungsi untuk melakukan pencarian
    function performSearch() {
        const query = searchInput.value.trim();
        
        // Tampilkan loading indicator
        const playlistContainer = document.getElementById('playlist-container');
        if (playlistContainer) {
            playlistContainer.innerHTML = `
                <div class="loading-indicator">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Mencari lagu "${query}"...</p>
                </div>
            `;
        }
        
        // Lakukan pencarian
        deezerAPI.searchTracks(query)
            .then(tracks => {
                if (typeof updatePlaylist === 'function') {
                    updatePlaylist(tracks);
                }
            });
    }
}); 