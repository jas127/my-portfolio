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

export function InteractiveCharacter({ className = '' }: { className?: string }) {
  const [jumping, setJumping] = useState(false);
  const { blip } = useSound();

  const handleInteract = () => {
    if (jumping) return;
    blip(740);
    setJumping(true);
    window.setTimeout(() => setJumping(false), 650);
  };

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Framed Arcade Showcase Stage */}
      <button
        type="button"
        onClick={handleInteract}
        className="group relative flex flex-col items-center border-[3px] border-ink-900 bg-warmcream-50 px-8 pb-6 pt-5 shadow-[8px_8px_0_0_#7049C6] transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-tomato-500 cursor-pointer"
        aria-label="Interact with Jasmitha's waving pixel character"
      >
        {/* Top arcade window bar */}
        <div className="mb-4 flex w-full items-center justify-between gap-4 border-b-[3px] border-ink-900 bg-acidlime px-3 py-1.5 -mx-8 -mt-5">
          <span className="font-pixel text-[9px] tracking-wider text-ink-900">PLAYER 01 // JASMITHA</span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 border border-ink-900 bg-tomato-500" />
            <span className="h-2.5 w-2.5 border border-ink-900 bg-butter-400" />
            <span className="h-2.5 w-2.5 border border-ink-900 bg-grass-500" />
          </span>
        </div>

        {/* Animated background glow & dot-grid inside the stage */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-3 bottom-3 top-12 bg-dotgrid bg-[size:16px_16px] opacity-75"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 h-44 w-44 rounded-full bg-bubblegum/35 blur-xl"
        />

        {/* Floating pixel props inside stage corners */}
        <img
          src="/assets/sprites/props/sparkle.png"
          alt=""
          aria-hidden="true"
          className="pixelated pointer-events-none absolute left-3 top-14 h-7 w-7 object-contain anim-twinkle"
        />
        <img
          src="/assets/sprites/props/sparkle.png"
          alt=""
          aria-hidden="true"
          className="pixelated pointer-events-none absolute right-3 top-20 h-6 w-6 object-contain anim-twinkle"
          style={{ animationDelay: '-0.8s' }}
        />
        <img
          src="/assets/sprites/props/cat.png"
          alt=""
          aria-hidden="true"
          className="pixelated pointer-events-none absolute bottom-5 right-3 h-12 w-12 object-contain anim-bob"
        />

        {/* Speech bubble: crisp pixel box, purely "Hi!" with zero emojis */}
        <span className="relative z-20 mb-3 flex items-center justify-center border-[3px] border-ink-900 bg-warmcream-50 px-5 py-1.5 text-center font-pixel text-sm font-bold tracking-wider text-ink-900 shadow-chunk-sm transition-transform duration-200 group-hover:-translate-y-0.5">
          Hi!
          <span className="absolute -bottom-[8px] left-1/2 -ml-1.5 h-3 w-3 rotate-45 border-b-[3px] border-r-[3px] border-ink-900 bg-warmcream-50" />
        </span>

        {/* Character stage holding the crisp 10-frame waving & smiling loop */}
        <span
          className={`relative z-10 flex items-end justify-center transition-transform duration-300 ${
            jumping ? '-translate-y-6' : 'group-hover:-translate-y-1'
          }`}
          style={{ minHeight: 264 * 1.35 }}
        >
          {jumping ? (
            <PixelCharacter
              animation="jump"
              frame={2}
              scale={1.35}
              label="Jasmitha jumping to say hi"
            />
          ) : (
            <PixelCharacter
              animation="wave"
              scale={1.35}
              label="Jasmitha waving and smiling"
            />
          )}
        </span>

        {/* Stage floor platform */}
        <div className="relative z-10 -mt-1 h-3 w-48 border-[2px] border-ink-900 bg-electricviolet shadow-chunk-sm" />
      </button>
    </div>
  );
}

export type { CharacterVariant };
