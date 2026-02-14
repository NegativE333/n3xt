"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="mb-24 text-center max-w-3xl mx-auto"
    >
      <p className="mb-4 text-xs font-mono uppercase tracking-wider text-neutral-600">
        N3XT · Browser Extension Studio
      </p>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="text-4xl md:text-5xl font-medium tracking-tight leading-tight mb-4"
      >
        Architecting a Better View.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.14 }}
        className="text-base md:text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed"
      >
        The default view is just a suggestion. We provide the tools to rewrite it.
      </motion.p>
    </motion.section>
  );
}

