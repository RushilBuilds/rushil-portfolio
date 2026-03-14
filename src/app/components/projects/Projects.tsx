'use client';

import { motion } from 'framer-motion';
import ProjectCard, { type Project } from './ProjectCard';

const PROJECTS: Project[] = [
  {
    name: 'LLM-Guardrails',
    tagline:
      'Python library that detects prompt injection, jailbreak attempts, and PII leakage for production LLM applications.',
    tech: ['Python', 'FastAPI', 'pytest'],
    accent: '#7c3aed',
    github: 'https://github.com/RushilBuilds/LLM-Guardrails',
    variant: 'guardrails',
  },
  {
    name: 'QueryLens',
    tagline:
      'Self-healing data pipeline observatory with causal fault diagnosis — detects and auto-remediates failures in real time.',
    tech: ['Python', 'Docker', 'PostgreSQL'],
    accent: '#0d9488',
    github: 'https://github.com/RushilBuilds/QueryLens',
    variant: 'querylens',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 py-28 px-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-14">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="flex flex-col gap-3"
        >
          <h2 className="text-3xl font-semibold text-white tracking-tight">Projects</h2>
          <div className="h-px w-12 bg-[#7c3aed] rounded-full" />
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
