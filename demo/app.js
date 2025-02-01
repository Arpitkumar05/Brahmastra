// SLIDER FUNCTIONALITY (Image Slider with Thumbnails)
const slider = document.querySelector('.slider');
const sliderList = slider.querySelector('.slider .list');
const thumbnail = document.querySelector('.slider .thumbnail');
const thumbnailItems = thumbnail.querySelectorAll('.item');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

// Ensure initial thumbnail setup
thumbnail.appendChild(thumbnailItems[0]);

// Handle Next Button Click
nextBtn.onclick = function () {
  moveSlider('next');
};

// Handle Previous Button Click
prevBtn.onclick = function () {
  moveSlider('prev');
};

// Function to move slider
function moveSlider(direction) {
  const sliderItems = sliderList.querySelectorAll('.item');
  const thumbnailItems = document.querySelectorAll('.thumbnail .item');

  if (direction === 'next') {
    sliderList.appendChild(sliderItems[0]); // Move first item to the end
    thumbnail.appendChild(thumbnailItems[0]); // Move first thumbnail to the end
    slider.classList.add('next');
  } else if (direction === 'prev') {
    sliderList.prepend(sliderItems[sliderItems.length - 1]); // Move last item to the front
    thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]); // Move last thumbnail to the front
    slider.classList.add('prev');
  }

  // Remove animation class after it finishes
  slider.addEventListener(
    'animationend',
    () => {
      slider.classList.remove('next', 'prev');
    },
    { once: true } // Remove event listener after one trigger
  );
}

// VIDEO FUNCTIONALITY (Switch Main Video)
const listVideo = document.querySelectorAll('.video-list .vid');
const mainVideo = document.querySelector('.main-video video');
const title5 = document.querySelector('.main-video .title5');

// Video click functionality
listVideo.forEach((video) => {
  video.onclick = () => {
    listVideo.forEach((vid) => vid.classList.remove('active')); // Remove active class
    video.classList.add('active'); // Add active class to clicked video
    if (video.classList.contains('active')) {
      const src = video.children[0].getAttribute('src');
      mainVideo.src = src; // Update main video source
      const text = video.children[1].innerHTML;
      title5.innerHTML = text; // Update title
    }
  };
});

// NAVIGATION MENU (Hamburger Menu)
const hamburger = document.getElementById('hamburger');
const navBar = document.getElementById('nav-bar');

hamburger.addEventListener('click', () => {
  navBar.classList.toggle('active');
});

// SLIDER FUNCTIONALITY (Video Carousel)
const videoTrack = document.querySelector('.video-track');
const slides = document.querySelectorAll('.video-slide');
const prevVideoBtn = document.querySelector('.prev-btn');
const nextVideoBtn = document.querySelector('.next-btn');

let currentIndex = 0;
const totalSlides = slides.length;
const visibleSlides = Math.floor(window.innerWidth / slides[0].offsetWidth); // Calculate visible slides dynamically
const slideWidth = slides[0].offsetWidth;

// Move to the next slide
function moveToNextSlide() {
  currentIndex++;
  if (currentIndex > totalSlides - visibleSlides) {
    currentIndex = 0; // Loop back to the first slide
  }
  updateVideoSliderPosition();
}

// Move to the previous slide
function moveToPrevSlide() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = totalSlides - visibleSlides; // Loop back to the last visible slide
  }
  updateVideoSliderPosition();
}

// Update the video slider position
function updateVideoSliderPosition() {
  const offset = -(currentIndex * slideWidth);
  videoTrack.style.transform = `translateX(${offset}px)`;
}

// Button Event Listeners
nextVideoBtn.addEventListener('click', moveToNextSlide);
prevVideoBtn.addEventListener('click', moveToPrevSlide);



// Recalculate visible slides on window resize
window.addEventListener('resize', () => {
  currentIndex = 0; // Reset current index
  updateVideoSliderPosition();
});
