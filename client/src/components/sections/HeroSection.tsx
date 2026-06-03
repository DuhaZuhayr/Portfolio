import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { personalInfo } from "@/lib/constants";
import styles from "@/styles/Home.module.css";

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

interface HeroSectionProps {
  isScrolled: boolean;
  onContactClick: () => void;
}

export default function HeroSection({ isScrolled, onContactClick }: HeroSectionProps) {
  return (
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
            <Button onClick={onContactClick}>
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
  );
}
