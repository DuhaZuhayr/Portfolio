import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Brain,
  Database,
  Cpu,
  Server,
  GitBranch,
  Terminal,
  MonitorSmartphone,
} from "lucide-react";

export interface PersonalInfo {
  name: string;
  fullName: string;
  roles: string[];
  email: string;
  location: string;
  bio: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  color: string;
  skills: Skill[];
}

export interface Experience {
  title: string;
  company: string;
  date: string;
  description: string;
  icon: string;
  type: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface Service {
  service: string;
  description: string;
  icon: LucideIcon;
}

export const personalInfo: PersonalInfo = {
  name: "Duha",
  fullName: "Duha",
  roles: [
    "Computer Science Student",
    "Full-Stack Developer",
    "AI / ML Enthusiast",
    "Open Source Contributor",
    "Problem Solver"
  ],
  email: "duha@example.com",
  location: "India",
  bio: "Passionate Computer Science student with a deep love for building elegant software solutions. I specialize in full-stack development and artificial intelligence, constantly pushing the boundaries of what's possible with code.",
  social: {
    github: "https://github.com/duha",
    linkedin: "https://linkedin.com/in/duha",
    twitter: "https://twitter.com/duha",
  }
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: Code2,
    color: "#6C63FF",
    skills: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Framer Motion", level: 78 },
      { name: "HTML/CSS", level: 95 },
    ]
  },
  {
    title: "Backend",
    icon: Database,
    color: "#00D4FF",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 85 },
      { name: "Python", level: 82 },
      { name: "FastAPI", level: 75 },
      { name: "MongoDB", level: 80 },
      { name: "PostgreSQL", level: 72 },
    ]
  },
  {
    title: "AI / ML",
    icon: Brain,
    color: "#A855F7",
    skills: [
      { name: "TensorFlow", level: 75 },
      { name: "PyTorch", level: 70 },
      { name: "scikit-learn", level: 80 },
      { name: "NLP", level: 68 },
      { name: "Computer Vision", level: 65 },
      { name: "OpenAI API", level: 82 },
    ]
  },
  {
    title: "Tools & DevOps",
    icon: Cpu,
    color: "#EC4899",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "Docker", level: 75 },
      { name: "Linux", level: 78 },
      { name: "AWS", level: 65 },
      { name: "CI/CD", level: 70 },
      { name: "VS Code", level: 95 },
    ]
  }
];

export const experiences: Experience[] = [
  {
    title: "Full-Stack Development Intern",
    company: "Tech Solutions Inc.",
    date: "Jun 2025 - Aug 2025",
    description: "Built scalable web applications using React and Node.js. Implemented RESTful APIs and integrated third-party services. Improved application performance by 40% through code optimization.",
    icon: "💼",
    type: "work"
  },
  {
    title: "Smart India Hackathon — Finalist",
    company: "Government of India",
    date: "Dec 2024",
    description: "Led a team of 6 to develop an AI-powered solution for real-time traffic management. Reached national finals competing against 500+ teams across India.",
    icon: "🏆",
    type: "achievement"
  },
  {
    title: "Research Paper Published",
    company: "IEEE Conference",
    date: "Oct 2024",
    description: "Published a research paper on 'Federated Learning for Privacy-Preserving Healthcare Data Analysis' at an IEEE international conference.",
    icon: "📄",
    type: "research"
  },
  {
    title: "Open Source Contributor",
    company: "Hacktoberfest 2024",
    date: "Oct 2024",
    description: "Contributed to 8+ open-source projects during Hacktoberfest. Merged PRs in projects with 1000+ stars. Earned the Hacktoberfest badge.",
    icon: "🌟",
    type: "achievement"
  },
  {
    title: "Machine Learning Specialization",
    company: "Stanford Online (Coursera)",
    date: "Jul 2024",
    description: "Completed Andrew Ng's Machine Learning Specialization covering supervised learning, unsupervised learning, recommender systems, and reinforcement learning.",
    icon: "🎓",
    type: "certification"
  },
  {
    title: "B.Tech Computer Science",
    company: "University",
    date: "2022 - 2026",
    description: "Pursuing B.Tech in Computer Science & Engineering. CGPA: 8.5/10. Key coursework: Data Structures, Algorithms, DBMS, OS, AI/ML, Computer Networks.",
    icon: "🎓",
    type: "education"
  }
];

export const stats: Stat[] = [
  { label: "Projects Built", value: "20+" },
  { label: "Technologies", value: "15+" },
  { label: "GitHub Repos", value: "30+" },
  { label: "Certifications", value: "8+" }
];

export const projects: Project[] = [
  {
    title: "AI-Powered Portfolio",
    description: "Modern developer portfolio built with Next.js, Tailwind CSS, and Framer Motion animations.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
    href: "https://github.com/duha",
  },
  {
    title: "ML Research Platform",
    description: "Research platform for publishing and collaborating on machine learning papers.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop",
    href: "https://github.com/duha",
  },
  {
    title: "DevOps Dashboard",
    description: "Real-time monitoring dashboard for CI/CD pipelines and container orchestration.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    href: "https://github.com/duha",
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration and admin dashboard.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop",
    href: "https://github.com/duha",
  },
  {
    title: "This Website",
    description: "Personal portfolio website built with Next.js and shadcn/ui components.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=450&fit=crop",
    href: "https://github.com/duha",
  },
];

export const services: Service[] = [
  {
    service: "Frontend Development",
    description: "Creating stellar user interfaces and web experiences using the latest technologies.",
    icon: Code2,
  },
  {
    service: "Full-Stack Development",
    description: "Building end-to-end web applications with modern frameworks and cloud services.",
    icon: MonitorSmartphone,
  },
  {
    service: "AI / ML Solutions",
    description: "Developing intelligent systems using machine learning, NLP, and computer vision.",
    icon: Brain,
  },
  {
    service: "Backend Development",
    description: "Developing robust, scalable server-side logic for a wide range of web applications.",
    icon: Server,
  },
  {
    service: "DevOps & Cloud",
    description: "Setting up CI/CD pipelines, containerization, and cloud infrastructure for deployment.",
    icon: GitBranch,
  },
  {
    service: "API Design",
    description: "Designing and implementing RESTful and GraphQL APIs for seamless integrations.",
    icon: Terminal,
  },
];
