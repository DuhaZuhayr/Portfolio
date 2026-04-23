import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiHeart, FiArrowUp } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { personalInfo } from '../../utils/constants';

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative py-12 border-t"
      style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)', fontFamily: 'Space Grotesk' }}>
                D
              </div>
              <span className="text-lg font-bold" style={{ fontFamily: 'Space Grotesk' }}>
                <span className="gradient-text">Duha</span>
              </span>
            </div>
            <p className="text-sm" style={{ color: theme === 'dark' ? '#64748B' : '#94A3B8' }}>
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-1 text-sm"
            style={{ color: theme === 'dark' ? '#64748B' : '#94A3B8' }}>
            Made with <FiHeart className="text-red-500 mx-1" /> and lots of ☕
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: FiGithub, href: personalInfo.social.github, label: "GitHub" },
              { icon: FiLinkedin, href: personalInfo.social.linkedin, label: "LinkedIn" },
              { icon: FiTwitter, href: personalInfo.social.twitter, label: "Twitter" },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                style={{
                  background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  color: theme === 'dark' ? '#94A3B8' : '#64748B'
                }}
                whileHover={{
                  scale: 1.1,
                  background: 'rgba(108, 99, 255, 0.2)',
                  color: '#6C63FF'
                }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
