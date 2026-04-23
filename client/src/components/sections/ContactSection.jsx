import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiSend, FiMail, FiMapPin, FiGithub, FiLinkedin, FiTwitter, FiCheck } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { personalInfo } from '../../utils/constants';
import { sendMessage } from '../../services/api';
import toast from 'react-hot-toast';

const ContactSection = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: ''
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      await sendMessage(formData);
      setSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      toast.success('Message sent successfully! 🎉');
      setTimeout(() => setSent(false), 3000);
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to send message. Please try again.';
      toast.error(msg);
    } finally {
      setSending(false);
    }
  };

  const socialLinks = [
    { icon: FiGithub, href: personalInfo.social.github, label: 'GitHub', color: '#6C63FF' },
    { icon: FiLinkedin, href: personalInfo.social.linkedin, label: 'LinkedIn', color: '#0077B5' },
    { icon: FiTwitter, href: personalInfo.social.twitter, label: 'Twitter', color: '#1DA1F2' },
  ];

  return (
    <section id="contact" className="relative section-ambient">
      <div className="section-container" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag"
            style={{ color: '#10B981', borderColor: 'rgba(16,185,129,0.25)', background: 'rgba(16,185,129,0.08)' }}>
            Get in Touch
          </span>
          <h2 className="section-title gradient-text mt-2">Let's Connect</h2>
          <p className="section-subtitle"
            style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}>
            Have a project in mind or just want to say hi? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>
                Let's build something{' '}
                <span className="gradient-text">amazing</span> together
              </h3>
              <p className="text-sm leading-relaxed"
                style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}>
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of something great.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="glass rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(108, 99, 255, 0.15)' }}>
                  <FiMail className="text-primary" />
                </div>
                <div>
                  <p className="text-xs" style={{ color: theme === 'dark' ? '#64748B' : '#94A3B8' }}>Email</p>
                  <p className="text-sm font-medium">{personalInfo.email}</p>
                </div>
              </div>
              <div className="glass rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(0, 212, 255, 0.15)' }}>
                  <FiMapPin className="text-secondary" />
                </div>
                <div>
                  <p className="text-xs" style={{ color: theme === 'dark' ? '#64748B' : '#94A3B8' }}>Location</p>
                  <p className="text-sm font-medium">{personalInfo.location}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase mb-3"
                style={{ color: theme === 'dark' ? '#64748B' : '#94A3B8' }}>
                Find me on
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl glass flex items-center justify-center transition-all"
                    style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}
                    whileHover={{
                      scale: 1.1,
                      color: social.color,
                      boxShadow: `0 0 20px ${social.color}30`
                    }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 sm:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                    style={{ color: theme === 'dark' ? '#64748B' : '#94A3B8' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="form-input"
                    id="contact-name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                    style={{ color: theme === 'dark' ? '#64748B' : '#94A3B8' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="form-input"
                    id="contact-email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                  style={{ color: theme === 'dark' ? '#64748B' : '#94A3B8' }}>
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project Inquiry"
                  className="form-input"
                  id="contact-subject"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                  style={{ color: theme === 'dark' ? '#64748B' : '#94A3B8' }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="form-input resize-none"
                  id="contact-message"
                />
              </div>

              <motion.button
                type="submit"
                disabled={sending}
                className="btn-primary w-full justify-center text-base py-3.5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={sent ? { background: 'linear-gradient(135deg, #10B981, #059669)' } : {}}
              >
                {sending ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : sent ? (
                  <><FiCheck /> Sent Successfully!</>
                ) : (
                  <><FiSend /> Send Message</>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
