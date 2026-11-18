import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, Compass, Flag, Lightbulb, MapPin, Search, Sparkles } from 'lucide-react';
import { siteContent } from '@/content/site';
import { SectionHeading, Reveal } from '@/components/ui';
import { CharacterSheet } from '@/components/CharacterSheet';
import { useSound } from '@/lib/sound';

const LOCATIONS = [
  { label: 'Main quests', href: '#main-quests', icon: Flag, x: '14%', y: '44%', color: '#FF4C35', note: 'projects & proof' },
  { label: 'Side quests', href: '#side-quests', icon: Compass, x: '35%', y: '22%', color: '#7049C6', note: 'people & practice' },
  { label: 'Toolbox', href: '#toolbox', icon: Sparkles, x: '56%', y: '56%', color: '#D8EF40', note: 'skills in motion' },
  { label: 'Field notes', href: '#field-notes', icon: Search, x: '79%', y: '26%', color: '#F4A8D0', note: 'ideas in progress' },
  { label: 'Open door', href: '#contact', icon: MapPin, x: '83%', y: '72%', color: '#FF4C35', note: 'say hello' },
];

export default function WorldMap() {
  const [active, setActive] = useState(0);
  const { blip } = useSound();
  const location = LOCATIONS[active];
  return (
    <section id="world-map" className="relative border-b-[3px] border-ink-900 bg-nearblack py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeading index="00" title="The Curiosity Map" note="choose your route" color="#D8EF40" />
        <div className="grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="relative">
              <p className="max-w-md font-display text-3xl font-bold leading-tight text-warmcream-50 md:text-4xl">
                There is more than one way into the world.
              </p>
              <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-warmcream-50/70">
                Click a marker to peek at a chapter, then follow the trail wherever your curiosity points.
              </p>
              <div className="mt-6 flex items-center gap-3 text-acidlime">
                <Lightbulb size={20} />
                <span className="font-hand text-2xl">{location.note}</span>
              </div>
              <div className="mt-8 flex items-end gap-3">
                <CharacterSheet variant="walk" scale={0.72} />
                <span className="max-w-[170px] border-2 border-warmcream-50/40 bg-warmcream-50/10 px-3 py-2 font-hand text-xl leading-none text-warmcream-50">
                  {siteContent.hero.messages[active % siteContent.hero.messages.length]}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative min-h-[330px] overflow-hidden border-[3px] border-warmcream-50/60 bg-[#25242b] shadow-[8px_8px_0_0_#7049C6]">
              <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(#7049C6 1px, transparent 1px), linear-gradient(90deg, #7049C6 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 420" preserveAspectRatio="none" aria-hidden="true">
                <path d="M80 250 C180 150 235 295 340 185 S515 290 640 110 S700 270 750 305" fill="none" stroke="#F4A8D0" strokeWidth="7" strokeDasharray="12 16" opacity="0.8" />
                <path d="M84 255 C180 155 235 300 340 190 S515 295 640 115 S700 275 750 310" fill="none" stroke="#191919" strokeWidth="2" strokeDasharray="12 16" />
              </svg>
              {LOCATIONS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      setActive(i);
                      blip(420 + i * 80);
                    }}
                    onMouseEnter={() => setActive(i)}
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2 focus:outline-none focus-visible:ring-4 focus-visible:ring-acidlime"
                    style={{ left: item.x, top: item.y }}
                    aria-label={`Go to ${item.label}`}
                  >
                    <span className="flex h-14 w-14 items-center justify-center border-[3px] border-nearblack shadow-chunk-sm" style={{ backgroundColor: item.color }}>
                      <Icon size={23} className="text-nearblack" strokeWidth={2.5} />
                    </span>
                    <span className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap border-2 border-warmcream-50/60 bg-nearblack px-2 py-1 font-pixel text-[8px] text-warmcream-50 transition-opacity ${active === i ? 'opacity-100' : 'opacity-70'}`}>
                      {item.label}
                    </span>
                  </motion.a>
                );
              })}
              <div className="absolute bottom-5 left-5 font-pixel text-[9px] tracking-widest text-warmcream-50/60">MAP // JASMITHA'S WORLD</div>
              <ArrowDownRight className="absolute bottom-5 right-5 text-acidlime" size={28} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
