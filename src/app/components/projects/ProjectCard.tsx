'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github } from 'lucide-react';

export interface Project {
  name: string;
  tagline: string;
  tech: string[];
  accent: string;
  github: string;
  variant: 'guardrails' | 'querylens';
}

// Red pulse ripple for LLM-Guardrails
function PulseRipple() {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {[0, 0.5, 1].map((delay) => (
        <motion.span
          key={delay}
          className="absolute rounded-full border border-red-500"
          initial={{ width: 40, height: 40, opacity: 0.5 }}
          animate={{ width: 420, height: 420, opacity: 0 }}
          transition={{ duration: 1.6, delay, ease: 'easeOut', repeat: Infinity, repeatDelay: 0.4 }}
        />
      ))}
    </div>
  );
}

// Teal flow lines for QueryLens
function FlowLines({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
      {[18, 42, 66, 85].map((top, i) => (
        <motion.div
          key={top}
          className="absolute h-px"
          style={{
            top: `${top}%`,
            width: '55%',
            background: `linear-gradient(90deg, transparent 0%, ${accent}99 50%, transparent 100%)`,
          }}
          initial={{ left: '-60%' }}
          animate={{ left: '160%' }}
          transition={{
            duration: 2.2,
            delay: i * 0.35,
            ease: 'linear',
            repeat: Infinity,
            repeatDelay: 0.6,
          }}
        />
      ))}
    </div>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [glow, setGlow] = useState({ x: 0, y: 0 });

  // Vanilla-tilt — dynamic import to avoid SSR issues
  useEffect(() => {
    let tilt: { destroy: () => void } | null = null;
    import('vanilla-tilt').then(({ default: VanillaTilt }) => {
      if (!cardRef.current) return;
      VanillaTilt.init(cardRef.current, {
        max: 7,
        speed: 600,
        glare: false,
      });
      // vanilla-tilt attaches itself to the element
      tilt = (cardRef.current as HTMLDivElement & { vanillaTilt: { destroy: () => void } }).vanillaTilt;
    });
    return () => { tilt?.destroy(); };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlow({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        border: `0.5px solid ${project.accent}`,
        background: hovered
          ? `radial-gradient(circle at ${glow.x}px ${glow.y}px, ${project.accent}22 0%, transparent 55%), #0f1117`
          : '#0f1117',
      }}
      className="relative overflow-hidden rounded-lg p-7 flex flex-col gap-5 transition-colors duration-300"
    >
      {/* Hover overlays */}
      <AnimatePresence>
        {hovered && project.variant === 'guardrails' && <PulseRipple />}
        {hovered && project.variant === 'querylens' && <FlowLines accent={project.accent} />}
      </AnimatePresence>

      {/* Content sits above overlays */}
      <div className="relative z-10 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <h3
            className="text-xl font-semibold text-white leading-snug"
            style={{ letterSpacing: '-0.02em' }}
          >
            {project.name}
          </h3>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub — ${project.name}`}
            style={{ color: project.accent }}
            className="shrink-0 mt-0.5 transition-opacity duration-200 hover:opacity-70"
          >
            <Github size={18} />
          </a>
        </div>

        {/* Tagline */}
        <p className="text-sm text-slate-400 leading-relaxed">
          {project.tagline}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-0.5 rounded-sm text-xs font-mono tracking-wide"
              style={{
                border: `0.5px solid ${project.accent}66`,
                color: project.accent === '#7c3aed' ? '#a78bfa' : '#2dd4bf',
                background: `${project.accent}0d`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
