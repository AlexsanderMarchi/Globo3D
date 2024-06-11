"use client";

import { motion } from "framer-motion";
import Earth from "./Earth";

export default function Globo() {
  const motionProps = ( initialX:number , finalX:number ) => ({
    initial: { opacity: 0, x: initialX },
    whileInView: { opacity: 1, x: finalX },
    viewport: { once: true },
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1,
      delay: 0.1,
    },
  });

  return (
    <section id="globo" className="h-full w-full p-4">
      <motion.div className="h-full" {...motionProps(100, 0)}>
        <Earth />
      </motion.div>
    </section>
  );
};

