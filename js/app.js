(() => {
  // Toggle navigation menu and hamburger menu

  // Close hamburger menu when a menu item is selected
  const setupNavLinks = () => {
    const navLinks = document.querySelectorAll(".li");
    navLinks.forEach((link) => {
      link.addEventListener("click", toggleNav);
    });

    const sections = {
      "nav-projects": "projects",
      "nav-education": "education",
    };

    for (const [navId, sectionId] of Object.entries(sections)) {
      document
        .getElementById(navId)
        .addEventListener("click", () => scrollToSection(sectionId));
    }
  };

  // Scroll to the target section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      console.log(`Scrolling to section: ${sectionId}`);
      section.scrollIntoView({ behavior: "smooth" });
      triggerSectionAnimation(sectionId);
    } else {
      console.log(`Section not found: ${sectionId}`);
    }
  };

  // Typing animation for animated text
  const startTypingAnimation = () => {
    const animatedText = document.getElementById("animatedText");
    const textToType = "Full Stack Developer";
    const typingDuration = 3000;
    const typingSpeed = typingDuration / textToType.length;

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

  const startAllAnimations = () => {
    const nav = document.querySelector(".nav");
    const indicator = document.querySelector(".indicator");

    setTimeout(() => {
      nav.classList.add("fade-in");
      nav.style.display = "flex";
      indicator.style.display = "block";
    }, 4000);
  };

  const triggerSectionAnimation = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.classList.add("container-fade-in");
      section.style.display = "block";
      checkScroll();
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    startAllAnimations();
    startTypingAnimation();
    setupNavLinks();
    populateCountryCodes();

    const scrollTopBtn = document.getElementById("scrollTopBtn");
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  const isElementInViewport = (elem) => {
    const rect = elem.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const checkScroll = () => {
    const sections = document.querySelectorAll(".container-fade-in");
    sections.forEach((section) => {
      if (isElementInViewport(section)) {
        section.classList.add("container-visible");
      }
    });
  };

  window.addEventListener("scroll", () => {
    checkScroll();

    const scrollTopBtn = document.getElementById("scrollTopBtn");
    const nav = document.querySelector(".nav");
    const downloadCV = document.querySelector(".DownloadCV");

    if (window.scrollY > 20) {
      scrollTopBtn.style.display = "block";
      nav.style.display = "none";
      downloadCV.style.display = "flex";
    } else {
      scrollTopBtn.style.display = "none";
      nav.style.display = "flex";
      downloadCV.style.display = "none";
    }
  });

  const populateCountryCodes = () => {
    const countryCodeSelect = document.getElementById("countryCode");

    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        sortedCountries.forEach((country) => {
          const option = document.createElement("option");
          option.value = `${country.idd.root}${
            country.idd.suffixes ? country.idd.suffixes[0] : ""
          }`;
          option.textContent = `${country.flag} ${country.name.common} ${option.value}`;
          countryCodeSelect.appendChild(option);
        });
      })
      .catch((error) => console.error("Error fetching country codes:", error));
  };

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


  document
  .getElementById("see-more-btn")
  .addEventListener("click", function () {
    const extraCards = document.querySelectorAll(".extra");
    const projects = document.querySelector(".projects");
    const spanElement = document.querySelector(".spn2");


    // Toggle display of extra cards
    extraCards.forEach((card) => {
      card.style.display = card.style.display === "flex" ? "none" : "flex";
    });

    // Change the text inside the .spn2 span element
    if (spanElement.textContent === "See More") {
      spanElement.textContent = "See Less Projects"; // Update to "See Less"
      
      // Add margin-top to the .projects container when extra projects are shown
      projects.style.marginTop = "10%";
      projects.style.marginBottom = "10%";
      projects.style.height = "100vh";
    } else {
      spanElement.textContent = "See More"; // Revert back to "See More"
      
      // Reset margin-top to its original value
      projects.style.marginTop = "3%";
      projects.style.height = "80vh";

    }
  });


})();
