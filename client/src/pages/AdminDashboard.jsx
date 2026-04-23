import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLogIn, FiLogOut, FiPlus, FiEdit2, FiTrash2, FiMail, FiFolder, FiCheck, FiX, FiArrowLeft, FiEye, FiBarChart2, FiUsers, FiGlobe, FiMonitor, FiSmartphone, FiClock, FiTrendingUp, FiCalendar } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import {
  adminLogin, verifyToken,
  getProjects, createProject, updateProject, deleteProject,
  getMessages, markMessageRead, deleteMessage,
  getAnalytics, getRecentVisitors
} from '../services/api';
import toast, { Toaster } from 'react-hot-toast';

// ─── Login Form ───
const LoginForm = ({ onLogin }) => {
  const { theme } = useTheme();
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await adminLogin(creds);
      localStorage.setItem('admin-token', data.token);
      onLogin();
      toast.success('Welcome back! 🎉');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: theme === 'dark' ? '#0A0A0F' : '#F8FAFC' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong rounded-3xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold"
            style={{ background: 'linear-gradient(135deg, #6C63FF, #00D4FF)', fontFamily: 'Space Grotesk' }}>
            D
          </div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk' }}>
            <span className="gradient-text">Admin Dashboard</span>
          </h1>
          <p className="text-sm mt-2" style={{ color: theme === 'dark' ? '#64748B' : '#94A3B8' }}>
            Sign in to manage your portfolio
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={creds.username}
            onChange={(e) => setCreds({ ...creds, username: e.target.value })}
            className="form-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={creds.password}
            onChange={(e) => setCreds({ ...creds, password: e.target.value })}
            className="form-input"
            required
          />
          <motion.button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center py-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <><FiLogIn /> Sign In</>
            )}
          </motion.button>
        </form>

        <a href="/" className="block text-center text-sm mt-6 text-primary hover:underline">
          ← Back to Portfolio
        </a>
      </motion.div>
    </div>
  );
};

// ─── Project Form ───
const ProjectForm = ({ project, onSave, onCancel }) => {
  const { theme } = useTheme();
  const [form, setForm] = useState(project || {
    title: '', description: '', longDescription: '', techStack: '',
    category: 'fullstack', githubUrl: '', liveUrl: '', featured: false, image: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...form,
      techStack: typeof form.techStack === 'string'
        ? form.techStack.split(',').map(t => t.trim()).filter(Boolean)
        : form.techStack
    };
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Project Title" value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="form-input" required />
      <textarea placeholder="Short Description" value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="form-input resize-none" rows={2} required />
      <textarea placeholder="Detailed Description" value={form.longDescription}
        onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
        className="form-input resize-none" rows={4} />
      <input type="text" placeholder="Tech Stack (comma separated)" 
        value={Array.isArray(form.techStack) ? form.techStack.join(', ') : form.techStack}
        onChange={(e) => setForm({ ...form, techStack: e.target.value })}
        className="form-input" />
      <div className="grid grid-cols-2 gap-4">
        <select value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="form-input">
          <option value="fullstack">Full Stack</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="ai-ml">AI / ML</option>
          <option value="mobile">Mobile</option>
          <option value="other">Other</option>
        </select>
        <label className="flex items-center gap-2 form-input cursor-pointer">
          <input type="checkbox" checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            className="w-4 h-4 accent-[#6C63FF]" />
          <span className="text-sm">Featured</span>
        </label>
      </div>
      <input type="url" placeholder="GitHub URL" value={form.githubUrl}
        onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
        className="form-input" />
      <input type="url" placeholder="Live Demo URL" value={form.liveUrl}
        onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
        className="form-input" />
      <input type="url" placeholder="Image URL (optional)" value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
        className="form-input" />
      <div className="flex gap-3">
        <motion.button type="submit" className="btn-primary flex-1 justify-center"
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <FiCheck /> {project ? 'Update' : 'Create'} Project
        </motion.button>
        <motion.button type="button" onClick={onCancel} className="btn-secondary"
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <FiX /> Cancel
        </motion.button>
      </div>
    </form>
  );
};

// ─── Stat Card ───
const StatCard = ({ icon: Icon, label, value, color, theme }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass rounded-2xl p-5 relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10"
      style={{ background: color, filter: 'blur(20px)', transform: 'translate(30%, -30%)' }} />
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: `${color}15`, color }}>
        <Icon size={20} />
      </div>
    </div>
    <div className="text-2xl font-bold mb-1" style={{ fontFamily: 'Space Grotesk' }}>
      {value}
    </div>
    <div className="text-xs" style={{ color: theme === 'dark' ? '#64748B' : '#94A3B8' }}>
      {label}
    </div>
  </motion.div>
);

// ─── Mini Bar Chart (pure CSS) ───
const MiniBarChart = ({ data, theme }) => {
  if (!data || data.length === 0) return null;
  const maxCount = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="space-y-2">
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="text-xs w-20 truncate text-right"
            style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}>
            {item._id || 'Unknown'}
          </div>
          <div className="flex-1 h-6 rounded-lg overflow-hidden"
            style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }}>
            <motion.div
              className="h-full rounded-lg flex items-center justify-end pr-2"
              initial={{ width: 0 }}
              animate={{ width: `${Math.max((item.count / maxCount) * 100, 8)}%` }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
              style={{
                background: `linear-gradient(90deg, ${['#6C63FF', '#A855F7', '#00D4FF', '#10B981', '#F59E0B', '#EF4444'][i % 6]}88, ${['#6C63FF', '#A855F7', '#00D4FF', '#10B981', '#F59E0B', '#EF4444'][i % 6]})`,
              }}
            >
              <span className="text-[10px] font-bold text-white">{item.count}</span>
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Daily Visit Chart (pure CSS bar chart) ───
const DailyChart = ({ data, theme }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8">
        <FiCalendar size={32} className="mx-auto mb-2" style={{ color: '#4B5563' }} />
        <p className="text-sm" style={{ color: theme === 'dark' ? '#64748B' : '#94A3B8' }}>
          No visit data yet
        </p>
      </div>
    );
  }

  const maxCount = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="flex items-end gap-1" style={{ height: '140px' }}>
      {data.map((day, i) => {
        const height = Math.max((day.count / maxCount) * 100, 4);
        const date = new Date(day._id + 'T00:00:00');
        const label = date.toLocaleDateString('en', { month: 'short', day: 'numeric' });

        return (
          <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group relative">
            {/* Tooltip */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
              style={{
                background: theme === 'dark' ? '#1E1E3F' : '#fff',
                border: `1px solid ${theme === 'dark' ? 'rgba(108,99,255,0.3)' : 'rgba(0,0,0,0.1)'}`,
                borderRadius: '8px',
                padding: '4px 8px',
                whiteSpace: 'nowrap',
                fontSize: '11px',
                fontWeight: 600,
              }}>
              {day.count} visits
            </div>
            <motion.div
              className="w-full rounded-t-md cursor-pointer"
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.6, delay: i * 0.03 }}
              style={{
                background: `linear-gradient(to top, #6C63FF, #A855F7)`,
                minHeight: '4px',
                opacity: 0.85,
              }}
              whileHover={{ opacity: 1, scale: 1.05 }}
            />
            {/* Only show labels for every 5th bar */}
            {(i % 5 === 0 || i === data.length - 1) && (
              <span className="text-[9px] mt-1 whitespace-nowrap"
                style={{ color: theme === 'dark' ? '#4B5563' : '#CBD5E1' }}>
                {label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

// ─── Analytics Tab Content ───
const AnalyticsContent = ({ theme }) => {
  const [analytics, setAnalytics] = useState(null);
  const [recentVisitors, setRecentVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRecent, setShowRecent] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const [analyticsRes, recentRes] = await Promise.all([
        getAnalytics(),
        getRecentVisitors(30)
      ]);
      setAnalytics(analyticsRes.data);
      setRecentVisitors(recentRes.data);
    } catch (err) {
      toast.error('Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 rounded-xl animate-spin"
          style={{ border: '3px solid rgba(108,99,255,0.2)', borderTop: '3px solid #6C63FF' }} />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-16">
        <FiBarChart2 size={48} className="mx-auto mb-4" style={{ color: '#4B5563' }} />
        <p style={{ color: theme === 'dark' ? '#64748B' : '#94A3B8' }}>No analytics data yet</p>
      </div>
    );
  }

  const formatDuration = (seconds) => {
    if (!seconds || seconds === 0) return '0s';
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="space-y-6">
      {/* Refresh Button */}
      <div className="flex justify-end">
        <motion.button
          onClick={fetchAnalytics}
          className="btn-secondary text-sm py-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiTrendingUp size={14} /> Refresh
        </motion.button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FiUsers} label="Total Visits" value={analytics.totalVisits} color="#6C63FF" theme={theme} />
        <StatCard icon={FiCalendar} label="Today" value={analytics.todayVisits} color="#10B981" theme={theme} />
        <StatCard icon={FiTrendingUp} label="This Week" value={analytics.weekVisits} color="#A855F7" theme={theme} />
        <StatCard icon={FiGlobe} label="Unique Visitors" value={analytics.uniqueVisitors} color="#00D4FF" theme={theme} />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon={FiCalendar} label="This Month" value={analytics.monthVisits} color="#F59E0B" theme={theme} />
        <StatCard icon={FiClock} label="Avg. Session" value={formatDuration(analytics.avgSessionDuration)} color="#EF4444" theme={theme} />
        <StatCard icon={FiMonitor} label="Most Used Browser" 
          value={analytics.browserStats?.[0]?._id || 'N/A'} 
          color="#6C63FF" theme={theme} />
      </div>

      {/* Daily Visits Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="text-sm font-bold mb-4 flex items-center gap-2"
          style={{ fontFamily: 'Space Grotesk' }}>
          <FiTrendingUp size={16} className="text-primary" />
          Daily Visits (Last 30 Days)
        </h3>
        <DailyChart data={analytics.dailyVisits} theme={theme} />
      </motion.div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Browsers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-sm font-bold mb-4 flex items-center gap-2"
            style={{ fontFamily: 'Space Grotesk' }}>
            <FiGlobe size={16} className="text-primary" />
            Browsers
          </h3>
          <MiniBarChart data={analytics.browserStats} theme={theme} />
        </motion.div>

        {/* Devices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-sm font-bold mb-4 flex items-center gap-2"
            style={{ fontFamily: 'Space Grotesk' }}>
            <FiSmartphone size={16} className="text-primary" />
            Devices
          </h3>
          <MiniBarChart data={analytics.deviceStats} theme={theme} />
        </motion.div>

        {/* OS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-sm font-bold mb-4 flex items-center gap-2"
            style={{ fontFamily: 'Space Grotesk' }}>
            <FiMonitor size={16} className="text-primary" />
            Operating Systems
          </h3>
          <MiniBarChart data={analytics.osStats} theme={theme} />
        </motion.div>
      </div>

      {/* Referrers */}
      {analytics.referrerStats && analytics.referrerStats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-6"
        >
          <h3 className="text-sm font-bold mb-4 flex items-center gap-2"
            style={{ fontFamily: 'Space Grotesk' }}>
            <FiArrowLeft size={16} className="text-primary" />
            Top Referrers
          </h3>
          <MiniBarChart data={analytics.referrerStats.map(r => ({
            ...r,
            _id: r._id?.length > 30 ? r._id.substring(0, 30) + '...' : r._id
          }))} theme={theme} />
        </motion.div>
      )}

      {/* Recent Visitors Toggle */}
      <motion.button
        onClick={() => setShowRecent(!showRecent)}
        className="btn-secondary text-sm py-2 w-full justify-center"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <FiEye size={14} /> {showRecent ? 'Hide' : 'Show'} Recent Visitors ({recentVisitors.length})
      </motion.button>

      {/* Recent Visitors Table */}
      <AnimatePresence>
        {showRecent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass rounded-2xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{
                    background: theme === 'dark' ? 'rgba(108,99,255,0.08)' : 'rgba(108,99,255,0.05)',
                    borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`
                  }}>
                    <th className="text-left py-3 px-4 font-medium text-xs" style={{ color: '#6C63FF' }}>Time</th>
                    <th className="text-left py-3 px-4 font-medium text-xs" style={{ color: '#6C63FF' }}>IP</th>
                    <th className="text-left py-3 px-4 font-medium text-xs" style={{ color: '#6C63FF' }}>Browser</th>
                    <th className="text-left py-3 px-4 font-medium text-xs" style={{ color: '#6C63FF' }}>OS</th>
                    <th className="text-left py-3 px-4 font-medium text-xs" style={{ color: '#6C63FF' }}>Device</th>
                    <th className="text-left py-3 px-4 font-medium text-xs" style={{ color: '#6C63FF' }}>Page</th>
                    <th className="text-left py-3 px-4 font-medium text-xs" style={{ color: '#6C63FF' }}>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {recentVisitors.map((v, i) => (
                    <motion.tr
                      key={v._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      style={{
                        borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'}`,
                      }}
                      className="hover:bg-[rgba(108,99,255,0.03)] transition-colors"
                    >
                      <td className="py-3 px-4 whitespace-nowrap text-xs"
                        style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}>
                        {new Date(v.visitedAt).toLocaleString('en', {
                          month: 'short', day: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="text-xs px-2 py-1 rounded-md font-mono"
                          style={{
                            background: theme === 'dark' ? 'rgba(108,99,255,0.1)' : 'rgba(108,99,255,0.08)',
                            color: '#6C63FF'
                          }}>
                          {v.ip}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-xs">{v.browser}</td>
                      <td className="py-3 px-4 whitespace-nowrap text-xs">{v.os}</td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="text-xs px-2 py-1 rounded-md"
                          style={{
                            background: v.device === 'Mobile'
                              ? 'rgba(16,185,129,0.1)' : v.device === 'Tablet'
                                ? 'rgba(245,158,11,0.1)' : 'rgba(108,99,255,0.1)',
                            color: v.device === 'Mobile'
                              ? '#10B981' : v.device === 'Tablet'
                                ? '#F59E0B' : '#6C63FF'
                          }}>
                          {v.device}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-xs"
                        style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}>
                        {v.page}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-xs"
                        style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}>
                        {v.sessionDuration ? formatDuration(v.sessionDuration) : '—'}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


// ─── Main Dashboard ───
const AdminDashboard = () => {
  const { theme } = useTheme();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('analytics');
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('admin-token');
        if (!token) { setLoading(false); return; }
        await verifyToken();
        setAuthenticated(true);
      } catch { 
        localStorage.removeItem('admin-token');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (authenticated) {
      fetchProjects();
      fetchMessages();
    }
  }, [authenticated]);

  const fetchProjects = async () => {
    try {
      const { data } = await getProjects();
      setProjects(data);
    } catch (err) {
      toast.error('Failed to fetch projects');
    }
  };

  const fetchMessages = async () => {
    try {
      const { data } = await getMessages();
      setMessages(data);
    } catch (err) {
      toast.error('Failed to fetch messages');
    }
  };

  const handleSaveProject = async (data) => {
    try {
      if (editingProject) {
        await updateProject(editingProject._id, data);
        toast.success('Project updated! ✏️');
      } else {
        await createProject(data);
        toast.success('Project created! 🎉');
      }
      setShowForm(false);
      setEditingProject(null);
      fetchProjects();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save project');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      await deleteProject(id);
      toast.success('Project deleted');
      fetchProjects();
    } catch (err) {
      toast.error('Failed to delete project');
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await markMessageRead(id);
      fetchMessages();
    } catch (err) {
      toast.error('Failed to update message');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await deleteMessage(id);
      toast.success('Message deleted');
      fetchMessages();
    } catch (err) {
      toast.error('Failed to delete message');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    setAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: theme === 'dark' ? '#0A0A0F' : '#F8FAFC' }}>
        <div className="w-12 h-12 rounded-xl animate-spin-slow"
          style={{ border: '3px solid rgba(108,99,255,0.2)', borderTop: '3px solid #6C63FF' }} />
      </div>
    );
  }

  if (!authenticated) {
    return <LoginForm onLogin={() => setAuthenticated(true)} />;
  }

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="min-h-screen" style={{ background: theme === 'dark' ? '#0A0A0F' : '#F8FAFC' }}>
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="glass-strong border-b"
        style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 text-sm text-primary hover:underline">
              <FiArrowLeft /> Portfolio
            </a>
            <h1 className="text-lg font-bold" style={{ fontFamily: 'Space Grotesk' }}>
              <span className="gradient-text">Admin Dashboard</span>
            </h1>
          </div>
          <motion.button onClick={handleLogout} className="btn-secondary text-sm py-2"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <FiLogOut /> Logout
          </motion.button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {[
            { key: 'analytics', label: 'Analytics', icon: FiBarChart2 },
            { key: 'projects', label: 'Projects', icon: FiFolder, count: projects.length },
            { key: 'messages', label: 'Messages', icon: FiMail, count: unreadCount }
          ].map((tab) => (
            <motion.button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setShowForm(false); }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer"
              style={{
                background: activeTab === tab.key
                  ? 'linear-gradient(135deg, #6C63FF, #A855F7)'
                  : theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                color: activeTab === tab.key ? 'white' : (theme === 'dark' ? '#94A3B8' : '#64748B'),
                border: `1px solid ${activeTab === tab.key ? 'transparent' : (theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)')}`
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon size={16} />
              {tab.label}
              {tab.count > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{
                    background: activeTab === tab.key ? 'rgba(255,255,255,0.2)' : 'rgba(108,99,255,0.15)',
                    color: activeTab === tab.key ? 'white' : '#6C63FF'
                  }}>
                  {tab.count}
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Analytics Tab */}
        {activeTab === 'analytics' && <AnalyticsContent theme={theme} />}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            {!showForm && (
              <motion.button
                onClick={() => { setShowForm(true); setEditingProject(null); }}
                className="btn-primary mb-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiPlus /> Add Project
              </motion.button>
            )}

            <AnimatePresence mode="wait">
              {showForm ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="glass rounded-2xl p-6 mb-6"
                >
                  <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>
                    {editingProject ? 'Edit Project' : 'New Project'}
                  </h3>
                  <ProjectForm
                    project={editingProject}
                    onSave={handleSaveProject}
                    onCancel={() => { setShowForm(false); setEditingProject(null); }}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="grid gap-4">
              {projects.map((project) => (
                <motion.div
                  key={project._id}
                  layout
                  className="glass rounded-xl p-5 flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold truncate">{project.title}</h4>
                      {project.featured && (
                        <span className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(108,99,255,0.15)', color: '#6C63FF' }}>
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-sm truncate"
                      style={{ color: theme === 'dark' ? '#64748B' : '#94A3B8' }}>
                      {project.description}
                    </p>
                    <div className="flex gap-1.5 mt-2">
                      {project.techStack?.slice(0, 3).map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-md"
                          style={{
                            background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                            color: theme === 'dark' ? '#94A3B8' : '#64748B'
                          }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <motion.button
                      onClick={() => { setEditingProject(project); setShowForm(true); }}
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-primary"
                      style={{ background: 'rgba(108,99,255,0.1)' }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiEdit2 size={16} />
                    </motion.button>
                    <motion.button
                      onClick={() => handleDeleteProject(project._id)}
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444' }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiTrash2 size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="grid gap-4">
            {messages.length === 0 ? (
              <div className="text-center py-16">
                <FiMail size={48} className="mx-auto mb-4" style={{ color: '#4B5563' }} />
                <p style={{ color: theme === 'dark' ? '#64748B' : '#94A3B8' }}>No messages yet</p>
              </div>
            ) : messages.map((msg) => (
              <motion.div
                key={msg._id}
                layout
                className={`glass rounded-xl p-5 ${!msg.read ? 'border-l-4' : ''}`}
                style={!msg.read ? { borderLeftColor: '#6C63FF' } : {}}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold">{msg.name}</h4>
                      {!msg.read && (
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      )}
                    </div>
                    <p className="text-sm text-primary mb-1">{msg.email}</p>
                    <p className="text-sm font-medium mb-2">{msg.subject}</p>
                    <p className="text-sm leading-relaxed"
                      style={{ color: theme === 'dark' ? '#94A3B8' : '#64748B' }}>
                      {msg.message}
                    </p>
                    <p className="text-xs mt-3"
                      style={{ color: theme === 'dark' ? '#4B5563' : '#CBD5E1' }}>
                      {new Date(msg.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {!msg.read && (
                      <motion.button
                        onClick={() => handleMarkRead(msg._id)}
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981' }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        title="Mark as read"
                      >
                        <FiEye size={16} />
                      </motion.button>
                    )}
                    <motion.button
                      onClick={() => handleDeleteMessage(msg._id)}
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444' }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Delete message"
                    >
                      <FiTrash2 size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
