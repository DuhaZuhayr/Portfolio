import Container from "@/components/Container";
import { useEffect, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import ContactModal from "@/components/ContactModal";

const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });
import {
  ChevronRight,
  Code2,
  Brain,
  Database,
  Cpu,
  Server,
  GitBranch,
  Terminal,
  MonitorSmartphone,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function FadeIn({ children, delay = 0, ...props }: { children: React.ReactNode; delay?: number; [key: string]: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const personalInfo = {
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

const skillCategories = [
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

const experiences = [
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

const stats = [
  { label: "Projects Built", value: "20+" },
  { label: "Technologies", value: "15+" },
  { label: "GitHub Repos", value: "30+" },
  { label: "Certifications", value: "8+" }
];

const projects = [
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

const services = [
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

function Gradient() {
  return (
    <>
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]" viewBox="0 0 1155 678">
          <path fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)" fillOpacity=".1" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z" />
          <defs>
            <linearGradient id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]" viewBox="0 0 1155 678">
          <path fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)" fillOpacity=".1" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z" />
          <defs>
            <linearGradient id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!carouselApi) return;
    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);
    carouselApi.on("select", () => setCurrent(carouselApi.selectedScrollSnap() + 1));
  }, [carouselApi]);

  return (
    <Container>
      <Gradient />

      {/* Intro */}
      <section id="home" className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between">
        <div className={styles.intro}>
          <FadeIn>
            <div className="flex flex-row items-center space-x-1.5">
              <span className={styles.pill}>next.js</span>
              <span className={styles.pill}>tailwindcss</span>
              <span className={styles.pill}>typescript</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div>
              <h1>
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Hello, I&apos;m
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                  {personalInfo.name}.
                </span>
              </h1>
              <p className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl">
                {personalInfo.bio}
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-row items-center space-x-1.5 pt-6">
              <Button onClick={() => setIsContactOpen(true)}>
                Get in touch <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => scrollTo(document.querySelector("#about"))}>
                Learn more
              </Button>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className={cn(styles.scroll, isScrolled && styles["scroll--hidden"])}>
              Scroll to discover{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={0.4} className="mt-14 flex h-[350px] w-full items-center justify-center xl:mt-0 xl:h-[500px] xl:w-1/2 relative">
          <Image
            src="/assets/duha_image.jpeg"
            alt="Duha"
            width={500}
            height={500}
            className="h-full w-full rounded-xl object-cover"
          />
        </FadeIn>
      </section>

      {/* About */}
      <section id="about" className="my-14 flex max-w-6xl flex-col justify-start space-y-10">
        <FadeIn>
          <h2 className="py-16 pb-2 text-3xl font-light leading-normal tracking-tighter text-foreground xl:text-[40px]">
            I&apos;m a {personalInfo.roles[0]} proficient in{" "}
            <Link href="https://nextjs.org/" target="_blank" className="underline">
              TypeScript, Tailwind, and Next.js
            </Link>{" "}
            with a passion for building elegant software solutions. My experience spans from startups to academic research, where I&apos;ve been instrumental in the entire product design process; from ideation and wireframing, through prototyping, to the delivery of the final product, all while efficiently collaborating with cross-functional teams.
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-2 gap-8 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center xl:items-start xl:text-start">
                <span className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-6xl">{stat.value}</span>
                <span className="tracking-tight text-muted-foreground xl:text-lg">{stat.label}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Skills */}
      <section id="skills" className="my-24 flex max-w-6xl flex-col justify-start space-y-10">
        <FadeIn>
          <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">🛠️ Skills</span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">Technologies I work with.</h2>
        </FadeIn>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {skillCategories.map((category, i) => (
            <FadeIn key={category.title} delay={0.1 * i}>
              <div className="flex flex-col rounded-md bg-white/5 p-6 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md">
                <div className="mb-4 flex items-center space-x-2">
                  <category.icon className="text-primary" size={20} />
                  <span className="text-lg font-semibold tracking-tight text-foreground">{category.title}</span>
                </div>
                <div className="flex flex-col space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="text-muted-foreground">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500" style={{ width: `${skill.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative isolate">
        <div className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} />
        </div>
        <div className="my-64">
          <FadeIn>
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">✨ Projects</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">Streamlined digital experiences.</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;ve worked on a variety of projects, from small websites to large-scale web applications. Here are some of my favorites:
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-14">
              <Carousel setApi={setCarouselApi} className="w-full">
                <CarouselContent>
                  {projects.map((project) => (
                    <CarouselItem key={project.title} className="md:basis-1/2">
                      <Card>
                        <CardHeader className="p-0">
                          <Link href={project.href} target="_blank" passHref>
                            <Image src={project.image} alt={project.title} width={800} height={450} className="aspect-video h-full w-full rounded-t-md bg-primary object-cover" />
                          </Link>
                        </CardHeader>
                        <CardContent className="absolute bottom-0 w-full bg-background/50 backdrop-blur">
                          <CardTitle className="border-t border-white/5 p-4 text-base font-normal tracking-tighter">
                            {project.description}
                          </CardTitle>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="py-2 text-center text-sm text-muted-foreground">
                <span className="font-semibold">{current} / {count}</span> projects
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="my-24 flex max-w-6xl flex-col justify-start space-y-10">
        <FadeIn>
          <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">📋 Experience</span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">My journey so far.</h2>
        </FadeIn>
        <div className="flex flex-col space-y-6">
          {experiences.map((exp, i) => (
            <FadeIn key={exp.title} delay={0.1 * i}>
              <div className="flex flex-col rounded-md bg-white/5 p-6 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md">
                <div className="mb-3 flex items-center space-x-3">
                  <span className="text-2xl">{exp.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground">{exp.company} · {exp.date}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="my-24 flex flex-col justify-start space-y-10">
        <FadeIn>
          <h2 className="text-4xl font-medium tracking-tight">
            Need more info?
            <br />
            <span className="text-gradient clash-grotesk tracking-normal">I got you.</span>
          </h2>
          <p className="mt-2 tracking-tighter text-secondary-foreground">
            Here are some of the services I offer. If you have any questions, feel free to reach out.
          </p>
        </FadeIn>
        <div className="grid items-center gap-1.5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, i) => (
            <FadeIn key={service.service} delay={0.1 * i}>
              <div className="flex flex-col items-start rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md">
                <service.icon className="my-6 text-primary" size={20} />
                <span className="text-lg tracking-tight text-foreground">{service.service}</span>
                <span className="mt-2 tracking-tighter text-muted-foreground">{service.description}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="my-64">
        <FadeIn>
          <div className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24">
            <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
              Let&apos;s work{" "}
              <span className="text-gradient clash-grotesk">together.</span>
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;m currently available for freelance work and open to discussing new projects.
            </p>
            <div className="mt-6 flex flex-row items-center space-x-4">
              <Button onClick={() => setIsContactOpen(true)}>
                Get in touch <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <Link href={personalInfo.social.github} target="_blank" passHref>
                <Button variant="outline">GitHub</Button>
              </Link>
              <Link href={personalInfo.social.linkedin} target="_blank" passHref>
                <Button variant="outline">LinkedIn</Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
      
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </Container>
  );
}
