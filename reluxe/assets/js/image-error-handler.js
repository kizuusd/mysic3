// Script untuk menangani error loading gambar
document.addEventListener('DOMContentLoaded', function() {
    // Tangani semua error gambar
    document.querySelectorAll('img').forEach(img => {
        img.onerror = function() {
            console.warn('Failed to load image:', img.src);
            // Ganti dengan gambar placeholder
            img.src = './assets/images/fallback.svg';
        };
    });

    // Tangani background image yang gagal load
    function checkBackgroundImages() {
        document.querySelectorAll('.track-cover, .track-thumb').forEach(el => {
            // Tambahkan fallback untuk background-image yang gagal
            const backgroundImage = window.getComputedStyle(el).backgroundImage;
            if (backgroundImage === 'none' || backgroundImage.includes('undefined')) {
                console.warn('Failed to load background image for element:', el);
                el.style.backgroundImage = 'url("./assets/images/fallback.svg")';
            }
        });
    }
    
    // Cek setelah konten dimuat dan lagi setelah beberapa detik
    checkBackgroundImages();
    setTimeout(checkBackgroundImages, 1000);
    setTimeout(checkBackgroundImages, 3000);
}); 