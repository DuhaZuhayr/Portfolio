import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../../context/ThemeContext';
import { experiences } from '../../utils/constants';

const TimelineItem = ({ item, index, isLast }) => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const isLeft = index % 2 === 0;

  const typeColors = {
    work: '#7C6FFF',
    achievement: '#F59E0B',
    research: '#22D3EE',
    certification: '#10B981',
    education: '#B87FFF'
  };

  const color = typeColors[item.type] || '#6C63FF';

  return (
    <div ref={ref} className="relative flex items-center mb-12 last:mb-0">
      {/* Desktop: alternating layout */}
      <div className="hidden md:grid md:grid-cols-[1fr_80px_1fr] w-full items-center">
        {/* Left content */}
        <div className={isLeft ? '' : 'order-3'}>
          <motion.div
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`glass-card rounded-2xl p-6 glow-hover transition-all card-lift ${isLeft ? 'mr-4' : 'ml-4'}`}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                style={{ background: `${color}15`, color }}>
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </span>
            </div>
            <h3 className="text-lg font-bold mt-2" style={{ fontFamily: 'Space Grotesk' }}>
              {item.title}
            </h3>
            <p className="text-sm font-medium mb-1" style={{ color }}>
              {item.company}
            </p>
            <p className="text-xs mb-3" style={{ color: theme === 'dark' ? '#64748B' : '#94A3B8' }}>
              {item.date}
            </p>
            <p className="text-sm leading-relaxed"
              style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}>
              {item.description}
            </p>
          </motion.div>
        </div>

        {/* Center: dot + line */}
        <div className="flex flex-col items-center order-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="w-4 h-4 rounded-full z-10 flex-shrink-0"
            style={{
              background: color,
              boxShadow: `0 0 20px ${color}60`
            }}
          />
          {!isLast && (
            <div className="w-0.5 h-full min-h-[80px]"
              style={{ background: `linear-gradient(to bottom, ${color}40, transparent)` }} />
          )}
        </div>

        {/* Right content (empty for alternating) */}
        <div className={isLeft ? 'order-3' : ''} />
      </div>

      {/* Mobile: left-aligned layout */}
      <div className="md:hidden flex gap-4 w-full">
        {/* Line + dot */}
        <div className="flex flex-col items-center flex-shrink-0">
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.3 }}
            className="w-3 h-3 rounded-full z-10"
            style={{
              background: color,
              boxShadow: `0 0 15px ${color}60`
            }}
          />
          {!isLast && (
            <div className="w-0.5 flex-1"
              style={{ background: `linear-gradient(to bottom, ${color}40, transparent)` }} />
          )}
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-2xl p-5 flex-1 mb-2"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: `${color}15`, color }}>
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </span>
          </div>
          <h3 className="text-base font-bold mt-1" style={{ fontFamily: 'Space Grotesk' }}>
            {item.title}
          </h3>
          <p className="text-sm font-medium" style={{ color }}>{item.company}</p>
          <p className="text-xs mb-2" style={{ color: theme === 'dark' ? '#64748B' : '#94A3B8' }}>
            {item.date}
          </p>
          <p className="text-sm leading-relaxed"
            style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}>
            {item.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="relative section-ambient-cyan">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag"
            style={{ color: '#F472B6', borderColor: 'rgba(244,114,182,0.25)', background: 'rgba(244,114,182,0.08)' }}>
            Journey
          </span>
          <h2 className="section-title gradient-text-warm mt-2">
            Experience & Achievements
          </h2>
          <p className="section-subtitle"
            style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}>
            A timeline of my academic journey, professional experience, and key milestones
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {experiences.map((item, index) => (
            <TimelineItem
              key={index}
              item={item}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
