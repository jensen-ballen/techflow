# 🚀 TechFlow - Modern Web Template

> A modern, responsive full-stack web template with a beautiful UI/UX, dark mode, and professional architecture.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)

---

## ✨ Features

### Frontend
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Dark Mode** - Toggle between light/dark themes (persists in localStorage)
- **Smooth Animations** - Scroll reveals, hover effects, micro-interactions
- **Modular Architecture** - Organized CSS and JavaScript with ES6 modules
- **Contact Form** - Real-time validation, simulated API, localStorage persistence
- **Modern UI** - Clean design with gradient accents and professional typography

---

## 📁 Project Structure

```
techflow/
├── index.html                    # Main HTML file
├── styles/                       # CSS files
│   ├── main.css                 # Core styles, variables, components
│   ├── components.css           # Reusable UI components
│   ├── animations.css           # Keyframe animations
│   └── responsive.css           # Media queries
├── scripts/                     # JavaScript modules
│   ├── app.js                  # Application entry point
│   ├── components/
│   │   ├── Navbar.js           # Navigation component
│   │   ├── Services.js        # Services section
│   │   ├── ContactForm.js     # Form with validation & simulation
│   │   └── ThemeToggle.js     # Dark mode toggle
│   ├── utils/
│   │   └── animations.js       # Scroll animations
│   └── data/
│       └── services.js         # Services data
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

---

## 🛠️ Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [PostgreSQL](https://www.postgresql.org/) (v14+)
- [Visual Studio Code](https://code.visualstudio.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/jensen-ballen/techflow.git
cd techflow
```

### 2. Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and sign in
3. Click "Add New Project" → "Import Git Repository"
4. Select your repository and click "Deploy"

**That's it!** 🎉 Your site will be live at `https://your-project.vercel.app`

### 3. Local Development

**Using Live Server (Recommended)**
1. Install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code
2. Right-click `index.html` → "Open with Live Server"
3. Open `http://127.0.0.1:5500`

**Using Python**
```bash
python -m http.server 8000
# Open http://localhost:8000
```
1. Install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
2. Right-click `index.html` → Open with Live Server
3. Open `http://127.0.0.1:5500`

**Option B: Python**
```bash
python -m http.server 8000
# Open http://localhost:8000
```

---

## 🎨 Customization

### Changing Colors

Edit CSS variables in `styles/main.css`:

```css
:root {
    --primary: #6366f1;      /* Main brand color */
    --secondary: #f472b6;    /* Secondary color */
    --accent: #22d3ee;       /* Accent color */
}
```

### Adding Services

Edit `scripts/data/services.js`:

```javascript
export const servicesData = [
    {
        id: 7,
        title: 'New Service',
        description: 'Description here',
        icon: '<svg-path>'
    }
];
```

---

## 🔧 Technologies

- **HTML5** - Semantic markup
- **CSS3** - Variables, Grid, Flexbox, Animations
- **JavaScript** - ES6+, Modules, Async/Await, localStorage
- **Vercel** - Static site hosting

---

## 📄 License

MIT License - Feel free to use this project for your own purposes.

---

<div align="center">

Made with ❤️ by [Jensen Ballen](https://github.com/jensen-ballen)

</div>