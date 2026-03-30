"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import { usePerformanceMode } from "@/components/use-performance-mode";

export function AmbientBackground() {
  const prefersReducedMotion = useReducedMotion();
  const isConstrained = usePerformanceMode();

  if (prefersReducedMotion || isConstrained) {
    return <AmbientBackgroundStatic />;
  }

  return <AmbientBackgroundAnimated />;
}

function AmbientBackgroundStatic() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-[-18%] bg-[linear-gradient(115deg,rgba(4,5,8,1)_0%,rgba(7,8,12,0.985)_34%,rgba(9,12,22,0.95)_60%,rgba(12,18,34,0.92)_100%),radial-gradient(circle_at_72%_18%,rgba(88,118,216,0.12),transparent_20%),radial-gradient(circle_at_24%_74%,rgba(255,255,255,0.03),transparent_28%)]" />
      <div className="absolute inset-[-14%] bg-[radial-gradient(circle_at_78%_28%,rgba(104,132,232,0.14),transparent_20%),radial-gradient(circle_at_58%_54%,rgba(255,255,255,0.03),transparent_28%)] blur-[140px]" />
      <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:96px_96px] [mask-image:radial-gradient(circle_at_center,rgba(0,0,0,0.88),transparent_92%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(4,5,8,0.18)_72%,rgba(4,5,8,0.46)_100%),linear-gradient(90deg,rgba(4,5,8,0.3),transparent_18%,transparent_82%,rgba(4,5,8,0.34)),linear-gradient(180deg,rgba(4,5,8,0.16),transparent_16%,transparent_82%,rgba(4,5,8,0.28))]" />
      <div className="absolute inset-0 opacity-[0.028] mix-blend-soft-light [background-image:radial-gradient(rgba(255,255,255,0.14)_0.7px,transparent_0.8px)] [background-size:18px_18px]" />
    </div>
  );
}

function AmbientBackgroundAnimated() {
  const { scrollYProgress } = useScroll();
  const [cursorGlowEnabled, setCursorGlowEnabled] = useState(false);

  const driftX = useMotionValue(0);
  const driftY = useMotionValue(0);
  const lightDrift = useMotionValue(0);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    const xDrift = animate(driftX, [0, 14, -8, 0], {
      duration: 54,
      repeat: Infinity,
      ease: "easeInOut",
    });
    const yDrift = animate(driftY, [0, -10, 6, 0], {
      duration: 60,
      repeat: Infinity,
      ease: "easeInOut",
    });
    const glowDrift = animate(lightDrift, [0, 8, -5, 0], {
      duration: 48,
      repeat: Infinity,
      ease: "easeInOut",
    });

    return () => {
      xDrift.stop();
      yDrift.stop();
      glowDrift.stop();
    };
  }, [driftX, driftY, lightDrift]);

  useEffect(() => {
    if (typeof window === "undefined") {
      setCursorGlowEnabled(false);
      return;
    }

    const mediaQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 1280px)",
    );

    const syncState = () => {
      const enabled = mediaQuery.matches;
      setCursorGlowEnabled(enabled);

      if (enabled) {
        cursorX.set(window.innerWidth * 0.68);
        cursorY.set(window.innerHeight * 0.34);
      }
    };

    syncState();

    const handleChange = () => syncState();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (!cursorGlowEnabled || typeof window === "undefined") {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };

    const handlePointerLeave = () => {
      cursorX.set(window.innerWidth * 0.68);
      cursorY.set(window.innerHeight * 0.34);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [cursorGlowEnabled, cursorX, cursorY]);

  const sx = useSpring(driftX, { stiffness: 24, damping: 18, mass: 1.2 });
  const sy = useSpring(driftY, { stiffness: 24, damping: 18, mass: 1.2 });
  const sg = useSpring(lightDrift, { stiffness: 24, damping: 18, mass: 1.2 });
  const cursorPrimaryX = useSpring(cursorX, {
    stiffness: 68,
    damping: 24,
    mass: 1.1,
  });
  const cursorPrimaryY = useSpring(cursorY, {
    stiffness: 68,
    damping: 24,
    mass: 1.1,
  });
  const cursorSecondaryX = useSpring(cursorX, {
    stiffness: 44,
    damping: 26,
    mass: 1.32,
  });
  const cursorSecondaryY = useSpring(cursorY, {
    stiffness: 44,
    damping: 26,
    mass: 1.32,
  });

  const fieldY = useTransform(scrollYProgress, [0, 1], [0, 72]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 54]);
  const grainY = useTransform(scrollYProgress, [0, 1], [0, 20]);

  const layerOneX = useTransform(() => sx.get() * 0.7);
  const layerOneY = useTransform(() => fieldY.get() + sy.get());
  const layerTwoX = useTransform(() => sx.get() * 0.24);
  const layerTwoY = useTransform(() => glowY.get() + sg.get());
  const layerThreeX = useTransform(() => sx.get() * 0.12);
  const layerThreeY = useTransform(() => grainY.get() + sy.get() * 0.12);
  const grainOpacity = useTransform(scrollYProgress, [0, 1], [0.03, 0.042]);
  const cursorGlowPrimaryX = useTransform(
    () => cursorPrimaryX.get() - 256 + sx.get() * 0.08,
  );
  const cursorGlowPrimaryY = useTransform(
    () => cursorPrimaryY.get() - 256 + glowY.get() * 0.1,
  );
  const cursorGlowSecondaryX = useTransform(
    () => cursorSecondaryX.get() - 320 + sx.get() * 0.04,
  );
  const cursorGlowSecondaryY = useTransform(
    () => cursorSecondaryY.get() - 320 + glowY.get() * 0.08,
  );
  const cursorGlowPrimaryOpacity = useTransform(
    scrollYProgress,
    [0, 0.24, 1],
    [0.14, 0.11, 0.06],
  );
  const cursorGlowSecondaryOpacity = useTransform(
    scrollYProgress,
    [0, 0.24, 1],
    [0.08, 0.06, 0.035],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        style={{ x: layerOneX, y: layerOneY }}
        className="absolute inset-[-18%] bg-[linear-gradient(115deg,rgba(4,5,8,1)_0%,rgba(7,8,12,0.98)_32%,rgba(9,12,22,0.94)_58%,rgba(12,18,34,0.9)_100%),radial-gradient(circle_at_18%_12%,rgba(56,80,160,0.14),transparent_26%),radial-gradient(circle_at_86%_10%,rgba(255,255,255,0.04),transparent_16%)]"
      />
      <motion.div
        style={{ x: layerTwoX, y: layerTwoY }}
        className="absolute inset-[-20%] bg-[radial-gradient(circle_at_72%_18%,rgba(108,138,232,0.16),transparent_18%),radial-gradient(circle_at_64%_34%,rgba(72,102,204,0.12),transparent_24%),radial-gradient(circle_at_24%_74%,rgba(255,255,255,0.04),transparent_26%)] blur-[140px]"
      />
      <motion.div
        style={{ x: layerTwoX, y: layerTwoY }}
        className="absolute inset-[-16%] bg-[radial-gradient(circle_at_76%_30%,rgba(88,118,216,0.16),transparent_18%),radial-gradient(circle_at_34%_78%,rgba(70,100,190,0.1),transparent_24%),radial-gradient(circle_at_58%_54%,rgba(255,255,255,0.035),transparent_28%)] blur-[180px]"
      />
      <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:96px_96px] [mask-image:radial-gradient(circle_at_center,rgba(0,0,0,0.88),transparent_92%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(4,5,8,0.18)_72%,rgba(4,5,8,0.46)_100%),linear-gradient(90deg,rgba(4,5,8,0.32),transparent_18%,transparent_82%,rgba(4,5,8,0.36)),linear-gradient(180deg,rgba(4,5,8,0.18),transparent_16%,transparent_82%,rgba(4,5,8,0.32))]" />
      <motion.div
        style={{ x: layerThreeX, y: layerThreeY, opacity: grainOpacity }}
        className="absolute inset-0 mix-blend-soft-light [background-image:radial-gradient(rgba(255,255,255,0.14)_0.7px,transparent_0.8px)] [background-size:18px_18px]"
      />
      {cursorGlowEnabled ? (
        <>
          <motion.div
            style={{
              x: cursorGlowSecondaryX,
              y: cursorGlowSecondaryY,
              opacity: cursorGlowSecondaryOpacity,
              willChange: "transform, opacity",
            }}
            className="absolute left-0 top-0 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(96,122,220,0.18)_0%,rgba(96,122,220,0.06)_34%,transparent_72%)] blur-[140px]"
          />
          <motion.div
            style={{
              x: cursorGlowPrimaryX,
              y: cursorGlowPrimaryY,
              opacity: cursorGlowPrimaryOpacity,
              willChange: "transform, opacity",
            }}
            className="absolute left-0 top-0 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(120,150,255,0.2)_0%,rgba(104,132,232,0.09)_36%,transparent_70%)] blur-[110px]"
          />
        </>
      ) : null}
    </div>
  );
}
