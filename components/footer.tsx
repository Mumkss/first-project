"use client";

import { motion } from "framer-motion";
import { revealItem } from "@/components/reveal";

export type FooterContent = {
  eyebrow: string;
  titleLines: [string, string];
  links: {
    linkedin: string;
    email: string;
  };
};

export function Footer({
  content,
}: {
  content: FooterContent;
}) {
  return (
    <footer
      id="contact"
      className="relative px-6 pb-24 pt-20 sm:px-8 lg:px-12 lg:pb-36 lg:pt-28"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
        className="mx-auto max-w-7xl border-t border-[color:rgba(255,255,255,0.06)] pt-18 lg:pt-20"
      >
        <motion.div
          variants={revealItem}
          className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.75 }}
            whileInView={{ opacity: 0.24, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute -left-10 top-2 hidden h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(88,118,216,0.18),transparent_68%)] blur-2xl lg:block"
          />
          <motion.span
            initial={{ opacity: 0, scale: 0.55 }}
            whileInView={{ opacity: [0, 0.5, 1], scale: [0.55, 1.7, 1] }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.68, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute -left-3 top-5 hidden h-2.5 w-2.5 rounded-full bg-[rgba(188,204,255,0.96)] shadow-[0_0_0_12px_rgba(88,118,216,0.10)] lg:block"
          />
          <div className="space-y-4">
            <p className="type-label text-[var(--muted)]">
              {content.eyebrow}
            </p>
            <h2
              data-path-anchor="footer-cta"
              data-path-anchor-x="0.02"
              data-path-anchor-y="0.24"
              className="type-h2 max-w-3xl font-semibold text-white"
            >
              <span className="section-display-line">{content.titleLines[0]}</span>
              <span className="section-display-line">{content.titleLines[1]}</span>
            </h2>
          </div>
          <div className="flex flex-col gap-3 text-sm text-[var(--muted)] sm:flex-row sm:gap-6">
            <a
              href="https://www.linkedin.com/in/marcin-jankiewicz-89841588/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-white"
            >
              {content.links.linkedin}
            </a>
            <a
              href={`mailto:${content.links.email}`}
              className="transition-colors duration-300 hover:text-white"
            >
              {content.links.email}
            </a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
