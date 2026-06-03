# 🚀 Duha's Portfolio — Full-Stack Developer Portfolio

A premium, production-ready personal portfolio web application built with modern technologies. Features a stunning dark-themed UI with glassmorphism effects, smooth animations, and a full admin dashboard.

![Tech Stack](https://img.shields.io/badge/React-18.2-blue?style=flat-square&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.3-06B6D4?style=flat-square&logo=tailwindcss)
![Express](https://img.shields.io/badge/Express.js-Node-green?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb)

---

## ✨ Features

### 🎨 Frontend
- **Hero Section** — Full-screen landing with gradient orbs, tech stack pills, and profile image
- **About Me** — Bio, animated stats
- **Skills** — Categorized skill cards with animated progress bars
- **Projects** — Dynamic project carousel with hover effects
- **Experience** — Timeline layout with color-coded entries
- **Services** — Service offerings grid
- **Contact** — Functional form connected to backend with email notifications
- **Responsive** — Mobile-first design with hamburger menu
- **Smooth Animations** — Framer Motion scroll-based reveal animations

### ⚙️ Backend
- **RESTful API** — Express.js with MongoDB
- **JWT Authentication** — Secure admin routes
- **Contact Form** — Rate-limited with email notifications (NodeMailer)
- **GitHub Integration** — Proxy for GitHub stats API
- **Admin Dashboard** — Full CRUD for projects + message inbox (work in progress)
- **Visitor Analytics** — Tracks and aggregates visitor data

---

## 📁 Project Structure

```
├── client/                    # Next.js Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── sections/      # HeroSection, AboutSection, SkillsSection, etc.
│   │   │   ├── ui/            # shadcn/ui components
│   │   │   ├── ContactModal.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Preloader.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   ├── lib/
│   │   │   ├── constants.ts   # Personal data, skills, projects, services
│   │   │   └── utils.ts       # cn() helper, scrollTo
│   │   ├── pages/
│   │   │   ├── _app.tsx
│   │   │   └── index.tsx
│   │   └── styles/
│   ├── public/                # Static assets (images, fonts, manifest)
│   └── next.config.js
│
├── server/                    # Node.js + Express Backend
│   ├── config/                # MongoDB connection
│   ├── models/                # Project, Message, Admin, Visitor
│   ├── routes/                # projects, messages, auth, github, visitors
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
- **npm**

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

# Optional: Configure API URL
cp .env.example .env.local

# Start the dev server
npm run dev
```

### 4. Open in browser
- **Portfolio**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin (work in progress)

---

## ⚙️ Configuration

### Personal Information
Edit `client/src/lib/constants.ts` to update:
- Name, bio, roles
- Social media links
- Skills and categories
- Experience/timeline entries
- Stats
- Projects and services

### Profile Image
Replace the placeholder in `client/public/assets/duha_image.jpeg` with your image.

### Environment Variables

**Server (`server/.env`):**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=change_this_to_a_secure_random_string
ADMIN_PASSWORD=change_this_to_a_secure_password
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:3000
GITHUB_USERNAME=your_github_username
```

**Client (`client/.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
# Deploy the `.next` folder to Vercel
```

Set `NEXT_PUBLIC_API_URL` to your backend URL in Vercel environment variables.

### Backend (Render/Railway)
1. Push the `server` folder to a GitHub repo
2. Connect to Render/Railway
3. Set environment variables
4. Deploy

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Next.js 14, TypeScript |
| Styling | Tailwind CSS 3, shadcn/ui |
| Animations | Framer Motion |
| Icons | Lucide React |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| Email | Nodemailer |
| Validation | express-validator |
| Rate Limiting | express-rate-limit |

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ and ☕ by **Duha**
