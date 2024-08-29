// Toggle navigation menu and hamburger menu
function toggleNav() {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.hamburger');
  nav.classList.toggle('active');
  hamburger.classList.toggle('active');
}

// Close hamburger menu when a menu item is selected
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.li');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleNav();
    });
  });

  // Add event listeners to navigation items
  document.getElementById('nav-home').addEventListener('click', () => scrollToSection('home'));
  document.getElementById('nav-aboutme').addEventListener('click', () => scrollToSection('aboutme'));
  document.getElementById('nav-projects').addEventListener('click', () => scrollToSection('projects'));
  document.getElementById('nav-experiences').addEventListener('click', () => scrollToSection('experiences'));
  document.getElementById('nav-education').addEventListener('click', () => scrollToSection('education'));
  document.getElementById('nav-hire').addEventListener('click', () => scrollToSection('hire'));
});

// Scroll to the target section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    console.log(`Scrolling to section: ${sectionId}`);
    section.scrollIntoView({ behavior: 'smooth' });
  } else {
    console.log(`Section not found: ${sectionId}`);
  }
}

// Show/hide scroll to top button
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

// Scroll to top when button is clicked
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Validate form inputs
function validateForm() {
  let isValid = true;

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const phoneError = document.getElementById('phoneError');
  const messageError = document.getElementById('messageError');

  nameError.textContent = '';
  emailError.textContent = '';
  phoneError.textContent = '';
  messageError.textContent = '';

  if (name.trim() === '') {
    nameError.textContent = 'Name is required.';
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    emailError.textContent = 'Invalid email address.';
    isValid = false;
  }

  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(phone)) {
    phoneError.textContent = 'Phone number must be 10 digits.';
    isValid = false;
  }

  if (message.trim() === '') {
    messageError.textContent = 'Message is required.';
    isValid = false;
  }

  return isValid;
}

// Populate country code select box
document.addEventListener('DOMContentLoaded', () => {
  const countryCodeSelect = document.getElementById('countryCode');

  fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
      const sortedData = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      sortedData.forEach(country => {
        const option = document.createElement('option');
        option.value = `${country.idd.root}${country.idd.suffixes ? country.idd.suffixes[0] : ''}`;
        option.textContent = `${country.flag} ${country.name.common} ${option.value}`;
        countryCodeSelect.appendChild(option);
      });
    })
    .catch(error => console.error('Error fetching country codes:', error));

  // Add keydown event listener to filter options
  countryCodeSelect.addEventListener('keydown', (event) => {
    const char = String.fromCharCode(event.keyCode).toLowerCase();
    const options = Array.from(countryCodeSelect.options);
    
    for (let i = 0; i < options.length; i++) {
      if (options[i].textContent.toLowerCase().startsWith(char)) {
        countryCodeSelect.selectedIndex = i;
        break;
      }
    }
  });
});
