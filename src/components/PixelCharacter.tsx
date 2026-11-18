import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
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
  /** Hold one specific frame still (0-based) instead of looping, e.g. a jump pose. */
  frame?: number;
  /** Spoken to screen readers. */
  label?: string;
  className?: string;
};

/**
 * Plays one of Jasmitha's sprite loops using exact integer-pixel frame stepping
 * so frames never drift, blur, or fail on CSS `steps(var(...))`.
 */
export function PixelCharacter({
  animation = 'idle',
  scale = 1,
  paused = false,
  frame,
  label = "Jasmitha's pixel character",
  className = '',
}: PixelCharacterProps) {
  const info = ANIMATIONS[animation];
  const reduceMotion = useReducedMotion();
  const [tickFrame, setTickFrame] = useState(0);

  useEffect(() => {
    setTickFrame(0);
    if (paused || frame !== undefined || reduceMotion || info.fps <= 0) return;
    const intervalMs = Math.round(1000 / info.fps);
    const id = window.setInterval(() => {
      setTickFrame((curr) => (curr + 1) % info.frames);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [animation, paused, frame, reduceMotion, info.fps, info.frames]);

  const activeFrame =
    frame !== undefined
      ? frame % info.frames
      : paused || reduceMotion
        ? info.rest
        : tickFrame % info.frames;

  const frameW = Math.round(info.w * scale);
  const frameH = Math.round(info.h * scale);

  return (
    <div
      role="img"
      aria-label={label}
      className={`pixelated sprite-strip ${className}`}
      style={{
        width: frameW,
        height: frameH,
        backgroundImage: `url(${STRIP_URL(animation)})`,
        backgroundSize: `${frameW * info.frames}px ${frameH}px`,
        backgroundPosition: `${-activeFrame * frameW}px 0px`,
      }}
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
  const frameW = Math.round(FACE_STRIP.w * scale);
  const frameH = Math.round(FACE_STRIP.h * scale);
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
        backgroundPosition: `${-index * frameW}px 0px`,
      }}
    />
  );
}
