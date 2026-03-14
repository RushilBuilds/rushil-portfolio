'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';
import About from '../about/About';

const ParticleField = dynamic(() => import('./ParticleField'), { ssr: false });

const TAGS = [
  { label: 'LLM safety', accent: 'purple' },
  { label: 'data engineering', accent: 'teal' },
  { label: 'self-healing pipelines', accent: 'purple' },
  { label: 'Claude Code', accent: 'teal' },
] as const;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function getLetterStyle(i: number, glitch: number): React.CSSProperties {
  if (glitch === 0) return { display: 'inline-block' };
  const s = i * 2.718 + 1;
  const xShift = glitch * (Math.sin(s * 6.3) * 28 + Math.cos(s * 2.9) * 14);
  const yShift = glitch * Math.sin(s * 3.7) * 10;
  const opacity = Math.max(0, 1 - glitch * (0.6 + 0.4 * Math.abs(Math.sin(s * 1.5))));
  const isGlitchColour = glitch > 0.25 && i % 4 === 1;
  return {
    display: 'inline-block',
    transform: `translate(${xShift}px, ${yShift}px)`,
    opacity,
    color: isGlitchColour ? '#7c3aed' : undefined,
    filter: glitch > 0.55 ? `blur(${(glitch - 0.55) * 4}px)` : undefined,
    transition: 'none',
  };
}

const NAME_CHARS = 'Rushil Petrus'.split('');

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [glitch, setGlitch] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const glitchProgress = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  useMotionValueEvent(glitchProgress, 'change', (v) => setGlitch(v));

  const fadeOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <ParticleField />

      {/* ── Two-column grid ── */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* ── LEFT column ── */}
        <div className="flex flex-col gap-6">

          {/* Name — glitch on scroll */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-none select-none"
            aria-label="Rushil Petrus"
          >
            {NAME_CHARS.map((char, i) => (
              <span key={i} style={getLetterStyle(i, glitch)}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </motion.h1>

          {/* Everything below name fades on scroll */}
          <motion.div style={{ opacity: fadeOpacity }} className="flex flex-col gap-5">

            {/* Gradient line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
              style={{ originX: 0 }}
              className="h-px w-full max-w-xs"
              aria-hidden="true"
            >
              <div className="h-full w-full bg-gradient-to-r from-[#7c3aed] to-[#0d9488]" />
            </motion.div>

            {/* Education */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
              className="text-[14px] font-normal leading-snug"
              style={{ color: '#64748b' }}
            >
              University of Sydney · Bachelor of Computing (Computational Data Science) · 2025
            </motion.p>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.70, ease: EASE }}
              className="text-lg sm:text-xl text-slate-300 leading-relaxed font-light"
            >
              Graduate. Builder. Figuring out where AI goes next.
            </motion.p>

            {/* Tag pills */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.90, ease: EASE }}
              className="flex flex-wrap gap-2"
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
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.10, ease: EASE }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="px-6 py-2.5 rounded-sm border border-[#7c3aed] text-[#a78bfa] text-sm font-mono tracking-wide transition-all duration-300 hover:bg-[#7c3aed]/15 hover:text-white"
              >
                View Projects
              </a>
              <a
                href="https://github.com/RushilBuilds"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-sm border border-[#0d9488] text-[#2dd4bf] text-sm font-mono tracking-wide transition-all duration-300 hover:bg-[#0d9488]/15 hover:text-white"
              >
                GitHub
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* ── RIGHT column — About snapshot ── */}
        <motion.div
          style={{ opacity: fadeOpacity }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
        >
          <About />
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="font-mono uppercase"
          style={{ fontSize: 13, letterSpacing: '0.15em', color: '#94a3b8' }}
        >
          scroll to explore
        </span>
        <div className="relative w-px h-12 overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 w-full"
            style={{
              height: '100%',
              background: 'linear-gradient(to bottom, transparent 0%, #0d9488 50%, transparent 100%)',
            }}
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: '#0d9488' }}
        >
          <ChevronDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
