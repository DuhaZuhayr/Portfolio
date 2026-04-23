import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiDownload, FiMapPin, FiMail } from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { useTheme } from '../../context/ThemeContext';
import { personalInfo, stats } from '../../utils/constants';

const AboutSection = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="about" className="relative section-ambient">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="section-tag"
            style={{ color: '#9D93FF', borderColor: 'rgba(124,111,255,0.25)', background: 'rgba(124,111,255,0.08)' }}
          >
            About Me
          </motion.span>
          <motion.h2 variants={itemVariants} className="section-title gradient-text mt-2">
            Get to Know Me
          </motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle"
            style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}>
            Here's a glimpse into who I am and what drives my passion for technology
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Side: Image + Quick Info */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative max-w-md mx-auto">
              {/* Profile Image Placeholder */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto rounded-3xl overflow-hidden gradient-border">
                <div
                  className="w-full h-full flex items-center justify-center text-8xl"
                  style={{
                    background: theme === 'dark'
                      ? 'linear-gradient(135deg, #12122A, #1A1A38)'
                      : 'linear-gradient(135deg, #E2E8F0, #CBD5E1)',
                  }}
                >
                  {/* Replace this div with your profile image:
                      <img src="/your-photo.jpg" alt="Duha" className="w-full h-full object-cover" /> */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center text-5xl font-bold"
                      style={{
                        background: 'linear-gradient(135deg, #7C6FFF, #22D3EE)',
                        color: 'white',
                        fontFamily: 'Space Grotesk'
                      }}>
                      D
                    </div>
                    <span className="text-sm font-medium" style={{ color: theme === 'dark' ? '#64748B' : '#94A3B8' }}>
                      Your photo here
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-3 flex items-center gap-2"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <HiOutlineAcademicCap className="text-primary text-xl" />
                <div>
                  <p className="text-xs font-semibold">CS Student</p>
                  <p className="text-xs" style={{ color: theme === 'dark' ? '#64748B' : '#94A3B8' }}>B.Tech 2022-26</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 flex items-center gap-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <FiMapPin className="text-secondary text-lg" />
                <span className="text-sm font-medium">{personalInfo.location}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side: Text Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'Space Grotesk' }}>
              Crafting Digital Experiences with{' '}
              <span className="gradient-text">Code & Creativity</span>
            </h3>
            
            <div className="space-y-4 text-base leading-relaxed"
              style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}>
              <p>
                I'm a passionate Computer Science student who thrives at the intersection of innovation and technology. 
                With a strong foundation in full-stack development and a growing expertise in AI/ML, 
                I love building solutions that make a real impact.
              </p>
              <p>
                When I'm not coding, you'll find me exploring research papers, contributing to open-source projects, 
                or participating in hackathons. I believe in continuous learning and pushing the boundaries of what's possible.
              </p>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <FiMail className="text-primary flex-shrink-0" />
                <span className="text-sm truncate" style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}>
                  {personalInfo.email}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FiMapPin className="text-secondary flex-shrink-0" />
                <span className="text-sm" style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}>
                  {personalInfo.location}
                </span>
              </div>
            </div>

            {/* Resume Download */}
            <motion.a
              href={personalInfo.resumeUrl}
              download
              className="btn-primary inline-flex"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiDownload /> Download Resume
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="glass-card rounded-2xl p-6 text-center glow-hover transition-all card-lift"
              whileHover={{ y: -5 }}
            >
              <h4 className="text-3xl sm:text-4xl font-bold gradient-text mb-2"
                style={{ fontFamily: 'Space Grotesk' }}>
                {stat.value}
              </h4>
              <p className="text-sm font-medium"
                style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
