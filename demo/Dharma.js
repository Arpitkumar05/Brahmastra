document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navBar = document.getElementById("nav-bar");

  hamburger.addEventListener("click", () => {
    navBar.classList.toggle("active");
  });

  // Flipping Book Functionality
  const pages = document.querySelectorAll('.page');
  let currentPage = -1; // Start with the book closed

  function initializePages() {
    pages.forEach((page, index) => {
      if (index < currentPage) {
        page.style.transform = 'rotateY(-180deg)';
        page.style.zIndex = pages.length - index; // Ensure flipped pages stack correctly
      } else if (index === currentPage) {
        page.style.transform = 'rotateY(0deg)';
        page.style.zIndex = pages.length; // Topmost page
      } else {
        page.style.transform = 'rotateY(0deg)';
        page.style.zIndex = pages.length - index - 1; // Stack unflipped pages correctly
      }
    });
  }

  function flipToNextPage() {
    if (currentPage < pages.length - 1) {
      if (currentPage >= 0) {
        pages[currentPage].style.transform = 'rotateY(-180deg)';
      }
      currentPage++;
      initializePages();
      updateNavigationButtons();
    }
  }

  function flipToPreviousPage() {
    if (currentPage > 0) {
      pages[currentPage].style.transform = 'rotateY(0deg)';
      currentPage--;
      initializePages();
      updateNavigationButtons();
    } else if (currentPage === 0) {
      // Fully close the book (back to the front cover)
      pages[currentPage].style.transform = 'rotateY(0deg)';
      currentPage = -1;
      initializePages();
      updateNavigationButtons();
    }
  }

  // Add event listeners for navigation
  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.style.position = 'absolute';
  nextButton.style.right = '29px';
  nextButton.style.bottom = '29px';
  nextButton.style.padding = '10px 20px';
  nextButton.style.background = 'linear-gradient(to right, #000000 0%, #53346D  51%, #000000  100%)';
  
  nextButton.style.color = '#fff';
  nextButton.style.border = 'none';
  nextButton.style.cursor = 'pointer';
  nextButton.style.transition = 'background 0.3s ease, color 0.3s ease';
  nextButton.addEventListener('mouseenter', () => {
    nextButton.style.background = '#de5207';
    nextButton.style.color = '#fff';
  });
  nextButton.addEventListener('mouseleave', () => {
    nextButton.style.background = 'linear-gradient(to right, #000000 0%, #53346D  51%, #000000  100%)';
    nextButton.style.color = '#fff';
  });
  nextButton.addEventListener('click', () => {
    flipToNextPage();
  });
  document.querySelector('.flipping-book').appendChild(nextButton);

  const prevButton = document.createElement('button');
  prevButton.textContent = 'Previous';
  prevButton.style.position = 'absolute';
  prevButton.style.left = '29px';
  prevButton.style.bottom = '29px';
  prevButton.style.padding = '10px 20px';
  prevButton.style.background = 'linear-gradient(to right, #000000 0%, #53346D  51%, #000000  100%)';
  prevButton.style.color = '#fff';
  prevButton.style.border = 'none';
  prevButton.style.cursor = 'pointer';
  prevButton.style.transition = 'background 0.3s ease, color 0.3s ease';
  prevButton.style.display = 'none'; // Initially hidden
  prevButton.addEventListener('mouseenter', () => {
    prevButton.style.background = '#de5207';
    prevButton.style.color = '#fff';
  });
  prevButton.addEventListener('mouseleave', () => {
    prevButton.style.background = 'linear-gradient(to right, #000000 0%, #53346D  51%, #000000  100%)';
    prevButton.style.color = '#fff';
  });
  prevButton.addEventListener('click', () => {
    flipToPreviousPage();
  });
  document.querySelector('.flipping-book').appendChild(prevButton);

  function updateNavigationButtons() {
    // Show "Previous" button only after the first page
    prevButton.style.display = currentPage > 0 ? 'block' : 'none';

    // Hide "Next" button on the last page
    nextButton.style.display = currentPage === pages.length - 1 ? 'none' : 'block';
  }

  // Initialize the flipping book on page load
  initializePages();
  updateNavigationButtons();
});
