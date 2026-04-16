# 🚀 TechFlow - Modern Web Template

> A modern, responsive full-stack web template with a beautiful UI/UX, dark mode, and professional architecture.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)

---

## ✨ Features

### Frontend
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Dark Mode** - Toggle between light/dark themes (persists in localStorage)
- **Smooth Animations** - Scroll reveals, hover effects, micro-interactions
- **Modular Architecture** - Organized CSS and JavaScript with ES6 modules
- **Contact Form** - Real-time validation, auto-save drafts, offline support
- **Modern UI** - Clean design with gradient accents and professional typography

### Backend
- **RESTful API** - Clean endpoints with Express.js
- **Input Validation** - Server-side validation with express-validator
- **Database Integration** - PostgreSQL with connection pooling
- **Rate Limiting** - Protection against spam submissions
- **Error Handling** - Comprehensive error responses

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
│   │   ├── ContactForm.js     # Form with validation & API
│   │   └── ThemeToggle.js     # Dark mode toggle
│   ├── utils/
│   │   └── animations.js       # Scroll animations
│   └── data/
│       └── services.js         # Services data
├── backend/                    # Backend API
│   ├── server.js              # Express server
│   ├── db.js                 # Database connection
│   ├── routes/
│   │   └── contact.js        # Contact API routes
│   └── package.json          # Backend dependencies
├── .gitignore                # Git ignore rules
└── README.md                 # This file
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

### 2. Database Setup

```sql
-- Create database
CREATE DATABASE techflow;

-- Create contacts table
CREATE TABLE contactos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    servicio VARCHAR(50),
    mensaje TEXT NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Backend Setup

```bash
cd backend
npm install
# Update db.js with your database credentials
npm start
```

The API will run on `http://localhost:3000`

### 4. Frontend Setup

**Option A: Live Server (Recommended)**
1. Install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
2. Right-click `index.html` → Open with Live Server
3. Open `http://127.0.0.1:5500`

**Option B: Python**
```bash
python -m http.server 8000
# Open http://localhost:8000
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |
| POST | `/api/contact/validate` | Validate field in real-time |
| GET | `/api/contact/stats` | Get contact statistics |

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

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Variables, Grid, Flexbox, Animations
- **JavaScript** - ES6+, Modules, Async/Await, Fetch API

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **PostgreSQL** - Database
- **express-validator** - Input validation

---

## 📄 License

MIT License - Feel free to use this project for your own purposes.

---

<div align="center">

Made with ❤️ by [Jensen Ballen](https://github.com/jensen-ballen)

</div>