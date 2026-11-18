import { useEffect, useState } from 'react';
import { siteContent } from '@/content/site';
import { PixelCharacter } from '@/components/PixelCharacter';
import type { SpriteAnimation } from '@/pixel/spriteManifest';

/**
 * 'interact' is the old name for the laptop pose; it maps to the 'work' loop.
 * 'celebrate' plays the full-body jump.
 * 'wave' plays the custom 5-frame waving and smiling animation loop.
 * 'greet' maps to wave.
 * 'podium' plays the thigh-cropped celebrate row for small decorative moments.
 */
type CharacterVariant = 'idle' | 'walk' | 'run' | 'interact' | 'jump' | 'celebrate' | 'greet' | 'wave' | 'podium';

type CharacterSheetProps = {
  variant?: CharacterVariant;
  scale?: number;
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
export function CharacterSheet({ variant = 'idle', scale = 1, message, className = '' }: CharacterSheetProps) {
  return (
    <PixelCharacter
      animation={VARIANT_TO_ANIMATION[variant]}
      scale={scale}
      label={`${siteContent.owner.firstName}'s pixel character${message ? `: ${message}` : ''}`}
      className={className}
    />
  );
}

export function InteractiveCharacter({ className = '' }: { className?: string }) {
  // Cycle between waving and smiling, idle, and walk
  const [variant, setVariant] = useState<CharacterVariant>('wave');
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = siteContent.hero.messages;

  useEffect(() => {
    const cycle: CharacterVariant[] = ['wave', 'idle', 'wave', 'walk'];
    let step = 0;
    const interval = window.setInterval(() => {
      step = (step + 1) % cycle.length;
      setVariant(cycle[step]);
      setMessageIndex((current) => (current + 1) % messages.length);
    }, 4500);
    return () => window.clearInterval(interval);
  }, [messages.length]);

  return (
    <button
      type="button"
      onClick={() => {
        setVariant('celebrate');
        setMessageIndex((current) => (current + 1) % messages.length);
        window.setTimeout(() => setVariant('wave'), 1200);
      }}
      className={`group relative flex flex-col items-center border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-tomato-500 cursor-pointer ${className}`}
      aria-label="Interact with Jasmitha's waving pixel character"
    >
      {/* Speech bubble sitting cleanly above the character */}
      <span className="relative z-20 mb-5 flex min-h-[5rem] w-64 max-w-[80vw] items-center justify-center border-[3px] border-ink-900 bg-warmcream-50 px-4 py-3 text-center font-hand text-2xl leading-tight text-ink-900 shadow-chunk-sm transition-transform duration-200 group-hover:-rotate-1">
        {messages[messageIndex]}
        <span className="absolute -bottom-[11px] left-1/2 -ml-2 h-4 w-4 rotate-45 border-b-[3px] border-r-[3px] border-ink-900 bg-warmcream-50" />
      </span>

      {/* Character stage holding the waving & smiling loop */}
      <span
        className="flex items-end justify-center transition-transform duration-300 group-hover:-translate-y-2"
        style={{ minHeight: 253 * 1.8 }}
      >
        <CharacterSheet variant={variant} scale={1.8} />
      </span>
    </button>
  );
}

export type { CharacterVariant };
