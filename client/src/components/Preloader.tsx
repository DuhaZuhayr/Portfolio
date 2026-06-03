import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const slideUp = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const words = ["Hello", "Bonjour", "Ciao", "Olà", "Hallå", "Hallo"];

export default function Preloader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index === words.length - 1) return;
    const timer = setTimeout(() => setIndex(index + 1), 150);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 z-[99] flex items-center justify-center bg-[hsl(240_27.9%_5.7%)]"
    >
      <motion.p
        variants={slideUp}
        initial="initial"
        animate="animate"
        className="flex items-center text-4xl font-semibold text-white"
      >
        <span className="mr-2.5 h-2.5 w-2.5 rounded-full bg-white" />
        {words[index]}
      </motion.p>
    </motion.div>
  );
}
