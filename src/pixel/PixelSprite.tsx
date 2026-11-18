import type { SpriteData } from './sprites';

type Props = {
  sprite: SpriteData;
  scale?: number;
  className?: string;
};

/** Renders a sprite's pixel grid as crisp SVG rects. */
export default function PixelSprite({ sprite, scale = 4, className = '' }: Props) {
  const { rows, palette } = sprite;
  const w = rows[0].length;
  const h = rows.length;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w * scale}
      height={h * scale}
      className={`pixelated ${className}`}
      aria-hidden="true"
    >
      {rows.map((row, y) =>
        row.split('').map((ch, x) =>
          ch === '.' || ch === ' ' ? null : (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1.02}
              height={1.02}
              fill={palette[ch] ?? '#26221C'}
            />
          ),
        ),
      )}
    </svg>
  );
}
