/**
 * Describes every sprite strip in /public/assets/sprites/strips.
 * The strips were cut from the master sheet and action sheets by scripts,
 * so frame counts and sizes below are real measurements, not guesses.
 *
 * w / h   – size of ONE frame in the strip, in source pixels
 * frames  – how many frames sit side by side in the strip
 * fps     – playback speed for the loop
 * rest    – which frame to show when motion is switched off (reduced-motion)
 */
export type SpriteAnimation = 'idle' | 'walk' | 'run' | 'work' | 'jump' | 'celebrate' | 'wave';

export type StripInfo = { frames: number; w: number; h: number; fps: number; rest: number };

export const ANIMATIONS: Record<SpriteAnimation, StripInfo> = {
  idle: { frames: 6, w: 105, h: 253, fps: 3, rest: 0 },
  walk: { frames: 4, w: 132, h: 235, fps: 6, rest: 0 },
  run: { frames: 4, w: 125, h: 191, fps: 8, rest: 0 },
  work: { frames: 4, w: 154, h: 195, fps: 2.5, rest: 0 },
  jump: { frames: 5, w: 116, h: 212, fps: 6, rest: 2 },
  celebrate: { frames: 4, w: 148, h: 205, fps: 2.5, rest: 0 },
  wave: { frames: 8, w: 136, h: 266, fps: 4, rest: 4 },
};

/** The 11 face close-ups, in the order they appear on the sheet. */
export const EXPRESSIONS = [
  'neutral',
  'joy',
  'surprised',
  'thinking',
  'focused',
  'talking',
  'starstruck',
  'unimpressed',
  'serious',
  'crying',
  'serene',
] as const;

export type Expression = (typeof EXPRESSIONS)[number];

export const FACE_STRIP: StripInfo = { frames: 11, w: 124, h: 138, fps: 0, rest: 0 };

export const STRIP_URL = (name: SpriteAnimation | 'faces') =>
  name === 'wave' ? '/assets/sprites/strips/wave-loop.png?v=6' : `/assets/sprites/strips/${name}.png?v=6`;
