"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  years: string;
  kind: "product" | "delivery";
  summary?: string;
};

export type SelectedExperienceContent = {
  eyebrow: string;
  titleLines: [string, string];
  flagshipLabel: string;
  foundationLabel: string;
  foundationItems: string;
  items: ExperienceItem[];
};

const eyebrowVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const headlineVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.54,
      delay: 0.06,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const flagshipVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.62,
      delay: 0.18,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const rowIntroVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.44,
      delay: 0.32 + index * 0.09,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function SelectedExperience({
  content,
}: {
  content: SelectedExperienceContent;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [activationTick, setActivationTick] = useState(0);
  const initializedRef = useRef(false);

  const flagship = content.items[0];
  const rows = content.items.slice(1);

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      return;
    }
    setActivationTick((value) => value + 1);
  }, [activeIndex]);

  return (
    <section
      id="experience"
      className="relative isolate px-6 py-22 sm:px-8 sm:py-26 lg:px-12 lg:py-32 xl:py-40"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        className="relative z-10 mx-auto max-w-7xl xl:grid xl:grid-cols-[minmax(280px,0.92fr)_minmax(0,1.08fr)] xl:gap-[4.75rem]"
      >
        <div className="xl:sticky xl:top-28 xl:self-start">
          <motion.p
            variants={eyebrowVariants}
            className="type-label text-[var(--muted)]"
          >
            {content.eyebrow}
          </motion.p>
          <motion.h2
            variants={headlineVariants}
            className="type-h2 mt-6 font-semibold text-white"
          >
            <span className="section-display-line">{content.titleLines[0]}</span>
            <span className="section-display-line">{content.titleLines[1]}</span>
          </motion.h2>
        </div>

        <div className="relative mt-12 space-y-4 sm:mt-14 xl:mt-0">
          {flagship ? (
            <FlagshipCard
              item={flagship}
              flagshipLabel={content.flagshipLabel}
              index={0}
              active={activeIndex === 0}
              activationTick={activationTick}
              prefersReducedMotion={prefersReducedMotion}
              onActivate={setActiveIndex}
            />
          ) : null}

          <div className="space-y-3 pt-2">
            {rows.map((row, index) => (
              <RoleRow
                key={row.id}
                item={row}
                index={index + 1}
                delayIndex={index}
                active={activeIndex === index + 1}
                activationTick={activationTick}
                prefersReducedMotion={prefersReducedMotion}
                onActivate={setActiveIndex}
              />
            ))}

            <motion.article
              custom={rows.length}
              variants={rowIntroVariants}
              className="relative overflow-hidden rounded-[22px] border border-white/[0.03] bg-white/[0.02] px-5 py-4 sm:px-6"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="type-meta text-[var(--muted)]">
                  {content.foundationLabel}
                </p>
                <p className="type-body text-[var(--muted)]">
                  {content.foundationItems}
                </p>
              </div>
            </motion.article>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function FlagshipCard({
  item,
  flagshipLabel,
  index,
  active,
  activationTick,
  prefersReducedMotion,
  onActivate,
}: {
  item: ExperienceItem;
  flagshipLabel: string;
  index: number;
  active: boolean;
  activationTick: number;
  prefersReducedMotion: boolean | null;
  onActivate: (index: number) => void;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, {
    margin: "-42% 0px -42% 0px",
    amount: 0.45,
  });

  useEffect(() => {
    if (inView) onActivate(index);
  }, [inView, index, onActivate]);

  return (
    <motion.article
      ref={ref}
      variants={flagshipVariants}
      className="relative overflow-hidden rounded-[34px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(16,18,25,0.82),rgba(11,12,18,0.9))] px-6 py-6 shadow-[0_28px_90px_rgba(0,0,0,0.18)] sm:px-8 sm:py-7"
      style={{ willChange: "transform, opacity" }}
    >
      <motion.span
        aria-hidden
        initial={prefersReducedMotion ? false : { opacity: 0, x: "-120%" }}
        whileInView={
          prefersReducedMotion
            ? undefined
            : { opacity: [0, 0.3, 0], x: ["-120%", "10%", "120%"] }
        }
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.7,
          delay: 0.32,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute inset-y-0 left-[-18%] w-[38%] -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)]"
      />

      <span className="pointer-events-none absolute left-8 top-10 h-8 w-8 rounded-full bg-[rgba(88,118,216,0.14)]" />
      {active ? (
        <motion.span
          key={`flagship-flash-${activationTick}`}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: [0, 0.24, 0], scale: [0.7, 1.7, 2] }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute left-8 top-10 h-8 w-8 rounded-full border border-[rgba(170,196,255,0.32)]"
        />
      ) : null}
      <span className="pointer-events-none absolute left-11 top-13 h-2 w-2 rounded-full bg-[rgba(220,230,255,0.98)] shadow-[0_0_0_10px_rgba(88,118,216,0.16),0_0_28px_rgba(88,118,216,0.18)]" />

      <motion.div
        initial={false}
        animate={
          active
            ? { opacity: 1, y: 0, scale: 1.008 }
            : { opacity: 0.92, y: 2, scale: 1 }
        }
        transition={{
          duration: prefersReducedMotion ? 0 : 0.42,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="ml-7 sm:ml-9"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <p className="type-label text-[var(--muted)]">
              {flagshipLabel}
            </p>
            <div className="space-y-1">
              <h3 className="type-h3 font-semibold text-white sm:text-[2rem]">
                {item.company}
              </h3>
              <p className="type-meta text-[var(--muted-strong)]">
                {item.role}
              </p>
            </div>
          </div>
          <p className="type-meta text-[var(--muted)]">
            {item.years}
          </p>
        </div>

        <p className="section-copy-block mt-6 max-w-[34rem] text-[var(--muted-strong)]">
          {item.summary}
        </p>
      </motion.div>
    </motion.article>
  );
}

function RoleRow({
  item,
  index,
  delayIndex,
  active,
  activationTick,
  prefersReducedMotion,
  onActivate,
}: {
  item: ExperienceItem;
  index: number;
  delayIndex: number;
  active: boolean;
  activationTick: number;
  prefersReducedMotion: boolean | null;
  onActivate: (index: number) => void;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, {
    margin: "-42% 0px -42% 0px",
    amount: 0.5,
  });

  useEffect(() => {
    if (inView) onActivate(index);
  }, [inView, index, onActivate]);

  const isProductRole = item.kind === "product";
  const inactiveOpacity = isProductRole ? 0.82 : 0.74;

  return (
    <motion.article
      ref={ref}
      custom={delayIndex}
      variants={rowIntroVariants}
      className="relative overflow-hidden rounded-[26px] border border-white/[0.04] bg-[linear-gradient(180deg,rgba(14,16,22,0.54),rgba(10,11,16,0.64))] px-5 py-4 shadow-[0_14px_44px_rgba(0,0,0,0.12)] sm:px-6"
      style={{ willChange: "transform, opacity" }}
    >
      <motion.span
        initial={false}
        animate={active ? { opacity: 0.32, scaleY: 1 } : { opacity: 0, scaleY: 0.72 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.26,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute left-6 top-4 h-16 w-px origin-top bg-[linear-gradient(180deg,rgba(148,176,255,0.44),transparent)] sm:left-7"
      />
      {active ? (
        <motion.span
          key={`row-flash-${item.company}-${activationTick}`}
          initial={{ opacity: 0, scale: 0.65 }}
          animate={{ opacity: [0, 0.2, 0], scale: [0.65, 1.55, 1.8] }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute left-[1.22rem] top-[1.1rem] h-5 w-5 rounded-full border border-[rgba(170,196,255,0.26)] sm:left-[1.48rem]"
        />
      ) : null}
      <motion.span
        initial={false}
        animate={
          active
            ? { opacity: 1, scale: [1, 1.35, 1] }
            : { opacity: 0.82, scale: 1 }
        }
        transition={{
          duration: prefersReducedMotion ? 0 : active ? 0.3 : 0.22,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute left-6 top-6 h-1 w-1 rounded-full bg-white/80 sm:left-7"
      />

      <motion.div
        initial={false}
        animate={
          active
            ? { opacity: 1, y: 0, scale: 1.01 }
            : { opacity: inactiveOpacity, y: 3, scale: 1 }
        }
        transition={{
          duration: prefersReducedMotion ? 0 : 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="ml-5 flex flex-col gap-3 sm:ml-6 md:flex-row md:items-start md:justify-between"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h3
              className={`font-semibold ${
                isProductRole
                  ? "type-h3 text-white/88 sm:text-[1.7rem]"
                  : "type-h3 text-white/76 sm:text-[1.55rem]"
              }`}
            >
              {item.company}
            </h3>
            <p className="type-meta text-[var(--muted)]">
              {item.role}
            </p>
          </div>
          <p className="type-body text-[var(--muted)]">
            {item.summary}
          </p>
        </div>

        <p className="type-meta shrink-0 text-[var(--muted)]">
          {item.years}
        </p>
      </motion.div>
    </motion.article>
  );
}
