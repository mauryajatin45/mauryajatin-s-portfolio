function toggleNav() {
  var nav = document.querySelector('.nav');
  var hamburger = document.querySelector('.hamburger');
  nav.classList.toggle('active');
  hamburger.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
  let isScrolling;

  window.addEventListener('scroll', () => {
    document.body.classList.add('scrolling');

    // Clear our timeout throughout the scroll
    window.clearTimeout(isScrolling);

    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(() => {
      document.body.classList.remove('scrolling');
    }, 500);
  });

  // Function to scroll to the target element
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      console.log(`Scrolling to section: ${sectionId}`);
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log(`Section not found: ${sectionId}`);
    }
  }

  // Adding event listeners to navigation items
  document.getElementById('nav-home').addEventListener('click', function () {
    console.log('Home clicked');
    scrollToSection('home');
  });

  document.getElementById('nav-about').addEventListener('click', function () {
    console.log('About clicked');
    scrollToSection('aboutme');
  });

  document.getElementById('nav-projects').addEventListener('click', function () {
    console.log('Projects clicked');
    scrollToSection('projects');
  });

  document.getElementById('nav-experiences').addEventListener('click', function () {
    console.log('Experiences clicked');
    scrollToSection('experiences');
  });

  document.getElementById('nav-education').addEventListener('click', function () {
    console.log('Education clicked');
    scrollToSection('education');
  });
});
// Get the button
let scrollTopBtn = document.getElementById("scrollTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};

// When the user clicks on the button, scroll to the top of the document
scrollTopBtn.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

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
