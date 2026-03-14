'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const ParticleField = dynamic(() => import('./ParticleField'), { ssr: false });

const TAGS = [
  { label: 'LLM safety', accent: 'purple' },
  { label: 'data engineering', accent: 'teal' },
  { label: 'self-healing pipelines', accent: 'purple' },
  { label: 'Claude Code', accent: 'teal' },
] as const;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleField />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 flex flex-col gap-6">
        {/* Name */}
        <motion.h1
          {...fadeUp(0.1)}
          className="text-6xl sm:text-7xl lg:text-8xl font-semibold tracking-tight text-white leading-none"
        >
          Rushil Petrus
        </motion.h1>

        {/* Animated line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
          style={{ originX: 0 }}
          className="h-px w-full max-w-sm"
          aria-hidden="true"
        >
          <div className="h-full w-full bg-gradient-to-r from-[#7c3aed] to-[#0d9488]" />
        </motion.div>

        {/* Subheading */}
        <motion.p
          {...fadeUp(0.65)}
          className="text-lg sm:text-xl text-slate-300 max-w-xl leading-relaxed font-light"
        >
          Building the infrastructure layer for AI systems that don&apos;t fail in production.
        </motion.p>

        {/* Tag pills */}
        <motion.div
          {...fadeUp(0.85)}
          className="flex flex-wrap gap-2 mt-1"
        >
          {TAGS.map(({ label, accent }) => (
            <span
              key={label}
              className={`px-3 py-1 rounded-full text-xs font-mono tracking-wide border ${
                accent === 'purple'
                  ? 'border-[#7c3aed] text-[#a78bfa]'
                  : 'border-[#0d9488] text-[#2dd4bf]'
              }`}
            >
              {label}
            </span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          {...fadeUp(1.05)}
          className="flex flex-wrap gap-4 mt-2"
        >
          <a
            href="#projects"
            className="group px-6 py-2.5 rounded-sm border border-[#7c3aed] text-[#a78bfa] text-sm font-mono tracking-wide transition-all duration-300 hover:bg-[#7c3aed]/15 hover:text-white"
          >
            View Projects
          </a>
          <a
            href="https://github.com/RushilBuilds"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-6 py-2.5 rounded-sm border border-[#0d9488] text-[#2dd4bf] text-sm font-mono tracking-wide transition-all duration-300 hover:bg-[#0d9488]/15 hover:text-white"
          >
            GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
