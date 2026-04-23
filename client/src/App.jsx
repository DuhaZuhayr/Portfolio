import { useState, lazy, Suspense } from 'react';
import CursorGlow from './components/effects/CursorGlow';
import useVisitorTracker from './hooks/useVisitorTracker';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import LoadingScreen from './components/effects/LoadingScreen';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ContactSection from './components/sections/ContactSection';

const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

const HomePage = () => {
  useVisitorTracker();

  return (
  <>
    <Helmet>
      <title>Duha | CS Student & Full-Stack Developer</title>
      <meta name="description" content="Portfolio of Duha — Computer Science student, Full-Stack Developer, and AI/ML Enthusiast. Building elegant solutions with modern technologies." />
      <meta name="keywords" content="Duha, portfolio, developer, computer science, full-stack, react, node.js, AI, machine learning" />
      <meta property="og:title" content="Duha | CS Student & Full-Stack Developer" />
      <meta property="og:description" content="Building elegant solutions with modern technologies. Explore my projects, skills, and experience." />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Duha | CS Student & Full-Stack Developer" />
    </Helmet>
    <Navbar />
    <main>
      <HeroSection />
      <div className="section-divider" />
      <AboutSection />
      <div className="section-divider" />
      <SkillsSection />
      <div className="section-divider" />
      <ProjectsSection />
      <div className="section-divider" />
      <ExperienceSection />
      <div className="section-divider" />
      <ContactSection />
    </main>
    <Footer />
    <ScrollToTop />
  </>
  );
}

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <CursorGlow />
        <div className="noise-overlay">
          {loading ? (
            <LoadingScreen onComplete={() => setLoading(false)} />
          ) : (
            <Router>
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#12122A',
                    color: '#E8EDF5',
                    border: '1px solid rgba(124, 111, 255, 0.22)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(16px)',
                  },
                  success: {
                    iconTheme: { primary: '#10B981', secondary: '#1E1E3F' }
                  },
                  error: {
                    iconTheme: { primary: '#EF4444', secondary: '#1E1E3F' }
                  }
                }}
              />
              <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center"
                  style={{ background: '#0A0A0F' }}>
                  <div className="w-12 h-12 rounded-xl animate-spin-slow"
                    style={{ border: '3px solid rgba(108,99,255,0.2)', borderTop: '3px solid #6C63FF' }} />
                </div>
              }>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
              </Suspense>
            </Router>
          )}
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
