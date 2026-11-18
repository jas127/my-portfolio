import { useState } from 'react';
import { siteContent } from '@/content/site';
import { PixelCharacter } from '@/components/PixelCharacter';
import type { SpriteAnimation } from '@/pixel/spriteManifest';

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
  const [variant, setVariant] = useState<CharacterVariant>('wave');

  return (
    <button
      type="button"
      onClick={() => {
        setVariant('celebrate');
        window.setTimeout(() => setVariant('wave'), 1000);
      }}
      className={`group relative flex flex-col items-center border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-tomato-500 cursor-pointer ${className}`}
      aria-label="Interact with Jasmitha's waving pixel character"
    >
      {/* Speech bubble: clean, no emojis, purely "Hi!" */}
      <span className="relative z-20 mb-4 flex w-24 items-center justify-center border-[3px] border-ink-900 bg-warmcream-50 px-4 py-2 text-center font-display text-2xl font-black text-ink-900 shadow-chunk-sm transition-transform duration-200 group-hover:-rotate-2">
        Hi!
        <span className="absolute -bottom-[9px] left-1/2 -ml-2 h-3.5 w-3.5 rotate-45 border-b-[3px] border-r-[3px] border-ink-900 bg-warmcream-50" />
      </span>

      {/* Character stage holding the high-res waving & smiling loop */}
      <span
        className="flex items-end justify-center transition-transform duration-300 group-hover:-translate-y-2"
        style={{ minHeight: 273 * 1.55 }}
      >
        <CharacterSheet variant={variant} scale={1.55} />
      </span>
    </button>
  );
}

export type { CharacterVariant };
