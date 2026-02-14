// 1. Data Definitions
const recommendedData = [
    { title: "Peaceful Piano", artist: "Relaxing Melodies", img: "https://images.unsplash.com/photo-1453733190371-0a9bedd82893?w=300&h=300&fit=crop" },
    { title: "Deep Focus", artist: "Ambient Beats", img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop" },
    { title: "Morning Coffee", artist: "Jazz Vibes", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop" }
];

const trendingData = [
    { title: "Solitude", artist: "Diaries Of A Hero", img: "assets/solitude.jfif" },
    { title: "Starboy", artist: "The Weeknd", img: "assets/starboy.jfif" },
    { title: "Blinding Lights", artist: "The Weeknd", img: "assets/blind.jfif" },
    { title: "Hungry Cheetah", artist: "Thaman", img: "assets/og.jfif" },
    { title: "Save Your Tears", artist: "The Weeknd", img: "assets/save your tears.jfif" }
];

const artistData = [
    { title: "The Weeknd", artist: "Artist", img: "assets/starboy.jfif" },
    { title: "Thaman", artist: "Artist", img: "assets/thaman.jfif" },
    { title: "M83", artist: "Artist", img: "assets/drake.jfif" }
];

// 2. State Management
let isPlaying = false;

// 3. Core Functions

/**
 * Populates the grids with cards
 * @param {Array} data - The array of objects to display
 * @param {String} containerId - The ID of the HTML container
 * @param {String} type - 'song' or 'artist' (changes styling)
 */
function loadCards(data, containerId, type = 'song') {
    const container = document.getElementById(containerId);
    if (!container) return; // Guard clause if container doesn't exist

    container.innerHTML = data.map(item => `
        <div class="card ${type === 'artist' ? 'artist' : ''}" onclick="playSong('${item.title.replace(/'/g, "\\'")}', '${item.artist.replace(/'/g, "\\'")}', '${item.img}')">
            <div class="img-container">
                <img src="${item.img}" alt="${item.title}">
                <div class="play-btn"><i class="fas fa-play"></i></div>
            </div>
            <div class="card-title" style="font-weight:700; margin-top:12px; margin-bottom:4px;">${item.title}</div>
            <div class="card-artist" style="color:#b3b3b3; font-size:14px;">${item.artist}</div>
        </div>
    `).join('');
}

/**
 * Updates the player bar and handles play state
 */
function playSong(title, artist, img) {
    // Update labels
    document.getElementById('p-title').innerText = title;
    document.getElementById('p-artist').innerText = artist;
    
    // Update image in player
    const playerImg = document.getElementById('p-art');
    if (playerImg) playerImg.src = img;

    // Force Play State
    const playBtn = document.getElementById('playBtn');
    playBtn.classList.replace('fa-play-circle', 'fa-pause-circle');
    isPlaying = true;

    console.log(`Now playing: ${title} by ${artist}`);
}

// 4. Event Listeners & UI Logic

// Play/Pause Button Toggle (Manual)
const playBtn = document.getElementById('playBtn');
playBtn.addEventListener('click', () => {
    if(!isPlaying) {
        playBtn.classList.replace('fa-play-circle', 'fa-pause-circle');
        isPlaying = true;
    } else {
        playBtn.classList.replace('fa-pause-circle', 'fa-play-circle');
        isPlaying = false;
    }
});

// User Dropdown Logic
const userBtn = document.getElementById('userBtn');
const userMenu = document.getElementById('userMenu');

userBtn.onclick = (e) => {
    e.stopPropagation();
    userMenu.style.display = (userMenu.style.display === 'block') ? 'none' : 'block';
};

// Scroll Effect for Header
const scrollContainer = document.getElementById('scroll-container');
const header = document.getElementById('header');

scrollContainer.onscroll = () => {
    if (scrollContainer.scrollTop > 50) {
        header.style.backgroundColor = "rgba(7, 7, 7, 0.95)";
    } else {
        header.style.backgroundColor = "transparent";
    }
};

// Global click to close dropdowns
window.onclick = () => {
    userMenu.style.display = 'none';
};

// 5. Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    // Load the Recommended Section (merged from Code 1)
    loadCards(recommendedData, 'album-list');
    
    // Load Trending Section
    loadCards(trendingData, 'trending-songs');
    
    // Load Artist Section
    loadCards(artistData, 'popular-artists', 'artist');
    
    // Load Radio Section (using trending data as placeholder)
    loadCards(trendingData, 'popular-radio');
});