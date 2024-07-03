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
});
