"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { revealItem } from "@/components/reveal";

type SectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: SectionProps) {
  return (
    <section id={id} className="px-6 py-22 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.14 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="mx-auto max-w-6xl space-y-14"
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(180px,220px)_minmax(0,1fr)] lg:gap-14">
          <motion.div variants={revealItem}>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
              {eyebrow}
            </p>
          </motion.div>
          <motion.div variants={revealItem} className="space-y-4">
            <h2 className="max-w-4xl text-3xl font-semibold tracking-[-0.06em] text-white sm:text-4xl lg:text-[3.4rem] lg:leading-[0.98]">
              {title}
            </h2>
            <p className="max-w-2xl text-base leading-8 text-[var(--muted-strong)] sm:text-lg">
              {description}
            </p>
          </motion.div>
        </div>
        {children ? <motion.div variants={revealItem}>{children}</motion.div> : null}
      </motion.div>
    </section>
  );
}
