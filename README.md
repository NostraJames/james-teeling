# James Teeling - Personal Resume Website

A modern, responsive personal resume website built with HTML, CSS, and JavaScript. Inspired by professional portfolio designs.

## 🚀 Live Demo

Once deployed, your site will be available at: `https://yourusername.github.io/james-teeling`

## 📋 Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Scrolling**: Navigate between sections with elegant scroll effects
- **Interactive Elements**: Hover effects, animated skill bars, and dynamic navigation
- **Contact Form**: Ready-to-integrate contact form (backend setup required)
- **Project Showcase**: Display your portfolio projects with images and descriptions

## 🛠️ Setup Instructions

### Deploy to GitHub Pages

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll down to "Pages" section
   - Under "Source", select the `main` branch
   - Click "Save"
   - Your site will be live at `https://yourusername.github.io/james-teeling`

2. **Add Your Resume PDF**:
   - Place your resume PDF file in the `files/` directory
   - Name it `resume.pdf` (or update the link in `index.html`)

### Customize Your Content

Edit the `index.html` file to replace placeholder content:

1. **Personal Information** (About section):
   - Update your name, email, location
   - Modify the bio paragraph
   - Adjust skill levels and names

2. **Work Experience** (Resume section):
   - Replace company names, job titles, and dates
   - Update job descriptions

3. **Education**:
   - Add your degrees and schools

4. **Projects**:
   - Replace placeholder images
   - Update project titles, descriptions, and tags
   - Add links to live projects and GitHub repos

5. **Contact Information**:
   - Update email, phone, location
   - Add your social media links (GitHub, LinkedIn, Twitter)

### Customize Styling

Edit `styles.css` to match your personal brand:

```css
:root {
    --primary-color: #4A90E2;    /* Main brand color */
    --secondary-color: #50C878;  /* Accent color */
    --text-dark: #2C3E50;        /* Main text */
    --text-light: #7F8C8D;       /* Secondary text */
}
```

## 📁 File Structure

```
james-teeling/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript interactions
├── files/              # Directory for resume PDF
│   └── resume.pdf      # Your resume (add this)
└── README.md           # This file
```

## 🎨 Sections

- **Home**: Hero section with call-to-action buttons
- **About**: Profile information and skills
- **Resume**: Work experience and education timeline
- **Projects**: Portfolio showcase
- **Contact**: Contact information and form

## 📧 Contact Form Setup

The contact form currently shows an alert. To make it functional:

1. **Use a form service**:
   - [Formspree](https://formspree.io/)
   - [EmailJS](https://www.emailjs.com/)
   - [Netlify Forms](https://www.netlify.com/products/forms/)

2. **Update script.js**:
   - Uncomment and configure the fetch example
   - Add your form endpoint URL

## 📱 Responsive Breakpoints

- Desktop: > 968px
- Tablet: 768px - 968px
- Mobile: < 768px

## 🚀 Next Steps

1. Replace all placeholder content with your actual information
2. Add your resume PDF to the `files/` directory
3. Update project images (can use your own or services like Unsplash)
4. Customize colors to match your personal brand
5. Add your social media links
6. Configure the contact form with a backend service
7. Test on different devices
8. Deploy to GitHub Pages

## 📝 License

Feel free to use this template for your personal website!

## 🤝 Contributing

This is a personal project, but feel free to fork and customize for your own use.

---

**Built with HTML, CSS, and JavaScript** | Made by James Teeling
