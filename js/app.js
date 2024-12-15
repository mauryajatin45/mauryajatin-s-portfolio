(() => {
  // Utility Functions
  const isElementInViewport = (elem) => {
    const rect = elem.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const smoothScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error(`Section with ID '${sectionId}' not found.`);
    }
  };

  const checkScroll = () => {
    const sections = document.querySelectorAll(".container-fade-in");
    sections.forEach((section) => {
      if (isElementInViewport(section)) {
        section.classList.add("container-visible");
      }
    });
  };

  const toggleElementDisplay = (element, displayStyle) => {
    if (element) {
      element.style.display = displayStyle;
    }
  };

  // Navigation and Scroll Setup
  const setupNavLinks = () => {
    const navLinks = document.querySelectorAll(".navclass");

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        console.log("Navigation toggled");
      });
    });

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

  // Typing Animation Setup
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

  // Section Visibility and Scroll-to-Top Button
  const setupScrollBehavior = () => {
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    const nav = document.querySelector(".nav");
    const downloadCV = document.querySelector(".DownloadCV");

    window.addEventListener("scroll", () => {
      checkScroll();

      if (window.scrollY > 20) {
        toggleElementDisplay(scrollTopBtn, "block");
        toggleElementDisplay(nav, "none");
        toggleElementDisplay(downloadCV, "flex");
      } else {
        toggleElementDisplay(scrollTopBtn, "none");
        toggleElementDisplay(nav, "flex");
        toggleElementDisplay(downloadCV, "none");
      }
    });

    scrollTopBtn.addEventListener("click", smoothScrollToTop);
  };

  // Animations Setup
  const startAllAnimations = () => {
    const nav = document.querySelector(".nav");
    const indicator = document.querySelector(".indicator");

    setTimeout(() => {
      nav.classList.add("fade-in");
      toggleElementDisplay(nav, "flex");
      toggleElementDisplay(indicator, "block");
    }, 4000);
  };

  // Dynamic Country Code Population
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

  // Project Toggle (See More/Less)
  const setupProjectToggle = () => {
    const seeMoreBtn = document.getElementById("see-more-btn");
    seeMoreBtn.addEventListener("click", () => {
      const extraCards = document.querySelectorAll(".extra");
      const projects = document.querySelector(".projects");
      const spanElement = document.querySelector(".spn2");

      const isExpanded = spanElement.textContent === "See Less Projects";

      extraCards.forEach((card) => {
        card.style.display = isExpanded ? "none" : "flex";
      });

      spanElement.textContent = isExpanded ? "See More" : "See Less Projects";
      projects.style.marginTop = isExpanded ? "3%" : "10%";
      projects.style.marginBottom = isExpanded ? "0" : "10%";
      projects.style.height = isExpanded ? "80vh" : "100vh";
    });
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
