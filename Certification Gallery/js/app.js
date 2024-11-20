// Function to load images and create cards dynamically
async function loadImages() {
    try {
        // Fetch the JSON data containing image names, paths, and descriptions
        const response = await fetch('image-names.json'); // Adjust the path if needed
        const imageData = await response.json();

        // Get the card container where all cards will be inserted
        const cardContainer = document.getElementById('card-container');

        // Loop through each image in the JSON data
        for (const [imageName, data] of Object.entries(imageData)) {
            // Create a div for each card
            const card = document.createElement('div');
            card.classList.add('card');

            // Create the image element
            const img = document.createElement('img');
            img.src = data.value;  // Set the image source from the value
            img.alt = imageName;    // Set the alt text to image name

            // Create the content container for title and description
            const content = document.createElement('div');
            content.classList.add('card__content');

            // Create the title element and set its text to image name
            const title = document.createElement('p');
            title.classList.add('card__title');
            title.textContent = imageName;  // Display image name as title

            // Create the description element and set its text
            const description = document.createElement('p');
            description.classList.add('card__description');
            description.textContent = data.description;  // Fetch description from the JSON data

            // Create maximize button
            const maximizeBtn = document.createElement('button');
            maximizeBtn.classList.add('maximize-btn');
            maximizeBtn.textContent = 'Maximize';
            maximizeBtn.onclick = () => openModal(img.src, imageName);

            // Append title, description, maximize button, and image to content and card elements
            content.appendChild(title);
            content.appendChild(description);
            content.appendChild(maximizeBtn);
            card.appendChild(img);
            card.appendChild(content);

            // Append the card to the card container
            cardContainer.appendChild(card);
        }
    } catch (error) {
        console.error('Error loading images:', error);
    }
}

// Function to open the modal with the expanded image
function openModal(imageSrc, imageName) {
    // Get the modal and modal content
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');

    // Set the image source and caption
    modalImg.src = imageSrc;
    modalCaption.textContent = imageName;

    // Display the modal
    modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
    // Hide the modal
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// Call the loadImages function when the page loads
window.onload = loadImages;

// Close modal when the user clicks outside of the modal
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
};
