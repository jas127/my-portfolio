import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, BarChart3, Compass, ExternalLink, FileSearch, Layers3, X, Github } from 'lucide-react';
import { siteContent, type Project } from '@/content/site';
import { SectionHeading, Sticker, Reveal, PixelObject } from '@/components/ui';
import { PixelSprite } from '@/pixel';
import { BULB, DIAMOND, FLAG as FLAG_SPRITE, STAR } from '@/pixel/sprites';
import { CharacterSheet } from '@/components/CharacterSheet';
import { useSound } from '@/lib/sound';

function ProjectMarker({ kind }: { kind: string }) {
  const icon = kind === 'film' ? FileSearch : kind === 'briefcase' ? Layers3 : kind === 'signal' ? BarChart3 : Compass;
  const Icon = icon;
  return <Icon size={26} strokeWidth={2.5} className="text-ink-900" />;
}

function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-nearblack/80 p-0 md:items-center md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <motion.article
        initial={{ y: 40 }}
        animate={{ y: 0 }}
        exit={{ y: 40 }}
        className="relative max-h-[94vh] w-full max-w-4xl overflow-y-auto border-[3px] border-ink-900 bg-warmcream-50 shadow-[10px_10px_0_0_#7049C6]"
      >
        <div
          className="sticky top-0 z-10 flex items-center justify-between border-b-[3px] border-ink-900 px-5 py-4"
          style={{ backgroundColor: project.color }}
        >
          <div>
            <p className="font-pixel text-[9px] text-ink-900 tracking-wider">CASE STUDY // {project.number}</p>
            <h2 className="mt-1 font-display text-2xl font-black text-ink-900 md:text-4xl">{project.title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="flex h-10 w-10 items-center justify-center border-[3px] border-ink-900 bg-warmcream-50 text-ink-900 shadow-chunk-sm transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-ink-900"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid gap-8 p-5 md:grid-cols-[0.85fr_1.15fr] md:p-9">
          <div>
            <p className="font-pixel text-[10px] leading-relaxed text-electricviolet">{project.category}</p>
            <p className="mt-5 font-display text-2xl font-bold leading-snug text-ink-900">{project.description}</p>
            
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <Sticker key={tool} color={project.color} rotate={-1}>
                  {tool}
                </Sticker>
              ))}
            </div>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 border-[3px] border-ink-900 bg-nearblack px-4 py-3 font-pixel text-[10px] text-warmcream-50 shadow-chunk transition-transform hover:-translate-y-1 hover:shadow-chunk-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-tomato-500"
              >
                <Github size={16} /> VIEW ON GITHUB <ExternalLink size={14} />
              </a>
            )}

            <div className="mt-10 hidden items-end gap-2 md:flex">
              <CharacterSheet variant="interact" scale={0.6} />
              <span className="border-2 border-ink-900 bg-bubblegum px-3 py-2 font-hand text-xl text-ink-900 shadow-chunk-sm">
                Examining the details...
              </span>
            </div>
          </div>

          <div className="space-y-7">
            <CaseBlock title="The problem statement" body={project.objective} />
            <CaseBlock title="Why it matters" body={project.whyItMatters} />
            <CaseList title="My contribution" items={project.contribution} />
            <CaseBlock title="Data and inputs" body={project.data} />
            <CaseList title="Analytical approach" items={project.approach} />
            <CaseBlock title="Implementation details" body={project.implementation} />
            <CaseList title="Results & metrics" items={project.results} />
            <CaseBlock title="Limitations & boundaries" body={project.limitations} accent="bg-bubblegum" />
            <CaseBlock title="What I learned" body={project.learned} accent="bg-acidlime" />
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

function CaseBlock({ title, body, accent = 'bg-cream-200' }: { title: string; body: string; accent?: string }) {
  return (
    <section>
      <h3 className="font-pixel text-[10px] tracking-wide text-electricviolet uppercase">{title}</h3>
      <p className={`mt-2 border-l-4 border-electricviolet px-4 py-3 font-sans text-[15px] leading-relaxed text-ink-800 ${accent}`}>
        {body}
      </p>
    </section>
  );
}

function CaseList({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h3 className="font-pixel text-[10px] tracking-wide text-electricviolet uppercase">{title}</h3>
      <ul className="mt-2 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 font-sans text-[15px] leading-relaxed text-ink-700">
            <span className="mt-2 h-2 w-2 shrink-0 bg-tomato-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}) {
  const { blip } = useSound();

  return (
    <Reveal delay={index * 0.06} className="h-full">
      <motion.div
        whileHover={{ y: -6, rotate: index % 2 === 0 ? -0.7 : 0.7 }}
        className="group relative flex h-full w-full flex-col overflow-hidden border-[3px] border-ink-900 bg-warmcream-50 text-left shadow-chunk transition-shadow hover:shadow-chunk-lg"
      >
        <div
          className="flex items-center justify-between border-b-[3px] border-ink-900 px-5 py-3"
          style={{ backgroundColor: project.color }}
        >
          <span className="font-pixel text-[10px] text-ink-900">QUEST {project.number}</span>
          <span className="flex h-9 w-9 items-center justify-center border-2 border-ink-900 bg-warmcream-50">
            <ProjectMarker kind={project.marker} />
          </span>
        </div>

        <div className="flex flex-1 flex-col px-5 py-6">
          <p className="font-pixel text-[9px] tracking-wide text-electricviolet">{project.category}</p>
          <h3 className="mt-3 font-display text-2xl font-black leading-snug text-ink-900">{project.title}</h3>
          <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-600">{project.short}</p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tools.slice(0, 4).map((t) => (
              <span key={t} className="border border-ink-900 bg-cream-100 px-2 py-0.5 font-pixel text-[8px] text-ink-800">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between gap-3 pt-6 border-t border-dashed border-ink-300">
            <button
              type="button"
              onClick={() => {
                onOpen(project);
                blip(620);
              }}
              className="inline-flex items-center gap-1.5 font-pixel text-[10px] text-electricviolet hover:underline focus:outline-none"
            >
              CASE STUDY <ArrowUpRight size={16} />
            </button>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${project.title} source on GitHub`}
                className="flex items-center gap-1.5 border-2 border-ink-900 bg-nearblack px-2.5 py-1.5 font-pixel text-[9px] text-warmcream-50 shadow-chunk-sm hover:-translate-y-0.5"
              >
                <Github size={12} /> REPO
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

export function MainQuests() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="main-quests" className="relative mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
      <SectionHeading index="01" title="Main Quests" note="the big analytical builds" color="#FF4C35" />
      <p className="-mt-6 mb-10 max-w-2xl font-sans text-base leading-relaxed text-ink-500 md:text-lg">
        Four featured projects exploring predictive modeling, strategy simulation, payment recovery intelligence and computer vision explainability. Each project includes transparent methodological reporting.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {siteContent.projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onOpen={(p) => setSelected(p)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selected && <CaseStudy project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

export function SideQuests() {
  const { blip } = useSound();
  const [open, setOpen] = useState(0);
  const quest = siteContent.sideQuests[open];

  return (
    <section id="side-quests" className="relative border-y-[3px] border-ink-900 bg-electricviolet py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,247,232,0.25) 2px, transparent 2px), linear-gradient(90deg, rgba(255,247,232,0.25) 2px, transparent 2px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-10 flex flex-wrap items-end gap-x-5 gap-y-2">
          <span className="inline-block -rotate-2 border-2 border-ink-900 bg-warmcream-50 px-2 py-1 font-pixel text-[11px] text-ink-900 shadow-chunk-sm">
            02
          </span>
          <h2 className="font-display text-3xl font-black text-warmcream-50 md:text-5xl">Side Quests</h2>
          <span className="font-hand text-xl text-acidlime md:text-2xl">leadership, competitions & research</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {siteContent.sideQuests.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(index);
                    blip(500 + index * 70);
                  }}
                  className={`group flex h-full w-full flex-col border-[3px] border-ink-900 p-5 text-left shadow-chunk transition-all hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-acidlime ${
                    open === index ? 'bg-acidlime' : 'bg-warmcream-50'
                  }`}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="font-pixel text-[9px] text-ink-900">SIDE QUEST 0{index + 1}</span>
                    <span className="h-4 w-4 rotate-45 border-2 border-ink-900" style={{ backgroundColor: item.color }} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink-900">{item.title}</h3>
                  <p className="mt-2 font-pixel text-[9px] leading-relaxed text-electricviolet">{item.role}</p>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-ink-600">{item.summary}</p>
                </button>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <div className="relative min-h-[330px] border-[3px] border-ink-900 bg-warmcream-50 p-6 shadow-chunk-lg md:p-8">
              <div className="absolute right-5 top-5 rotate-6">
                <PixelSprite sprite={STAR} scale={3} />
              </div>
              <p className="font-pixel text-[9px] text-electricviolet">
                EXPERIENCE LOG // {String(open + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-3 font-display text-3xl font-black text-ink-900">{quest.title}</h3>
              <p className="mt-2 font-hand text-2xl text-tomato-500">{quest.role}</p>
              
              <ul className="mt-6 space-y-3">
                {quest.details.map((detail) => (
                  <li key={detail} className="flex gap-3 font-sans text-[15px] leading-relaxed text-ink-600">
                    <span className="mt-2 h-2 w-2 shrink-0 bg-electricviolet" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-end justify-between gap-4 border-t-2 border-dashed border-ink-300 pt-4">
                <p className="font-hand text-xl text-ink-500">{quest.lesson}</p>
                <div className="shrink-0">
                  <CharacterSheet variant={open === 1 ? 'celebrate' : 'idle'} scale={0.45} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-6 text-warmcream-50">
          <PixelObject note="curiosity sparked">
            <PixelSprite sprite={BULB} scale={4} />
          </PixelObject>
          <PixelObject note="valuable lessons">
            <PixelSprite sprite={DIAMOND} scale={4} />
          </PixelObject>
          <PixelObject note="quest completed">
            <PixelSprite sprite={FLAG_SPRITE} scale={4} />
          </PixelObject>
          <span className="font-hand text-xl text-acidlime">hover the pixel badges for notes</span>
        </div>
      </div>
    </section>
  );
}
