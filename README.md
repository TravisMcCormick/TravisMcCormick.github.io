# Travis McCormick - Portfolio Website

Professional portfolio website for Travis McCormick, Embedded Cybersecurity Engineer.

## 🌐 Live Site

Visit the site at: [https://travismccormick.github.io](https://travismccormick.github.io)

## ✨ Features

- **Multi-page design** with smooth navigation
- **Dark/Light mode toggle** with persistent theme preference
- **Responsive design** that works on all devices
- **Professional blue color scheme**
- **Four main sections:**
  - Home/About
  - Projects showcase
  - Interactive resume with PDF download
  - Easy-access contact page

## 🎨 Customization

### Add Your Personal Bio

Edit the "About Me" section in `index.html` (around line 49-56) to add your personalized content.

### Add Resume PDF

1. Create or export your resume as a PDF
2. Name it `resume.pdf`
3. Place it in the root directory of this repository
4. The download button on the resume page will automatically link to it

### Contact Form Setup

The contact form uses Formspree for easy form handling:

1. Sign up at [Formspree](https://formspree.io)
2. Create a new form and get your form ID
3. In `contact.html`, replace `YOUR_FORM_ID` on line 68 with your actual Formspree form ID:
   ```html
   <form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

Alternatively, you can remove the form and keep just the contact information.

## 🚀 Deployment to GitHub Pages

1. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" in the sidebar
   - Under "Source", select "Deploy from a branch"
   - Select the `main` branch and `/ (root)` folder
   - Click Save

2. **Your site will be live at:**
   ```
   https://travismccormick.github.io
   ```

3. **Wait a few minutes** for the initial deployment to complete

## 🛠️ Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- Vanilla JavaScript
- Font Awesome Icons
- No build process required - pure static site

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🎯 Project Structure

```
.
├── index.html          # Home page with hero and about section
├── projects.html       # Projects showcase
├── resume.html         # Interactive resume
├── contact.html        # Contact information and form
├── styles.css          # All styling with light/dark themes
├── script.js           # Interactive features
├── resume.pdf          # Your resume PDF (to be added)
└── README.md           # This file
```

## 📝 To-Do

- [ ] Add personalized bio in the About Me section
- [ ] Add resume.pdf file to root directory
- [ ] Set up Formspree for contact form (optional)
- [ ] Add professional headshot/photo (optional)
- [ ] Customize colors if desired (edit CSS variables in styles.css)

## 📄 License

© 2025 Travis McCormick. All rights reserved.

---

**Need help?** Feel free to open an issue or reach out!
