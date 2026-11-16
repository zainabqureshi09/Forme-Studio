import type { Transition, Variants } from "motion/react";

export const EDITORIAL_EASE = [0.22, 1, 0.36, 1] as const;

export const editorialTransition: Transition = {
  duration: 0.75,
  ease: EDITORIAL_EASE,
};

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: EDITORIAL_EASE,
    },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};
