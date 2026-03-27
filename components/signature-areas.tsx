"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import type { MouseEvent } from "react";

type SignatureItem = {
  id: string;
  title: string;
  sentenceLines: string[];
};

type SignatureParagraph = {
  id: string;
  lines: string[];
};

export type SignatureAreasContent = {
  titleLines: [string, string];
  intro: SignatureParagraph[];
  items: SignatureItem[];
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
      when: "beforeChildren",
      staggerChildren: 0.14,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  hover: {
    scale: 1.01,
    y: -4,
    transition: {
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function SignatureAreas({
  content,
}: {
  content: SignatureAreasContent;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="impact"
      className="relative px-6 py-30 sm:px-8 sm:py-34 lg:px-12 lg:py-44"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        variants={sectionVariants}
        className="relative mx-auto max-w-7xl"
      >
        <div className="relative z-10">
          <div className="max-w-[760px]">
            <motion.h2
              data-path-anchor="signature-title"
              data-path-anchor-x="0.14"
              data-path-anchor-y="0.9"
              className="type-h2 text-white"
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: {
                      duration: 0.72,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                className="section-display-line"
              >
                {content.titleLines[0]}
              </motion.span>
              <motion.span
                initial={{
                  opacity: 0,
                  y: 20,
                  filter: "blur(8px)",
                  backgroundPosition: "120% 50%",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  backgroundPosition: "0% 50%",
                }}
                viewport={{ once: true, amount: 0.9 }}
                transition={{
                  opacity: {
                    delay: 0.22,
                    duration: 0.72,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  y: {
                    delay: 0.22,
                    duration: 0.72,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  filter: {
                    delay: 0.22,
                    duration: 0.72,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  backgroundPosition: {
                    delay: 0.28,
                    duration: 1.8,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                className="section-display-line bg-[linear-gradient(90deg,#f3f4f6_0%,#9cb4ff_35%,#f3f4f6_70%)] bg-[length:200%_100%] bg-clip-text text-transparent"
              >
                {content.titleLines[1]}
              </motion.span>
            </motion.h2>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.16,
                    duration: 0.72,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              className="section-copy-block mt-10 max-w-[38rem] space-y-5 text-[var(--muted-strong)]"
            >
              {content.intro.map((paragraph) => (
                <p key={paragraph.id}>
                  {paragraph.lines.map((line, index) => (
                    <span key={`${paragraph.id}-${line}`}>
                      {line}
                      {index < paragraph.lines.length - 1 ? (
                        <>
                          <span className="md:hidden"> </span>
                          <br className="hidden md:block" />
                        </>
                      ) : null}
                    </span>
                  ))}
                </p>
              ))}
            </motion.div>
          </div>

          <div className="relative mt-16 lg:mt-20">
            <div className="pointer-events-none absolute inset-x-[4%] top-8 hidden h-[300px] xl:block">
              <svg
                viewBox="0 0 1600 320"
                preserveAspectRatio="none"
                className="h-full w-full"
                aria-hidden
              >
                <motion.path
                  d="M 236 182 C 300 140, 372 138, 438 170"
                  fill="none"
                  stroke="rgba(88,118,216,0.18)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.42 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.72,
                    delay: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
                <motion.path
                  d="M 236 182 C 300 140, 372 138, 438 170"
                  fill="none"
                  stroke="rgba(88,118,216,0.12)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.08 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.72,
                    delay: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ filter: "blur(10px)" }}
                />
                <motion.path
                  d="M 636 198 C 700 154, 772 148, 840 166"
                  fill="none"
                  stroke="rgba(88,118,216,0.18)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.42 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.72,
                    delay: 0.38,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
                <motion.path
                  d="M 636 198 C 700 154, 772 148, 840 166"
                  fill="none"
                  stroke="rgba(88,118,216,0.12)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.08 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.72,
                    delay: 0.38,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ filter: "blur(10px)" }}
                />
                <motion.path
                  d="M 1038 180 C 1104 140, 1176 138, 1242 168"
                  fill="none"
                  stroke="rgba(88,118,216,0.18)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.42 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.72,
                    delay: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
                <motion.path
                  d="M 1038 180 C 1104 140, 1176 138, 1242 168"
                  fill="none"
                  stroke="rgba(88,118,216,0.12)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.08 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.72,
                    delay: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ filter: "blur(10px)" }}
                />
              </svg>
            </div>

            <motion.div
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    delayChildren: 0.14,
                    staggerChildren: 0.14,
                  },
                },
              }}
              className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4"
            >
              {content.items.map((item, index) => (
                <SignalCard
                  key={item.id}
                  item={item}
                  index={index}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function SignalCard({
  item,
  index,
  prefersReducedMotion,
}: {
  item: SignatureItem;
  index: number;
  prefersReducedMotion: boolean | null;
}) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const glowX = useMotionValue(160);
  const glowY = useMotionValue(120);

  const springX = useSpring(rawX, {
    stiffness: 140,
    damping: 18,
    mass: 0.45,
  });
  const springY = useSpring(rawY, {
    stiffness: 140,
    damping: 18,
    mass: 0.45,
  });
  const glowSpringX = useSpring(glowX, {
    stiffness: 180,
    damping: 22,
    mass: 0.4,
  });
  const glowSpringY = useSpring(glowY, {
    stiffness: 180,
    damping: 22,
    mass: 0.4,
  });

  const rotateX = useTransform(springY, [-1, 1], [0.8, -0.8]);
  const rotateY = useTransform(springX, [-1, 1], [-1, 1]);
  const shiftX = useTransform(springX, [-1, 1], [-3, 3]);
  const shiftY = useTransform(springY, [-1, 1], [-2.5, 2.5]);
  const innerGlow = useMotionTemplate`radial-gradient(220px circle at ${glowSpringX}px ${glowSpringY}px, rgba(88,118,216,0.14), transparent 72%)`;

  function handlePointerMove(event: MouseEvent<HTMLElement>) {
    if (prefersReducedMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    rawX.set((px - 0.5) * 2);
    rawY.set((py - 0.5) * 2);
    glowX.set(px * rect.width);
    glowY.set(py * rect.height);
  }

  function handlePointerLeave() {
    rawX.set(0);
    rawY.set(0);
    glowX.set(160);
    glowY.set(120);
  }

  return (
    <motion.article
      variants={cardVariants}
      whileHover={prefersReducedMotion ? undefined : "hover"}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      data-path-anchor={`signature-${index + 1}`}
      data-path-anchor-x="0.5"
      data-path-anchor-y="0.52"
      style={
        prefersReducedMotion
          ? undefined
          : {
              x: shiftX,
              y: shiftY,
              rotateX,
              rotateY,
              transformPerspective: 1200,
              transformStyle: "preserve-3d",
            }
      }
      className={`group relative rounded-[30px] p-px ${
        index === 1
          ? "xl:translate-y-10"
          : index === 2
            ? "xl:translate-y-4"
            : index === 3
              ? "xl:translate-y-12"
              : ""
      }`}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 0.28 },
          hover: { opacity: 1 },
        }}
        className="pointer-events-none absolute inset-0 rounded-[30px] bg-[linear-gradient(135deg,rgba(88,118,216,0.44),rgba(255,255,255,0.08)_35%,rgba(88,118,216,0.08)_75%,rgba(255,255,255,0.04))]"
      />
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        className="pointer-events-none absolute -inset-5 rounded-[36px] bg-[radial-gradient(circle_at_top,rgba(88,118,216,0.18),transparent_62%)] blur-2xl"
      />

      <div className="relative h-full overflow-hidden rounded-[29px] border border-white/[0.05] bg-[linear-gradient(180deg,var(--surface-float),var(--surface-float-strong))] px-7 py-8 shadow-[0_18px_64px_rgba(0,0,0,0.16)] backdrop-blur-[20px] sm:px-8 sm:py-9 lg:min-h-[250px] xl:min-h-[270px]">
        <motion.div
          aria-hidden
          style={prefersReducedMotion ? undefined : { background: innerGlow }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_30%,transparent_72%,rgba(255,255,255,0.02))]" />
        <div className="flex items-center justify-between">
          <span className="type-label text-[var(--muted)]">
            0{index + 1}
          </span>
          <div className="h-px w-16 bg-[linear-gradient(90deg,rgba(88,118,216,0.4),transparent)]" />
        </div>

        <div className="mt-8 flex items-start gap-4">
          <span className="relative mt-2 flex h-3 w-3 items-center justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: [0, 0.36, 0.16], scale: [0.6, 1.85, 1] }}
              viewport={{ once: true, amount: 0.65 }}
              transition={{
                duration: 0.72,
                delay: 0.22 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute h-3 w-3 rounded-full bg-[rgba(88,118,216,0.16)]"
            />
            <span className="relative h-1.5 w-1.5 rounded-full bg-[rgba(206,220,255,0.95)]" />
          </span>

          <div className="space-y-4">
            <h3 className="type-h3 font-semibold text-white">
              {item.title}
            </h3>
            <p className="type-body max-w-[16rem] text-[var(--muted-strong)]">
              {item.sentenceLines.map((line, lineIndex) => (
                <span key={`${item.id}-${line}`} className="section-copy-line">
                  {line}
                  {lineIndex < item.sentenceLines.length - 1 ? (
                    <br className="hidden sm:block" />
                  ) : null}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
