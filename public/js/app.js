(() => {
  // Helper function: Checks if an element is in the viewport
  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom > 0 &&
      rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
      rect.right > 0
    );
  };

  // Smooth scroll to the top of the page
  const smoothScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Scrolls smoothly to a specific section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error(`Section with ID '${sectionId}' not found.`);
    }
  };

  // Adds 'container-visible' class to elements in the viewport
  const checkScroll = () => {
    const sections = document.querySelectorAll(".container-fade-in");
    sections.forEach((section) => {
      if (isElementInViewport(section)) {
        section.classList.add("container-visible");
      }
    });
  };

  // Toggles the display style of an element
  const toggleElementDisplay = (element, displayStyle) => {
    if (element) {
      element.style.display = displayStyle;
    }
  };

  // Sets up navigation links for smooth scrolling
  const setupNavLinks = () => {
    const sections = {
      "nav-home": "home",
      "nav-projects": "projects",
      "nav-education": "education",
      "nav-gallery": "gallery",
    };

    Object.entries(sections).forEach(([navId, sectionId]) => {
      const navElement = document.getElementById(navId);
      if (navElement) {
        navElement.addEventListener("click", () => scrollToSection(sectionId));
      }
    });
  };

  // Starts typing animation for a given text
  const startTypingAnimation = () => {
    const animatedText = document.getElementById("animatedText");
    const textToType = "Full Stack Developer";
    const typingSpeed = 3000 / textToType.length;

    animatedText.innerHTML = "";
    animatedText.style.opacity = "1";

    let index = 0;
    const typeNextCharacter = () => {
      if (index < textToType.length) {
        animatedText.innerHTML += textToType.charAt(index);
        index++;
        setTimeout(typeNextCharacter, typingSpeed);
      } else {
        animatedText.classList.add("blink-caret");
      }
    };

    setTimeout(typeNextCharacter, 1000);
  };

  // Sets up scroll behavior for navigation and scroll-to-top button
  const setupScrollBehavior = () => {
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    const nav = document.querySelector(".nav");
    const downloadCV = document.querySelector(".DownloadCV");

    window.addEventListener("scroll", () => {
      checkScroll();

      const isScrolled = window.scrollY > 20;
      toggleElementDisplay(scrollTopBtn, isScrolled ? "block" : "none");
      toggleElementDisplay(nav, isScrolled ? "none" : "flex");
      toggleElementDisplay(downloadCV, isScrolled ? "flex" : "none");
    });

    scrollTopBtn.addEventListener("click", smoothScrollToTop);
  };

  // Starts animations for navigation and indicator
  const startAllAnimations = () => {
    const nav = document.querySelector(".nav");
    const indicator = document.querySelector(".indicator");

    setTimeout(() => {
      nav.classList.add("fade-in");
      toggleElementDisplay(nav, "flex");
      toggleElementDisplay(indicator, "block");
    }, 4000);
  };

  // Dynamically populates country codes in a dropdown
  const populateCountryCodes = () => {
    const countryCodeSelect = document.getElementById("countryCode");

    fetch("https://countriesnow.space/api/v0.1/countries/codes")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          const sortedCountries = data.data
            .filter((country) => country.name && country.dial_code)
            .sort((a, b) => a.name.localeCompare(b.name));

          sortedCountries.forEach((country) => {
            const option = document.createElement("option");
            option.value = country.dial_code;
            option.textContent = `${country.name} (${country.dial_code})`;
            countryCodeSelect.appendChild(option);
          });
        } else {
          console.error("Invalid data format", data);
        }
      })
      .catch((error) => console.error("Error fetching country codes:", error));
  };
  
/// Function to fetch projects data from a JSON file
async function fetchProjects() {
  try {
    const response = await fetch('./project.json'); // Update the path to your JSON file
    const projects = await response.json();
    return projects;
  } catch (error) {
    console.error('Error fetching projects data:', error);
    return [];
  }
}

// Function to render cards dynamically
function renderCards(projects, category) {
  const container = document.getElementById("cards-container");
  container.innerHTML = ""; // Clear existing cards

  // Filter projects based on the category
  const filteredProjects = projects.filter(project => project.category === category);

  // Create and append cards
  filteredProjects.forEach(project => {
    const card = document.createElement("div");
    card.className = `card BuildWith${project.category}`;

    card.innerHTML = `
      <div class="card__corner"></div>
      <div class="card__img">
        <img loading="lazy" src="${project.image}" alt="${project.altText}" class="projectimg">
        <span class="card__span">${project.category}</span>
      </div>
      <div class="card-int">
        <p class="card-int__title">${project.title}</p>
        <p class="excerpt">${project.description}</p>
        <div class="button_setter">
          <a href="${project.links.liveDemo}" target="_blank">
            <button class="card-int__button card-int__button_live_demo">Live Demo</button>
          </a>
          <a href="${project.links.github}" target="_blank">
            <button class="card-int__button">Github</button>
          </a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Function to highlight the active tab
function highlightActiveTab(category) {
  document.querySelectorAll(".sorterDiv > div").forEach(tab => {
    if (tab.getAttribute("data-category") === category) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });
}

// Event listener for sorting
function setupSortButtons(projects) {
  document.querySelectorAll(".sorterDiv > div").forEach(sorter => {
    sorter.addEventListener("click", () => {
      const category = sorter.getAttribute("data-category");
      renderCards(projects, category);
      highlightActiveTab(category); // Highlight the active tab
    });
  });
}

// Initialize the projects section
async function initProjects() {
  const projects = await fetchProjects(); // Fetch data from JSON file
  const defaultCategory = "JavaScript"; // Default category
  renderCards(projects, defaultCategory); // Initial render with default category
  highlightActiveTab(defaultCategory); // Highlight the default active tab
  setupSortButtons(projects); // Setup sorting functionality
}

  // Initialization
  document.addEventListener("DOMContentLoaded", () => {
    setupNavLinks();
    startTypingAnimation();
    setupScrollBehavior();
    startAllAnimations();
    populateCountryCodes();
    // setupProjectToggle();
    initProjects();
  });
})();
