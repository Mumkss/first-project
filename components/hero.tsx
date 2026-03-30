"use client";

import Image from "next/image";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, type MouseEvent } from "react";
import { CtaButton } from "@/components/cta-button";
import { useHeroSequence, useRevealStyles } from "@/components/hero-sequence";
import { revealItem } from "@/components/reveal";
import { usePerformanceMode } from "@/components/use-performance-mode";

export type HeroContent = {
  languageLabel: string;
  headlineLines: [[string, string], [string, string]];
  subtitleLines: [string, string];
  ctas: {
    linkedin: string;
    contact: string;
    contactHref: string;
  };
  proofPoints: [string, string, string];
  imageAlt: string;
};

const heroReveal: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const heroImageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const heroOverlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.72,
      delay: 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const heroSubtextVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      delay: 0.78,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const heroActionsVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.92,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
      delayChildren: 0.02,
    },
  },
};

const heroActionItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const heroProofVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.56,
      delay: 1.02,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Hero({
  content,
  language,
  onLanguageChange,
}: {
  content: HeroContent;
  language: "en" | "pl";
  onLanguageChange: (language: "en" | "pl") => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const isConstrained = usePerformanceMode();
  const disableContinuousMotion = prefersReducedMotion || isConstrained;
  const heroRef = useRef<HTMLElement | null>(null);
  const {
    lineProgress,
    wordOne,
    wordTwo,
    wordThree,
    wordFour,
    bloomProgress,
    emitProgress,
    pathIntroProgress,
  } = useHeroSequence();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const glowX = useMotionValue(420);
  const glowY = useMotionValue(280);
  const floatDrift = useMotionValue(0);
  const floatDriftX = useMotionValue(0);
  const portraitLightDriftX = useMotionValue(0);
  const portraitLightDriftY = useMotionValue(0);
  const portraitBreath = useMotionValue(1);

  useEffect(() => {
    if (disableContinuousMotion) return;

    const portraitFloat = animate(floatDrift, [0, -6, 0, 6, 0], {
      duration: 13.2,
      repeat: Infinity,
      ease: "easeInOut",
    });
    const portraitFloatX = animate(floatDriftX, [0, 5, -5, 0], {
      duration: 12.4,
      repeat: Infinity,
      ease: "easeInOut",
    });
    const portraitScale = animate(portraitBreath, [1, 1.01, 1], {
      duration: 13.8,
      repeat: Infinity,
      ease: "easeInOut",
    });
    const portraitLightX = animate(portraitLightDriftX, [0, 14, -8, 0], {
      duration: 40,
      repeat: Infinity,
      ease: "easeInOut",
    });
    const portraitLightY = animate(portraitLightDriftY, [0, -12, 8, 0], {
      duration: 46,
      repeat: Infinity,
      ease: "easeInOut",
    });

    return () => {
      portraitFloat.stop();
      portraitFloatX.stop();
      portraitScale.stop();
      portraitLightX.stop();
      portraitLightY.stop();
    };
  }, [
    floatDrift,
    floatDriftX,
    portraitLightDriftX,
    portraitLightDriftY,
    portraitBreath,
    disableContinuousMotion,
  ]);

  const x = useSpring(rawX, { stiffness: 120, damping: 18, mass: 0.45 });
  const y = useSpring(rawY, { stiffness: 120, damping: 18, mass: 0.45 });
  const gx = useSpring(glowX, { stiffness: 180, damping: 28, mass: 0.35 });
  const gy = useSpring(glowY, { stiffness: 180, damping: 28, mass: 0.35 });
  const portraitLightX = useSpring(portraitLightDriftX, {
    stiffness: 24,
    damping: 18,
    mass: 1.1,
  });
  const portraitLightY = useSpring(portraitLightDriftY, {
    stiffness: 24,
    damping: 18,
    mass: 1.1,
  });
  const floatX = useSpring(floatDriftX, {
    stiffness: 24,
    damping: 16,
    mass: 1.02,
  });
  const floatY = useSpring(floatDrift, {
    stiffness: 26,
    damping: 16,
    mass: 1.05,
  });
  const breathScale = useSpring(portraitBreath, {
    stiffness: 22,
    damping: 16,
    mass: 1.1,
  });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const sceneParallaxX = useTransform(
    scrollYProgress,
    [0, 1],
    disableContinuousMotion ? [0, 0] : [0, 18],
  );
  const sceneParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    disableContinuousMotion ? [0, 0] : [0, 60],
  );
  const lightParallaxX = useTransform(
    scrollYProgress,
    [0, 1],
    disableContinuousMotion ? [0, 0] : [0, -8],
  );
  const lightParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    disableContinuousMotion ? [0, 0] : [0, 74],
  );
  const lightOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    [0.34, 0.52, 0.24],
  );

  const imageParallaxX = useTransform(x, [-1, 1], [-12, 12]);
  const imageParallaxY = useTransform(y, [-1, 1], [-9, 9]);
  const imageRotate = useTransform(x, [-1, 1], [0.9, -0.9]);
  const photoParallaxX = useTransform(x, [-1, 1], [-5, 5]);
  const photoParallaxY = useTransform(y, [-1, 1], [-4, 4]);

  const sceneLayerX = useTransform(
    () => sceneParallaxX.get() + imageParallaxX.get() * 0.42 + floatX.get() * 0.8,
  );
  const sceneLayerY = useTransform(
    () => sceneParallaxY.get() + imageParallaxY.get() * 0.5 + floatY.get(),
  );
  const sceneLayerScale = useTransform(() => breathScale.get());
  const photoLayerX = useTransform(
    () => photoParallaxX.get() + floatX.get() * 0.48,
  );
  const photoLayerY = useTransform(
    () => photoParallaxY.get() + floatY.get() * 0.56,
  );
  const lightLayerX = useTransform(
    () => lightParallaxX.get() + portraitLightX.get() * 0.5,
  );
  const lightLayerY = useTransform(
    () => lightParallaxY.get() + portraitLightY.get() * 0.5,
  );

  const glow = useMotionTemplate`radial-gradient(560px circle at ${gx}px ${gy}px, rgba(90, 122, 222, 0.3), transparent 58%)`;
  const neutralGlow = useMotionTemplate`radial-gradient(340px circle at ${gx}px ${gy}px, rgba(255, 255, 255, 0.08), transparent 52%)`;
  const bloomOpacity = useTransform(bloomProgress, [0, 0.42, 1], [0, 0.22, 0]);
  const bloomScale = useTransform(bloomProgress, [0, 1], [0.86, 1.18]);

  const lineScaleX = useTransform(lineProgress, [0, 1], [0, 1]);
  const lineOpacity = useTransform(lineProgress, [0, 1], [0, 0.68]);
  const trailProgress = useTransform(pathIntroProgress, [0, 0.14], [0, 1]);
  const trailOpacity = useTransform(
    trailProgress,
    [0, 0.2, 0.72, 1],
    [0, 0.4, 0.16, 0],
  );
  const trailGlowOpacity = useTransform(
    trailProgress,
    [0, 0.24, 1],
    [0, 0.08, 0],
  );
  const signalHaloOpacity = useTransform(
    emitProgress,
    [0, 0.58, 1],
    [0, 0.16, 0],
  );
  const signalHaloScale = useTransform(emitProgress, [0, 1], [0.35, 1.2]);
  const signalDotOpacity = useTransform(
    () =>
      Math.max(emitProgress.get(), 0) * Math.max(0, 1 - trailProgress.get() * 0.95),
  );
  const signalDotScale = emitProgress;
  const anchorDotOpacity = useTransform(
    pathIntroProgress,
    [0, 0.05, 0.1, 0.14],
    [0, 0, 0.14, 0.22],
  );
  const anchorDotScale = useTransform(pathIntroProgress, [0, 0.14], [0.6, 1]);
  const portraitMask =
    "linear-gradient(90deg,transparent 0%, rgba(0,0,0,0.14) 8%, rgba(0,0,0,0.88) 20%, rgba(0,0,0,1) 36%, rgba(0,0,0,1) 100%)";

  const strategyStyles = useRevealStyles(wordOne);
  const mattersStyles = useRevealStyles(wordTwo);
  const shippingStyles = useRevealStyles(wordThree);
  const decidesStyles = useRevealStyles(wordFour);
  const [headlineFirstA, headlineFirstB] = content.headlineLines[0];
  const [headlineSecondA, headlineSecondB] = content.headlineLines[1];

  function handlePointerMove(event: MouseEvent<HTMLDivElement>) {
    if (disableContinuousMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    rawX.set((px - 0.5) * 1.4);
    rawY.set((py - 0.5) * 1.4);
    glowX.set(px * rect.width);
    glowY.set(py * rect.height);
  }

  function handlePointerLeave() {
    rawX.set(0);
    rawY.set(0);
    glowX.set(420);
    glowY.set(280);
  }

  return (
    <section
      ref={heroRef}
      className="hero-shell relative overflow-hidden px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10"
    >
      <div className="mx-auto max-w-[84rem]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroReveal}
          className="hero-frame relative"
        >
          <motion.div
            variants={revealItem}
            className="absolute right-0 top-0 z-30 sm:right-1"
            aria-label={content.languageLabel}
          >
            <div
              role="group"
              aria-label={content.languageLabel}
              className="relative inline-flex rounded-full border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-1 shadow-[0_10px_32px_rgba(0,0,0,0.18)] backdrop-blur-sm"
            >
              <motion.span
                aria-hidden
                initial={false}
                animate={language === "en" ? { x: 0 } : { x: "100%" }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.24,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-[linear-gradient(135deg,rgba(88,118,216,0.3),rgba(60,82,152,0.2))] shadow-[0_0_0_1px_rgba(104,136,235,0.18),0_10px_24px_rgba(12,18,34,0.28)]"
              />
              {(["en", "pl"] as const).map((locale) => {
                const active = language === locale;

                return (
                  <motion.button
                    key={locale}
                    type="button"
                    onClick={() => onLanguageChange(locale)}
                    aria-pressed={active}
                    whileHover={prefersReducedMotion ? undefined : { y: -1 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                    className={`type-label relative z-10 min-w-[3.5rem] cursor-pointer rounded-full px-4 py-2 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(148,176,255,0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${
                      active
                        ? "font-semibold text-white"
                        : "text-white/65 hover:text-white/88"
                    }`}
                  >
                    {locale.toUpperCase()}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
          <div className="mx-auto w-full max-w-[84rem]">
            <div
              onMouseMove={handlePointerMove}
              onMouseLeave={handlePointerLeave}
              className="hero-stage relative isolate overflow-hidden"
            >
              <motion.div
                variants={heroImageVariants}
                className="hero-scene-mobile absolute inset-x-[-10%] top-[6.5rem] bottom-[30%] z-0 sm:top-[6rem] sm:bottom-[24%] lg:hidden"
              >
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[42%] bg-[linear-gradient(90deg,rgba(4,5,8,0.98)_0%,rgba(4,5,8,0.88)_42%,rgba(4,5,8,0.34)_78%,transparent_100%)]" />
                <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(4,5,8,0.16),transparent_22%,transparent_82%,rgba(4,5,8,0.18))]" />
                <motion.div
                  aria-hidden
                  style={
                    disableContinuousMotion
                      ? undefined
                      : {
                          background: glow,
                          x: lightLayerX,
                          y: lightLayerY,
                          opacity: lightOpacity,
                        }
                  }
                  className="pointer-events-none absolute inset-[-10%] blur-[92px]"
                />
                <motion.div
                  aria-hidden
                  style={
                    disableContinuousMotion
                      ? undefined
                      : {
                          opacity: bloomOpacity,
                          scale: bloomScale,
                        }
                  }
                  className="pointer-events-none absolute right-[8%] top-[10%] h-[72%] w-[48%] rounded-full bg-[radial-gradient(circle,rgba(145,178,255,0.28),transparent_68%)] blur-[86px]"
                />
                <motion.div
                  style={
                    disableContinuousMotion
                      ? undefined
                      : {
                          x: sceneLayerX,
                          y: sceneLayerY,
                          rotate: imageRotate,
                          scale: sceneLayerScale,
                        }
                  }
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.4)_18%,rgba(0,0,0,0.92)_42%,rgba(0,0,0,0.98)_78%,transparent_100%)]">
                    <motion.div
                      style={
                        disableContinuousMotion
                          ? undefined
                          : {
                              x: photoLayerX,
                              y: photoLayerY,
                            }
                      }
                      className="absolute inset-0"
                    >
                      <Image
                        src="/marcin.jpg"
                        alt={content.imageAlt}
                        fill
                        priority
                        quality={82}
                        sizes="(max-width: 1023px) 100vw, 54vw"
                        className="object-cover object-[62%_14%] scale-[1.1]"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                variants={heroImageVariants}
                className="hero-scene-desktop absolute -right-[12%] -top-[4%] bottom-[-6%] z-0 hidden w-[50%] overflow-hidden lg:block xl:-right-[15%] xl:-top-[7%] xl:bottom-[-10%] xl:w-[54%]"
              >
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[44%] bg-[linear-gradient(90deg,rgba(4,5,8,1)_0%,rgba(4,5,8,0.94)_32%,rgba(4,5,8,0.62)_68%,transparent_100%)]" />
                <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(4,5,8,0.12),transparent_18%,transparent_82%,rgba(4,5,8,0.16))]" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-[linear-gradient(90deg,transparent,rgba(4,5,8,0.24)_42%,rgba(4,5,8,0.72)_100%)]" />
                <div className="pointer-events-none absolute right-0 top-0 z-10 h-20 w-20 bg-[radial-gradient(circle_at_top_right,rgba(4,5,8,0.8)_0%,rgba(4,5,8,0.34)_42%,transparent_76%)]" />
                <motion.div
                  aria-hidden
                  style={
                    disableContinuousMotion
                      ? undefined
                      : {
                          background: glow,
                          x: lightLayerX,
                          y: lightLayerY,
                          opacity: lightOpacity,
                        }
                  }
                  className="pointer-events-none absolute inset-[-14%] blur-[112px]"
                />
                <motion.div
                  aria-hidden
                  style={
                    disableContinuousMotion
                      ? undefined
                      : {
                          background: neutralGlow,
                          x: lightLayerX,
                          y: lightLayerY,
                          opacity: 0.8,
                        }
                  }
                  className="pointer-events-none absolute inset-[8%_-10%_2%_12%] blur-[88px]"
                />
                <motion.div
                  aria-hidden
                  style={
                    disableContinuousMotion
                      ? undefined
                      : {
                          opacity: bloomOpacity,
                          scale: bloomScale,
                        }
                  }
                  className="pointer-events-none absolute right-[12%] top-[14%] h-[70%] w-[42%] rounded-full bg-[radial-gradient(circle,rgba(150,181,255,0.26),transparent_68%)] blur-[96px]"
                />
                <motion.div
                  style={
                    disableContinuousMotion
                      ? undefined
                      : {
                          x: sceneLayerX,
                          y: sceneLayerY,
                          rotate: imageRotate,
                          scale: sceneLayerScale,
                        }
                  }
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.1)_8%,rgba(0,0,0,0.86)_22%,rgba(0,0,0,1)_38%,rgba(0,0,0,1)_100%)]">
                    <motion.div
                      style={
                        disableContinuousMotion
                          ? undefined
                          : {
                              x: photoLayerX,
                              y: photoLayerY,
                              WebkitMaskImage: portraitMask,
                              maskImage: portraitMask,
                            }
                      }
                      className="absolute inset-0"
                    >
                      <Image
                        src="/marcin.jpg"
                        alt={content.imageAlt}
                        fill
                        priority
                        quality={82}
                        sizes="(max-width: 1023px) 100vw, 54vw"
                        className="object-cover object-[70%_14%] scale-[1.14]"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                variants={heroOverlayVariants}
                className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(4,5,8,0.99)_0%,rgba(4,5,8,0.98)_34%,rgba(4,5,8,0.9)_52%,rgba(4,5,8,0.62)_68%,rgba(4,5,8,0.24)_82%,rgba(4,5,8,0.08)_100%),linear-gradient(180deg,rgba(4,5,8,0.08)_0%,transparent_30%,rgba(4,5,8,0.22)_100%)]"
              />
              <motion.div
                variants={heroOverlayVariants}
                className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_8%_32%,rgba(255,255,255,0.03),transparent_36%),radial-gradient(circle_at_100%_0%,rgba(255,255,255,0.03),transparent_28%)]"
              />
              <motion.div
                variants={heroOverlayVariants}
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[76%] bg-[linear-gradient(90deg,rgba(4,5,8,0.98),rgba(4,5,8,0.95)_54%,rgba(4,5,8,0.72)_74%,transparent_100%)] sm:w-[72%] lg:w-[66%] xl:w-[64%]"
              />

              <div className="relative z-20 flex min-h-[inherit]">
                <motion.div className="relative flex min-h-[40rem] w-full items-center py-16 sm:min-h-[44rem] sm:py-18 lg:min-h-[max(48rem,calc(100svh-6rem))] lg:py-22">
                  <div className="hero-copy-center hero-text-field relative w-full max-w-[36rem] sm:max-w-[38rem] lg:max-w-[41rem] lg:-translate-y-6 lg:pl-8 xl:pl-10">
                    <p className="type-label text-[var(--muted)]">
                      Marcin Jankiewicz
                    </p>

                    <motion.div className="hero-headline relative mt-8 text-white sm:mt-10">
                      <div className="relative overflow-visible pb-[0.14em]">
                        {!prefersReducedMotion ? (
                          <div className="pointer-events-none absolute right-full top-[0.46em] mr-7 hidden h-44 w-52 -translate-y-1/2 lg:block">
                            <motion.span
                              style={{ scaleX: lineScaleX, opacity: lineOpacity }}
                              data-path-anchor="hero-origin"
                              data-path-anchor-x="1"
                              data-path-anchor-y="0.5"
                              className="absolute right-0 top-14 h-px w-12 origin-right bg-[linear-gradient(90deg,rgba(168,191,255,0.98),rgba(109,145,255,0.92)_56%,transparent)]"
                            />
                            <svg
                              viewBox="0 0 220 220"
                              className="absolute inset-0 h-full w-full overflow-visible"
                              aria-hidden
                            >
                              <motion.path
                                d="M 220 72 C 198 88, 176 106, 154 132 S 114 182, 96 206"
                                fill="none"
                                stroke="rgba(127,159,255,0.72)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                style={{ pathLength: trailProgress, opacity: trailOpacity }}
                              />
                              <motion.path
                                d="M 220 72 C 198 88, 176 106, 154 132 S 114 182, 96 206"
                                fill="none"
                                stroke="rgba(127,159,255,0.36)"
                                strokeWidth="6"
                                strokeLinecap="round"
                                style={{ pathLength: trailProgress, opacity: trailGlowOpacity }}
                                filter="blur(6px)"
                              />
                              <motion.circle
                                cx="220"
                                cy="72"
                                r="12"
                                fill="none"
                                stroke="rgba(188,204,255,0.48)"
                                strokeWidth="1"
                                style={{
                                  opacity: signalHaloOpacity,
                                  scale: signalHaloScale,
                                  originX: "50%",
                                  originY: "50%",
                                }}
                              />
                              <motion.circle
                                cx="220"
                                cy="72"
                                r="4.5"
                                fill="rgba(226,233,255,0.98)"
                                style={{
                                  opacity: signalDotOpacity,
                                  scale: signalDotScale,
                                  originX: "50%",
                                  originY: "50%",
                                }}
                              />
                              <motion.circle
                                cx="220"
                                cy="72"
                                r="2.75"
                                fill="rgba(210,223,255,0.8)"
                                style={{
                                  opacity: anchorDotOpacity,
                                  scale: anchorDotScale,
                                  originX: "50%",
                                  originY: "50%",
                                }}
                              />
                            </svg>
                          </div>
                        ) : (
                          <span
                            data-path-anchor="hero-origin"
                            data-path-anchor-x="1"
                            data-path-anchor-y="0.5"
                            className="pointer-events-none absolute right-full top-[0.46em] mr-7 hidden h-px w-12 bg-[linear-gradient(90deg,rgba(168,191,255,0.96),rgba(109,145,255,0.92)_56%,transparent)] lg:block"
                          />
                        )}
                        <div className="hero-line hero-line-top">
                          <motion.span
                            style={prefersReducedMotion ? undefined : strategyStyles}
                            className="inline-block"
                          >
                            {headlineFirstA}
                          </motion.span>
                          <motion.span
                            style={prefersReducedMotion ? undefined : mattersStyles}
                            className="inline-block"
                          >
                            {headlineFirstB}
                          </motion.span>
                        </div>
                      </div>
                      <div className="overflow-visible pb-[0.14em]">
                        <div className="hero-line hero-line-bottom">
                          <motion.span
                            style={prefersReducedMotion ? undefined : shippingStyles}
                            className="inline-block"
                          >
                            {headlineSecondA}
                          </motion.span>
                          <motion.span
                            style={prefersReducedMotion ? undefined : decidesStyles}
                            className="inline-block"
                          >
                            {headlineSecondB}
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.p
                      variants={heroSubtextVariants}
                      className="hero-support hero-subtitle mt-6 sm:mt-7"
                    >
                      {content.subtitleLines.join(" ")}
                    </motion.p>

                    <motion.div
                      variants={heroActionsVariants}
                      className="hero-actions mt-6 flex flex-wrap gap-3.5 sm:mt-8 sm:gap-4"
                    >
                      <motion.span variants={heroActionItemVariants}>
                        <CtaButton
                          href="https://www.linkedin.com/in/marcin-jankiewicz-89841588/"
                          external
                        >
                          {content.ctas.linkedin}
                        </CtaButton>
                      </motion.span>
                      <motion.span variants={heroActionItemVariants}>
                        <CtaButton
                          href={content.ctas.contactHref}
                          variant="secondary"
                        >
                          {content.ctas.contact}
                        </CtaButton>
                      </motion.span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              variants={heroProofVariants}
              data-path-anchor="hero-proof"
              data-path-anchor-x="0.5"
              data-path-anchor-y="0.5"
              className="hero-proof-row relative z-20 mt-12 border-t border-white/[0.08] pt-6 text-[var(--muted)] sm:mt-14 sm:pt-8 lg:mt-16 lg:pt-10"
            >
              <motion.div
                aria-hidden
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 0.28, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.55,
                  delay: 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="pointer-events-none absolute left-1/2 top-0 h-16 w-72 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(88,118,216,0.18),transparent_68%)] blur-2xl"
              />
              <motion.span
                aria-hidden
                initial={{ opacity: 0, x: "-45%" }}
                whileInView={{ opacity: [0, 0.75, 0], x: ["-45%", "0%", "45%"] }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.75,
                  delay: 0.16,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="pointer-events-none absolute left-1/2 top-0 h-px w-52 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(210,223,255,0.86),transparent)]"
              />
              <div className="type-meta mx-auto grid max-w-5xl gap-4 text-center md:grid-cols-3 md:gap-6">
                {content.proofPoints.map((point) => (
                  <span key={point}>{point}</span>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-[40%] hidden w-px bg-white/[0.04] lg:block" />
        </motion.div>
      </div>
    </section>
  );
}
