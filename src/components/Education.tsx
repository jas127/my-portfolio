import { siteContent } from '@/content/site';
import { SectionHeading, Reveal, Sticker } from '@/components/ui';
import { CharacterSheet } from '@/components/CharacterSheet';
import { GraduationCap, Calendar, BookOpen } from 'lucide-react';

export function Education() {
  return (
    <section id="education" className="relative mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
      <SectionHeading
        index="06"
        title="Education"
        note="dual degrees in parallel"
        color="#7049C6"
      />
      
      <p className="-mt-6 mb-12 max-w-2xl font-sans text-base leading-relaxed text-ink-500 md:text-lg">
        Pursuing two complementary degrees simultaneously: deepening foundational computer science and machine learning while rigorously studying data science applications.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        {siteContent.education.map((item, index) => (
          <Reveal key={item.school} delay={index * 0.1}>
            <div
              className="relative flex h-full flex-col border-[3px] border-ink-900 bg-warmcream-50 p-6 shadow-chunk transition-transform hover:-translate-y-1.5 md:p-8"
              style={{ borderTopColor: item.color, borderTopWidth: '8px' }}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-pixel text-[10px] tracking-wider text-ink-500">
                  PROGRAM 0{index + 1}
                </span>
                <span className="flex h-10 w-10 items-center justify-center border-2 border-ink-900 bg-warmcream-50 shadow-chunk-sm">
                  <GraduationCap size={22} className="text-ink-900" />
                </span>
              </div>

              <h3 className="mt-4 font-display text-2xl font-black text-ink-900 md:text-3xl">
                {item.school}
              </h3>

              <div className="mt-3 inline-block">
                <Sticker color={item.color} rotate={index === 0 ? -1.5 : 1.5}>
                  {item.qualification}
                </Sticker>
              </div>

              {item.focus && (
                <p className="mt-4 flex items-center gap-2 font-sans text-sm font-semibold text-ink-700">
                  <BookOpen size={16} className="text-electricviolet shrink-0" />
                  <span>{item.focus}</span>
                </p>
              )}

              <p className="mt-3 flex items-center gap-2 font-sans text-sm text-ink-600">
                <Calendar size={16} className="text-tomato-500 shrink-0" />
                <span>{item.timeline}</span>
              </p>

              {item.performance && (
                <div className="mt-4 inline-flex items-center gap-2 border-2 border-dashed border-ink-400 bg-cream-100 px-3 py-1.5 font-pixel text-[10px] text-ink-800">
                  <span className="h-2 w-2 rounded-full bg-grass-500" />
                  {item.performance}
                </div>
              )}

              <p className="mt-5 border-t-2 border-dashed border-ink-300 pt-4 font-hand text-xl text-ink-600">
                {item.note}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-end gap-3 text-right">
        <span className="font-hand text-xl text-ink-500">always studying, always building</span>
        <CharacterSheet variant="greet" scale={0.45} />
      </div>
    </section>
  );
}
