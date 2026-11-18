import { motion } from 'framer-motion';
import { useSound } from '@/lib/sound';
import { readableText } from '@/lib/color';
import type { ReactNode } from 'react';

/* ---------- Section heading: number tag + display serif + hand note ---------- */

export function SectionHeading({
  index,
  title,
  note,
  color = '#1F5FBF',
  onDark = false,
}: {
  index: string;
  title: string;
  note?: string;
  color?: string;
  /** Use light title text when the section background is dark (violet, red). */
  onDark?: boolean;
}) {
  return (
    <div className="mb-10 md:mb-14">
      <div className="flex flex-wrap items-end gap-x-5 gap-y-2">
        <span
          className="font-pixel text-[11px] px-2 py-1 border-2 border-ink-700 shadow-chunk-sm -rotate-2 inline-block"
          style={{ backgroundColor: color, color: readableText(color) }}
        >
          {index}
        </span>
        <h2 className={`font-display font-black text-3xl md:text-5xl leading-tight ${onDark ? 'text-warmcream-50' : 'text-ink-900'}`}>
          {title}
        </h2>
        {note && (
          <span className={`font-hand text-xl md:text-2xl rotate-[-2deg] ${onDark ? 'text-acidlime' : 'text-tomato-500'}`}>
            {note}
          </span>
        )}
      </div>
      <div className="mt-4 h-[3px] w-full max-w-[220px]" style={{ backgroundColor: color }} />
    </div>
  );
}

/* ---------- Sticker: small rotated label, hovers un-rotate ---------- */

export function Sticker({
  children,
  color,
  rotate = -3,
  className = '',
}: {
  children: ReactNode;
  color: string;
  rotate?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-block font-pixel text-[10px] px-2 py-1 border-2 border-ink-700 shadow-chunk-sm transition-transform duration-200 hover:rotate-0 hover:scale-105 ${className}`}
      style={{ backgroundColor: color, transform: `rotate(${rotate}deg)`, color: readableText(color) }}
    >
      {children}
    </span>
  );
}

/* ---------- Interactive pixel object: reveals a note on hover/click ---------- */

export function PixelObject({
  children,
  note,
  side = 'top',
}: {
  children: ReactNode;
  note: string;
  side?: 'top' | 'bottom';
}) {
  const { blip } = useSound();
  return (
    <div className="group relative inline-block cursor-pointer" onClick={() => blip(520)}>
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute left-1/2 -translate-x-1/2 ${
          side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
        } z-20 whitespace-nowrap font-hand text-lg text-cream-50 bg-ink-700 px-3 py-1 border-2 border-ink-900 opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:-rotate-2`}
      >
        {note}
      </span>
    </div>
  );
}

/* ---------- Reveal-on-scroll wrapper ---------- */

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Hand-drawn arrow (SVG squiggle) ---------- */

export function HandArrow({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 60"
      className={className}
      fill="none"
      aria-hidden="true"
      stroke="#26221C"
      strokeWidth="3"
      strokeLinecap="round"
    >
      <path d="M8 6 C 30 10, 55 20, 64 44" />
      <path d="M55 38 L 65 47 L 67 33" />
    </svg>
  );
}
