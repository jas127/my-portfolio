import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, FileEdit, Sparkles, X } from 'lucide-react';
import { siteContent, type FieldNote } from '@/content/site';
import { SectionHeading, Reveal, Sticker } from '@/components/ui';
import { CharacterSheet } from '@/components/CharacterSheet';
import { useSound } from '@/lib/sound';
import { readableText } from '@/lib/color';

function FieldNoteModal({ note, onClose }: { note: FieldNote; onClose: () => void }) {
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

  const headerFg = readableText(note.color);

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
        aria-labelledby={`field-note-title-${note.id}`}
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto border-[3px] border-ink-900 bg-warmcream-50 shadow-[10px_10px_0_0_#7049C6]"
      >
        {/* Sticky modal header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b-[3px] border-ink-900 px-5 py-4 md:px-8"
          style={{ backgroundColor: note.color, color: headerFg }}
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-pixel text-[9px] tracking-wider">
              FIELD NOTE // {note.number}
            </span>
            <span className="border-2 border-ink-900 bg-warmcream-50 px-2 py-0.5 font-pixel text-[8px] text-ink-900">
              {note.category.toUpperCase()}
            </span>
            <span className="border border-ink-900 bg-cream-200 px-2 py-0.5 font-pixel text-[8px] text-ink-800">
              {note.status}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close field note"
            className="flex h-10 w-10 shrink-0 items-center justify-center border-[3px] border-ink-900 bg-warmcream-50 text-ink-900 shadow-chunk-sm transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-ink-900"
          >
            <X size={20} />
          </button>
        </div>

        {/* Reading body */}
        <div className="p-6 md:p-10">
          <div className="mb-6 border-b-2 border-dashed border-ink-300 pb-6">
            <div className="flex flex-wrap items-center gap-3">
              <Sticker color={note.color} rotate={-1.5}>
                {note.tag}
              </Sticker>
              <span className="font-pixel text-[9px] text-ink-500">
                CATEGORY: {note.category.toUpperCase()} · {note.status.toUpperCase()}
              </span>
            </div>

            <h2
              id={`field-note-title-${note.id}`}
              className="mt-4 font-display text-2xl font-black leading-snug text-ink-900 md:text-4xl"
            >
              {note.title}
            </h2>
          </div>

          <div className="space-y-5 font-sans text-base leading-relaxed text-ink-800 md:text-[17px]">
            {note.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? 'border-l-4 border-electricviolet pl-4 font-medium text-ink-900'
                    : ''
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t-2 border-dashed border-ink-300 pt-6">
            <span className="font-hand text-xl text-ink-500">
              Notebook entry · {note.status}
            </span>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 border-[3px] border-ink-900 bg-acidlime px-4 py-2 font-pixel text-[10px] text-ink-900 shadow-chunk-sm transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-tomato-500"
            >
              <ArrowLeft size={14} /> BACK TO FIELD NOTES
            </button>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

export function FieldNotes() {
  const [selectedNote, setSelectedNote] = useState<FieldNote | null>(null);
  const { blip } = useSound();

  return (
    <section id="field-notes" className="relative border-y-[3px] border-ink-900 bg-bubblegum py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading index="04" title="Field Notes" note="a publication in progress" color="#7049C6" />

        <div className="mb-10 flex items-center gap-3">
          <FileEdit size={22} className="text-ink-900 shrink-0" />
          <p className="max-w-2xl font-sans text-[15px] leading-relaxed text-ink-800">
            These are working drafts and article concepts in progress, not published articles. The notebook documents ideas exploring data, strategic thinking, decision-making and hands-on experimentation.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {siteContent.notes.map((note, index) => (
            <Reveal key={note.id} delay={index * 0.05} className="h-full">
              <button
                type="button"
                onClick={() => {
                  setSelectedNote(note);
                  blip(580 + index * 40);
                }}
                style={{ transform: `rotate(${index % 2 === 0 ? -1.2 : 1.1}deg)` }}
                className="tape group relative flex h-full w-full flex-col justify-between border-[3px] border-ink-900 bg-warmcream-50 p-5 text-left shadow-chunk transition-transform hover:-translate-y-2 hover:shadow-chunk-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-electricviolet cursor-pointer"
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

                  <h3 className="mt-5 font-display text-lg font-bold leading-snug text-ink-900 group-hover:text-electricviolet transition-colors">
                    {note.title}
                  </h3>

                  <p className="mt-3 font-sans text-xs leading-relaxed text-ink-600">
                    {note.excerpt}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 border-t border-dashed border-ink-300 pt-3 font-hand text-base text-electricviolet">
                  <span className="group-hover:underline">open draft log</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedNote && (
          <FieldNoteModal note={selectedNote} onClose={() => setSelectedNote(null)} />
        )}
      </AnimatePresence>
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
    </section>
  );
}
