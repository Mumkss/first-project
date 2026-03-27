"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.16 }}
      variants={revealItem}
      className={className}
    >
      {children}
    </motion.div>
  );
}
