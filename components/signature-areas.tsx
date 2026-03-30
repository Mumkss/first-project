"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

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
  hidden: {},
  visible: {
    transition: {
      when: "beforeChildren",
      delayChildren: 0.16,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  hover: {
    scale: 1.008,
    y: -2,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const introVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.34,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const cardsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.9,
      staggerChildren: 0.1,
    },
  },
};

const headlineLineVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.12,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
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
      className="relative px-6 py-22 sm:px-8 sm:py-26 lg:px-12 lg:py-34 xl:py-40"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        variants={sectionVariants}
        className="relative mx-auto max-w-[72rem] xl:max-w-7xl"
      >
        <div className="relative z-10">
          <div className="max-w-[40rem] sm:max-w-[44rem] lg:max-w-[47.5rem]">
            <motion.h2
              data-path-anchor="signature-title"
              data-path-anchor-x="0.14"
              data-path-anchor-y="0.9"
              className="type-h2 text-white"
            >
              <motion.span
                custom={0}
                variants={headlineLineVariants}
                className="section-display-line"
              >
                {content.titleLines[0]}
              </motion.span>
              <motion.span
                custom={1}
                variants={headlineLineVariants}
                className="section-display-line bg-[linear-gradient(90deg,#f3f4f6_0%,#9cb4ff_35%,#f3f4f6_70%)] bg-[length:200%_100%] bg-clip-text text-transparent"
              >
                {content.titleLines[1]}
              </motion.span>
            </motion.h2>

            <motion.div
              variants={introVariants}
              className="section-copy-block mt-8 max-w-[36rem] space-y-5 text-[var(--muted-strong)] sm:mt-10"
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

          <div className="relative mt-14 sm:mt-16 lg:mt-20">
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
                    duration: 0.56,
                    delay: 0.18,
                    ease: [0.22, 1, 0.36, 1],
                  }}
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
                    duration: 0.56,
                    delay: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
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
                    duration: 0.56,
                    delay: 0.42,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </svg>
            </div>

            <motion.div
              variants={cardsContainerVariants}
              className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4"
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
  return (
    <motion.article
      variants={cardVariants}
      whileHover={prefersReducedMotion ? undefined : "hover"}
      data-path-anchor={`signature-${index + 1}`}
      data-path-anchor-x="0.5"
      data-path-anchor-y="0.52"
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
          visible: { opacity: 0.24 },
          hover: { opacity: 0.9 },
        }}
        className="pointer-events-none absolute inset-0 rounded-[30px] bg-[linear-gradient(135deg,rgba(88,118,216,0.44),rgba(255,255,255,0.08)_35%,rgba(88,118,216,0.08)_75%,rgba(255,255,255,0.04))]"
      />
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        className="pointer-events-none absolute -inset-5 rounded-[36px] bg-[radial-gradient(circle_at_top,rgba(88,118,216,0.14),transparent_62%)] blur-xl"
      />

      <div className="relative h-full overflow-hidden rounded-[29px] border border-white/[0.05] bg-[linear-gradient(180deg,var(--surface-float),var(--surface-float-strong))] px-7 py-8 shadow-[0_18px_54px_rgba(0,0,0,0.14)] backdrop-blur-[18px] transition-[box-shadow,transform,border-color] duration-200 sm:px-8 sm:py-9 lg:min-h-[250px] xl:min-h-[270px] group-hover:border-white/[0.08] group-hover:shadow-[0_22px_60px_rgba(0,0,0,0.2)]">
        <motion.div
          aria-hidden
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 0.06 },
            hover: { opacity: 0.14 },
          }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(88,118,216,0.16),transparent_68%)]"
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
              whileInView={{ opacity: [0, 0.34, 0.16], scale: [0.6, 1.55, 1] }}
              viewport={{ once: true, amount: 0.65 }}
              transition={{
                duration: 0.56,
                delay: 0.16 + index * 0.08,
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
