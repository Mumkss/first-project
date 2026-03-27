"use client";

import {
  animate,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";

type HeroSequenceContextValue = {
  lineProgress: MotionValue<number>;
  wordOne: MotionValue<number>;
  wordTwo: MotionValue<number>;
  wordThree: MotionValue<number>;
  wordFour: MotionValue<number>;
  bloomProgress: MotionValue<number>;
  emitProgress: MotionValue<number>;
  pathIntroProgress: MotionValue<number>;
};

const HeroSequenceContext = createContext<HeroSequenceContextValue | null>(null);

export function HeroSequenceProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  const timeline = useMotionValue(0);
  const lineProgress = useSegmentProgress(timeline, 0.86, 0.18);
  const wordOne = useSegmentProgress(timeline, 0.06, 0.34);
  const wordTwo = useSegmentProgress(timeline, 0.14, 0.34);
  const wordThree = useSegmentProgress(timeline, 0.24, 0.34);
  const wordFour = useSegmentProgress(timeline, 0.32, 0.34);
  const bloomProgress = useSegmentProgress(timeline, 1.02, 0.18);
  const emitPhase = useSegmentProgress(timeline, 0.98, 0.24);
  const emitProgress = useTransform(emitPhase, [0, 0.55, 1], [0, 1.3, 1]);
  const pathIntroProgress = useTransform(timeline, [1.08, 1.44], [0, 0.14], {
    clamp: true,
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      timeline.set(1.48);
      return;
    }

    timeline.set(0);
    const stop = animate(timeline, 1.48, {
      duration: 1.48,
      ease: "linear",
    });

    return () => {
      stop.stop();
    };
  }, [prefersReducedMotion, timeline]);

  const value = useMemo(
    () => ({
      lineProgress,
      wordOne,
      wordTwo,
      wordThree,
      wordFour,
      bloomProgress,
      emitProgress,
      pathIntroProgress,
    }),
    [
      bloomProgress,
      emitProgress,
      lineProgress,
      pathIntroProgress,
      wordFour,
      wordOne,
      wordThree,
      wordTwo,
    ],
  );

  return (
    <HeroSequenceContext.Provider value={value}>
      {children}
    </HeroSequenceContext.Provider>
  );
}

export function useHeroSequence() {
  const context = useContext(HeroSequenceContext);
  if (!context) {
    throw new Error("useHeroSequence must be used within HeroSequenceProvider");
  }
  return context;
}

export function useRevealStyles(progress: MotionValue<number>) {
  const opacity = useTransform(progress, [0, 0.68, 1], [0, 0.9, 1]);
  const y = useTransform(progress, [0, 1], [20, 0]);
  const blur = useTransform(progress, [0, 0.82, 1], [4, 0.4, 0]);
  const scale = useTransform(progress, [0, 0.82, 1], [0.992, 1.02, 1]);
  return {
    opacity,
    y,
    scale,
    filter: useTransform(blur, (value) => `blur(${value}px)`),
  };
}

function useSegmentProgress(
  timeline: MotionValue<number>,
  start: number,
  duration: number,
) {
  return useTransform(timeline, (value) => {
    if (value <= start) return 0;
    if (value >= start + duration) return 1;
    return (value - start) / duration;
  });
}
