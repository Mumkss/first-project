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
  const heroRef = useRef<HTMLElement | null>(null);
  const {
    lineProgress,
    wordOne,
    wordTwo,
    wordThree,
    wordFour,
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
    if (prefersReducedMotion) return;

    const portraitFloat = animate(floatDrift, [0, -10, 0, 10, 0], {
      duration: 12.6,
      repeat: Infinity,
      ease: "easeInOut",
    });
    const portraitFloatX = animate(floatDriftX, [0, 8, -8, 0], {
      duration: 11.8,
      repeat: Infinity,
      ease: "easeInOut",
    });
    const portraitScale = animate(portraitBreath, [1, 1.015, 1], {
      duration: 12.8,
      repeat: Infinity,
      ease: "easeInOut",
    });
    const portraitLightX = animate(portraitLightDriftX, [0, 22, -12, 0], {
      duration: 34,
      repeat: Infinity,
      ease: "easeInOut",
    });
    const portraitLightY = animate(portraitLightDriftY, [0, -18, 12, 0], {
      duration: 40,
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
    prefersReducedMotion,
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

  const textParallaxX = useTransform(scrollYProgress, [0, 1], [0, -2.5]);
  const portraitParallaxX = useTransform(scrollYProgress, [0, 1], [0, 6]);
  const portraitParallaxY = useTransform(scrollYProgress, [0, 1], [0, 74]);
  const lightParallaxX = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const lightParallaxY = useTransform(scrollYProgress, [0, 1], [0, 98]);
  const lightOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    [0.34, 0.54, 0.22],
  );

  const imageParallaxX = useTransform(x, [-1, 1], [-16, 16]);
  const imageParallaxY = useTransform(y, [-1, 1], [-12, 12]);
  const imageRotate = useTransform(x, [-1, 1], [0.95, -0.05]);
  const layerParallaxX = useTransform(x, [-1, 1], [-10, 10]);
  const layerParallaxY = useTransform(y, [-1, 1], [-6, 6]);
  const photoParallaxX = useTransform(x, [-1, 1], [-7, 7]);
  const photoParallaxY = useTransform(y, [-1, 1], [-5, 5]);

  const textLayerX = useTransform(() => textParallaxX.get());
  const portraitShellX = useTransform(() => portraitParallaxX.get());
  const portraitShellY = useTransform(() => portraitParallaxY.get());
  const imageLayerX = useTransform(() => imageParallaxX.get() + floatX.get());
  const imageLayerY = useTransform(() => imageParallaxY.get() + floatY.get());
  const imageLayerScale = useTransform(() => breathScale.get());
  const photoLayerX = useTransform(
    () => photoParallaxX.get() + floatX.get() * 0.76,
  );
  const photoLayerY = useTransform(
    () => photoParallaxY.get() + floatY.get() * 0.76,
  );
  const lightLayerX = useTransform(
    () => lightParallaxX.get() + portraitLightX.get() * 0.5,
  );
  const lightLayerY = useTransform(
    () => lightParallaxY.get() + portraitLightY.get() * 0.5,
  );

  const glow = useMotionTemplate`radial-gradient(500px circle at ${gx}px ${gy}px, rgba(90, 122, 222, 0.3), transparent 50%)`;
  const neutralGlow = useMotionTemplate`radial-gradient(340px circle at ${gx}px ${gy}px, rgba(255, 255, 255, 0.1), transparent 46%)`;

  const lineScaleX = useTransform(lineProgress, [0, 1], [0, 1]);
  const lineOpacity = useTransform(lineProgress, [0, 1], [0, 0.86]);
  const trailProgress = useTransform(pathIntroProgress, [0, 0.14], [0, 1]);
  const trailOpacity = useTransform(
    trailProgress,
    [0, 0.2, 0.72, 1],
    [0, 0.55, 0.22, 0],
  );
  const trailGlowOpacity = useTransform(
    trailProgress,
    [0, 0.24, 1],
    [0, 0.16, 0],
  );
  const signalHaloOpacity = useTransform(
    emitProgress,
    [0, 0.58, 1],
    [0, 0.24, 0],
  );
  const signalHaloScale = useTransform(emitProgress, [0, 1], [0.35, 1.3]);
  const signalDotOpacity = useTransform(
    () =>
      Math.max(emitProgress.get(), 0) * Math.max(0, 1 - trailProgress.get() * 0.95),
  );
  const signalDotScale = emitProgress;
  const anchorDotOpacity = useTransform(
    pathIntroProgress,
    [0, 0.05, 0.1, 0.14],
    [0, 0, 0.18, 0.3],
  );
  const anchorDotScale = useTransform(pathIntroProgress, [0, 0.14], [0.6, 1]);
  const portraitMask =
    "radial-gradient(118% 118% at 56% 38%, rgba(0,0,0,1) 54%, rgba(0,0,0,0.96) 68%, rgba(0,0,0,0.72) 82%, transparent 100%)";

  const strategyStyles = useRevealStyles(wordOne);
  const mattersStyles = useRevealStyles(wordTwo);
  const shippingStyles = useRevealStyles(wordThree);
  const decidesStyles = useRevealStyles(wordFour);
  const [headlineFirstA, headlineFirstB] = content.headlineLines[0];
  const [headlineSecondA, headlineSecondB] = content.headlineLines[1];

  function handlePointerMove(event: MouseEvent<HTMLDivElement>) {
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
    glowX.set(420);
    glowY.set(280);
  }

  return (
    <section
      ref={heroRef}
      className="hero-shell relative overflow-hidden px-6 py-8 sm:px-8 lg:px-12 lg:py-10"
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
            className="absolute right-0 top-0 z-30"
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
            <div className="hero-grid relative z-20 grid items-center gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-x-[4.5rem] lg:gap-y-12">
              <div className="pointer-events-none absolute inset-y-[12%] left-[53.5%] hidden w-28 -translate-x-1/2 bg-[linear-gradient(90deg,rgba(11,11,12,0),rgba(11,11,12,0.2),rgba(11,11,12,0))] blur-3xl lg:block" />
              <motion.div
                style={prefersReducedMotion ? undefined : { x: textLayerX }}
                className="hero-copy relative z-20 flex min-h-[32rem] flex-col py-4 lg:min-w-0 lg:py-8"
              >
                <div>
                  <p className="type-label text-[var(--muted)]">
                    Marcin Jankiewicz
                  </p>
                </div>

                <div className="hero-copy-center my-auto max-w-[38.5rem] py-10 lg:py-0">
                  <motion.div className="hero-headline relative max-w-[38.5rem] text-white">
                    <div className="relative overflow-visible pb-[0.18em]">
                      {!prefersReducedMotion ? (
                        <div className="pointer-events-none absolute right-full top-[0.44em] mr-7 hidden h-44 w-52 -translate-y-1/2 lg:block">
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
                              strokeWidth="8"
                              strokeLinecap="round"
                              style={{ pathLength: trailProgress, opacity: trailGlowOpacity }}
                              filter="blur(10px)"
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
                          className="pointer-events-none absolute right-full top-[0.44em] mr-7 hidden h-px w-12 bg-[linear-gradient(90deg,rgba(168,191,255,0.96),rgba(109,145,255,0.92)_56%,transparent)] lg:block"
                        />
                      )}
                      <div className="hero-line">
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
                    <div className="overflow-visible pb-[0.18em]">
                      <div className="hero-line">
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
                    variants={revealItem}
                    className="hero-support hero-subtitle mt-6"
                  >
                    <span className="section-copy-line">
                      {content.subtitleLines[0]}
                    </span>
                    <span className="section-copy-line">
                      {content.subtitleLines[1]}
                    </span>
                  </motion.p>

                  <motion.div
                    variants={revealItem}
                    className="hero-actions mt-7 flex flex-wrap gap-4"
                  >
                    <CtaButton
                      href="https://www.linkedin.com/in/marcin-jankiewicz-89841588/"
                      external
                    >
                      {content.ctas.linkedin}
                    </CtaButton>
                    <CtaButton
                      href={content.ctas.contactHref}
                      variant="secondary"
                    >
                      {content.ctas.contact}
                    </CtaButton>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                variants={revealItem}
                onMouseMove={handlePointerMove}
                onMouseLeave={handlePointerLeave}
                className="hero-media relative flex items-center justify-center lg:min-w-0 lg:justify-center"
              >
                <motion.div
                  aria-hidden
                  style={
                    prefersReducedMotion
                      ? undefined
                      : {
                          background: glow,
                          x: lightLayerX,
                          y: lightLayerY,
                          opacity: lightOpacity,
                        }
                  }
                  className="pointer-events-none absolute inset-[-12%] z-0 blur-[112px]"
                />
                <motion.div
                  aria-hidden
                  style={
                    prefersReducedMotion
                      ? undefined
                      : { background: neutralGlow, x: lightLayerX, y: lightLayerY }
                  }
                  className="pointer-events-none absolute inset-[2%] z-0 blur-[88px]"
                />
                <motion.div
                  aria-hidden
                  style={
                    prefersReducedMotion
                      ? undefined
                      : { x: layerParallaxX, y: layerParallaxY }
                  }
                  className="pointer-events-none absolute -left-10 right-4 top-10 z-0 h-[78%] rounded-[56px] bg-[radial-gradient(circle_at_58%_28%,rgba(152,180,255,0.18),transparent_22%),radial-gradient(circle_at_62%_42%,rgba(77,108,211,0.32),transparent_46%),linear-gradient(160deg,rgba(255,255,255,0.04),transparent_24%)] blur-[122px] lg:-left-8 lg:right-2"
                />

                <motion.div
                  style={
                    prefersReducedMotion
                      ? undefined
                      : { x: portraitShellX, y: portraitShellY }
                  }
                  className="relative z-20 w-full max-w-[33rem] lg:max-w-[35rem] lg:translate-x-3 lg:translate-y-3"
                >
                  <div className="pointer-events-none absolute inset-x-[10%] -bottom-10 z-0 h-20 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.62),transparent_74%)] blur-3xl" />
                  <div className="pointer-events-none absolute inset-[-5%] z-0 rounded-[42px] bg-[radial-gradient(circle_at_60%_36%,rgba(129,164,255,0.18),transparent_42%)] blur-[82px]" />
                  <motion.div
                    initial={prefersReducedMotion ? false : { scale: 1.03 }}
                    animate={prefersReducedMotion ? undefined : { scale: 1 }}
                    transition={
                      prefersReducedMotion
                        ? undefined
                        : { duration: 0.82, ease: [0.22, 1, 0.36, 1] }
                    }
                    style={
                      prefersReducedMotion
                        ? undefined
                        : {
                            x: imageLayerX,
                            y: imageLayerY,
                            rotate: imageRotate,
                            scale: imageLayerScale,
                          }
                    }
                    className="relative overflow-hidden rounded-[34px] shadow-[0_72px_180px_rgba(0,0,0,0.58),0_24px_72px_rgba(0,0,0,0.24)]"
                  >
                    <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(90deg,rgba(6,7,10,0.34),transparent_24%,transparent_82%,rgba(6,7,10,0.14)),linear-gradient(180deg,rgba(6,7,10,0.02),transparent_56%,rgba(6,7,10,0.2)_100%)]" />
                    <div className="pointer-events-none absolute inset-x-[-6%] top-[-10%] z-20 h-[42%] bg-[radial-gradient(circle_at_60%_16%,rgba(255,255,255,0.18),transparent_42%)] blur-[40px]" />
                    <div className="hero-portrait relative aspect-[4/5] min-h-[460px] w-full">
                      <motion.div
                        style={
                          prefersReducedMotion
                            ? {
                                WebkitMaskImage: portraitMask,
                                maskImage: portraitMask,
                              }
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
                          className="object-cover object-[55%_15%] scale-[1.11]"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              variants={revealItem}
              data-path-anchor="hero-proof"
              data-path-anchor-x="0.5"
              data-path-anchor-y="0.5"
              className="hero-proof-row relative z-20 mt-14 border-t border-white/[0.08] pt-8 text-[var(--muted)] lg:mt-16 lg:pt-10"
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
