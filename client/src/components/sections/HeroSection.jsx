import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiArrowDown, FiGithub, FiLinkedin } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';
import ParticleBackground from '../effects/ParticleBackground';
import { useTheme } from '../../context/ThemeContext';
import { personalInfo } from '../../utils/constants';

const HeroSection = () => {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient Depth Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary orb — deep violet left */}
        <div
          className="absolute -top-16 -left-40 w-[520px] h-[520px] rounded-full orb-breathe"
          style={{ background: 'radial-gradient(circle, rgba(124,111,255,0.28), rgba(91,63,232,0.08) 60%, transparent 80%)' }}
        />
        {/* Secondary orb — electric cyan right */}
        <div
          className="absolute bottom-1/4 -right-40 w-[480px] h-[480px] rounded-full orb-breathe-b"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.2), rgba(34,211,238,0.04) 60%, transparent 80%)' }}
        />
        {/* Center atmospheric haze */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(184,127,255,0.06) 0%, transparent 65%)', filter: 'blur(40px)' }}
        />
        {/* Top-right accent spark */}
        <div
          className="absolute top-24 right-1/4 w-44 h-44 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.15), transparent 70%)', filter: 'blur(24px)' }}
        />
      </div>

      {/* Particles */}
      <ParticleBackground />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8 flex justify-center">
          <div className="glass inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium"
            style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}>
            <HiOutlineSparkles className="text-primary" />
            <span>Available for opportunities</span>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
          style={{ fontFamily: 'Space Grotesk' }}
        >
          Hi, I'm{' '}
          <span className="gradient-text">{personalInfo.name}</span>
        </motion.h1>

        {/* Typing Animation */}
        <motion.div
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl font-medium mb-8 h-12 flex items-center justify-center"
          style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}
        >
          <span className="mr-2">I'm a</span>
          <TypeAnimation
            sequence={personalInfo.roles.flatMap(role => [role, 2000])}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="gradient-text-alt font-semibold"
          />
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: theme === 'dark' ? '#64748B' : '#94A3B8' }}
        >
          {personalInfo.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
          <motion.a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-primary text-base px-8 py-3.5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <HiOutlineSparkles /> View Projects
          </motion.a>
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-secondary text-base px-8 py-3.5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="flex justify-center gap-4">
          {[
            { icon: FiGithub, href: personalInfo.social.github, label: "GitHub" },
            { icon: FiLinkedin, href: personalInfo.social.linkedin, label: "LinkedIn" },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl glass flex items-center justify-center transition-colors"
              style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}
              whileHover={{
                scale: 1.15,
                color: '#9D93FF',
                boxShadow: '0 0 24px rgba(124,111,255,0.45)'
              }}
              whileTap={{ scale: 0.9 }}
              aria-label={social.label}
            >
              <social.icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
          style={{ color: theme === 'dark' ? '#4B5563' : '#9CA3AF' }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <FiArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
