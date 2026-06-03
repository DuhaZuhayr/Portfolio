import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
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

export default function ProjectsSection() {
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const apiRef = useRef<CarouselApi | null>(null);

  useEffect(() => {
    const api = apiRef.current;
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap() + 1);
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, []);

  return (
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
            <Carousel
              setApi={(api) => { apiRef.current = api; }}
              className="w-full"
            >
              <CarouselContent>
                {projects.map((project) => (
                  <CarouselItem key={project.title} className="md:basis-1/2">
                    <Card>
                      <CardHeader className="p-0">
                        <Link href={project.href} target="_blank">
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
  );
}
