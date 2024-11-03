(() => {
  // Toggle navigation menu and hamburger menu
  const toggleNav = () => {
    const nav = document.querySelector('.nav');
    const hamburger = document.querySelector('.hamburger');
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
  };

  // Close hamburger menu when a menu item is selected
  const setupNavLinks = () => {
    const navLinks = document.querySelectorAll('.li');
    navLinks.forEach(link => {
      link.addEventListener('click', toggleNav);
    });

    const sections = {
      'nav-projects': 'projects',
      'nav-education': 'education'
    };

    for (const [navId, sectionId] of Object.entries(sections)) {
      document.getElementById(navId).addEventListener('click', () => scrollToSection(sectionId));
    }
  };

  // Scroll to the target section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      console.log(`Scrolling to section: ${sectionId}`);
      section.scrollIntoView({ behavior: 'smooth' });
      triggerSectionAnimation(sectionId); // Trigger animation when scrolling
    } else {
      console.log(`Section not found: ${sectionId}`);
    }
  };

  // Typing animation for animated text
  const startTypingAnimation = () => {
    const animatedText = document.getElementById('animatedText');
    const textToType = "Full Stack Developer";
    const typingDuration = 3000;
    const typingSpeed = typingDuration / textToType.length;

    animatedText.innerHTML = ""; // Start with an empty string
    animatedText.style.opacity = "1"; // Make the text visible

    let index = 0;

    const typeNextCharacter = () => {
      if (index < textToType.length) {
        animatedText.innerHTML += textToType.charAt(index);
        index++;
        setTimeout(typeNextCharacter, typingSpeed);
      } else {
        animatedText.classList.add('blink-caret'); // Add caret blinking after typing completes
      }
    };

    // Start typing after 1 second
    setTimeout(typeNextCharacter, 1000);
  };

  const startAllAnimations = () => {
    const nav = document.querySelector('.nav');
    const indicator = document.querySelector('.indicator');

    // Wait 4 seconds before applying the fade-in effect
    setTimeout(() => {
      nav.classList.add('fade-in'); // Add fade-in class to start the animation
      nav.style.display = 'flex'; // Ensure the nav is displayed
      indicator.style.display = 'block';
    }, 4000);
  };

  // Function to trigger section animation
  const triggerSectionAnimation = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.classList.add('container-fade-in'); // Add fade-in class
      section.style.display = 'block'; // Ensure the section is displayed
      checkScroll(); // Check scroll to potentially add visibility class
    }
  };

  // Ensure you call startAllAnimations once the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', () => {
    startAllAnimations();
    startTypingAnimation();
    setupNavLinks();
    populateCountryCodes();

    const scrollTopBtn = document.getElementById('scrollTopBtn');
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Function to check if an element is in the viewport
  const isElementInViewport = (elem) => {
    const rect = elem.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  // Function to add the visible class when scrolled into view
  const checkScroll = () => {
    const sections = document.querySelectorAll('.container-fade-in');
    sections.forEach(section => {
      if (isElementInViewport(section)) {
        section.classList.add('container-visible'); // Add visible class if in viewport
      }
    });
  };
  // Add event listener for scroll event
  window.addEventListener('scroll', () => {
    checkScroll();

    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const nav = document.querySelector('.nav');
    const downloadCV = document.querySelector('.DownloadCV');

    if (window.scrollY > 20) {
      scrollTopBtn.style.display = 'block';
      nav.style.display = 'none';
      downloadCV.style.display = 'flex';
    } else {
      scrollTopBtn.style.display = 'none';
      nav.style.display = 'flex';
      downloadCV.style.display = 'none';
    }
  });

  // Populate country code select box
  const populateCountryCodes = () => {
    const countryCodeSelect = document.getElementById('countryCode');

    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        sortedCountries.forEach(country => {
          const option = document.createElement('option');
          option.value = `${country.idd.root}${country.idd.suffixes ? country.idd.suffixes[0] : ''}`;
          option.textContent = `${country.flag} ${country.name.common} ${option.value}`;
          countryCodeSelect.appendChild(option);
        });
      })
      .catch(error => console.error('Error fetching country codes:', error));
  };

  // Filter country code options
  const filterCountryOptions = (event) => {
    const char = String.fromCharCode(event.keyCode).toLowerCase();
    const options = Array.from(event.target.options);

    options.some((option, index) => {
      if (option.textContent.toLowerCase().startsWith(char)) {
        event.target.selectedIndex = index;
        return true;
      }
      return false;
    });
  };

})();

const allCards = document.querySelector('.cards-container');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

// Update arrow visibility based on scroll position
function updateArrowVisibility() {
  const scrollWidth = allCards.scrollWidth;
  const clientWidth = allCards.clientWidth;

  leftArrow.style.display = allCards.scrollLeft > 0 ? 'block' : 'none';
  rightArrow.style.display = scrollWidth > clientWidth && allCards.scrollLeft < scrollWidth - clientWidth ? 'block' : 'none';
}

rightArrow.addEventListener('click', () => {
  allCards.scrollBy({ left: 300, behavior: 'smooth' });
  updateArrowVisibility();
});

leftArrow.addEventListener('click', () => {
  allCards.scrollBy({ left: -300, behavior: 'smooth' });
  updateArrowVisibility();
});

// Initial check for arrow visibility
updateArrowVisibility();
window.addEventListener('resize', updateArrowVisibility); // Update on window resize


// Prevent scrolling for the first 4 seconds
function preventScroll() {
  window.scrollTo(0, 0);
}

// Add event listener to prevent scrolling
window.addEventListener('scroll', preventScroll);

// Allow scrolling after 4 seconds
setTimeout(() => {
  window.removeEventListener('scroll', preventScroll);
}, 4000);
