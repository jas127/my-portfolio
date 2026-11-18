import { useEffect, useState } from 'react';
import { siteContent } from '@/content/site';
import { PixelCharacter } from '@/components/PixelCharacter';
import type { SpriteAnimation } from '@/pixel/spriteManifest';

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

const HERO_STATES: Array<{ animation: SpriteAnimation; message: string; scale: number }> = [
  { animation: 'wave', message: 'Hi! Welcome', scale: 0.95 },
  { animation: 'work', message: 'Open to work', scale: 1.15 },
];

export function InteractiveCharacter({ className = '' }: { className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((curr) => (curr + 1) % HERO_STATES.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  const current = HERO_STATES[index];

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Clean speech bubble above character */}
      <span className="relative z-20 mb-4 flex min-w-[11rem] items-center justify-center border-[3px] border-ink-900 bg-warmcream-50 px-5 py-2 text-center font-pixel text-xs font-bold tracking-wider text-ink-900 shadow-chunk-sm">
        {current.message}
        <span className="absolute -bottom-[8px] left-1/2 -ml-1.5 h-3 w-3 rotate-45 border-b-[3px] border-r-[3px] border-ink-900 bg-warmcream-50" />
      </span>

      {/* Fixed-height stage so switching between wave and sitting laptop pose never shifts layout */}
      <div className="flex items-end justify-center" style={{ height: 280 }}>
        <PixelCharacter
          animation={current.animation}
          scale={current.scale}
          label={`Jasmitha pixel character: ${current.message}`}
        />
      </div>
    </div>
  );
}

export type { CharacterVariant };
