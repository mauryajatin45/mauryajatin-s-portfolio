# Jatin Maurya's Portfolio Website

Welcome to the official portfolio website repository of **Jatin Maurya**, a passionate web developer and technology enthusiast. This portfolio showcases Jatin's skills, projects, technical expertise, and experience in web development.

---

## Project Overview

This project is a personal portfolio website designed to highlight Jatin Maurya's journey as a full stack web developer. It features a clean, responsive design with sections for skills, projects, experience, education, certifications, and contact information.

The website also includes a Certification Gallery showcasing various certificates, and proxies to several live project demos hosted externally.

---

## Features

- **Home Page:** Introduction with animated text and smooth navigation.
- **Technical Skills:** Categorized display of programming languages, frameworks, libraries, and developer tools.
- **About Me:** Detailed description of background, skills, and experience.
- **Projects:** Dynamic project cards loaded from JSON data with category filtering and links to live demos and GitHub repositories.
- **Experiences:** Internship and ambassador roles with descriptions.
- **Education:** Academic history with detailed descriptions.
- **Certification Gallery:** Separate gallery page with dynamic image loading and modal preview.
- **Contact Form:** Contact section with a form integrated via Formspree for easy communication.
- **Responsive Design:** Optimized for various devices and screen sizes.
- **Smooth Scrolling and Animations:** Enhanced user experience with smooth navigation and fade-in effects.

---

## Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript, FontAwesome, Google Fonts
- **Backend:** Node.js, Express.js
- **Proxy Middleware:** http-proxy-middleware for routing to external project demos
- **Form Handling:** Formspree for contact form submissions
- **Gallery:** Dynamic image loading with modal preview
- **Version Control:** Git and GitHub

---

## Project Structure

```
.
├── app.js                  # Express server with static serving and proxy middleware
├── package.json            # Project metadata and dependencies
├── README.md               # Project documentation
├── send_email.php          # PHP script for email handling (currently unused)
├── public/                 # Public assets and frontend files
│   ├── index.html          # Main portfolio HTML page
│   ├── project.json        # JSON data for projects
│   ├── css/                # CSS stylesheets
│   ├── js/                 # Frontend JavaScript files
│   └── images/             # Image assets
└── Certification Gallery/  # Separate certification gallery page and assets
    ├── index.html
    ├── css/
    ├── js/
    └── images/
```

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (Node package manager)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/mauryajatin45/mauryajatin-s-portfolio.git
cd mauryajatin-s-portfolio
```

2. Install dependencies:

```bash
npm install
```

### Running the Project

Start the Express server:

```bash
node app.js
```

The server will run on `http://localhost:3000`. Open this URL in your browser to view the portfolio website.

### Accessing Project Demos

The server proxies several project demos under the `/project` path:

- `/project/TypingTest`
- `/project/vlc`
- `/project/react/weather`
- `/project/react/lotteryGame`

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for improvements, bug fixes, or new features.

---

## Contact

- Email: mauryajatin45@gmail.com
- GitHub: [https://github.com/mauryajatin45](https://github.com/mauryajatin45)
- LinkedIn: [https://www.linkedin.com/in/mauryajatin/](https://www.linkedin.com/in/mauryajatin/)

---

## License

This project is licensed under the ISC License.

---

## Notes

- The contact form uses Formspree for handling submissions.
- The `send_email.php` script is present but currently not integrated with the frontend.
- The Certification Gallery is a separate page showcasing certificates with dynamic image loading.
