"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useHeroSequence } from "@/components/hero-sequence";

type AnchorPoint = {
  x: number;
  y: number;
};

const anchorOrder = [
  "hero-origin",
  "hero-proof",
  "signature-title",
  "signature-1",
  "signature-2",
  "signature-3",
  "experience-title",
  "experience-foodsi",
  "experience-row-2",
  "experience-row-3",
  "experience-row-4",
  "experience-row-5",
  "experience-foundation",
  "footer-cta",
] as const;

export function KineticPath() {
  const { emitProgress, pathIntroProgress: introSequenceProgress } =
    useHeroSequence();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const { scrollYProgress } = useScroll();

  const [pathD, setPathD] = useState("");
  const [size, setSize] = useState({ width: 1000, height: 3600 });
  const [anchorFractions, setAnchorFractions] = useState<number[]>([]);

  const dotX = useMotionValue(610);
  const dotY = useMotionValue(180);
  const pulseStrength = useMotionValue(0);
  const sx = useSpring(dotX, { stiffness: 160, damping: 28, mass: 0.32 });
  const sy = useSpring(dotY, { stiffness: 160, damping: 28, mass: 0.32 });
  const sp = useSpring(pulseStrength, { stiffness: 220, damping: 28, mass: 0.28 });
  const se = useSpring(emitProgress, { stiffness: 260, damping: 24, mass: 0.24 });
  const introSegment = 0.14;

  const pathOpacity = useTransform(scrollYProgress, [0, 0.08, 1], [0.16, 0.88, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.08, 1], [0, 0.76, 0.92]);
  const unifiedProgress = useTransform(() => {
    const intro = introSequenceProgress.get();
    const scroll = scrollYProgress.get();
    const scrollContinuation = introSegment + scroll * (1 - introSegment);
    return Math.max(intro, scrollContinuation);
  });
  const glow = useMotionTemplate`radial-gradient(140px circle at ${sx}px ${sy}px, rgba(88, 118, 216, 0.32), transparent 72%)`;
  const dotScale = useTransform(
    () => Math.max(emitProgress.get(), 0) * (0.72 + se.get() * 0.3) + sp.get() * 0.26,
  );
  const ringScale = useTransform(sp, [0, 1], [1, 1.8]);
  const ringOpacity = useTransform(
    () => Math.max(emitProgress.get(), 0) * (0.05 + se.get() * 0.12 + sp.get() * 0.16),
  );
  const dotOpacity = useTransform(() => Math.max(emitProgress.get(), 0) * glowOpacity.get());

  useEffect(() => {
    const overlay = overlayRef.current;
    const main = overlay?.parentElement;
    if (!overlay || !main) return;

    const measure = () => {
      const mainRect = main.getBoundingClientRect();
      const anchors: AnchorPoint[] = [];

      for (const name of anchorOrder) {
        const node = main.querySelector<HTMLElement>(`[data-path-anchor="${name}"]`);
        if (!node) continue;

        const rect = node.getBoundingClientRect();
        const anchorX = Number(node.dataset.pathAnchorX ?? 0.5);
        const anchorY = Number(node.dataset.pathAnchorY ?? 0.5);

        anchors.push({
          x: rect.left - mainRect.left + rect.width * anchorX,
          y: rect.top - mainRect.top + rect.height * anchorY,
        });
      }

      setSize({
        width: Math.max(main.scrollWidth, mainRect.width),
        height: Math.max(main.scrollHeight, mainRect.height),
      });
      setPathD(buildSpline(anchors));
      setAnchorFractions(
        anchors.length > 1
          ? anchors.map((_, index) => index / (anchors.length - 1))
          : [0],
      );
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(main);

    const nodes = main.querySelectorAll<HTMLElement>("[data-path-anchor]");
    nodes.forEach((node) => resizeObserver.observe(node));

    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);

    const raf = window.requestAnimationFrame(measure);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      resizeObserver.disconnect();
    };
  }, []);

  useMotionValueEvent(unifiedProgress, "change", (latest) => {
    const path = pathRef.current;
    if (!path || !pathD) return;

    const totalLength = path.getTotalLength();
    const safeProgress = Math.min(Math.max(latest, 0), 1);
    const point = path.getPointAtLength(totalLength * safeProgress);
    dotX.set(point.x);
    dotY.set(point.y);

    if (anchorFractions.length > 0) {
      const nearest = Math.min(
        ...anchorFractions.map((fraction) => Math.abs(fraction - safeProgress)),
      );
      const strength = Math.max(0, 1 - nearest / 0.035);
      pulseStrength.set(strength);
    }
  });

  const viewBox = useMemo(
    () => `0 0 ${Math.max(size.width, 1)} ${Math.max(size.height, 1)}`,
    [size],
  );

  return (
    <div ref={overlayRef} className="pointer-events-none absolute inset-0 hidden lg:block">
      <motion.div
        style={{ opacity: glowOpacity, background: glow }}
        className="absolute inset-0 blur-3xl"
      />
      <svg
        viewBox={viewBox}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="signal-base" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>
          <linearGradient id="signal-active" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(109,136,225,0.78)" />
            <stop offset="52%" stopColor="rgba(109,136,225,0.38)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.18)" />
          </linearGradient>
          <filter id="signal-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {pathD ? (
          <>
            <motion.path
              d={pathD}
              fill="none"
              stroke="url(#signal-base)"
              strokeWidth="1"
              strokeLinecap="round"
              style={{ opacity: pathOpacity }}
            />

            <motion.path
              ref={pathRef}
              d={pathD}
              fill="none"
              stroke="url(#signal-active)"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ pathLength: unifiedProgress, opacity: pathOpacity }}
            />

            <motion.path
              d={pathD}
              fill="none"
              stroke="url(#signal-active)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#signal-blur)"
              style={{ pathLength: unifiedProgress, opacity: 0.14 }}
            />

            <motion.circle
              cx={sx}
              cy={sy}
              r="14"
              fill="rgba(88,118,216,0.16)"
              style={{ opacity: ringOpacity, scale: ringScale, originX: "50%", originY: "50%" }}
            />
            <motion.circle
              cx={sx}
              cy={sy}
              r="4"
              fill="rgba(204,216,255,0.95)"
              style={{ opacity: dotOpacity, scale: dotScale, originX: "50%", originY: "50%" }}
            />
          </>
        ) : null}
      </svg>
    </div>
  );
}

function buildSpline(points: AnchorPoint[]) {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let index = 0; index < points.length - 1; index += 1) {
    const current = points[index];
    const next = points[index + 1];
    const previous = points[index - 1] ?? current;
    const afterNext = points[index + 2] ?? next;

    const cp1x = current.x + (next.x - previous.x) / 6;
    const cp1y = current.y + (next.y - previous.y) / 6;
    const cp2x = next.x - (afterNext.x - current.x) / 6;
    const cp2y = next.y - (afterNext.y - current.y) / 6;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
  }

  return path;
}
