import { motion, useReducedMotion } from "motion/react";
import type { ElementType } from "react";

interface BlurTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  inView?: boolean;
  id?: string;
}

export function BlurText({ text, as: Tag = "span", className, delay = 0, stagger = 0.06, inView = false, id }: BlurTextProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const trigger = inView ? { whileInView: "show", viewport: { once: true, amount: 0.6 } } : { animate: "show" };

  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block whitespace-pre"
          initial={reduced ? false : "hidden"}
          {...trigger}
          variants={{
            hidden: { opacity: 0, y: "0.35em", filter: "blur(10px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: delay + i * stagger },
            },
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
