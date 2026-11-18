import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileEdit, Sparkles, BookOpen } from 'lucide-react';
import { siteContent } from '@/content/site';
import { SectionHeading, Reveal, Sticker } from '@/components/ui';
import { CharacterSheet } from '@/components/CharacterSheet';
import { useSound } from '@/lib/sound';

export function FieldNotes() {
  return (
    <section id="field-notes" className="relative border-y-[3px] border-ink-900 bg-bubblegum py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading index="04" title="Field Notes" note="a publication in progress" color="#7049C6" />
        
        <div className="mb-10 flex items-center gap-3">
          <FileEdit size={22} className="text-ink-900 shrink-0" />
          <p className="max-w-2xl font-sans text-[15px] leading-relaxed text-ink-800">
            These are working drafts and article concepts in progress, not published articles. The notebook documents ideas exploring data, strategic thinking, music and everyday decisions.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {siteContent.notes.map((note, index) => (
            <Reveal key={note.title} delay={index * 0.05}>
              <article
                className="tape relative flex h-full flex-col justify-between border-[3px] border-ink-900 bg-warmcream-50 p-5 shadow-chunk transition-transform hover:-translate-y-2 hover:shadow-chunk-lg"
                style={{ transform: `rotate(${index % 2 === 0 ? -1.2 : 1.1}deg)` }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <Sticker color={note.color} rotate={-2}>
                      {note.tag}
                    </Sticker>
                    <span className="border border-ink-400 bg-cream-200 px-1.5 py-0.5 font-pixel text-[8px] text-ink-700">
                      {note.status}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-bold leading-snug text-ink-900">
                    {note.title}
                  </h3>

                  <p className="mt-3 font-sans text-xs leading-relaxed text-ink-600">
                    {note.excerpt}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 border-t border-dashed border-ink-300 pt-3 font-hand text-base text-electricviolet">
                  <span>open draft log</span>
                  <span>→</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CurrentlyCurious() {
  const [active, setActive] = useState(0);
  const { blip } = useSound();
  const curiosity = siteContent.curiosities[active];

  return (
    <section id="curious" className="mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
      <SectionHeading index="05" title="Currently Curious About" note="active intellectual investigations" color="#D8EF40" />
      
      <p className="-mt-6 mb-10 max-w-2xl font-sans text-base leading-relaxed text-ink-500 md:text-lg">
        An interactive curiosity board charting questions, fields and topics I frequently research and think about. Click any topic to see what draws me to it.
      </p>

      <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <div className="flex flex-wrap gap-2.5">
            {siteContent.curiosities.map((item, index) => {
              const isSelected = active === index;
              return (
                <motion.button
                  key={item.title}
                  type="button"
                  onClick={() => {
                    setActive(index);
                    blip(430 + index * 50);
                  }}
                  whileHover={{ y: -3 }}
                  className={`border-[3px] border-ink-900 px-4 py-2.5 text-left font-sans text-sm font-bold shadow-chunk-sm transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-electricviolet ${
                    isSelected
                      ? 'bg-ink-900 text-warmcream-50 scale-[1.02]'
                      : 'bg-warmcream-50 text-ink-800 hover:bg-cream-100'
                  }`}
                  style={{
                    borderTopColor: item.color,
                    borderTopWidth: '6px',
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.title}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <AnimatePresence mode="wait">
            <motion.div
              key={curiosity.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="border-[3px] border-ink-900 bg-acidlime p-6 shadow-chunk-lg md:p-8"
            >
              <div className="flex items-center justify-between gap-3 border-b-2 border-dashed border-ink-900/30 pb-3">
                <p className="font-pixel text-[9px] text-ink-900 tracking-wider">WHY THIS IS COMPELLING</p>
                <Sparkles size={16} className="text-ink-900" />
              </div>

              <h3 className="mt-4 font-display text-2xl font-black text-ink-900 md:text-3xl">
                {curiosity.title}
              </h3>

              <p className="mt-4 font-sans text-[15px] leading-relaxed text-ink-800">
                {curiosity.detail}
              </p>

              <div className="mt-8 flex items-center justify-between pt-4 border-t-2 border-dashed border-ink-900/30">
                <span className="font-hand text-xl text-ink-700">tap another topic to compare</span>
                <CharacterSheet variant="jump" scale={0.48} />
              </div>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="mt-12 flex flex-col gap-4 border-[3px] border-ink-900 bg-warmcream-50 p-6 shadow-chunk md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <BookOpen size={24} className="text-electricviolet shrink-0" />
            <div>
              <p className="font-pixel text-[9px] text-electricviolet tracking-wider">THINGS I&apos;M LEARNING RIGHT NOW</p>
              <p className="mt-1 font-sans text-sm font-semibold text-ink-800">
                Bayesian optimization methods, Explainable AI interpretability (Grad-CAM), and revenue recovery decision boundaries.
              </p>
            </div>
          </div>
          <span className="border-2 border-ink-900 bg-bubblegum px-3 py-1.5 font-pixel text-[9px] text-ink-900 shadow-chunk-sm self-start md:self-auto shrink-0">
            ACTIVE EXPLORATION
          </span>
        </div>
      </Reveal>
    </section>
  );
}
