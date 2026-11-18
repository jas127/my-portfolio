import { useEffect, useState } from 'react';
import { siteContent } from '@/content/site';
import { PixelCharacter } from '@/components/PixelCharacter';
import type { SpriteAnimation } from '@/pixel/spriteManifest';

/**
 * 'interact' is the old name for the laptop pose; it maps to the 'work' loop.
 * 'celebrate' plays the full-body jump (the original celebrate row is cropped at the
 *   thigh, so it is only used for the deliberate 'podium' variant).
 * 'greet' holds the one-arm-up frame still until a proper waving sprite exists.
 * 'podium' plays the thigh-cropped celebrate row for small decorative moments.
 */
type CharacterVariant = 'idle' | 'walk' | 'run' | 'interact' | 'jump' | 'celebrate' | 'greet' | 'podium';

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
  greet: 'work',
  podium: 'celebrate',
};

/** Variants that hold a single frame instead of looping. 'work' frame 3 = arm raised. */
const STATIC_FRAME: Partial<Record<CharacterVariant, number>> = { greet: 3 };

/**
 * Backwards-compatible wrapper: older components call <CharacterSheet variant=... />.
 * It now plays the animated, transparent sprite strips instead of cropping the sheet.
 */
export function CharacterSheet({ variant = 'idle', scale = 1, message, className = '' }: CharacterSheetProps) {
  return (
    <PixelCharacter
      animation={VARIANT_TO_ANIMATION[variant]}
      scale={scale}
      frame={STATIC_FRAME[variant]}
      label={`${siteContent.owner.firstName}'s pixel character${message ? `: ${message}` : ''}`}
      className={className}
    />
  );
}

export function InteractiveCharacter({ className = '' }: { className?: string }) {
  const [variant, setVariant] = useState<CharacterVariant>('idle');
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = siteContent.hero.messages;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setVariant((current) => (current === 'idle' ? 'walk' : 'idle'));
      setMessageIndex((current) => (current + 1) % messages.length);
    }, 4200);
    return () => window.clearInterval(interval);
  }, [messages.length]);

  return (
    <button
      type="button"
      onClick={() => {
        setVariant('celebrate');
        setMessageIndex((current) => (current + 1) % messages.length);
        window.setTimeout(() => setVariant('idle'), 900);
      }}
      className={`group relative flex flex-col items-center border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-tomato-500 ${className}`}
      aria-label="Interact with Jasmitha's pixel character"
    >
      {/* The bubble sits ABOVE the character in normal flow, so it can never cover her head
          or collide with the stickers around her. The fixed min-height stops the layout
          jumping when the message length changes. */}
      <span className="relative z-20 mb-5 flex min-h-[5rem] w-60 max-w-[80vw] items-center justify-center border-[3px] border-ink-900 bg-warmcream-50 px-4 py-3 text-center font-hand text-xl leading-tight text-ink-900 shadow-chunk-sm transition-transform duration-200 group-hover:-rotate-1">
        {messages[messageIndex]}
        <span className="absolute -bottom-[11px] left-1/2 -ml-2 h-4 w-4 rotate-45 border-b-[3px] border-r-[3px] border-ink-900 bg-warmcream-50" />
      </span>
      {/* Fixed-height stage: idle, walk and jump frames differ in height, so we pin the
          tallest and sit the feet at the bottom to stop the page shifting. */}
      <span className="flex items-end justify-center transition-transform duration-300 group-hover:-translate-y-2" style={{ minHeight: 253 * 1.8 }}>
        <CharacterSheet variant={variant} scale={1.8} />
      </span>
    </button>
  );
}

export type { CharacterVariant };
