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

  // Toggles the visibility of additional projects
  const setupProjectToggle = () => {
    const seeMoreBtn = document.getElementById("see-more-btn");

    if (seeMoreBtn) {
      seeMoreBtn.addEventListener("click", () => {
        const extraCards = document.querySelectorAll(".extra");
        const spanElement = document.querySelector(".spn2");

        const isExpanded = spanElement.textContent === "See Less Projects";
        extraCards.forEach((card) => {
          card.style.display = isExpanded ? "none" : "flex";
        });

        spanElement.textContent = isExpanded ? "See More" : "See Less Projects";
      });
    }
  };

  // Initialization
  document.addEventListener("DOMContentLoaded", () => {
    setupNavLinks();
    startTypingAnimation();
    setupScrollBehavior();
    startAllAnimations();
    populateCountryCodes();
    setupProjectToggle();
  });
})();
