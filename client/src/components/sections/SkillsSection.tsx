import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skillCategories } from "@/lib/constants";

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

export default function SkillsSection() {
  return (
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
  );
}
