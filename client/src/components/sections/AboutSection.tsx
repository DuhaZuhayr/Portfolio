import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo, stats } from "@/lib/constants";
import Link from "next/link";

function FadeIn({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
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

export default function AboutSection() {
  return (
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
  );
}
