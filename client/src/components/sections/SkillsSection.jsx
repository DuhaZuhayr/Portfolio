import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../../context/ThemeContext';
import { skillCategories } from '../../utils/constants';

const SkillBar = ({ name, level, color, delay }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs font-mono" style={{ color }}>{level}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: delay * 0.1, ease: 'easeOut' }}
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            boxShadow: `0 0 10px ${color}40`
          }}
        />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="skills" className="relative section-ambient-cyan">
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
            style={{ color: '#22D3EE', borderColor: 'rgba(34,211,238,0.25)', background: 'rgba(34,211,238,0.08)' }}
          >
            Skills &amp; Expertise
          </motion.span>
          <motion.h2 variants={itemVariants} className="section-title gradient-text mt-2">
            Tech Stack
          </motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle"
            style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}>
            Technologies and tools I work with to bring ideas to life
          </motion.p>
        </motion.div>

        {/* Skill Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8"
        >
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="glass-card rounded-2xl p-6 sm:p-8 glow-hover transition-all card-lift"
              whileHover={{ y: -5 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{
                    background: `${category.color}15`,
                    border: `1px solid ${category.color}30`
                  }}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold" style={{ fontFamily: 'Space Grotesk', color: category.color }}>
                    {category.title}
                  </h3>
                  <p className="text-xs" style={{ color: theme === 'dark' ? '#64748B' : '#94A3B8' }}>
                    {category.skills.length} technologies
                  </p>
                </div>
              </div>

              {/* Skill Bars */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={category.color}
                    delay={catIndex * 2 + skillIndex}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
