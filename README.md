# 🚀 Duha's Portfolio — Full-Stack Developer Portfolio

A premium, production-ready personal portfolio web application built with modern technologies. Features a stunning dark-themed UI with glassmorphism effects, smooth animations, and a full admin dashboard.

![Tech Stack](https://img.shields.io/badge/React-Vite-blue?style=flat-square&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss)
![Express](https://img.shields.io/badge/Express.js-Node-green?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb)

---

## ✨ Features

### 🎨 Frontend
- **Hero Section** — Full-screen landing with typing animation, particle background, gradient orbs
- **About Me** — Profile image, bio, animated stats, resume download
- **Skills** — Categorized skill cards with animated progress bars
- **Projects** — Dynamic project cards with filter tabs, hover effects, modal view (fetched from API)
- **Experience** — Timeline layout with color-coded entries
- **Contact** — Functional form connected to backend with email notifications
- **Dark/Light Mode** — Toggle with localStorage persistence
- **Loading Screen** — Animated logo with progress bar
- **Scroll-To-Top** — Floating button
- **Responsive** — Mobile-first design

### ⚙️ Backend
- **RESTful API** — Express.js with MongoDB
- **JWT Authentication** — Secure admin routes
- **Contact Form** — Rate-limited with email notifications (NodeMailer)
- **GitHub Integration** — Proxy for GitHub stats API
- **Admin Dashboard** — Full CRUD for projects + message inbox

### 🎯 Design
- Glassmorphism & neumorphism elements
- Smooth Framer Motion animations
- Gradient text & glow effects
- Curated color palette
- Space Grotesk + Inter typography

---

## 📁 Project Structure

```
├── client/                    # React + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── effects/       # LoadingScreen, ParticleBackground
│   │   │   ├── layout/        # Navbar, Footer, ScrollToTop
│   │   │   └── sections/      # Hero, About, Skills, Projects, Experience, Contact
│   │   ├── pages/             # AdminDashboard
│   │   ├── context/           # ThemeContext
│   │   ├── services/          # API layer
│   │   └── utils/             # Constants (edit your info here!)
│   └── ...
│
├── server/                    # Node.js + Express Backend
│   ├── config/                # MongoDB connection
│   ├── models/                # Project, Message, Admin
│   ├── routes/                # projects, messages, auth, github
│   ├── middleware/            # JWT auth
│   ├── utils/                 # NodeMailer
│   ├── seed.js                # Seed database with sample data
│   └── server.js              # Entry point
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### 1. Clone the repository
```bash
git clone https://github.com/duha/portfolio.git
cd portfolio
```

### 2. Setup Backend
```bash
cd server
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, and email credentials

# Seed the database with sample data
node seed.js

# Start the server
node server.js
```

### 3. Setup Frontend
```bash
cd client
npm install

# Start the dev server
npm run dev
```

### 4. Open in browser
- **Portfolio**: http://localhost:5173
- **Admin Dashboard**: http://localhost:5173/admin
  - Username: `admin`
  - Password: `admin123`

---

## ⚙️ Configuration

### Personal Information
Edit `client/src/utils/constants.js` to update:
- Name, bio, roles
- Social media links
- Skills and categories
- Experience/timeline entries
- Stats

### Profile Image
Replace the placeholder in `AboutSection.jsx` with your image:
```jsx
<img src="/your-photo.jpg" alt="Your Name" className="w-full h-full object-cover" />
```
Place your photo in `client/public/`.

### Environment Variables
Edit `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_secret_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
GITHUB_USERNAME=your_github_username
```

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
# Deploy the `dist` folder to Vercel
```

### Backend (Render/Railway)
1. Push the `server` folder to a GitHub repo
2. Connect to Render/Railway
3. Set environment variables
4. Deploy

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Framer Motion |
| Styling | Tailwind CSS v4 |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcrypt.js |
| Email | NodeMailer |
| Particles | tsparticles |
| Icons | react-icons |
| Animations | Framer Motion |

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ and ☕ by **Duha**
