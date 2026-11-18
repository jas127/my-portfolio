import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { siteContent } from '@/content/site';
import { SectionHeading, Reveal } from '@/components/ui';
import { PixelCharacter, PixelFace } from '@/components/PixelCharacter';
import { useSound } from '@/lib/sound';
import { readableText } from '@/lib/color';
import type { SpriteAnimation } from '@/pixel/spriteManifest';

const CATEGORIES = siteContent.skills;
const TILTS = [-1.5, 1, -0.5, 1.5, -1, 0.5];
const CHIP_TILTS = [-2, 1.5, -1, 2, -1.5, 1, 0, -2.5];

/** Which loop the character plays while each crate is open. */
const POSE: Record<string, SpriteAnimation> = {
  'data-analytics': 'work',
  'ai-ml': 'work',
  'databases-tools': 'work',
};

/**
 * MY TOOLBOX
 *
 * Layout idea: a pile of six "crates" (the tabs) next to an open-crate panel. Opening a crate
 * shows what's inside plus a short note. Chips marked with a star are the ones backed by a real
 * project or role - tapping one reveals where it came from and makes the character hop.
 * Underneath, "everything in the bag" keeps every single skill visible at once; the open
 * crate's items light up and the rest dim (they are never hidden).
 * Deliberately no levels, scores or bars anywhere.
 */
export function Toolbox() {
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);
  const [openSkill, setOpenSkill] = useState<string | null>(null);
  const [discovering, setDiscovering] = useState(false);
  const { blip } = useSound();
  const reduceMotion = useReducedMotion();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const hopTimer = useRef<number>();

  useEffect(() => () => window.clearTimeout(hopTimer.current), []);

  const active = CATEGORIES.find((c) => c.id === activeId) ?? CATEGORIES[0];
  const story = active.skills.find((s) => s.name === openSkill)?.story;

  const choose = (id: string, focus = false) => {
    setActiveId(id);
    setOpenSkill(null);
    setDiscovering(false);
    blip(520 + CATEGORIES.findIndex((c) => c.id === id) * 60);
    if (focus) tabRefs.current[CATEGORIES.findIndex((c) => c.id === id)]?.focus();
  };

  // Arrow keys move between crates, like a standard tab list.
  const onTabKey = (event: KeyboardEvent, index: number) => {
    const last = CATEGORIES.length - 1;
    const next =
      event.key === 'ArrowDown' || event.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
      : event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : -1;
    if (next < 0) return;
    event.preventDefault();
    choose(CATEGORIES[next].id, true);
  };

  const pickSkill = (name: string) => {
    const same = openSkill === name;
    setOpenSkill(same ? null : name);
    blip(700);
    if (!same) {
      setDiscovering(true);
      window.clearTimeout(hopTimer.current);
      hopTimer.current = window.setTimeout(() => setDiscovering(false), 1300);
    }
  };

  const animation: SpriteAnimation = discovering ? 'jump' : POSE[active.id] ?? 'idle';
  const face = discovering ? 'starstruck' : active.expression;
  const total = CATEGORIES.reduce((n, c) => n + c.skills.length, 0);

  return (
    <section id="toolbox" className="relative mx-auto max-w-6xl px-4 py-20 md:px-8 md:py-28">
      <SectionHeading index="03" title="My Toolbox" note="a collection, not a CV" color="#7049C6" />
      <p className="-mt-6 mb-10 max-w-2xl font-sans text-base leading-relaxed text-ink-500 md:text-lg">
        No levels, no bars, no scores. Just what&apos;s in my bag, grouped into six crates. Open one to see what&apos;s
        inside. Anything marked <span aria-hidden="true">✦</span>
        <span className="sr-only">with a star</span> has a real project or role behind it.
      </p>

      <div className="grid gap-8 lg:grid-cols-[0.62fr_1.38fr]">
        {/* ---- the crates (tabs) ---- */}
        <Reveal>
          <div role="tablist" aria-label="Skill crates" aria-orientation="vertical" className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            {CATEGORIES.map((cat, index) => {
              const selected = cat.id === activeId;
              const fg = selected ? readableText(cat.color) : '#191919';
              return (
                <button
                  key={cat.id}
                  ref={(el) => { tabRefs.current[index] = el; }}
                  type="button"
                  role="tab"
                  id={`crate-tab-${cat.id}`}
                  aria-selected={selected}
                  aria-controls="crate-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => choose(cat.id)}
                  onKeyDown={(e) => onTabKey(e, index)}
                  className={`group relative flex flex-col items-start gap-2 border-[3px] border-ink-900 p-3 text-left shadow-chunk-sm transition-all duration-200 sm:flex-row sm:items-center sm:gap-3 hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-tomato-500 ${selected ? 'lg:translate-x-3' : ''}`}
                  style={{ backgroundColor: selected ? cat.color : '#FFF7E8', color: fg, transform: reduceMotion ? undefined : `rotate(${selected ? 0 : TILTS[index]}deg)` }}
                >
                  <img
                    src={`/assets/sprites/props/${cat.prop}.png`}
                    alt=""
                    className="pixelated h-12 w-12 shrink-0 object-contain transition-transform group-hover:-rotate-6 group-hover:scale-110"
                  />
                  <span className="min-w-0">
                    <span className="block break-words font-display text-[15px] font-black leading-tight sm:text-base md:text-lg">{cat.name}</span>
                    <span className="mt-1 block font-pixel text-[9px] tracking-wide opacity-80">{cat.skills.length} TOOLS</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ---- the open crate ---- */}
        <Reveal delay={0.08}>
          <div
            role="tabpanel"
            id="crate-panel"
            aria-labelledby={`crate-tab-${active.id}`}
            className="relative border-[3px] border-ink-900 bg-warmcream-50 shadow-chunk-lg"
          >
            <div className="flex items-center justify-between gap-3 border-b-[3px] border-ink-900 px-5 py-3" style={{ backgroundColor: active.color, color: readableText(active.color) }}>
              <p className="font-pixel text-[10px] tracking-wide">CRATE {String(CATEGORIES.indexOf(active) + 1).padStart(2, '0')} / {String(CATEGORIES.length).padStart(2, '0')}</p>
              <img src={`/assets/sprites/props/${active.prop}.png`} alt="" className="pixelated h-9 w-9 object-contain" />
            </div>

            <div className="grid gap-6 p-5 md:grid-cols-[1.25fr_0.75fr] md:p-7">
              <div className="min-w-0">
                <h3 className="font-display text-3xl font-black leading-tight text-ink-900">{active.name}</h3>
                <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-600">{active.blurb}</p>

                <ul className="mt-6 flex flex-wrap gap-x-2.5 gap-y-3" aria-label={`${active.name} tools`}>
                  {active.skills.map((skill, i) => {
                    const chipStyle = {
                      backgroundColor: openSkill === skill.name ? active.color : '#FFF7E8',
                      color: openSkill === skill.name ? readableText(active.color) : '#191919',
                      transform: reduceMotion ? undefined : `rotate(${CHIP_TILTS[i % CHIP_TILTS.length]}deg)`,
                    };
                    const base = 'inline-flex items-center gap-1.5 border-2 border-ink-900 px-3 py-1.5 font-sans text-sm font-bold shadow-chunk-sm';
                    return (
                      <li key={skill.name}>
                        {skill.story ? (
                          <button
                            type="button"
                            aria-expanded={openSkill === skill.name}
                            onClick={() => pickSkill(skill.name)}
                            className={`${base} cursor-pointer transition-transform hover:-translate-y-1 hover:rotate-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-tomato-500`}
                            style={chipStyle}
                          >
                            <span aria-hidden="true" className="text-xs">✦</span>
                            {skill.name}
                          </button>
                        ) : (
                          <span className={base} style={chipStyle}>{skill.name}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>

                {/* the note that opens under the chips */}
                <div className="mt-5 min-h-[5.5rem]" aria-live="polite">
                  <AnimatePresence mode="wait">
                    {story ? (
                      <motion.div
                        key={openSkill}
                        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                        transition={{ duration: reduceMotion ? 0 : 0.2 }}
                        className="border-[3px] border-ink-900 bg-acidlime px-4 py-3 shadow-chunk-sm"
                      >
                        <p className="font-pixel text-[9px] tracking-wide text-ink-900">✦ SEEN IN: {story.where.toUpperCase()}</p>
                        <p className="mt-1.5 font-sans text-sm leading-relaxed text-ink-900">{story.note}</p>
                      </motion.div>
                    ) : (
                      <p key="hint" className="font-hand text-xl text-ink-400">
                        {active.skills.some((s) => s.story) ? 'Tap a ✦ tool to see where it showed up.' : 'More stories for this crate are on the way.'}
                      </p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* character + quip. Stacks below the chips on small screens, never overlapping them. */}
              <div className="flex flex-col items-center justify-end gap-3 border-t-2 border-dashed border-ink-300 pt-5 md:border-l-2 md:border-t-0 md:pl-5 md:pt-0">
                <div className="relative flex w-full max-w-[16rem] items-center gap-2 border-[3px] border-ink-900 bg-bubblegum px-3 py-2 shadow-chunk-sm">
                  <PixelFace expression={face} scale={0.4} className="shrink-0" />
                  <p className="font-hand text-lg leading-tight text-ink-900">{active.quip}</p>
                  <span aria-hidden="true" className="absolute -bottom-[11px] left-1/2 -ml-2 h-4 w-4 rotate-45 border-b-[3px] border-r-[3px] border-ink-900 bg-bubblegum" />
                </div>
                <div className="flex min-h-[200px] items-end justify-center">
                  <PixelCharacter animation={animation} scale={0.78} label={`Jasmitha, ${discovering ? 'excited' : 'browsing the toolbox'}`} />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ---- everything in the bag: all skills, always visible ---- */}
      <Reveal delay={0.1}>
        <div className="mt-10 border-[3px] border-dashed border-ink-900 bg-cream-200 p-5 md:p-7">
          <p className="font-pixel text-[10px] tracking-wide text-electricviolet">EVERYTHING IN THE BAG · {total} THINGS</p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="All tools and skills">
            {CATEGORIES.flatMap((cat) =>
              cat.skills.map((skill) => {
                const lit = cat.id === activeId;
                return (
                  <li
                    key={`${cat.id}-${skill.name}`}
                    className={`flex items-center gap-2 border-2 border-ink-900 bg-warmcream-50 px-2.5 py-1 font-sans text-[13px] font-semibold text-ink-900 transition-opacity duration-300 ${lit ? 'opacity-100' : 'opacity-50'}`}
                  >
                    <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 border border-ink-900" style={{ backgroundColor: cat.color }} />
                    {skill.name}
                  </li>
                );
              }),
            )}
          </ul>
          <p className="mt-4 font-hand text-xl text-ink-500">
            Still learning: this bag keeps changing, and I&apos;d rather show it honestly than pad it.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
