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
