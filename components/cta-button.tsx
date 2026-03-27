"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  variant?: "primary" | "secondary";
};

export function CtaButton({
  href,
  children,
  external = false,
  variant = "primary",
}: CtaButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const isNative = external || href.startsWith("mailto:") || href.startsWith("http");

  const innerClassName =
    variant === "primary"
      ? "type-button relative inline-flex items-center justify-center overflow-hidden rounded-full border border-[color:rgba(78,113,214,0.42)] bg-[linear-gradient(135deg,rgba(47,74,143,0.28),rgba(31,46,88,0.22))] px-6 py-3 text-white shadow-[0_0_0_1px_rgba(78,113,214,0.14),0_14px_36px_rgba(6,10,20,0.42)]"
      : "type-button relative inline-flex items-center justify-center overflow-hidden rounded-full border border-[color:var(--border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] px-6 py-3 text-[var(--muted-strong)] shadow-[0_10px_26px_rgba(0,0,0,0.16)]";

  const hoverAnimation = prefersReducedMotion
    ? undefined
    : variant === "primary"
      ? {
          y: -2,
          scale: 1.01,
          boxShadow:
            "0 0 0 1px rgba(94,130,235,0.2), 0 18px 42px rgba(6,10,20,0.5)",
        }
      : {
          y: -1.5,
          scale: 1.01,
          boxShadow:
            "0 0 0 1px rgba(78,113,214,0.12), 0 18px 36px rgba(0,0,0,0.24)",
        };

  const content = (
    <motion.span
      initial={false}
      whileHover={hoverAnimation}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.99, y: 0 }}
      transition={
        prefersReducedMotion
          ? undefined
          : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
      }
      className={innerClassName}
      style={{ willChange: "transform" }}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-full opacity-0 transition duration-300 group-hover:opacity-100 ${
          variant === "primary"
            ? "bg-[radial-gradient(circle_at_top,rgba(124,156,255,0.18),transparent_68%)]"
            : "bg-[radial-gradient(circle_at_top,rgba(88,118,216,0.12),transparent_72%)]"
        }`}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full border border-white/0 opacity-0 transition duration-300 group-hover:opacity-100 group-hover:border-white/10"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-[135%] bg-[linear-gradient(115deg,transparent,rgba(255,255,255,0.16),transparent)] transition-transform duration-700 ease-out group-hover:translate-x-[135%]"
      />
      <span className="relative z-10">{children}</span>
    </motion.span>
  );

  if (isNative) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="group inline-flex rounded-full"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="group inline-flex rounded-full">
      {content}
    </Link>
  );
}
