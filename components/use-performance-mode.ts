"use client";

import { useEffect, useState } from "react";

export function usePerformanceMode() {
  const [isConstrained, setIsConstrained] = useState(false);

  useEffect(() => {
    if (typeof navigator === "undefined") return;

    const connection = (navigator as Navigator & {
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
      };
      deviceMemory?: number;
    }).connection;

    const saveData = connection?.saveData === true;
    const effectiveType = connection?.effectiveType ?? "";
    const slowNetwork = ["slow-2g", "2g", "3g"].includes(effectiveType);
    const lowMemory =
      typeof (navigator as Navigator & { deviceMemory?: number }).deviceMemory ===
        "number" &&
      ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4;
    const lowCpu =
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency <= 4;

    setIsConstrained(Boolean(saveData || slowNetwork || lowMemory || lowCpu));
  }, []);

  return isConstrained;
}
