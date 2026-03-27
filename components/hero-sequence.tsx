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
  const lineProgress = useSegmentProgress(timeline, 0, 0.36);
  const wordOne = useSegmentProgress(timeline, 0.36, 0.22);
  const wordTwo = useSegmentProgress(timeline, 0.44, 0.22);
  const wordThree = useSegmentProgress(timeline, 0.52, 0.22);
  const wordFour = useSegmentProgress(timeline, 0.6, 0.22);
  const bloomProgress = useSegmentProgress(timeline, 1.02, 0.22);
  const emitPhase = useSegmentProgress(timeline, 0.94, 0.28);
  const emitProgress = useTransform(emitPhase, [0, 0.55, 1], [0, 1.3, 1]);
  const pathIntroProgress = useTransform(timeline, [1.12, 1.52], [0, 0.14], {
    clamp: true,
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      timeline.set(1.56);
      return;
    }

    timeline.set(0);
    const stop = animate(timeline, 1.56, {
      duration: 1.56,
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
  const y = useTransform(progress, [0, 1], [24, 0]);
  const blur = useTransform(progress, [0, 0.82, 1], [8, 0.6, 0]);
  const scale = useTransform(progress, [0, 0.82, 1], [0.985, 1.04, 1]);
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
