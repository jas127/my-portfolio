import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react';
import { siteContent } from '@/content/site';
import { CharacterSheet, InteractiveCharacter } from '@/components/CharacterSheet';
import { PixelScene, Coin, PixelSprite } from '@/pixel';
import { SPLAT, TICKET, HEART } from '@/pixel/sprites';
import { useSound } from '@/lib/sound';

export default function Hero() {
  const { blip } = useSound();
  const { firstName, status, opportunityLine } = siteContent.owner;
  return (
    <section id="home" className="relative overflow-hidden pt-28 md:pt-36">
      <div className="pointer-events-none absolute inset-0 opacity-60" style={{ backgroundImage: 'radial-gradient(rgba(25,25,25,0.08) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr] md:gap-6">
          <div className="relative z-10">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6 inline-flex items-center gap-3">
              <span className="font-pixel text-[10px] tracking-wider text-electricviolet">PRESS START</span>
              <span className="h-[2px] w-10 bg-tomato-500" />
              <span className="font-pixel text-[10px] tracking-wider text-ink-400">LEVEL 01 — HOME</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.05 }} className="mb-5 inline-flex items-center gap-2 border-[3px] border-ink-900 bg-acidlime px-3 py-2 shadow-chunk-sm">
              <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping bg-tomato-500 opacity-75" /><span className="relative inline-flex h-2.5 w-2.5 bg-tomato-500" /></span>
              <span className="font-pixel text-[9px] text-ink-900">{status}</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }} className="font-display text-[2.8rem] font-black leading-[1.02] text-ink-900 md:text-7xl">
              Hi, I'm <span className="relative inline-block"><span className="relative z-10">{firstName}</span><motion.span aria-hidden="true" className="absolute -bottom-1 left-0 z-0 h-4 w-full bg-acidlime" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.7 }} style={{ transformOrigin: 'left' }} /></span>.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.18 }} className="mt-5 font-display text-2xl font-semibold italic leading-snug text-electricviolet md:text-4xl">
              Curious by default.<br />Analytical by choice.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.28 }} className="mt-5 max-w-xl font-sans text-base leading-relaxed text-ink-500 md:text-lg">
              {siteContent.hero.support}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.38 }} className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
              {[
                ['Explore my work', '#main-quests', '#FF4C35'],
                ['Meet the person behind the pixels', '#about', '#7049C6'],
                ['See my side quests', '#side-quests', '#D8EF40'],
                ['Get in touch', '#contact', '#F4A8D0'],
              ].map(([label, href, color]) => (
                <a key={href} href={href} onClick={() => blip(560)} className="group flex items-center justify-between border-[3px] border-ink-900 bg-warmcream-50 px-4 py-3 font-pixel text-[10px] text-ink-900 shadow-chunk-sm transition-all hover:-translate-y-1 hover:shadow-chunk" style={{ borderLeftColor: color, borderLeftWidth: '9px' }}>
                  {label}<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              ))}
            </motion.div>
            <p className="mt-5 max-w-lg border-l-4 border-tomato-500 pl-3 font-hand text-2xl text-ink-600">{opportunityLine}</p>
          </div>

          <div className="relative z-10 flex items-end justify-center md:justify-end">
            <div className="relative">
              <div className="absolute -left-16 top-2 hidden rotate-[-8deg] md:block"><PixelSprite sprite={TICKET} scale={3} /></div>
              <div className="absolute -left-10 bottom-6 rotate-[10deg]"><PixelSprite sprite={SPLAT} scale={2} /></div>
              <div className="absolute -right-4 bottom-24 rotate-[6deg]"><PixelSprite sprite={HEART} scale={3} /></div>
              <Coin className="absolute -right-14 top-1/2 hidden md:block" scale={3} />
              <InteractiveCharacter />
              <div className="mt-4 flex items-center justify-center gap-2 font-hand text-2xl text-ink-600 rotate-[-2deg]"><Sparkles size={17} /> that's me, pixel-sized</div>
            </div>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="relative mt-12 md:mt-4">
        <PixelScene className="h-[200px] w-full md:h-[260px]" />
        <div className="pointer-events-none absolute bottom-12 right-[18%] hidden items-end gap-2 md:flex"><CharacterSheet variant="jump" scale={0.5} /><span className="border-2 border-ink-900 bg-warmcream-50 px-2 py-1 font-hand text-lg text-ink-900 shadow-chunk-sm">Let's explore.</span></div>
      </motion.div>
      <div className="relative flex flex-col items-center justify-center border-t-[3px] border-ink-900 bg-nearblack py-4"><p className="font-pixel text-[10px] tracking-[0.2em] text-acidlime">SCROLL TO BEGIN THE QUEST</p><div className="anim-arrow mt-1.5"><ArrowDown size={22} className="text-warmcream-50" /></div></div>
    </section>
  );
}
