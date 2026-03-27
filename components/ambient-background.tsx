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
import { useEffect } from "react";

export function AmbientBackground() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const driftX = useMotionValue(0);
  const driftY = useMotionValue(0);
  const lightDrift = useMotionValue(0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const xDrift = animate(driftX, [0, 24, -12, 0], {
      duration: 48,
      repeat: Infinity,
      ease: "easeInOut",
    });
    const yDrift = animate(driftY, [0, -16, 10, 0], {
      duration: 56,
      repeat: Infinity,
      ease: "easeInOut",
    });
    const glowDrift = animate(lightDrift, [0, 12, -8, 0], {
      duration: 44,
      repeat: Infinity,
      ease: "easeInOut",
    });

    return () => {
      xDrift.stop();
      yDrift.stop();
      glowDrift.stop();
    };
  }, [driftX, driftY, lightDrift, prefersReducedMotion]);

  const sx = useSpring(driftX, { stiffness: 24, damping: 18, mass: 1.2 });
  const sy = useSpring(driftY, { stiffness: 24, damping: 18, mass: 1.2 });
  const sg = useSpring(lightDrift, { stiffness: 24, damping: 18, mass: 1.2 });

  const fieldY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 92]);
  const grainY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const layerOneX = useTransform(() => sx.get() * 0.7);
  const layerOneY = useTransform(() => fieldY.get() + sy.get());
  const layerTwoX = useTransform(() => sx.get() * 0.24);
  const layerTwoY = useTransform(() => glowY.get() + sg.get());
  const layerThreeX = useTransform(() => sx.get() * 0.12);
  const layerThreeY = useTransform(() => grainY.get() + sy.get() * 0.12);
  const grainOpacity = useTransform(scrollYProgress, [0, 1], [0.035, 0.05]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        style={prefersReducedMotion ? undefined : { x: layerOneX, y: layerOneY }}
        className="absolute inset-[-18%] bg-[linear-gradient(115deg,rgba(4,5,8,1)_0%,rgba(7,8,12,0.98)_32%,rgba(9,12,22,0.94)_58%,rgba(12,18,34,0.9)_100%),radial-gradient(circle_at_18%_12%,rgba(56,80,160,0.14),transparent_26%),radial-gradient(circle_at_86%_10%,rgba(255,255,255,0.04),transparent_16%)]"
      />
      <motion.div
        style={prefersReducedMotion ? undefined : { x: layerTwoX, y: layerTwoY }}
        className="absolute inset-[-20%] bg-[radial-gradient(circle_at_72%_18%,rgba(108,138,232,0.16),transparent_18%),radial-gradient(circle_at_64%_34%,rgba(72,102,204,0.12),transparent_24%),radial-gradient(circle_at_24%_74%,rgba(255,255,255,0.04),transparent_26%)] blur-[140px]"
      />
      <motion.div
        style={prefersReducedMotion ? undefined : { x: layerTwoX, y: layerTwoY }}
        className="absolute inset-[-16%] bg-[radial-gradient(circle_at_76%_30%,rgba(88,118,216,0.16),transparent_18%),radial-gradient(circle_at_34%_78%,rgba(70,100,190,0.1),transparent_24%),radial-gradient(circle_at_58%_54%,rgba(255,255,255,0.035),transparent_28%)] blur-[180px]"
      />
      <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:96px_96px] [mask-image:radial-gradient(circle_at_center,rgba(0,0,0,0.88),transparent_92%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(4,5,8,0.18)_72%,rgba(4,5,8,0.46)_100%),linear-gradient(90deg,rgba(4,5,8,0.32),transparent_18%,transparent_82%,rgba(4,5,8,0.36)),linear-gradient(180deg,rgba(4,5,8,0.18),transparent_16%,transparent_82%,rgba(4,5,8,0.32))]" />
      <motion.div
        style={prefersReducedMotion ? undefined : { x: layerThreeX, y: layerThreeY, opacity: grainOpacity }}
        className="absolute inset-0 mix-blend-soft-light [background-image:radial-gradient(rgba(255,255,255,0.14)_0.7px,transparent_0.8px)] [background-size:18px_18px]"
      />
    </div>
  );
}
