import { siteContent } from '@/content/site';
import { SectionHeading, Reveal, Sticker } from '@/components/ui';
import { CharacterSheet } from '@/components/CharacterSheet';
import { GraduationCap, Calendar, BookOpen, Sparkles } from 'lucide-react';

export function Education() {
  const { education } = siteContent;

  return (
    <section id="education" className="relative mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
      <SectionHeading
        index="06"
        title="Education"
        note="two degrees, one purpose"
        color="#7049C6"
      />

      {/* Personal Reflection Story Note */}
      <Reveal>
        <div className="relative mb-12 border-[3px] border-ink-900 bg-warmcream-50 p-6 shadow-chunk md:p-8">
          <div className="tape" />
          <div className="flex items-center gap-2.5 font-pixel text-[9px] text-electricviolet tracking-wider">
            <Sparkles size={14} className="text-tomato-500" />
            <span>PERSONAL NOTE // WHY TWO DEGREES</span>
          </div>

          <h3 className="mt-3 font-display text-2xl font-black text-ink-900 md:text-3xl">
            {education.storyHeading}
          </h3>

          <div className="mt-4 space-y-3.5 max-w-4xl font-sans text-[15px] leading-relaxed text-ink-700 md:text-base">
            {education.storyParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t-2 border-dashed border-ink-300 pt-4">
            <p className="font-hand text-xl text-ink-500">
              stay curious · learn wholeheartedly · do justice to opportunities
            </p>
            <div className="shrink-0 hidden sm:block">
              <CharacterSheet variant="greet" scale={0.48} />
            </div>
          </div>
        </div>
      </Reveal>

      {/* Degrees Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {education.degrees.map((item, index) => (
          <Reveal key={item.school} delay={index * 0.1}>
            <div
              className="relative flex h-full flex-col justify-between border-[3px] border-ink-900 bg-warmcream-50 p-6 shadow-chunk transition-transform hover:-translate-y-1.5 md:p-8"
              style={{ borderTopColor: item.color, borderTopWidth: '8px' }}
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-pixel text-[10px] tracking-wider text-ink-500">
                    DEGREE 0{index + 1}
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center border-2 border-ink-900 bg-warmcream-50 shadow-chunk-sm">
                    <GraduationCap size={22} className="text-ink-900" />
                  </span>
                </div>

                <h4 className="mt-4 font-display text-2xl font-black text-ink-900 md:text-3xl">
                  {item.school}
                </h4>

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
              </div>

              <div className="mt-6 border-t-2 border-dashed border-ink-300 pt-4">
                <p className="font-sans text-sm leading-relaxed text-ink-600">
                  {item.note}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
