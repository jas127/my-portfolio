import type { CSSProperties } from 'react';
import {
  ANIMATIONS,
  EXPRESSIONS,
  FACE_STRIP,
  STRIP_URL,
  type Expression,
  type SpriteAnimation,
} from '@/pixel/spriteManifest';

type PixelCharacterProps = {
  /** Which loop to play. */
  animation?: SpriteAnimation;
  /** Display size multiplier. 1 = the sprite's native pixel size. */
  scale?: number;
  /** Pause on the resting frame (also what reduced-motion users get). */
  paused?: boolean;
  /** Spoken to screen readers. */
  label?: string;
  className?: string;
};

/**
 * Plays one of Jasmitha's sprite loops.
 *
 * How it works: each animation is ONE wide image ("strip") with all frames side by
 * side. This <div> is exactly one frame wide, and CSS slides the strip left
 * with `steps()`, so the picture jumps from frame to frame instead of gliding.
 * `image-rendering: pixelated` keeps the pixels crisp when scaled.
 */
export function PixelCharacter({
  animation = 'idle',
  scale = 1,
  paused = false,
  label = "Jasmitha's pixel character",
  className = '',
}: PixelCharacterProps) {
  const info = ANIMATIONS[animation];
  const frameW = info.w * scale;
  const frameH = info.h * scale;
  const style: CSSProperties & Record<string, string | number> = {
    width: frameW,
    height: frameH,
    backgroundImage: `url(${STRIP_URL(animation)})`,
    backgroundSize: `${frameW * info.frames}px ${frameH}px`,
    // The resting frame is shown whenever the animation is off.
    backgroundPosition: `${-info.rest * frameW}px 0`,
    '--sprite-end': `${-info.frames * frameW}px`,
    '--sprite-steps': info.frames,
    '--sprite-duration': `${info.frames / info.fps}s`,
  };
  return (
    <div
      role="img"
      aria-label={label}
      className={`pixelated sprite-strip ${paused ? '' : 'sprite-playing'} ${className}`}
      style={style}
    />
  );
}

type PixelFaceProps = {
  expression?: Expression;
  scale?: number;
  label?: string;
  className?: string;
};

/** A single still face close-up, picked by name from the expression strip. */
export function PixelFace({ expression = 'neutral', scale = 1, label, className = '' }: PixelFaceProps) {
  const index = EXPRESSIONS.indexOf(expression);
  const frameW = FACE_STRIP.w * scale;
  const frameH = FACE_STRIP.h * scale;
  return (
    <div
      role="img"
      aria-label={label ?? `Jasmitha's pixel face, ${expression}`}
      className={`pixelated ${className}`}
      style={{
        width: frameW,
        height: frameH,
        backgroundImage: `url(${STRIP_URL('faces')})`,
        backgroundSize: `${frameW * FACE_STRIP.frames}px ${frameH}px`,
        backgroundPosition: `${-index * frameW}px 0`,
      }}
    />
  );
}
