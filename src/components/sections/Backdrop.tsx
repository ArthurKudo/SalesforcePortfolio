import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export function Backdrop() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["0vh", reduced ? "0vh" : "120vh"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0vh", reduced ? "0vh" : "-60vh"]);
  const x1 = useTransform(scrollYProgress, [0, 0.5, 1], ["0vw", reduced ? "0vw" : "-18vw", "6vw"]);

  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop__grid" />
      <motion.div className="backdrop__glow backdrop__glow--a" style={{ y: y1, x: x1 }} />
      <motion.div className="backdrop__glow backdrop__glow--b" style={{ y: y2 }} />
    </div>
  );
}
