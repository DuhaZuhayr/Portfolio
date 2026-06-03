import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { personalInfo } from "@/lib/constants";
import Link from "next/link";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
}

function FadeIn({ children, delay = 0 }: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

interface ContactSectionProps {
  onContactClick: () => void;
}

export default function ContactSection({ onContactClick }: ContactSectionProps) {
  return (
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
            <Button onClick={onContactClick}>
              Get in touch <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
            <Link href={personalInfo.social.github} target="_blank">
              <Button variant="outline">GitHub</Button>
            </Link>
            <Link href={personalInfo.social.linkedin} target="_blank">
              <Button variant="outline">LinkedIn</Button>
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
