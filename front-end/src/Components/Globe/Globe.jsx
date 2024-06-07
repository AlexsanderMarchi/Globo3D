import EarthComponent from "./Earth";
import styles from "./Globe.module.scss";
import { motion } from "framer-motion";

const Globe = () => {
  const motionProps = (initialX, finalX) => ({
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
    <section id="globe" className={styles.globe}>
      <motion.div {...motionProps(100, 0)}>
        <EarthComponent />
      </motion.div>
    </section>
  );
};

export default Globe;
