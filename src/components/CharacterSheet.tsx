import { useState } from 'react';
import { siteContent } from '@/content/site';
import { PixelCharacter } from '@/components/PixelCharacter';
import type { SpriteAnimation } from '@/pixel/spriteManifest';
import { useSound } from '@/lib/sound';

type CharacterVariant = 'idle' | 'walk' | 'run' | 'interact' | 'jump' | 'celebrate' | 'greet' | 'wave' | 'podium';

type CharacterSheetProps = {
  variant?: CharacterVariant;
  scale?: number;
  frame?: number;
  message?: string;
  className?: string;
};

const VARIANT_TO_ANIMATION: Record<CharacterVariant, SpriteAnimation> = {
  idle: 'idle',
  walk: 'walk',
  run: 'run',
  interact: 'work',
  jump: 'jump',
  celebrate: 'jump',
  greet: 'wave',
  wave: 'wave',
  podium: 'celebrate',
};

/**
 * Backwards-compatible wrapper: older components call <CharacterSheet variant=... />.
 * It now plays the animated, transparent sprite strips.
 */
export function CharacterSheet({ variant = 'idle', scale = 1, frame, message, className = '' }: CharacterSheetProps) {
  return (
    <PixelCharacter
      animation={VARIANT_TO_ANIMATION[variant]}
      scale={scale}
      frame={frame}
      label={`${siteContent.owner.firstName}'s pixel character${message ? `: ${message}` : ''}`}
      className={className}
    />
  );
}

const HERO_ACTIONS: Array<{ id: SpriteAnimation; label: string }> = [
  { id: 'wave', label: 'WAVE' },
  { id: 'walk', label: 'WALK' },
  { id: 'work', label: 'WORK' },
  { id: 'jump', label: 'JUMP' },
];

export function InteractiveCharacter({ className = '' }: { className?: string }) {
  const [action, setAction] = useState<SpriteAnimation>('wave');
  const { blip } = useSound();

  const cycleNext = () => {
    blip(680);
    const idx = HERO_ACTIONS.findIndex((a) => a.id === action);
    const next = HERO_ACTIONS[(idx + 1) % HERO_ACTIONS.length].id;
    setAction(next);
  };

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Framed Arcade Showcase Stage */}
      <div className="relative flex w-72 max-w-[88vw] flex-col items-center border-[3px] border-ink-900 bg-warmcream-50 px-6 pb-5 pt-4 shadow-[8px_8px_0_0_#7049C6]">
        {/* Top arcade window bar */}
        <div className="mb-3 flex w-[calc(100%+3rem)] items-center justify-between gap-4 border-b-[3px] border-ink-900 bg-acidlime px-3 py-1.5 -mx-6 -mt-4">
          <span className="font-pixel text-[9px] tracking-wider text-ink-900">PLAYER 01 // JASMITHA</span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 border border-ink-900 bg-tomato-500" />
            <span className="h-2.5 w-2.5 border border-ink-900 bg-butter-400" />
            <span className="h-2.5 w-2.5 border border-ink-900 bg-grass-500" />
          </span>
        </div>

        {/* Subtle dot-grid and warm glow inside stage */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-2 bottom-12 top-10 bg-dotgrid bg-[size:16px_16px] opacity-75"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-16 h-36 w-36 rounded-full bg-bubblegum/35 blur-xl"
        />

        {/* Floating pixel props inside stage corners */}
        <img
          src="/assets/sprites/props/sparkle.png"
          alt=""
          aria-hidden="true"
          className="pixelated pointer-events-none absolute left-3 top-12 h-6 w-6 object-contain anim-twinkle"
        />
        <img
          src="/assets/sprites/props/sparkle.png"
          alt=""
          aria-hidden="true"
          className="pixelated pointer-events-none absolute right-3 top-16 h-5 w-5 object-contain anim-twinkle"
          style={{ animationDelay: '-0.8s' }}
        />
        <img
          src="/assets/sprites/props/cat.png"
          alt=""
          aria-hidden="true"
          className="pixelated pointer-events-none absolute bottom-14 right-3 h-10 w-10 object-contain anim-bob"
        />

        {/* Speech bubble: crisp pixel box saying "Hi!" with zero emojis */}
        <span className="relative z-20 mb-2 flex items-center justify-center border-[3px] border-ink-900 bg-warmcream-50 px-4 py-1 text-center font-pixel text-xs font-bold tracking-wider text-ink-900 shadow-chunk-sm">
          Hi!
          <span className="absolute -bottom-[7px] left-1/2 -ml-1.5 h-2.5 w-2.5 rotate-45 border-b-[3px] border-r-[3px] border-ink-900 bg-warmcream-50" />
        </span>

        {/* Character stage at crisp, non-zoomed scale (0.92x of master sheet) */}
        <button
          type="button"
          onClick={cycleNext}
          className="group relative z-10 flex items-end justify-center border-0 bg-transparent p-0 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-tomato-500"
          style={{ height: 235 }}
          aria-label="Click to cycle Jasmitha's pixel animation"
        >
          <PixelCharacter
            animation={action}
            scale={action === 'wave' ? 0.81 : 0.92}
            label={`Jasmitha pixel character (${action})`}
            className="transition-transform duration-200 group-hover:-translate-y-1"
          />
        </button>

        {/* Stage floor platform */}
        <div className="relative z-10 -mt-1 h-2.5 w-44 border-[2px] border-ink-900 bg-electricviolet shadow-chunk-sm" />

        {/* Interactive Animation Switcher Pills */}
        <div className="relative z-20 mt-4 grid w-full grid-cols-4 gap-1.5" role="group" aria-label="Character animation controls">
          {HERO_ACTIONS.map((item) => {
            const active = action === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  blip(620);
                  setAction(item.id);
                }}
                className={`border-2 border-ink-900 py-1 font-pixel text-[8px] tracking-wider transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-tomato-500 ${
                  active ? 'bg-tomato-500 text-warmcream-50 shadow-chunk-sm' : 'bg-cream-100 text-ink-900 hover:bg-acidlime'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export type { CharacterVariant };
