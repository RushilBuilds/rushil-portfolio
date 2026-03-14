'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface MainRole {
  title: string;
  company: string;
  period: string;
  impact: string;
  accent: 'purple' | 'teal';
  logo: string;
}

interface EarlyRole {
  title: string;
  company: string;
  period: string;
  impact: string;
}

const MAIN_ROLES: MainRole[] = [
  {
    title: 'Technical Associate',
    company: 'PurplAuto (by Purplescape)',
    period: 'Sept 2025 – Dec 2025',
    impact:
      'Delivered technical demos of an AI voice platform at Mobility Live Sydney. Qualified 8 enterprise leads including a national EV battery distributor.',
    accent: 'purple',
    logo: '/logos/purplescape_logo.jpg',
  },
  {
    title: 'Data & AI Intern',
    company: 'Purplescape',
    period: 'Nov 2024 – Feb 2025',
    impact:
      'Built production analytics dashboards and pricing models that drove a 30% profitability increase for a US luxury retail client.',
    accent: 'teal',
    logo: '/logos/purplescape_logo.jpg',
  },
  {
    title: 'Web Development Team Member',
    company: 'Google Developers Group, USYD',
    period: 'Jan 2023 – Jan 2024',
    impact:
      'Ran technical workshops at Google Sydney for 100+ students. 40% conversion rate into the official Google Cloud learning path.',
    accent: 'purple',
    logo: '/logos/gdgusyd_logo.jpg',
  },
  {
    title: 'Cyber Security Team Lead',
    company: 'Google Developers Group, USYD',
    period: 'Feb 2022 – Jan 2023',
    impact:
      'Led flagship security workshop for 200+ students. Drove 50% increase in campus membership.',
    accent: 'teal',
    logo: '/logos/gdgusyd_logo.jpg',
  },
  {
    title: 'Industry Project',
    company: 'EY x USYD (ENGG3800)',
    period: '2025',
    impact:
      'Mixed-methods study uncovering a 4x mismatch in campus occupancy data. Built and presented a working UI prototype to EY stakeholders.',
    accent: 'purple',
    logo: '/logos/ernstandyoung_logo.jpg',
  },
];

const EARLY_ROLES: EarlyRole[] = [
  {
    title: 'Technical Lead',
    company: 'ThePhiWorks',
    period: 'Jan 2021 – Jul 2021',
    impact:
      'Built and deployed a news aggregator app to the Google Play Store. Led a small cross-functional dev team.',
  },
  {
    title: 'Web Development Intern',
    company: 'Verzeo Microsoft',
    period: 'May 2020 – Aug 2020',
    impact:
      'Delivered client web projects using Django and Python. Earned Microsoft Web Development Certificate.',
  },
  {
    title: 'Technical Lead',
    company: 'I2WE',
    period: 'May 2019 – Feb 2020',
    impact:
      'Built an event website and QR check-in system. Platform grew to 13,000+ annual participants.',
  },
];

const ACCENT = {
  purple: { dot: '#7c3aed', label: '#a78bfa' },
  teal: { dot: '#0d9488', label: '#2dd4bf' },
};

function CompanyLogo({ src, company }: { src: string; company: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-xs font-semibold"
        style={{ border: '0.5px solid #7c3aed55', background: '#7c3aed18', color: '#a78bfa' }}
      >
        {company[0]}
      </div>
    );
  }

  return (
    <div
      className="relative w-9 h-9 rounded-full shrink-0 overflow-hidden"
      style={{ border: '0.5px solid #7c3aed55' }}
    >
      <Image
        src={src}
        alt={company}
        fill
        sizes="36px"
        className="object-cover"
        onError={() => setErrored(true)}
      />
    </div>
  );
}

function RoleCard({ role, align }: { role: MainRole; align: 'left' | 'right' }) {
  return (
    <div className={`flex items-start gap-3 ${align === 'left' ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
      <CompanyLogo src={role.logo} company={role.company} />
      <div className="flex flex-col gap-1">
        <div className={`flex flex-wrap items-baseline gap-x-2 gap-y-0.5 ${align === 'left' ? 'justify-end' : 'justify-start'}`}>
          <span className="text-base font-semibold text-white leading-snug">{role.title}</span>
          <span className="text-sm" style={{ color: ACCENT[role.accent].label }}>{role.company}</span>
        </div>
        <span className="text-xs text-slate-500 font-mono">{role.period}</span>
        <p className="text-sm text-slate-400 leading-relaxed mt-1 max-w-xs">{role.impact}</p>
      </div>
    </div>
  );
}

function TimelineDot({ accent }: { accent: 'purple' | 'teal' }) {
  return (
    <span className="flex items-center justify-center w-5 h-5">
      <span
        className="absolute w-3.5 h-3.5 rounded-full opacity-25"
        style={{ background: ACCENT[accent].dot }}
      />
      <span
        className="w-2 h-2 rounded-full z-10"
        style={{ background: ACCENT[accent].dot }}
      />
    </span>
  );
}

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [earlyOpen, setEarlyOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 60%'],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const lineTrack = (
    <motion.div
      className="w-full bg-gradient-to-b from-[#0d9488] to-[#7c3aed] origin-top"
      style={{ scaleY: lineScaleY, height: '100%' }}
    />
  );

  return (
    <section id="experience" className="relative z-10 py-28 px-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-14">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col gap-3"
        >
          <h2 className="text-3xl font-semibold text-white tracking-tight">Experience</h2>
          <div className="h-px w-12 bg-[#7c3aed] rounded-full" />
        </motion.div>

        {/* ── Timeline ── */}
        <div ref={timelineRef} className="relative">

          {/* ── Desktop: centre line ── */}
          <div className="hidden md:block absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-white/5 overflow-hidden">
            {lineTrack}
          </div>

          {/* ── Mobile: left-aligned line ── */}
          <div className="md:hidden absolute left-[3px] top-2 bottom-2 w-px bg-white/5 overflow-hidden">
            {lineTrack}
          </div>

          {/* ── Role rows ── */}
          <div className="flex flex-col">
            {MAIN_ROLES.map((role, i) => {
              const isLeft = i % 2 === 0; // odd-numbered (1st, 3rd…) = left

              return (
                <div key={role.title + role.company} className="relative mb-12 last:mb-0">

                  {/* ── Desktop layout: 3-col grid ── */}
                  <div className="hidden md:grid grid-cols-[1fr_40px_1fr] items-center gap-0">
                    {/* Left slot */}
                    <div className="flex justify-end pr-6">
                      {isLeft && (
                        <motion.div
                          initial={{ opacity: 0, x: -28 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-60px' }}
                          transition={{ duration: 0.55, ease: EASE }}
                        >
                          <RoleCard role={role} align="left" />
                        </motion.div>
                      )}
                    </div>

                    {/* Centre dot */}
                    <div className="flex items-center justify-center relative">
                      <TimelineDot accent={role.accent} />
                    </div>

                    {/* Right slot */}
                    <div className="flex justify-start pl-6">
                      {!isLeft && (
                        <motion.div
                          initial={{ opacity: 0, x: 28 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-60px' }}
                          transition={{ duration: 0.55, ease: EASE }}
                        >
                          <RoleCard role={role} align="right" />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* ── Mobile layout: left-aligned ── */}
                  <motion.div
                    className="md:hidden relative pl-8"
                    initial={{ opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}
                  >
                    {/* Mobile dot */}
                    <span className="absolute left-0 top-[16px] flex items-center justify-center" aria-hidden="true">
                      <span className="absolute w-3 h-3 rounded-full opacity-25" style={{ background: ACCENT[role.accent].dot }} />
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT[role.accent].dot }} />
                    </span>
                    <RoleCard role={role} align="right" />
                  </motion.div>

                </div>
              );
            })}
          </div>
        </div>

        {/* ── Earlier experience accordion — centred ── */}
        <div className="flex flex-col items-center gap-0">
          <button
            onClick={() => setEarlyOpen((v) => !v)}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors duration-200 font-mono tracking-wide group"
            aria-expanded={earlyOpen}
          >
            <motion.span
              animate={{ rotate: earlyOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="text-slate-600 group-hover:text-slate-400"
            >
              <ChevronDown size={14} />
            </motion.span>
            Earlier Experience
          </button>

          <AnimatePresence initial={false}>
            {earlyOpen && (
              <motion.div
                key="early"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.38, ease: EASE }}
                className="overflow-hidden w-full max-w-xl"
              >
                <div className="flex flex-col gap-0 mt-5">
                  {EARLY_ROLES.map((role) => (
                    <div
                      key={role.title + role.company}
                      className="border-l border-[#7c3aed]/25 pl-5 py-3.5 flex flex-col gap-1"
                    >
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                        <span className="text-sm font-semibold text-white/80">{role.title}</span>
                        <span className="text-sm text-[#a78bfa]/60">{role.company}</span>
                      </div>
                      <span className="text-xs text-slate-600 font-mono">{role.period}</span>
                      <p className="text-sm text-slate-500 leading-relaxed mt-0.5">{role.impact}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
