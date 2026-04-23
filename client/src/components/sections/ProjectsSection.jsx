import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiX, FiFolder } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { getProjects } from '../../services/api';

const categories = [
  { key: 'all', label: 'All' },
  { key: 'fullstack', label: 'Full Stack' },
  { key: 'ai-ml', label: 'AI / ML' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
];

const ProjectCard = ({ project, index, onClick }) => {
  const { theme } = useTheme();
  
  // Color palette for project cards
  const colors = ['#6C63FF', '#00D4FF', '#A855F7', '#EC4899', '#10B981', '#F59E0B'];
  const cardColor = colors[index % colors.length];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass-card rounded-2xl overflow-hidden cursor-pointer group card-lift"
      whileHover={{ y: -8 }}
      onClick={() => onClick(project)}
    >
      {/* Image / Color Header */}
      <div className="h-48 relative overflow-hidden"
        style={{
          background: project.image 
            ? `url(${project.image}) center/cover` 
            : `linear-gradient(135deg, ${cardColor}20, ${cardColor}05)`
        }}>
        {!project.image && (
          <div className="absolute inset-0 flex items-center justify-center">
            <FiFolder size={48} style={{ color: `${cardColor}40` }} />
          </div>
        )}
        {/* Overlay with links on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl glass flex items-center justify-center text-white hover:text-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              aria-label="GitHub"
            >
              <FiGithub size={20} />
            </motion.a>
          )}
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl glass flex items-center justify-center text-white hover:text-secondary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              aria-label="Live Demo"
            >
              <FiExternalLink size={20} />
            </motion.a>
          )}
        </div>
        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #6C63FF, #A855F7)' }}>
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors"
          style={{ fontFamily: 'Space Grotesk' }}>
          {project.title}
        </h3>
        <p className="text-sm mb-4 line-clamp-2"
          style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}>
          {project.description}
        </p>
        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2">
          {project.techStack?.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 rounded-lg font-medium"
              style={{
                background: `${cardColor}12`,
                color: cardColor,
                border: `1px solid ${cardColor}20`
              }}
            >
              {tech}
            </span>
          ))}
          {project.techStack?.length > 4 && (
            <span className="text-xs px-2.5 py-1 rounded-lg"
              style={{ color: theme === 'dark' ? '#64748B' : '#94A3B8' }}>
              +{project.techStack.length - 4} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  const { theme } = useTheme();
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 40 }}
        className="relative glass-strong rounded-3xl p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-xl flex items-center justify-center transition-colors hover:bg-white/10"
          style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}
        >
          <FiX size={20} />
        </button>

        {/* Project Title */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 pr-12 gradient-text"
          style={{ fontFamily: 'Space Grotesk' }}>
          {project.title}
        </h2>

        {/* Category Badge */}
        <span className="inline-block text-xs px-3 py-1 rounded-full mb-4 font-semibold"
          style={{
            background: 'rgba(108, 99, 255, 0.15)',
            color: '#6C63FF'
          }}>
          {project.category?.replace('-', ' / ').toUpperCase()}
        </span>

        {/* Description */}
        <p className="mb-6 leading-relaxed"
          style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}>
          {project.longDescription || project.description}
        </p>

        {/* Tech Stack */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider"
            style={{ color: '#6C63FF' }}>
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack?.map((tech) => (
              <span
                key={tech}
                className="text-sm px-3 py-1.5 rounded-xl font-medium glass"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm"
            >
              <FiGithub /> View Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
            >
              <FiExternalLink /> Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const { theme } = useTheme();
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="relative section-ambient-pink">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag"
            style={{ color: '#B87FFF', borderColor: 'rgba(184,127,255,0.25)', background: 'rgba(184,127,255,0.08)' }}>
            Portfolio
          </span>
          <h2 className="section-title gradient-text mt-2">Featured Projects</h2>
          <p className="section-subtitle"
            style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}>
            A showcase of my recent work across different technologies
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer"
              style={{
                background: activeFilter === cat.key
                  ? 'linear-gradient(135deg, #7C6FFF, #B87FFF)'
                  : theme === 'dark' ? 'rgba(124,111,255,0.04)' : 'rgba(0,0,0,0.03)',
                color: activeFilter === cat.key ? 'white' : (theme === 'dark' ? '#8892A4' : '#64748B'),
                border: `1px solid ${activeFilter === cat.key ? 'transparent' : (theme === 'dark' ? 'rgba(124,111,255,0.12)' : 'rgba(0,0,0,0.08)')}`
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 rounded-xl animate-spin-slow"
              style={{ border: '3px solid rgba(108,99,255,0.2)', borderTop: '3px solid #6C63FF' }} />
          </div>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  index={i}
                  onClick={setSelectedProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <FiFolder size={48} className="mx-auto mb-4" style={{ color: '#4B5563' }} />
            <p style={{ color: theme === 'dark' ? '#64748B' : '#94A3B8' }}>
              No projects found in this category
            </p>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
