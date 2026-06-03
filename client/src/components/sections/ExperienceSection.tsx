import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experiences } from "@/lib/constants";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ExperienceSection() {
  return (
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
  );
}
