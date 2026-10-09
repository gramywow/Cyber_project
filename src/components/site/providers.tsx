"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/* Respecte le réglage « réduire les animations » du visiteur pour tout le site. */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
