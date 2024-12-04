window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY;
    var contentContainer = document.querySelector('.content-container');
    var maxScroll = window.innerHeight;
    
    if (scrollPosition <= maxScroll) {
        var progress = scrollPosition / maxScroll;
        var translateY = (1 - progress) * 100;
        var scale = 0.9 + (0.1 * progress);
        var width = 90 + (10 * progress);
        
        contentContainer.style.transform = `translateY(${translateY}%) scale(${scale})`;
        contentContainer.style.width = `${width}%`;
    } else {
        contentContainer.style.transform = 'translateY(0) scale(1)';
        contentContainer.style.width = '100%';
    }
});

//this is for 3rd page
let currentIndex = 0;
const scrollContainer = document.querySelector('.gallery-scroll');
const images = scrollContainer.querySelectorAll('img');
const totalImages = images.length;

function updateGallery() {
for (let i = 0; i < totalImages; i++) {
if (i >= currentIndex && i < currentIndex + 3) {
    images[i].style.display = 'block';
} else {
    images[i].style.display = 'none';
}
}
}

document.querySelector('.left-arrow').addEventListener('click', () => {
if (currentIndex > 0) {
currentIndex--;
updateGallery();
}
});

document.querySelector('.right-arrow').addEventListener('click', () => {
if (currentIndex < totalImages - 3) {
currentIndex++;
updateGallery();
}
});

// Initial update
updateGallery()

// for 7th page


// Merchandise items
const merchItems = [
{ background: '#FFB6C1', productImage: 'pink tshirt.png', backgroundImage: 'pink tee bck.png' },
{ background: '#FFA500', productImage: 'yellow tshirt.png', backgroundImage: 'yellow tee bck.png' },
{ background: '#90EE90', productImage: 'cap mockup.png', backgroundImage: 'blue cap bck.png' },
{ background: '#ADD8E6', productImage: 'black hoodie.png', backgroundImage: 'black hoodie bck.png' }
];

let currentMerchIndex = 0;
const merchSlide = document.querySelector('.merchandise-slide');
let isAnimating = false;
let autoScrollInterval;

function updateMerchandise(direction) {
if (isAnimating) return;
isAnimating = true;

currentMerchIndex = (currentMerchIndex + (direction === 'next' ? 1 : -1) + merchItems.length) % merchItems.length;

const newItem = merchItems[currentMerchIndex];

// Create new content
const newContent = document.createElement('div');
newContent.className = 'merch-content';
newContent.style.cssText = `
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
position: absolute;
top: 0;
left: ${direction === 'next' ? '100%' : '-100%'};
transition: left 0.5s ease;
`;

// Create background div
const backgroundDiv = document.createElement('div');
backgroundDiv.style.cssText = `
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-image: url('${newItem.backgroundImage}');
background-size: cover;
background-position: center;
opacity: 0;
transition: opacity 0.5s ease;
`;
newContent.appendChild(backgroundDiv);

const newImage = document.createElement('img');
newImage.src = newItem.productImage;
newImage.alt = "Product";
newImage.style.cssText = `
max-width: 60%;
max-height: 80%;
object-fit: contain;
position: relative;
z-index: 1;
`;

newContent.appendChild(newImage);
merchSlide.appendChild(newContent);

// Change background color immediately
merchSlide.style.backgroundColor = newItem.background;

// Trigger reflow
void merchSlide.offsetWidth;

// Slide in new content
newContent.style.left = '0';
setTimeout(() => {
backgroundDiv.style.opacity = '1';
}, 250); // Delay background fade-in for smoother transition

// Slide out old content
const oldContent = merchSlide.querySelector('.merch-content:not(:last-child)');
if (oldContent) {
oldContent.style.left = direction === 'next' ? '-100%' : '100%';
const oldBackground = oldContent.querySelector('div');
if (oldBackground) {
    oldBackground.style.opacity = '0';
}
}

// Cleanup after animation
setTimeout(() => {
if (oldContent) {
    oldContent.remove();
}
isAnimating = false;
}, 500);

// Restart the auto-scroll timer
clearInterval(autoScrollInterval);
startAutoScroll();
}

function startAutoScroll() {
autoScrollInterval = setInterval(() => {
updateMerchandise('next');
}, 4000); // Scroll every 4 seconds
}

function addArrowListeners() {
document.querySelector('.left-merch-arrow').addEventListener('click', () => {
updateMerchandise('prev');
// Temporarily pause auto-scroll on manual navigation
clearInterval(autoScrollInterval);
setTimeout(startAutoScroll, 5000); // Resume auto-scroll after 5 seconds
});
document.querySelector('.right-merch-arrow').addEventListener('click', () => {
updateMerchandise('next');
// Temporarily pause auto-scroll on manual navigation
clearInterval(autoScrollInterval);
setTimeout(startAutoScroll, 5000); // Resume auto-scroll after 5 seconds
});
}

function initialMerchandiseSetup() {
const currentItem = merchItems[currentMerchIndex];
merchSlide.innerHTML = `
<div class="merch-content" style="
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
">
    <div style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('${currentItem.backgroundImage}');
        background-size: cover;
        background-position: center;
    "></div>
    <img src="${currentItem.productImage}" alt="Product" style="
        max-width: 60%;
        max-height: 80%;
        object-fit: contain;
        position: relative;
        z-index: 1;
    ">
</div>
`;
merchSlide.style.backgroundColor = currentItem.background;

// Start auto-scrolling
startAutoScroll();
}

// Initialize the carousel
initialMerchandiseSetup();
addArrowListeners();

//for 8th page games

const gameImages = [
'alabay guard prev 2 1.png',
'alabay lost heritage prev 1.png',
// Add more image sources as needed
];

let currentImageIndex = 0;
let gameAutoScrollInterval;

function updateGameImage() {
currentImageIndex = (currentImageIndex + 1) % gameImages.length;
document.querySelector('.games-image').src = gameImages[currentImageIndex];
}

function startGameAutoScroll() {
gameAutoScrollInterval = setInterval(updateGameImage, 3000); // Auto-scroll every 3 seconds
}

function stopGameAutoScroll() {
clearInterval(gameAutoScrollInterval);
}

document.querySelector('.games-nav-arrow').addEventListener('click', function() {
updateGameImage();
// Restart the auto-scroll timer when manually navigated
stopGameAutoScroll();
startGameAutoScroll();
});

document.querySelector('.discover-games-btn').addEventListener('click', function() {
const detailedContent = document.querySelector('.detailed-game-content');
detailedContent.style.display = 'block';

// Show game info and preview immediately
const gameInfo = document.querySelector('.game-info');
const gamePreview = document.querySelector('.game-previews');
gameInfo.style.opacity = '1';
gamePreview.style.opacity = '1';

// Hide game features initially
const gameFeatures = document.querySelector('.game-features');
gameFeatures.style.opacity = '0';
gameFeatures.style.transform = 'translateY(50px)';

stopGameAutoScroll();
});

document.querySelector('.exit-btn').addEventListener('click', function() {
document.querySelector('.detailed-game-content').style.display = 'none';
startGameAutoScroll();
});

// Add scroll event listener to the detailed game content
document.querySelector('.detailed-game-content').addEventListener('scroll', function() {
const gameInfo = document.querySelector('.game-info');
const gamePreview = document.querySelector('.game-previews');
const gameFeatures = document.querySelector('.game-features');
const scrollPosition = this.scrollTop;
const triggerPosition = window.innerHeight / 2;

if (scrollPosition > triggerPosition) {
// Fade in game features
gameFeatures.style.opacity = '1';
gameFeatures.style.transform = 'translateY(0)';
gameFeatures.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

// Fade out game info and preview
gameInfo.style.opacity = '0.5';
gamePreview.style.opacity = '0.5';
gameInfo.style.transition = 'opacity 0.5s ease';
gamePreview.style.transition = 'opacity 0.5s ease';
} else {
// Fade out game features
gameFeatures.style.opacity = '0';
gameFeatures.style.transform = 'translateY(50px)';

// Fade in game info and preview
gameInfo.style.opacity = '1';
gamePreview.style.opacity = '1';
}
});

// Start the auto-scroll when the page loads
startGameAutoScroll();

// for 9th page
document.addEventListener('DOMContentLoaded', function() {
const featureCards = document.querySelectorAll('.feature-card');
let currentFeatureIndex = 0;

function rotateFeatures() {
featureCards.forEach((card, index) => {
    card.style.display = index >= currentFeatureIndex && index < currentFeatureIndex + 3 ? 'block' : 'none';
});
}

document.querySelector('.game-features-arrow').addEventListener('click', function() {
currentFeatureIndex = (currentFeatureIndex + 1) % (featureCards.length - 2);
rotateFeatures();
});

// Initial setup
rotateFeatures();
});