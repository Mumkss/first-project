"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePerformanceMode } from "@/components/use-performance-mode";

type WorkItem = {
  id: string;
  name: string;
  role: string;
  years: string;
  description: string;
  bullets: string[];
  imageSrc: string;
  imageAlt: string;
  visualTone: "foodsi" | "booksy" | "tylko";
};

export type SelectedWorkContent = {
  titleLines: [string, string];
  items: WorkItem[];
};

type CaseMotion = {
  titleDelay: number;
  metaDelay: number;
  bodyDelay: number;
  bulletDelay: number;
  phoneDelay: number;
  phoneDuration: number;
  phoneStartY: number;
  phoneStartScale: number;
};

type CaseComposition = {
  articleClass: string;
  textClass: string;
  desktopPhoneClass: string;
  desktopStageClass: string;
  mobileStageClass: string;
  beamClass: string;
  rotation: number;
  phoneScale: number;
  parallaxRange: [number, number];
  motion: CaseMotion;
};

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      when: "beforeChildren",
      delayChildren: 0.08,
    },
  },
};

const headlineVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.56,
      delay: index * 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const caseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.54,
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const caseCompositions: Record<WorkItem["visualTone"], CaseComposition> = {
  foodsi: {
    articleClass:
      "lg:min-h-[32rem] lg:py-11 xl:min-h-[33.5rem] xl:py-12",
    textClass:
      "max-w-[24rem] lg:max-w-[24.5rem] lg:pr-2 lg:pt-1",
    desktopPhoneClass:
      "right-[-1.7rem] top-[57%]",
    desktopStageClass:
      "h-[540px] w-[300px] xl:h-[640px] xl:w-[356px]",
    mobileStageClass:
      "h-[390px] w-[217px] sm:h-[430px] sm:w-[239px]",
    beamClass:
      "right-[6%] top-[14%] h-[76%] w-[18%] bg-[linear-gradient(180deg,transparent,rgba(145,229,99,0.14)_22%,rgba(145,229,99,0.2)_54%,transparent_86%)]",
    rotation: 2,
    phoneScale: 1.02,
    parallaxRange: [10, -12],
    motion: {
      titleDelay: 0.34,
      metaDelay: 0.46,
      bodyDelay: 0.58,
      bulletDelay: 0.7,
      phoneDelay: 0.14,
      phoneDuration: 0.82,
      phoneStartY: 24,
      phoneStartScale: 0.98,
    },
  },
  booksy: {
    articleClass:
      "lg:min-h-[30rem] lg:py-10 xl:min-h-[31rem] xl:py-11",
    textClass:
      "max-w-[22.5rem] lg:ml-auto lg:max-w-[22.5rem] lg:pl-12 lg:pr-1 lg:pt-1",
    desktopPhoneClass:
      "left-[1rem] top-[43%]",
    desktopStageClass:
      "h-[480px] w-[267px] xl:h-[550px] xl:w-[306px]",
    mobileStageClass:
      "h-[380px] w-[211px] sm:h-[420px] sm:w-[233px]",
    beamClass:
      "left-[5%] top-[7%] h-[78%] w-[18%] bg-[linear-gradient(180deg,transparent,rgba(84,172,255,0.16)_18%,rgba(84,172,255,0.22)_50%,transparent_84%)]",
    rotation: -3,
    phoneScale: 1,
    parallaxRange: [12, -14],
    motion: {
      titleDelay: 0.24,
      metaDelay: 0.36,
      bodyDelay: 0.46,
      bulletDelay: 0.56,
      phoneDelay: 0.08,
      phoneDuration: 0.64,
      phoneStartY: -26,
      phoneStartScale: 0.985,
    },
  },
  tylko: {
    articleClass:
      "lg:min-h-[29rem] lg:py-9 xl:min-h-[30rem] xl:py-9",
    textClass:
      "max-w-[23.5rem] lg:max-w-[23.5rem] lg:pr-4 lg:pt-2",
    desktopPhoneClass:
      "right-[-0.35rem] top-[51%]",
    desktopStageClass:
      "h-[500px] w-[278px] xl:h-[570px] xl:w-[317px]",
    mobileStageClass:
      "h-[380px] w-[211px] sm:h-[420px] sm:w-[233px]",
    beamClass:
      "right-[10%] top-[12%] h-[68%] w-[11%] bg-[linear-gradient(180deg,transparent,rgba(255,150,179,0.06)_24%,rgba(255,150,179,0.09)_52%,transparent_84%)]",
    rotation: 1,
    phoneScale: 1.01,
    parallaxRange: [8, -9],
    motion: {
      titleDelay: 0.3,
      metaDelay: 0.42,
      bodyDelay: 0.54,
      bulletDelay: 0.66,
      phoneDelay: 0.16,
      phoneDuration: 0.82,
      phoneStartY: 10,
      phoneStartScale: 0.992,
    },
  },
};

function makeReveal(delay: number, y: number, duration = 0.46): Variants {
  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };
}

function makePhoneReveal(config: CaseMotion): Variants {
  return {
    hidden: {
      opacity: 0,
      y: config.phoneStartY,
      scale: config.phoneStartScale,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: config.phoneDelay,
        duration: config.phoneDuration,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };
}

export function SelectedWork({
  content,
}: {
  content: SelectedWorkContent;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isConstrained = usePerformanceMode();

  return (
    <section
      id="work"
      className="relative px-6 py-20 sm:px-8 sm:py-22 lg:px-12 lg:py-24"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.14 }}
        variants={sectionVariants}
        className="mx-auto max-w-[70rem]"
      >
        <div className="max-w-[32rem]">
          <motion.h2 className="type-h2 text-white">
            <motion.span
              custom={0}
              variants={headlineVariants}
              className="section-display-line"
            >
              {content.titleLines[0]}
            </motion.span>
            <motion.span
              custom={1}
              variants={headlineVariants}
              className="section-display-line"
            >
              {content.titleLines[1]}
            </motion.span>
          </motion.h2>
        </div>

        <div className="mt-8 space-y-8 sm:mt-10 sm:space-y-10">
          {content.items.map((item, index) => (
            <CaseStudyBlock
              key={item.id}
              item={item}
              index={index}
              active={activeIndex === index}
              onActivate={setActiveIndex}
              isConstrained={isConstrained}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function CaseStudyBlock({
  item,
  index,
  active,
  onActivate,
  isConstrained,
}: {
  item: WorkItem;
  index: number;
  active: boolean;
  onActivate: (index: number) => void;
  isConstrained: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(ref, {
    margin: "-38% 0px -38% 0px",
    amount: 0.3,
  });
  const composition = caseCompositions[item.visualTone];
  const titleTravel = item.visualTone === "tylko" ? 12 : 18;
  const metaTravel = item.visualTone === "tylko" ? 10 : 14;
  const bodyTravel = item.visualTone === "tylko" ? 12 : 16;
  const bulletTravel = item.visualTone === "tylko" ? 10 : 14;
  const titleVariants = makeReveal(
    composition.motion.titleDelay,
    titleTravel,
    item.visualTone === "tylko" ? 0.54 : 0.5,
  );
  const metaVariants = makeReveal(
    composition.motion.metaDelay,
    metaTravel,
    item.visualTone === "tylko" ? 0.46 : 0.42,
  );
  const bodyVariants = makeReveal(
    composition.motion.bodyDelay,
    bodyTravel,
    item.visualTone === "tylko" ? 0.52 : 0.46,
  );
  const phoneVariants = makePhoneReveal(composition.motion);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const phoneParallax = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion || isConstrained ? [0, 0] : composition.parallaxRange,
  );

  useEffect(() => {
    if (inView) onActivate(index);
  }, [inView, index, onActivate]);

  return (
    <motion.article
      ref={ref}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
      variants={caseVariants}
      className={`relative overflow-visible rounded-[24px] border border-white/[0.04] bg-[linear-gradient(180deg,rgba(13,15,22,0.72),rgba(9,10,16,0.82))] px-6 py-7 shadow-[0_24px_80px_rgba(0,0,0,0.12)] sm:px-8 sm:py-9 lg:px-10 lg:py-10 xl:px-12 ${composition.articleClass}`}
      style={{ willChange: "transform, opacity" }}
    >
      <motion.div
        initial={false}
        animate={active ? { opacity: 1 } : { opacity: 0.82 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0 rounded-[24px] bg-[linear-gradient(135deg,rgba(255,255,255,0.025),transparent_46%)]"
      />
      <motion.div
        initial={false}
        animate={
          active
            ? { opacity: 1, scale: 1 }
            : { opacity: 0.48, scale: 0.97 }
        }
        transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
        className={`pointer-events-none absolute hidden rounded-full blur-[84px] lg:block ${composition.beamClass}`}
      />

      <motion.div
        initial={false}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0.82, scale: 0.985 }}
        transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: phoneParallax }}
        className="relative z-10 mx-auto mb-7 sm:mb-8 lg:hidden"
      >
        <motion.div variants={phoneVariants}>
          <PhoneWrapper
            item={item}
            stageClass={composition.mobileStageClass}
            isConstrained={isConstrained}
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={false}
        animate={
          active
            ? { opacity: 1, y: 0 }
            : { opacity: 0.64, y: 2 }
        }
        transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
        className={`relative z-10 ${composition.textClass}`}
      >

        <motion.h3
          variants={titleVariants}
          className="type-h3 mt-2.5 text-[clamp(30px,3.4vw,42px)] font-semibold text-white"
        >
          {item.name}
        </motion.h3>

        <motion.p
          variants={metaVariants}
          className="type-meta mt-2 text-[var(--muted)]"
        >
          {item.role} · {item.years}
        </motion.p>

        <motion.p
          variants={bodyVariants}
          className="type-body mt-4.5 max-w-[24rem] text-[var(--muted-strong)]"
        >
          {item.description}
        </motion.p>

        <motion.ul
          className={
            item.visualTone === "tylko"
              ? "mt-4 max-w-[22rem] space-y-1.5"
              : "mt-4 max-w-[24rem] space-y-2"
          }
        >
          {(item.visualTone === "tylko" ? item.bullets.slice(0, 1) : item.bullets).map((bullet, bulletIndex) => (
            <motion.li
              key={`${item.id}-${bullet}`}
              variants={makeReveal(
                composition.motion.bulletDelay + bulletIndex * 0.08,
                bulletTravel,
                item.visualTone === "tylko" ? 0.48 : 0.42,
              )}
              className={
                item.visualTone === "tylko"
                  ? "text-[15px] leading-[1.5] tracking-[-0.01em] text-[rgba(243,244,246,0.68)]"
                  : "flex gap-3 text-[15px] leading-[1.45] tracking-[-0.01em] text-[rgba(243,244,246,0.76)]"
              }
            >
              {item.visualTone === "tylko" ? (
                <span>{bullet}</span>
              ) : (
                <>
                  <span className="mt-[0.48rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[rgba(186,203,255,0.9)]" />
                  <span>{bullet}</span>
                </>
              )}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div
        initial={false}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0.8, scale: 0.98 }}
        transition={{ duration: 0.46, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: phoneParallax, willChange: "transform" }}
        className={`pointer-events-none absolute z-10 hidden -translate-y-1/2 lg:block ${composition.desktopPhoneClass}`}
      >
        <motion.div variants={phoneVariants} style={{ willChange: "transform, opacity" }}>
          <PhoneWrapper
            item={item}
            stageClass={composition.desktopStageClass}
            rotation={composition.rotation}
            desktop
            isConstrained={isConstrained}
          />
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

function PhoneWrapper({
  item,
  stageClass,
  rotation = 0,
  desktop = false,
  isConstrained,
}: {
  item: WorkItem;
  stageClass: string;
  rotation?: number;
  desktop?: boolean;
  isConstrained: boolean;
}) {
  const composition = caseCompositions[item.visualTone];
  const prefersReducedMotion = useReducedMotion();
  const motionLimited = prefersReducedMotion || isConstrained;
  const shimmerOpacity = motionLimited ? 0.022 : 0.04;
  const hoverProps =
    desktop && !motionLimited
      ? {
          whileHover: { y: -2, scale: 1.008, rotate: rotation + 0.2 },
          transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] as const },
        }
      : {};

  return (
    <div className={`relative ${stageClass}`}>
      <div className="pointer-events-none absolute inset-x-[14%] bottom-[1.8%] h-11 rounded-full bg-[rgba(0,0,0,0.2)] blur-[28px]" />
      <div className="pointer-events-none absolute inset-x-[24%] bottom-[1.1%] h-7 rounded-full bg-[rgba(0,0,0,0.14)] blur-[12px]" />
      <div className="pointer-events-none absolute left-1/2 top-[8%] h-[82%] w-[18%] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.01),rgba(255,255,255,0.055)_22%,rgba(255,255,255,0.06)_72%,rgba(255,255,255,0.01))] blur-[52px]" />
      <motion.div
        className="relative z-10 h-full w-full"
        style={{ scale: composition.phoneScale, rotate: rotation }}
        {...hoverProps}
      >
        <div className="pointer-events-none absolute inset-[4.4%_8.8%_4.3%] overflow-hidden rounded-[2.3rem]">
          <motion.div
            aria-hidden
            animate={
              motionLimited
                ? undefined
                : {
                    opacity: [shimmerOpacity, shimmerOpacity * 1.55, shimmerOpacity],
                    y: [5, -4, 5],
                  }
            }
            transition={{
              duration: 8.5,
              repeat: motionLimited ? 0 : Infinity,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-x-0 top-0 h-[26%] bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02),transparent)]"
          />
        </div>
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          quality={84}
          sizes="(max-width: 639px) 217px, (max-width: 1023px) 239px, (max-width: 1279px) 300px, 356px"
          className="object-contain object-bottom drop-shadow-[0_24px_48px_rgba(0,0,0,0.22)]"
        />
      </motion.div>
    </div>
  );
}
