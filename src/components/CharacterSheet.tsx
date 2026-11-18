import { useEffect, useState } from 'react';
import { siteContent } from '@/content/site';
import { PixelCharacter } from '@/components/PixelCharacter';
import type { SpriteAnimation } from '@/pixel/spriteManifest';

/** 'interact' is the old name for the laptop pose; it maps to the 'work' loop. */
type CharacterVariant = 'idle' | 'walk' | 'run' | 'interact' | 'jump' | 'celebrate';

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
  celebrate: 'celebrate',
};

/**
 * Backwards-compatible wrapper: older components call <CharacterSheet variant=... />.
 * It now plays the animated, transparent sprite strips instead of cropping the sheet.
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
      className={`group relative cursor-pointer border-0 bg-transparent p-0 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-tomato-500 ${className}`}
      aria-label="Interact with Jasmitha's pixel character"
    >
      <span className="absolute -right-12 -top-8 z-20 w-48 border-[3px] border-ink-900 bg-warmcream-50 px-3 py-2 font-hand text-xl leading-none text-ink-900 shadow-chunk-sm transition-transform duration-200 group-hover:-rotate-2 md:-right-20 md:-top-10">
        {messages[messageIndex]}
        <span className="absolute -bottom-3 left-5 h-4 w-4 rotate-45 border-b-[3px] border-r-[3px] border-ink-900 bg-warmcream-50" />
      </span>
      <span className="block transition-transform duration-300 group-hover:-translate-y-2">
        <CharacterSheet variant={variant} scale={1.8} />
      </span>
    </button>
  );
}

export type { CharacterVariant };
