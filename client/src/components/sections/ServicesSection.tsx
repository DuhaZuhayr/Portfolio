import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { services } from "@/lib/constants";

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
    >
      {children}
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
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
  );
}
