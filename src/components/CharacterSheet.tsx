import { useEffect, useState } from 'react';
import { siteContent } from '@/content/site';

type CharacterVariant = 'idle' | 'walk' | 'run' | 'interact' | 'jump' | 'celebrate';

type CharacterSheetProps = {
  variant?: CharacterVariant;
  scale?: number;
  message?: string;
  className?: string;
};

const CROPS: Record<CharacterVariant, { x: number; y: number; width: number; height: number }> = {
  idle: { x: 22, y: 39, width: 108, height: 222 },
  walk: { x: 634, y: 50, width: 116, height: 218 },
  run: { x: 18, y: 315, width: 112, height: 202 },
  interact: { x: 569, y: 315, width: 122, height: 197 },
  jump: { x: 17, y: 541, width: 116, height: 198 },
  celebrate: { x: 606, y: 540, width: 126, height: 196 },
};

export function CharacterSheet({
  variant = 'idle',
  scale = 1,
  message,
  className = '',
}: CharacterSheetProps) {
  const crop = CROPS[variant];
  return (
    <div className={`relative inline-block ${className}`} style={{ width: crop.width * scale, height: crop.height * scale }}>
      <div
        role="img"
        aria-label={`${siteContent.owner.firstName}'s pixel character${message ? `: ${message}` : ''}`}
        className="absolute left-0 top-0 origin-top-left bg-no-repeat"
        style={{
          width: crop.width,
          height: crop.height,
          transform: `scale(${scale})`,
          backgroundImage: 'url(/assets/images/image.png)',
          backgroundSize: '1254px 1254px',
          backgroundPosition: `-${crop.x}px -${crop.y}px`,
        }}
      />
    </div>
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
