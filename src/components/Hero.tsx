import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react';
import { siteContent } from '@/content/site';
import { InteractiveCharacter } from '@/components/CharacterSheet';
import { Coin, PixelSprite } from '@/pixel';
import { HeroArcadeGame } from '@/components/HeroArcadeGame';
import { CLOUD, STAR, DIAMOND, BULB, HEART } from '@/pixel/sprites';
import { useSound } from '@/lib/sound';

export default function Hero() {
  const { blip } = useSound();
  const { firstName, status, opportunityLine } = siteContent.owner;

  return (
    <section id="home" className="relative overflow-hidden pt-24 md:pt-32">
      {/* Vibrant Animated Background Layer */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soft colorful ambient blobs */}
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-acidlime/35 blur-3xl" />
        <div className="absolute right-[6%] top-20 h-80 w-80 rounded-full bg-bubblegum/40 blur-3xl" />
        <div className="absolute left-[38%] top-[42%] h-64 w-64 rounded-full bg-lavender-300/40 blur-3xl" />

        {/* Drifting pixel clouds in the upper hero sky */}
        <div className="absolute left-[4%] top-20 opacity-75 anim-cloud hidden sm:block">
          <PixelSprite sprite={CLOUD} scale={3} />
        </div>
        <div
          className="absolute left-[46%] top-24 opacity-70 anim-cloud hidden md:block"
          style={{ animationDelay: '-4.5s' }}
        >
          <PixelSprite sprite={CLOUD} scale={2} />
        </div>
        <div
          className="absolute right-[5%] top-16 opacity-75 anim-cloud hidden lg:block"
          style={{ animationDelay: '-2s' }}
        >
          <PixelSprite sprite={CLOUD} scale={3} />
        </div>

        {/* Twinkling pixel stars & floating arcade gems */}
        <div className="absolute left-[14%] top-36 anim-twinkle hidden md:block">
          <PixelSprite sprite={STAR} scale={2} />
        </div>
        <div
          className="absolute left-[52%] top-16 anim-twinkle"
          style={{ animationDelay: '-0.7s' }}
        >
          <PixelSprite sprite={STAR} scale={3} />
        </div>
        <div
          className="absolute right-[34%] top-32 anim-twinkle hidden lg:block"
          style={{ animationDelay: '-1.3s' }}
        >
          <PixelSprite sprite={DIAMOND} scale={2} />
        </div>
        <div className="absolute left-[49%] bottom-[340px] anim-bob hidden lg:block">
          <PixelSprite sprite={BULB} scale={3} />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid items-center gap-10 md:grid-cols-[1.12fr_0.88fr] lg:gap-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 inline-flex items-center gap-3"
            >
              <a
                href="#arcade-game"
                onClick={() => blip(660)}
                className="border-2 border-ink-900 bg-electricviolet px-3 py-1 font-pixel text-[9px] tracking-wider text-warmcream-50 shadow-chunk-sm transition-transform hover:-translate-y-0.5 hover:bg-tomato-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-tomato-500"
              >
                PRESS START
              </a>
              <span className="h-[3px] w-8 bg-tomato-500" />
              <span className="font-pixel text-[10px] tracking-wider text-ink-600">LEVEL 01 — HOME</span>
            </motion.div>

            <div>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="mb-5 inline-flex items-center gap-2 border-[3px] border-ink-900 bg-acidlime px-3 py-2 shadow-chunk-sm"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping bg-tomato-500 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 bg-tomato-500" />
                </span>
                <span className="font-pixel text-[9px] text-ink-900">{status}</span>
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="font-display text-[2.6rem] font-black leading-[1.05] text-ink-900 sm:text-6xl md:text-7xl"
            >
              Hi, I&apos;m{' '}
              <span className="relative inline-block">
                <span className="relative z-10">{firstName}</span>
                <motion.span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 z-0 h-4 w-full bg-acidlime"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="mt-5 font-display text-2xl font-semibold italic leading-snug text-electricviolet md:text-4xl"
            >
              An ongoing work in curiosity.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="mt-5 max-w-xl font-sans text-base leading-relaxed text-ink-700 md:text-lg"
            >
              {siteContent.hero.support}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.38 }}
              className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2"
            >
              {[
                ['Explore main quests', '#main-quests', '#FF4C35'],
                ['Meet the person behind pixels', '#about', '#7049C6'],
                ['See leadership & side quests', '#side-quests', '#D8EF40'],
                ['Get in touch directly', '#contact', '#F4A8D0'],
              ].map(([label, href, accent]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => blip(560)}
                  style={{ borderLeftColor: accent, borderLeftWidth: '8px' }}
                  className="group flex items-center justify-between border-[3px] border-ink-900 bg-warmcream-50 px-4 py-3 font-pixel text-[10px] text-ink-900 shadow-chunk-sm transition-all hover:-translate-y-1 hover:bg-acidlime/30 hover:shadow-chunk focus:outline-none focus-visible:ring-4 focus-visible:ring-tomato-500"
                >
                  <span>{label}</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              ))}
            </motion.div>

            <p className="mt-5 max-w-lg border-l-4 border-tomato-500 pl-3 font-hand text-2xl text-ink-600">
              {opportunityLine}
            </p>
          </div>

          {/* Right Column: Vibrant Framed Character Stage + Floating Props */}
          <div className="relative z-10 flex items-center justify-center md:justify-end">
            <div className="relative flex flex-col items-center">
              {/* Floating animated pixel props orbiting the stage */}
              <img
                src="/assets/sprites/props/laptop.png"
                alt=""
                aria-hidden="true"
                className="pixelated pointer-events-none absolute -left-12 top-10 hidden h-14 w-14 -rotate-6 object-contain anim-bob md:block"
              />
              <img
                src="/assets/sprites/props/headphones.png"
                alt=""
                aria-hidden="true"
                className="pixelated pointer-events-none absolute -right-10 top-8 hidden h-12 w-12 rotate-12 object-contain anim-bob md:block"
                style={{ animationDelay: '-1.4s' }}
              />
              <img
                src="/assets/sprites/props/coffee-books.png"
                alt=""
                aria-hidden="true"
                className="pixelated pointer-events-none absolute -left-14 bottom-16 hidden h-14 w-14 rotate-3 object-contain anim-bob md:block"
                style={{ animationDelay: '-0.8s' }}
              />
              <div className="pointer-events-none absolute -right-8 bottom-24 rotate-[8deg] anim-twinkle">
                <PixelSprite sprite={HEART} scale={3} />
              </div>
              <Coin className="pointer-events-none absolute -right-12 top-1/2 hidden md:block" scale={3} />

              <InteractiveCharacter />

              <div className="mt-4 flex items-center justify-center gap-2 border-2 border-ink-900 bg-bubblegum px-3 py-1 font-hand text-xl text-ink-900 shadow-chunk-sm rotate-[-1.5deg]">
                <Sparkles size={16} className="text-ink-900" /> that&apos;s me, pixel-sized (click to jump!)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Mario-Style Runner & Coin Block Level */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative mt-12 md:mt-10"
      >
        <HeroArcadeGame />
      </motion.div>

      <div className="relative flex flex-col items-center justify-center border-t-[3px] border-ink-900 bg-nearblack py-4">
        <p className="font-pixel text-[10px] tracking-[0.2em] text-acidlime">SCROLL TO EXPLORE THE ARCADE</p>
        <div className="anim-arrow mt-1.5">
          <ArrowDown size={22} className="text-warmcream-50" />
        </div>
      </div>
    </section>
  );
}
