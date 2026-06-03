import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  Mail,
  Users,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";

// ─── Types ───
interface Project {
  _id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  category: string;
  image: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  order: number;
}

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface Analytics {
  totalVisits: number;
  todayVisits: number;
  weekVisits: number;
  monthVisits: number;
  uniqueVisitors: number;
  browserStats: { _id: string; count: number }[];
  deviceStats: { _id: string; count: number }[];
  osStats: { _id: string; count: number }[];
  pageStats: { _id: string; count: number }[];
  referrerStats: { _id: string; count: number }[];
  dailyVisits: { _id: string; count: number }[];
  avgSessionDuration: number;
}

type Tab = "dashboard" | "projects" | "messages" | "analytics";

// ─── Helpers ───
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("adminToken");
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Project Form Modal ───
interface ProjectFormProps {
  project: Project | null;
  onSave: (project: Project) => void;
  onClose: () => void;
}

function ProjectForm({ project, onSave, onClose }: ProjectFormProps) {
  const [form, setForm] = useState<Omit<Project, "_id">>({
    title: project?.title || "",
    description: project?.description || "",
    longDescription: project?.longDescription || "",
    techStack: project?.techStack || [],
    category: project?.category || "fullstack",
    image: project?.image || "",
    githubUrl: project?.githubUrl || "",
    liveUrl: project?.liveUrl || "",
    featured: project?.featured || false,
    order: project?.order || 0,
  });
  const [techInput, setTechInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = project?._id ? `${API}/api/projects/${project._id}` : `${API}/api/projects`;
      const method = project?._id ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: getAuthHeaders(), body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save");
      onSave({ ...data, _id: data._id || project?._id || "" });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTech = () => {
    const trimmed = techInput.trim();
    if (trimmed && !form.techStack.includes(trimmed)) {
      setForm({ ...form, techStack: [...form.techStack, trimmed] });
      setTechInput("");
    }
  };

  const removeTech = (tech: string) => {
    setForm({ ...form, techStack: form.techStack.filter((t) => t !== tech) });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            {project ? "Edit Project" : "New Project"}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none"
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="fullstack">Full-Stack</option>
                <option value="ai-ml">AI/ML</option>
                <option value="mobile">Mobile</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Short Description *</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Long Description</label>
            <textarea
              value={form.longDescription}
              onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
              rows={3}
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Tech Stack</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                className="flex-1 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                placeholder="Add technology..."
              />
              <button
                type="button"
                onClick={addTech}
                className="rounded-md bg-white/10 px-3 py-2 text-sm text-foreground hover:bg-white/20"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {form.techStack.map((tech) => (
                <span
                  key={tech}
                  className="flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1 text-xs text-primary"
                >
                  {tech}
                  <button type="button" onClick={() => removeTech(tech)} className="hover:text-red-400">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">GitHub URL</label>
              <input
                type="url"
                value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">Live URL</label>
              <input
                type="url"
                value={form.liveUrl}
                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Image URL</label>
            <input
              type="url"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none"
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="h-4 w-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary"
                />
                <span className="text-sm text-muted-foreground">Featured</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-md bg-primary py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Saving..." : project ? "Update Project" : "Create Project"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-white/10 px-6 py-2.5 text-sm text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ─── Message Detail Modal ───
interface MessageDetailProps {
  message: Message | null;
  onClose: () => void;
}

function MessageDetail({ message, onClose }: MessageDetailProps) {
  if (!message) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-lg rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">{message.subject}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex gap-2 text-sm">
            <span className="text-muted-foreground">From:</span>
            <span className="text-foreground">{message.name}</span>
            <span className="text-muted-foreground">({message.email})</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {formatDate(message.createdAt)}
          </div>
          <hr className="border-white/10" />
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">{message.message}</p>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Dashboard ───
export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [viewingMessage, setViewingMessage] = useState<Message | null>(null);
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);
  const [projectFilter, setProjectFilter] = useState("all");
  const [messageFilter, setMessageFilter] = useState<"all" | "unread">("all");

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return false;
    }
    return true;
  }, [router]);

  useEffect(() => {
    if (!checkAuth()) return;
    loadAllData();
  }, [checkAuth]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [projRes, msgRes, analyticsRes] = await Promise.all([
        fetch(`${API}/api/projects`, { headers: getAuthHeaders() }),
        fetch(`${API}/api/messages`, { headers: getAuthHeaders() }),
        fetch(`${API}/api/visitors/analytics`, { headers: getAuthHeaders() }),
      ]);

      if (projRes.ok) setProjects(await projRes.json());
      if (msgRes.ok) setMessages(await msgRes.json());
      if (analyticsRes.ok) setAnalytics(await analyticsRes.json());
    } catch (err) {
      console.error("Failed to load data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const res = await fetch(`${API}/api/projects/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (res.ok) {
      setProjects((prev) => prev.filter((p) => p._id !== id));
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    const res = await fetch(`${API}/api/messages/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (res.ok) {
      setMessages((prev) => prev.filter((m) => m._id !== id));
    }
  };

  const handleMarkRead = async (id: string, read: boolean) => {
    const res = await fetch(`${API}/api/messages/${id}/read`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ read }),
    });
    if (res.ok) {
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, read } : m))
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
    router.push("/admin/login");
  };

  const filteredProjects =
    projectFilter === "all"
      ? projects
      : projects.filter((p) => p.category === projectFilter);

  const filteredMessages =
    messageFilter === "unread"
      ? messages.filter((m) => !m.read)
      : messages;

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { key: "projects", label: "Projects", icon: <FolderKanban className="h-4 w-4" /> },
    { key: "messages", label: "Messages", icon: <Mail className="h-4 w-4" /> },
    { key: "analytics", label: "Analytics", icon: <Users className="h-4 w-4" /> },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard | Duha Portfolio</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-foreground">Admin Dashboard</h1>
              <span className="text-sm text-muted-foreground">
                Welcome, {localStorage.getItem("adminUsername")}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div className="border-b border-white/10">
          <div className="container mx-auto flex gap-1 px-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
                  activeTab === tab.key
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.icon}
                {tab.label}
                {tab.key === "messages" && messages.filter((m) => !m.read).length > 0 && (
                  <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">
                    {messages.filter((m) => !m.read).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <main className="container mx-auto px-4 py-6">
          <AnimatePresence mode="wait">
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                    <p className="text-sm text-muted-foreground">Total Visits</p>
                    <p className="mt-2 text-3xl font-semibold text-foreground">{analytics?.totalVisits || 0}</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                    <p className="text-sm text-muted-foreground">Today</p>
                    <p className="mt-2 text-3xl font-semibold text-foreground">{analytics?.todayVisits || 0}</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                    <p className="text-sm text-muted-foreground">Projects</p>
                    <p className="mt-2 text-3xl font-semibold text-foreground">{projects.length}</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                    <p className="text-sm text-muted-foreground">Messages</p>
                    <p className="mt-2 text-3xl font-semibold text-foreground">{messages.length}</p>
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                  <h2 className="mb-4 text-lg font-semibold text-foreground">Recent Messages</h2>
                  {messages.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No messages yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {messages.slice(0, 5).map((msg) => (
                        <div
                          key={msg._id}
                          className="flex items-center justify-between rounded-md border border-white/5 bg-white/5 p-4"
                        >
                          <div>
                            <p className="text-sm font-medium text-foreground">{msg.subject}</p>
                            <p className="text-xs text-muted-foreground">
                              {msg.name} ({msg.email}) · {formatDate(msg.createdAt)}
                            </p>
                          </div>
                          <span
                            className={`rounded-full px-2 py-1 text-xs ${
                              msg.read ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {msg.read ? "Read" : "Unread"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Projects Tab */}
            {activeTab === "projects" && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <select
                      value={projectFilter}
                      onChange={(e) => setProjectFilter(e.target.value)}
                      className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground focus:border-primary/50 focus:outline-none"
                    >
                      <option value="all">All Categories</option>
                      <option value="frontend">Frontend</option>
                      <option value="backend">Backend</option>
                      <option value="fullstack">Full-Stack</option>
                      <option value="ai-ml">AI/ML</option>
                      <option value="mobile">Mobile</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <button
                    onClick={() => setEditingProject(null)}
                    className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                  >
                    <Plus className="h-4 w-4" />
                    Add Project
                  </button>
                </div>

                {filteredProjects.length === 0 ? (
                  <p className="text-center text-sm text-muted-foreground">No projects found.</p>
                ) : (
                  <div className="space-y-3">
                    {filteredProjects.map((project) => (
                      <div
                        key={project._id}
                        className="rounded-lg border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-foreground">{project.title}</h3>
                              {project.featured && (
                                <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">
                                  Featured
                                </span>
                              )}
                              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-muted-foreground">
                                {project.category}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
                            {project.techStack.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {project.techStack.slice(0, 5).map((tech) => (
                                  <span
                                    key={tech}
                                    className="rounded bg-white/5 px-2 py-0.5 text-xs text-muted-foreground"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingProject(project)}
                              className="rounded-md p-2 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                              title="Edit"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project._id)}
                              className="rounded-md p-2 text-muted-foreground hover:bg-white/10 hover:text-red-400"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Messages Tab */}
            {activeTab === "messages" && (
              <motion.div
                key="messages"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex gap-2">
                  <button
                    onClick={() => setMessageFilter("all")}
                    className={`rounded-md px-3 py-2 text-sm ${
                      messageFilter === "all"
                        ? "bg-primary/20 text-primary"
                        : "bg-white/5 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    All ({messages.length})
                  </button>
                  <button
                    onClick={() => setMessageFilter("unread")}
                    className={`rounded-md px-3 py-2 text-sm ${
                      messageFilter === "unread"
                        ? "bg-primary/20 text-primary"
                        : "bg-white/5 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Unread ({messages.filter((m) => !m.read).length})
                  </button>
                </div>

                {filteredMessages.length === 0 ? (
                  <p className="text-center text-sm text-muted-foreground">No messages found.</p>
                ) : (
                  <div className="space-y-2">
                    {filteredMessages.map((msg) => (
                      <div
                        key={msg._id}
                        className={`rounded-lg border p-4 transition ${
                          msg.read
                            ? "border-white/5 bg-white/5"
                            : "border-primary/20 bg-primary/5"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              {!msg.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                              <h3 className="font-medium text-foreground">{msg.subject}</h3>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {msg.name} ({msg.email}) · {formatDate(msg.createdAt)}
                            </p>
                            <p className="mt-2 line-clamp-2 text-sm text-foreground">{msg.message}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setExpandedMessage(expandedMessage === msg._id ? null : msg._id)}
                              className="rounded-md p-2 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                              title={expandedMessage === msg._id ? "Collapse" : "Expand"}
                            >
                              {expandedMessage === msg._id ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              onClick={() => handleMarkRead(msg._id, !msg.read)}
                              className="rounded-md p-2 text-muted-foreground hover:bg-white/10 hover:text-green-400"
                              title={msg.read ? "Mark as unread" : "Mark as read"}
                            >
                              {msg.read ? (
                                <X className="h-4 w-4" />
                              ) : (
                                <Check className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              onClick={() => handleDeleteMessage(msg._id)}
                              className="rounded-md p-2 text-muted-foreground hover:bg-white/10 hover:text-red-400"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        {expandedMessage === msg._id && (
                          <div className="mt-3 rounded-md bg-white/5 p-4">
                            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                              {msg.message}
                            </p>
                            <div className="mt-3 flex gap-2">
                              <a
                                href={`mailto:${msg.email}`}
                                className="rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground transition hover:opacity-90"
                              >
                                Reply via Email
                              </a>
                              <button
                                onClick={() => setViewingMessage(msg)}
                                className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                              >
                                Full View
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Analytics Tab */}
            {activeTab === "analytics" && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {!analytics ? (
                  <p className="text-center text-sm text-muted-foreground">No analytics data available.</p>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                      <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                        <p className="text-xs text-muted-foreground">Total Visits</p>
                        <p className="mt-1 text-2xl font-semibold text-foreground">{analytics.totalVisits}</p>
                      </div>
                      <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                        <p className="text-xs text-muted-foreground">Today</p>
                        <p className="mt-1 text-2xl font-semibold text-foreground">{analytics.todayVisits}</p>
                      </div>
                      <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                        <p className="text-xs text-muted-foreground">This Week</p>
                        <p className="mt-1 text-2xl font-semibold text-foreground">{analytics.weekVisits}</p>
                      </div>
                      <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                        <p className="text-xs text-muted-foreground">This Month</p>
                        <p className="mt-1 text-2xl font-semibold text-foreground">{analytics.monthVisits}</p>
                      </div>
                      <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                        <p className="text-xs text-muted-foreground">Unique</p>
                        <p className="mt-1 text-2xl font-semibold text-foreground">{analytics.uniqueVisitors}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                        <h3 className="mb-4 text-sm font-semibold text-foreground">Browsers</h3>
                        {analytics.browserStats.map((stat) => (
                          <div key={stat._id} className="mb-2">
                            <div className="mb-1 flex justify-between text-xs">
                              <span className="text-muted-foreground">{stat._id}</span>
                              <span className="text-foreground">{stat.count}</span>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                              <div
                                className="h-full rounded-full bg-primary"
                                style={{
                                  width: `${analytics.totalVisits > 0 ? (stat.count / analytics.totalVisits) * 100 : 0}%`,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                        <h3 className="mb-4 text-sm font-semibold text-foreground">Devices</h3>
                        {analytics.deviceStats.map((stat) => (
                          <div key={stat._id} className="mb-2">
                            <div className="mb-1 flex justify-between text-xs">
                              <span className="text-muted-foreground">{stat._id}</span>
                              <span className="text-foreground">{stat.count}</span>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                              <div
                                className="h-full rounded-full bg-secondary"
                                style={{
                                  width: `${analytics.totalVisits > 0 ? (stat.count / analytics.totalVisits) * 100 : 0}%`,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                        <h3 className="mb-4 text-sm font-semibold text-foreground">Operating Systems</h3>
                        {analytics.osStats.map((stat) => (
                          <div key={stat._id} className="mb-2">
                            <div className="mb-1 flex justify-between text-xs">
                              <span className="text-muted-foreground">{stat._id}</span>
                              <span className="text-foreground">{stat.count}</span>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                              <div
                                className="h-full rounded-full bg-accent"
                                style={{
                                  width: `${analytics.totalVisits > 0 ? (stat.count / analytics.totalVisits) * 100 : 0}%`,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                        <h3 className="mb-4 text-sm font-semibold text-foreground">Top Pages</h3>
                        {analytics.pageStats.map((stat) => (
                          <div key={stat._id} className="mb-2">
                            <div className="mb-1 flex justify-between text-xs">
                              <span className="text-muted-foreground">{stat._id}</span>
                              <span className="text-foreground">{stat.count}</span>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                              <div
                                className="h-full rounded-full bg-primary"
                                style={{
                                  width: `${analytics.totalVisits > 0 ? (stat.count / analytics.totalVisits) * 100 : 0}%`,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                      <h3 className="mb-4 text-sm font-semibold text-foreground">Avg Session Duration</h3>
                      <p className="text-3xl font-semibold text-foreground">
                        {Math.round(analytics.avgSessionDuration)}s
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Modals */}
        {editingProject && (
          <ProjectForm
            project={editingProject}
            onSave={(project) => {
              if (editingProject._id) {
                setProjects((prev) => prev.map((p) => (p._id === project._id ? project : p)));
              } else {
                setProjects((prev) => [...prev, project]);
              }
              setEditingProject(null);
            }}
            onClose={() => setEditingProject(null)}
          />
        )}
        {viewingMessage && (
          <MessageDetail
            message={viewingMessage}
            onClose={() => setViewingMessage(null)}
          />
        )}
      </div>
    </>
  );
}
