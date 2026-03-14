'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

interface StackItem {
  name: string;
  src: string | null; // null = render as text badge
}

const STACK: StackItem[] = [
  { name: 'Python',       src: `${DEVICON}/python/python-original.svg` },
  { name: 'PostgreSQL',   src: `${DEVICON}/postgresql/postgresql-original.svg` },
  { name: 'FastAPI',      src: `${DEVICON}/fastapi/fastapi-original.svg` },
  { name: 'Docker',       src: `${DEVICON}/docker/docker-original.svg` },
  { name: 'Git',          src: `${DEVICON}/git/git-original.svg` },
  { name: 'Google Cloud', src: `${DEVICON}/googlecloud/googlecloud-original.svg` },
  { name: 'JavaScript',   src: `${DEVICON}/javascript/javascript-original.svg` },
  { name: 'Pandas',       src: `${DEVICON}/pandas/pandas-original.svg` },
  { name: 'Claude Code',  src: null },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

function StackIcon({ item }: { item: StackItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className="relative flex flex-col items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {item.src === null ? (
        // Claude Code text badge
        <motion.span
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.18 }}
          className="flex items-center h-10 px-2.5 rounded text-[10px] font-mono tracking-wide cursor-default select-none"
          style={{
            border: '0.5px solid #7c3aed66',
            color: '#a78bfa',
            background: '#7c3aed14',
          }}
        >
          Claude Code
        </motion.span>
      ) : (
        <motion.img
          src={item.src}
          alt={item.name}
          width={40}
          height={40}
          animate={{ scale: hovered ? 1.15 : 1 }}
          transition={{ duration: 0.18 }}
          className="w-10 h-10 object-contain select-none"
          draggable={false}
        />
      )}

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && item.src !== null && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 text-[10px] font-mono text-slate-400 whitespace-nowrap pointer-events-none z-10"
          >
            {item.name}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function About() {
  return (
    <div
      className="flex flex-col gap-6 rounded-xl p-7 h-full"
      style={{
        background: '#0f1117',
        border: '0.5px solid #7c3aed33',
      }}
    >
      {/* Bio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
        className="flex flex-col gap-3"
      >
        <p className="text-sm text-slate-400 leading-relaxed">
          I&apos;m Rushil — a Computational Data Science graduate from USYD. I spend my time
          building AI tools, working with data, and shipping things I&apos;m proud of.
        </p>
        <p className="text-sm text-slate-400 leading-relaxed">
          Currently exploring what it means to be useful in a world where the rules are being
          rewritten.
        </p>
      </motion.div>

      {/* Divider */}
      <div className="h-px bg-white/5" />

      {/* Tech stack */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap gap-x-5 gap-y-6 items-end pb-2"
      >
        {STACK.map((item) => (
          <StackIcon key={item.name} item={item} />
        ))}
      </motion.div>
    </div>
  );
}
